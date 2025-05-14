/**
 * @fileoverview
 * Rutas para la simulación de login de autores.
 * Permite autenticar o crear un autor usando solo el email.
 * Si el email no existe, se crea un nuevo autor automáticamente.
 * Devuelve el ID y nombre del autor autenticado o creado.
 */

const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

/**
 * @route POST /login
 * @description Simula un login por email. Si el autor no existe, lo crea automáticamente derivando un nombre natural del email (por ejemplo, 'jane.doe@test.com' → 'Jane Doe').
 * @param {string} email - Email del autor en el cuerpo de la solicitud.
 * @returns {Object} Devuelve el ID, email y nombre del autor autenticado o creado.
 * @example
 * // Request body:
 * { "email": "jane.doe@test.com" }
 * // Response:
 * { "autorId": 1, "email": "jane.doe@test.com", "nombre": "Jane Doe" }
 */

/**
 * Convierte el prefijo del email en un nombre natural.
 * Ejemplo: 'jane.doe' => 'Jane Doe'
 * @param {string} emailPrefix
 * @returns {string}
 */
function emailPrefixToName(emailPrefix) {
  return emailPrefix
    .split('.')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

router.post('/', async (req, res, next) => {
  try {
    const { email, nombre } = req.body;

    // Validación de email
    if (!email) {
      return res.status(400).json({ error: 'El campo email es obligatorio' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'El formato del email es inválido' });
    }

    // Busca el autor por email
    let autor = await prisma.autor.findUnique({ where: { email } });

    // Si no existe, crea uno nuevo usando nombre si se proporciona, o derivando un nombre natural del email
    if (!autor) {
      let autorNombre;
      if (nombre && nombre.trim()) {
        autorNombre = nombre.trim();
      } else {
        const emailPrefix = email.split('@')[0];
        autorNombre = emailPrefixToName(emailPrefix);
      }
      autor = await prisma.autor.create({
        data: { email, nombre: autorNombre }
      });
    }

    // Devuelve info completa del autor
    res.status(200).json({ autorId: autor.id, email: autor.email, nombre: autor.nombre });
  } catch (error) {
    // Debug log for error-handling test
    // eslint-disable-next-line no-console
    console.error('Login route error (should trigger 500):', error);
    next(error);
  }
});

module.exports = router;
