/**
 * @fileoverview
 * Pruebas automatizadas para los endpoints CRUD de /libros.
 * Utiliza Jest y Supertest para validar la funcionalidad de gestión de libros.
 * Cubre casos de creación, obtención, actualización, eliminación, validaciones y manejo de errores internos.
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
let autorId;

/**
 * Configuración global para los tests.
 * - Inicializa la aplicación Express.
 * - Limpia las tablas de libros y autores antes de ejecutar los tests.
 * - Crea un autor de prueba y guarda su ID para asociar libros en los tests.
 */
beforeAll(async () => {
  app = require('../src/app');
  const autor = await prisma.autor.create({ data: { email: 'libros@test.com', nombre: 'LibrosTester' } });
  autorId = autor.id;
});

/**
 * Desconecta el cliente de Prisma después de ejecutar todos los tests.
 */
afterAll(async () => {
  await prisma.$disconnect();
});

/**
 * Test suite para los endpoints CRUD de /libros.
 * Cubre creación, obtención, actualización, eliminación y validaciones.
 */
describe('CRUD /libros', () => {
  let libroId;

  /**
   * Debe devolver 404 si no hay libros en la base de datos.
   * @returns {void}
   */
  it('GET /libros debe devolver 404 si no hay libros', async () => {
    await prisma.libro.deleteMany();
    const res = await request(app).get('/libros');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toMatch(/no se encontraron/i);
    const libro = await prisma.libro.create({
      data: {
        titulo: 'Libro temporal',
        genero: 'Test',
        valoracion: 1,
        autorId
      }
    });
    libroId = libro.id;
  });

  /**
   * Debe crear un libro con datos válidos.
   * @returns {void}
   */
  it('POST /libros debe crear un libro', async () => {
    const res = await request(app).post('/libros').send({
      titulo: 'Test Book',
      genero: 'Ficción',
      valoracion: 5,
      autorId
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.titulo).toBe('Test Book');
    libroId = res.body.id;
  });

  /**
   * Test de validación de campos requeridos en POST /libros.
   * @returns {void}
   */
  describe('POST /libros validación de campos requeridos', () => {
    /**
     * Debe fallar si faltan todos los campos.
     * @returns {void}
     */
    it('debe fallar si faltan todos los campos', async () => {
      const res = await request(app).post('/libros').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBeDefined();
    });
    /**
     * Debe fallar si falta el título.
     * @returns {void}
     */
    it('debe fallar si falta el título', async () => {
      const res = await request(app).post('/libros').send({ genero: 'Test', valoracion: 1, autorId });
      expect(res.statusCode).toBe(400);
    });
    /**
     * Debe fallar si falta el género.
     * @returns {void}
     */
    it('debe fallar si falta el género', async () => {
      const res = await request(app).post('/libros').send({ titulo: 'Test', valoracion: 1, autorId });
      expect(res.statusCode).toBe(400);
    });
    /**
     * Debe fallar si falta la valoración.
     * @returns {void}
     */
    it('debe fallar si falta la valoración', async () => {
      const res = await request(app).post('/libros').send({ titulo: 'Test', genero: 'Test', autorId });
      expect(res.statusCode).toBe(400);
    });
    /**
     * Debe fallar si falta el autorId.
     * @returns {void}
     */
    it('debe fallar si falta el autorId', async () => {
      const res = await request(app).post('/libros').send({ titulo: 'Test', genero: 'Test', valoracion: 1 });
      expect(res.statusCode).toBe(400);
    });
    /**
     * Debe fallar si valoración no es número.
     * @returns {void}
     */
    it('debe fallar si valoración no es número', async () => {
      const res = await request(app).post('/libros').send({ titulo: 'Test', genero: 'Test', valoracion: 'no-num', autorId });
      expect(res.statusCode).toBe(400);
    });
  });

  /**
   * Debe obtener todos los libros.
   * @returns {void}
   */
  it('GET /libros debe devolver un array de libros', async () => {
    const res = await request(app).get('/libros');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  /**
   * Debe obtener un libro por ID.
   * @returns {void}
   */
  it('GET /libros/:id debe devolver el libro correcto', async () => {
    const res = await request(app).get(`/libros/${libroId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(libroId);
  });

  /**
   * Debe devolver 404 si el libro no existe.
   * @returns {void}
   */
  it('GET /libros/:id debe devolver 404 si no existe', async () => {
    const res = await request(app).get('/libros/999999');
    expect(res.statusCode).toBe(404);
  });

  /**
   * Debe actualizar un libro existente.
   * @returns {void}
   */
  it('PUT /libros/:id debe actualizar el libro', async () => {
    const res = await request(app).put(`/libros/${libroId}`).send({
      titulo: 'Libro Actualizado',
      genero: 'Drama',
      valoracion: 4,
      autorId
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.titulo).toBe('Libro Actualizado');
  });

  /**
   * Debe devolver 404 al actualizar un libro inexistente.
   * @returns {void}
   */
  it('PUT /libros/:id debe devolver 404 si no existe', async () => {
    const res = await request(app).put('/libros/999999').send({
      titulo: 'No existe',
      genero: 'Drama',
      valoracion: 3,
      autorId
    });
    expect(res.statusCode).toBe(404);
  });

  /**
   * Debe eliminar un libro existente.
   * @returns {void}
   */
  it('DELETE /libros/:id debe eliminar el libro', async () => {
    const res = await request(app).delete(`/libros/${libroId}`);
    expect(res.statusCode).toBe(204);
    const res2 = await request(app).get(`/libros/${libroId}`);
    expect(res2.statusCode).toBe(404);
  });

  /**
   * Debe devolver 404 al eliminar un libro inexistente.
   * @returns {void}
   */
  it('DELETE /libros/:id debe devolver 404 si no existe', async () => {
    const res = await request(app).delete('/libros/999999');
    expect(res.statusCode).toBe(404);
  });
});

/**
 * Test suite para errores internos en los controladores de libros.
 * Cubre el manejo de errores inesperados en cada endpoint principal.
 */
describe('Errores internos en controladores de libros', () => {
  // Simulación de errores internos mediante query param `errorSimulate`

  /**
   * Debe devolver 500 si ocurre un error inesperado al obtener todos los libros.
   * @returns {void}
   */
  /**
   * Debe devolver 500 si ocurre un error inesperado al obtener todos los libros.
   * @returns {void}
   */
  it('GET /libros responde 500 si ocurre un error inesperado', async () => {
    const res = await request(app).get('/libros?errorSimulate=true');
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Error al obtener los libros');
  });

  /**
   * Debe devolver 500 si ocurre un error inesperado al crear un libro.
   * @returns {void}
   */
  /**
   * Debe devolver 500 si ocurre un error inesperado al crear un libro.
   * @returns {void}
   */
  it('POST /libros responde 500 si ocurre un error inesperado', async () => {
    const res = await request(app)
      .post('/libros?errorSimulate=true')
      .send({ titulo: 'Error', genero: 'Error', valoracion: 1, autorId });
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Error al crear el libro');
  });

  /**
   * Debe devolver 500 si ocurre un error inesperado al obtener un libro por ID.
   * @returns {void}
   */
  /**
   * Debe devolver 500 si ocurre un error inesperado al obtener un libro por ID.
   * @returns {void}
   */
  it('GET /libros/:id responde 500 si ocurre un error inesperado', async () => {
    const res = await request(app).get('/libros/1?errorSimulate=true');
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Error al obtener el libro');
  });

  /**
   * Debe devolver 500 si ocurre un error inesperado al actualizar un libro.
   * @returns {void}
   */
  /**
   * Debe devolver 500 si ocurre un error inesperado al actualizar un libro.
   * @returns {void}
   */
  it('PUT /libros/:id responde 500 si ocurre un error inesperado', async () => {
    const res = await request(app)
      .put('/libros/1?errorSimulate=true')
      .send({ titulo: 'Error', genero: 'Error', valoracion: 1 });
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Error al actualizar el libro');
  });

  /**
   * Debe devolver 500 si ocurre un error inesperado al eliminar un libro.
   * @returns {void}
   */
  /**
   * Debe devolver 500 si ocurre un error inesperado al eliminar un libro.
   * @returns {void}
   */
  it('DELETE /libros/:id responde 500 si ocurre un error inesperado', async () => {
    const res = await request(app).delete('/libros/1?errorSimulate=true');
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Error al eliminar el libro');
  });
});