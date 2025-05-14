/**
 * @fileoverview
 * Ruta para obtener la lista de autores.
 */
const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

/**
 * @route GET /autores
 * @returns {Array} Lista de autores (id, nombre, email)
 */
router.get('/', async (req, res, next) => {
  try {
    const autores = await prisma.autor.findMany({
      select: { id: true, nombre: true, email: true }
    });
    res.json(autores);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
