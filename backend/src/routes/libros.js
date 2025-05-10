/**
 * @fileoverview
 * Rutas para la gestión de libros.
 * Incluye operaciones CRUD: listar, crear, obtener por ID, actualizar y eliminar libros.
 * Todas las rutas delegan la lógica al controlador de libros.
 */

// Importa el módulo Express para crear rutas
const express = require('express');
const router = express.Router();

// Importa el controlador que gestiona la lógica de los libros
const librosController = require('../controllers/librosController');

/**
 * @route GET /libros
 * @desc Obtiene todos los libros
 */
router.get('/', librosController.getAllLibros);

/**
 * @route POST /libros
 * @desc Crea un nuevo libro
 */
router.post('/', librosController.createLibro);

/**
 * @route GET /libros/:id
 * @desc Obtiene un libro por su ID
 */
router.get('/:id', librosController.getLibroById);

/**
 * @route PUT /libros/:id
 * @desc Actualiza un libro existente por su ID
 */
router.put('/:id', librosController.updateLibro);

/**
 * @route DELETE /libros/:id
 * @desc Elimina un libro por su ID
 */
router.delete('/:id', librosController.deleteLibro);

// Exporta el router para ser utilizado en la aplicación principal
module.exports = router;
