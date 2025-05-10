/**
 * @fileoverview
 * Controladores para la gestión de libros.
 * Incluye operaciones CRUD: listar, crear, obtener por ID, actualizar y eliminar libros.
 * Utiliza Prisma Client para interactuar con la base de datos.
 */

// Importa Prisma Client para interactuar con la base de datos
const { PrismaClient } = require('@prisma/client'); // Trae PrismaClient desde el paquete @prisma/client
const prisma = new PrismaClient(); // Crea una nueva instancia de PrismaClient para usarla en las consultas

/**
 * Obtiene todos los libros de la base de datos, incluyendo la información del autor asociado a cada libro.
 *
 * @param {Object} _req - Objeto de la petición HTTP (no se utiliza).
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {void} Devuelve un arreglo de libros en formato JSON, cada uno con los datos de su autor.
 */
exports.getAllLibros = async (_req, res) => {
  try {
    const libros = await prisma.libro.findMany({ include: { autor: true } });
    if (!libros || libros.length === 0) {
      return res.status(404).json({ error: 'No se encontraron libros' });
    }
    res.json(libros); // Devuelve la lista de libros en formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
};

/**
 * Crea un nuevo libro en la base de datos con los datos proporcionados en el cuerpo de la solicitud.
 *
 * @param {Object} req - Objeto de la petición HTTP, debe contener titulo, genero, valoracion y autorId en el cuerpo.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {void} Devuelve el libro creado en formato JSON y el código de estado 201 (creado).
 */
exports.createLibro = async (req, res) => {
  try {
    const { titulo, genero, valoracion, autorId } = req.body;
    const nuevo = await prisma.libro.create({
      data: { titulo, genero, valoracion, autorId }
    });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el libro' });
  }
};

/**
 * Obtiene un libro específico por su ID, incluyendo la información del autor asociado.
 *
 * @param {Object} req - Objeto de la petición HTTP, debe contener el ID del libro en los parámetros de la URL.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {void} Devuelve el libro encontrado en formato JSON, o un error 404 si no existe, o un error 500 si ocurre un problema.
 */
exports.getLibroById = async (req, res) => {
  try {
    const libro = await prisma.libro.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { autor: true },
    });
    if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el libro' });
  }
};

/**
 * Actualiza un libro existente con los datos recibidos en el cuerpo de la solicitud.
 *
 * @param {Object} req - Objeto de la petición HTTP, debe contener el ID del libro en los parámetros de la URL y los nuevos datos en el cuerpo.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {void} Devuelve el libro actualizado en formato JSON, o un error 404 si no existe, o un error 500 si ocurre un problema.
 */
exports.updateLibro = async (req, res) => {
  try {
    const { titulo, genero, valoracion } = req.body;
    const updated = await prisma.libro.update({
      where: { id: parseInt(req.params.id) },
      data: { titulo, genero, valoracion }
    });
    res.json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      // Prisma error: record not found
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.status(500).json({ error: 'Error al actualizar el libro' });
  }
};

/**
 * Elimina un libro existente por su ID.
 *
 * @param {Object} req - Objeto de la petición HTTP, debe contener el ID del libro en los parámetros de la URL.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {void} Responde con un código de estado 204 (sin contenido) si la eliminación es exitosa, o un error 404 si no se encuentra el libro, o un error 500 si ocurre un problema.
 */
exports.deleteLibro = async (req, res) => {
  try {
    await prisma.libro.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      // Prisma error: record not found
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
};
