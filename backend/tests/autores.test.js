/**
 * @fileoverview
 * Pruebas para la ruta GET /autores.
 * Usa Jest y Supertest para validar la obtención de autores y el manejo de errores.
 */
const request = require('supertest');
const prisma = require('../src/prisma');
let app;

beforeAll(async () => {
  app = require('../src/app');
  // Limpia la tabla de autores y agrega algunos autores de prueba
  await prisma.libro.deleteMany();
  await prisma.autor.deleteMany();
  await prisma.autor.createMany({
    data: [
      { email: 'autor1@test.com', nombre: 'Autor Uno' },
      { email: 'autor2@test.com', nombre: 'Autor Dos' },
    ],
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('GET /autores', () => {
  it('debe devolver un array de autores con id, nombre y email', async () => {
    const res = await request(app).get('/autores');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
    res.body.forEach(autor => {
      expect(autor).toHaveProperty('id');
      expect(autor).toHaveProperty('nombre');
      expect(autor).toHaveProperty('email');
    });
  });

  it('debe manejar errores internos de Prisma y responder con 500', async () => {
    // Espía y fuerza un error en prisma.autor.findMany
    const originalFindMany = prisma.autor.findMany;
    prisma.autor.findMany = jest.fn().mockRejectedValue(new Error('Prisma error'));
    const res = await request(app).get('/autores');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Error interno del servidor' });
    // Restaura la función original
    prisma.autor.findMany = originalFindMany;
  });
});
