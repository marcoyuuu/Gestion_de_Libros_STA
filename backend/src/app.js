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

// Crea una instancia de la aplicación Express
const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/libros', librosRouter);
app.use('/login', loginRouter);

// Middleware de manejo de errores global
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Exporta la instancia de la aplicación para ser utilizada en otros módulos
module.exports = app;
