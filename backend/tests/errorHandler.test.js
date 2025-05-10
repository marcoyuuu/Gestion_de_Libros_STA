/**
 * @fileoverview
 * Pruebas para el middleware de manejo de errores global.
 * Verifica que el middleware capture correctamente los errores y devuelva 
 * una respuesta apropiada.
 */

const errorHandler = require('../src/middleware/errorHandler');
const express = require('express');
const request = require('supertest');

/**
 * Crea una app de Express con una ruta que lanza un error para probar el middleware
 */
function createTestApp() {
  const app = express();
  
  // Ruta de prueba que lanza un error deliberadamente
  app.get('/test-error', (req, res, next) => {
    const error = new Error('Test error');
    next(error);
  });
  
  // Aplicamos el middleware de manejo de errores
  app.use(errorHandler);
  
  return app;
}

describe('Error Handler Middleware', () => {
  let app;
  
  beforeEach(() => {
    // Creamos una nueva app para cada test
    app = createTestApp();
    
    // Espía a console.error para verificar que se llame
    console.error = jest.fn();
  });
  
  it('should catch errors and return 500 status code with error message', async () => {
    // Realizamos una petición que sabemos que generará un error
    const response = await request(app).get('/test-error');
    
    // Verificamos que la respuesta sea la esperada
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error interno del servidor' });
    
    // Verificamos que console.error fue llamado
    expect(console.error).toHaveBeenCalled();
    expect(console.error.mock.calls[0][0]).toBe('Error capturado por el middleware:');
  });
});
