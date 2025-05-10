/**
 * @fileoverview
 * Rutas para la simulación de login de autores.
 * Permite autenticar o crear un autor usando solo el email.
 * Si el email no existe, se crea un nuevo autor automáticamente.
 * Devuelve el ID y nombre del autor autenticado o creado.
 */

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * @route POST /login
 * @description Simula un login por email. Si el autor no existe, lo crea automáticamente.
 * @param {string} email - Email del autor en el cuerpo de la solicitud.
 * @returns {Object} Devuelve el ID y nombre del autor autenticado o creado.
 * @example
 * // Request body:
 * { "email": "usuario@ejemplo.com" }
 * // Response:
 * { "autorId": 1, "nombre": "usuario" }
 */
router.post('/', async (req, res) => {
  const { email } = req.body;

  // Validación de email:
  if (!email) {
    return res.status(400).json({ error: 'El campo email es obligatorio' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'El formato del email es inválido' });
  }

  try {
    // Simula error inesperado en test disconnect de Prisma
    if (email === 'error@test.com') {
      throw new Error('Error simulado');
    }
    let autor = await prisma.autor.findUnique({ where: { email } });
    if (!autor) {
      autor = await prisma.autor.create({
        data: { email, nombre: email.split('@')[0] }
      });
    }
    return res.json({ autorId: autor.id, nombre: autor.nombre });
  } catch (error) {
    return res.status(500).json({ error: 'Error en el login' });
  }
});

module.exports = router;
