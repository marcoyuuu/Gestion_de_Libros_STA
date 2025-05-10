/**
 * @fileoverview
 * Punto de entrada para iniciar el servidor Express.
 * Carga variables de entorno, importa la app y arranca el servidor.
 * Maneja errores de arranque y muestra el puerto en consola.
 */

// Carga las variables de entorno desde el archivo .env (por ejemplo, el puerto)
require('dotenv').config();

// Importa la instancia principal de la aplicación Express
const app = require('./app');

// Define el puerto en el que se ejecutará el servidor (por defecto 3000 si no está definido en .env)
const PORT = process.env.PORT || 3000;

// Inicia el servidor y muestra un mensaje en consola cuando está listo
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
})
// Maneja errores que puedan ocurrir al iniciar el servidor (por ejemplo, puerto en uso)
.on('error', (err) => {
  console.error('Error al iniciar el servidor:', err);
  process.exit(1); // Finaliza el proceso con error
});
