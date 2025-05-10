/**
 * @fileoverview
 * Middleware global de manejo de errores para Express.
 * Captura cualquier error no gestionado en las rutas o controladores y responde con un mensaje genérico y código 500.
 */
/**
 * Middleware de manejo global de errores para Express.
 * Captura cualquier error no gestionado en las rutas o controladores y responde con un mensaje genérico.
 *
 * @param {Error} err - Objeto de error lanzado en la aplicación.
 * @param {Object} req - Objeto de la petición HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @param {Function} next - Función para pasar el control al siguiente middleware.
 * @returns {void} Devuelve una respuesta JSON con el error y código 500.
 */
module.exports = (err, req, res, next) => {
  console.error('Error capturado por el middleware:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
};
