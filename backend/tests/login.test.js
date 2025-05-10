/**
 * @fileoverview
 * Pruebas automatizadas para el endpoint POST /login de autores.
 * Utiliza Jest y Supertest para validar la funcionalidad de autenticación y creación automática de autores.
 * Cubre casos de validación de email, creación, obtención y manejo de errores inesperados.
 *
 * Dependencias:
 * - supertest: para realizar peticiones HTTP a la API Express
 * - @prisma/client: para interactuar con la base de datos durante los tests
 *
 * Para ejecutar los tests:

 *   npm test
 */


const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let app;

/**
 * Inicializa la aplicación y limpia la tabla Autor antes de todos los tests.
 * Se ejecuta una sola vez antes de la suite.
 * @async
 */

beforeAll(async () => {
  app = require('../src/app');
});

/**
 * Cierra la conexión de Prisma después de todos los tests.
 * Se ejecuta una sola vez después de la suite.
 * @async
 */

afterAll(async () => {
  await prisma.$disconnect();
});

/**
 * Test suite para el endpoint POST /login de autores.
 * Cubre casos de validación, creación y manejo de errores.
 */
describe('POST /login', () => {
  /**
   * Debe devolver 400 si falta el campo email.
   * @returns {void}
   */
  it('debe devolver 400 si falta el campo email', async () => {
    const res = await request(app).post('/login').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/obligatorio/i);
  });

  /**
   * Debe devolver 400 si el email es inválido.
   * @returns {void}
   */
  it('debe devolver 400 si el email es inválido', async () => {
    const res = await request(app).post('/login').send({ email: 'noesunemail' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/inválido/i);
  });

  /**
   * Debe crear un autor si el email no existe.
   * @returns {void}
   */
  it('debe crear un autor si el email no existe', async () => {
    const email = 'nuevoautor@test.com';
    const res = await request(app).post('/login').send({ email });
    expect(res.statusCode).toBe(200);
    expect(res.body.autorId).toBeDefined();
    expect(res.body.nombre).toBe('nuevoautor');
    // Verifica que el autor fue creado en la base de datos
    const autor = await prisma.autor.findUnique({ where: { email } });
    expect(autor).not.toBeNull();
    expect(autor.nombre).toBe('nuevoautor');
  });

  /**
   * Debe devolver el autor existente si el email ya existe.
   * @returns {void}
   */
  it('debe devolver el autor existente si el email ya existe', async () => {
    const email = 'existente@test.com';
    // Crea el autor primero
    await prisma.autor.create({ data: { email, nombre: 'existente' } });
    const res = await request(app).post('/login').send({ email });
    expect(res.statusCode).toBe(200);
    expect(res.body.autorId).toBeDefined();
    expect(res.body.nombre).toBe('existente');
  });

  /**
   * Debe manejar errores inesperados devolviendo status 500.
   * @returns {void}
   */
  it('debe manejar errores inesperados con status 500', async () => {
    // Simula error desconectando Prisma
    await prisma.$disconnect();
    const res = await request(app).post('/login').send({ email: 'error@test.com' });
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toMatch(/login/i);
    // Reconecta para siguientes tests
    await prisma.$connect();
  });
});
