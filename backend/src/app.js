/**
 * @fileoverview
 * Configuración principal de la aplicación Express.
 * Carga middlewares, rutas y exporta la instancia de la app.
 */

// Carga las variables de entorno desde el archivo .env
require('dotenv').config();

// Importa el framework Express para la creación del servidor
const express = require('express');

// Importa el middleware CORS para permitir solicitudes de diferentes orígenes
const cors = require('cors');

// Importa las rutas principales de la aplicación
const librosRouter = require('./routes/libros');
const loginRouter = require('./routes/login');
const autoresRouter = require('./routes/autores');

// Crea una instancia de la aplicación Express
const app = express();

// Middlewares globales
/**
 * Configura CORS para aceptar solo los orígenes frontend permitidos.
 * - Permite solo los orígenes explícitos usados por el frontend web (por ejemplo, Expo web).
 * - Para apps móviles nativas, CORS no aplica.
 * - Modifica la lista según tus necesidades de frontend.
 */
/**
 * CORS profesional:
 * - Permite solo Expo Go/apps nativas (sin header Origin)
 * - Permite solo el origen web explícito usado por Expo web
 * - Bloquea todo lo demás
 */
const allowedWebOrigins = [
  'http://localhost:8081', // Expo web
];
app.use(cors({
  origin: function (origin, callback) {
    // Permitir SOLO solicitudes sin origen (Expo Go, apps nativas)
    if (!origin) return callback(null, true);
    // Permitir SOLO el origen web explícito
    if (allowedWebOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Bloquear todo lo demás (incluye Postman, web no autorizado, etc.)
    return callback(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json());

// Rutas principales
app.use('/libros', librosRouter);
app.use('/login', loginRouter);
app.use('/autores', autoresRouter);

// Middleware de manejo de errores global
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Exporta la instancia de la aplicación para ser utilizada en otros módulos
module.exports = app;
