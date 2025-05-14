/**
 * @fileoverview
 * Pruebas automatizadas para el endpoint POST /login de autores.
 * Utiliza Jest y Supertest para validar la autenticación, creación automática y manejo de errores en la ruta /login.
 *
 * Casos cubiertos:
 * - Validación de formato y presencia de email.
 * - Creación de autor con nombre derivado del email o proporcionado explícitamente.
 * - Retorno de autor existente sin modificar su nombre.
 * - Manejo de errores inesperados y respuestas HTTP adecuadas.
 *
 * Dependencias:
 * - supertest: para realizar peticiones HTTP a la API Express.
 * - @prisma/client: para simular la interacción con la base de datos mediante mocks.
 *
 * Para ejecutar los tests:
 *   npm test --prefix backend
 */

// --- BEGIN PRISMA MOCK ---
// Mock the PrismaClient module
jest.mock('@prisma/client', () => {
  const mockAutorFindUnique = jest.fn();
  const mockAutorCreate = jest.fn();
  const mockAutorUpdate = jest.fn();
  const mockDisconnect = jest.fn(); // Mock for $disconnect

  const mockPrismaInstance = {
    autor: {
      findUnique: mockAutorFindUnique,
      create: mockAutorCreate,
      update: mockAutorUpdate,
    },
    $disconnect: mockDisconnect, // Add the mock $disconnect here
  };

  const MockPrismaClientConstructor = jest.fn(() => mockPrismaInstance);
  return { PrismaClient: MockPrismaClientConstructor };
});
// --- END PRISMA MOCK ---

const request = require('supertest');
// app is required here, and it will use the mocked Prisma client
// because jest.mock is hoisted.
const app = require('../src/app'); 

// This prisma instance is the mocked one.
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // This will be our mockPrismaInstance

describe('POST /login', () => {

  /**
   * @test
   * @description
   * Debe crear un autor usando el nombre proporcionado si se envía y no está vacío.
   * Cubre la rama donde el nombre es pasado explícitamente en la creación.
   * Espera que el backend retorne el autor creado con el nombre personalizado.
   */
  it('debe crear un autor usando el nombre proporcionado si se envía y no está vacío', async () => {
    prisma.autor.findUnique.mockResolvedValueOnce(null);
    const email = 'custom.name@example.com';
    const nombre = 'Nombre Personalizado';
    const expectedAutor = { id: 20, email, nombre };
    prisma.autor.create.mockResolvedValueOnce(expectedAutor);

    const response = await request(app)
      .post('/login')
      .send({ email, nombre });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      autorId: expectedAutor.id,
      email: expectedAutor.email,
      nombre: expectedAutor.nombre,
    });
    expect(prisma.autor.create).toHaveBeenCalledWith({
      data: { email, nombre },
    });
  });

  /**
   * @test
   * @description
   * Debe retornar 400 si el email tiene un formato inválido.
   * Cubre la validación de formato de email en el backend.
   */
  it('debe retornar 400 si el email tiene un formato inválido', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'invalid-email' });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(/email.*válido/i);
  });

  /**
   * @test
   * @description
   * No debe actualizar el nombre del autor si el email existe y el nombre es diferente.
   * Cubre la lógica donde el backend ignora el nombre enviado si el autor ya existe.
   */
  it('no debe actualizar el nombre del autor si el email existe y el nombre es diferente', async () => {
    const existingAutor = { id: 5, email: 'update@example.com', nombre: 'Old Name' };
    const updatedNombre = 'New Name';
    prisma.autor.findUnique.mockResolvedValueOnce(existingAutor);

    const response = await request(app)
      .post('/login')
      .send({ email: existingAutor.email, nombre: updatedNombre });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      autorId: existingAutor.id,
      email: existingAutor.email,
      nombre: existingAutor.nombre,
    });
    expect(prisma.autor.update).not.toHaveBeenCalled();
  });

  /**
   * @test
   * @description
   * Debe crear un autor con nombre natural derivado del email si no se proporciona nombre.
   * Cubre la rama donde el nombre no es enviado y se deriva del prefijo del email.
   */
  it('debe crear un autor con nombre natural derivado del email si no se proporciona nombre', async () => {
    prisma.autor.findUnique.mockResolvedValueOnce(null);
    const email = 'jane.doe@example.com';
    const expectedAutor = { id: 10, email, nombre: 'Jane Doe' };
    prisma.autor.create.mockResolvedValueOnce(expectedAutor);

    const response = await request(app)
      .post('/login')
      .send({ email });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      autorId: expectedAutor.id,
      email: expectedAutor.email,
      nombre: expectedAutor.nombre,
    });
    expect(prisma.autor.create).toHaveBeenCalledWith({
      data: { email, nombre: 'Jane Doe' },
    });
  });

  /**
   * @test
   * @description
   * Debe retornar un autor existente si el email ya existe en la base de datos.
   * Cubre la lógica de autenticación sin creación ni modificación.
   */
  it('debe retornar un autor existente si el email ya existe en la base de datos', async () => {
    const existingAutor = { id: 1, email: 'test@example.com', nombre: 'Test User' };
    prisma.autor.findUnique.mockResolvedValueOnce(existingAutor);

    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      autorId: existingAutor.id,
      email: existingAutor.email,
      nombre: existingAutor.nombre,
    });
    expect(prisma.autor.findUnique).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
  });

  /**
   * @test
   * @description
   * Debe crear un nuevo autor si el email no existe, usando el email como nombre por defecto.
   * Cubre la rama donde el nombre no es enviado y se deriva del email.
   */
  it('debe crear un nuevo autor si el email no existe, usando el email como nombre por defecto', async () => {
    prisma.autor.findUnique.mockResolvedValueOnce(null);
    const newAutorData = { email: 'newuser@example.com' };
    const expectedAutor = { id: 2, email: 'newuser@example.com', nombre: 'Newuser' };
    prisma.autor.create.mockResolvedValueOnce(expectedAutor);

    const response = await request(app)
      .post('/login')
      .send(newAutorData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      autorId: expectedAutor.id,
      email: expectedAutor.email,
      nombre: expectedAutor.nombre,
    });
    expect(prisma.autor.findUnique).toHaveBeenCalledWith({
      where: { email: 'newuser@example.com' },
    });
    expect(prisma.autor.create).toHaveBeenCalledWith({
      data: { email: 'newuser@example.com', nombre: 'Newuser' },
    });
  });

  /**
   * @test
   * @description
   * Debe crear un autor con nombre natural derivado del email si no se proporciona nombre (caso alternativo).
   * Cubre la lógica de derivación de nombre para otro email de prueba.
   */
  it('debe crear un autor con nombre natural derivado del email si no se proporciona nombre (caso alternativo)', async () => {
    prisma.autor.findUnique.mockResolvedValueOnce(null);
    const email = 'jane.doe@example.com';
    const expectedAutor = { id: 10, email, nombre: 'Jane Doe' };
    prisma.autor.create.mockResolvedValueOnce(expectedAutor);

    const response = await request(app)
      .post('/login')
      .send({ email });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      autorId: expectedAutor.id,
      email: expectedAutor.email,
      nombre: expectedAutor.nombre,
    });
    expect(prisma.autor.create).toHaveBeenCalledWith({
      data: { email, nombre: 'Jane Doe' },
    });
  });

  /**
   * @test
   * @description
   * No debe actualizar el nombre si el email existe, aunque se proporcione un nombre diferente o igual.
   * Cubre la lógica de no actualización para autores existentes.
   */
  it('no debe actualizar el nombre si el email existe, aunque se proporcione un nombre diferente o igual', async () => {
    const existingAutor = { id: 1, email: 'test@example.com', nombre: 'Test User' };
    prisma.autor.findUnique.mockResolvedValueOnce(existingAutor);

    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', nombre: 'Otro Nombre' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      autorId: existingAutor.id,
      email: existingAutor.email,
      nombre: existingAutor.nombre,
    });
    expect(prisma.autor.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(prisma.autor.update).not.toHaveBeenCalled();
  });

  /**
   * @test
   * @description
   * Debe retornar 400 si el email no se proporciona en la petición.
   * Cubre la validación de campo obligatorio en el backend.
   */
  it('debe retornar 400 si el email no se proporciona en la petición', async () => {
    const response = await request(app)
      .post('/login')
      .send({ nombre: 'Test' });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('El campo email es obligatorio');
  });

  /**
   * @test
   * @description
   * Debe manejar errores inesperados con status 500.
   * Simula un fallo en la base de datos y verifica el manejo global de errores.
   */
  it('debe manejar errores inesperados con status 500', async () => {
    const mockError = new Error('Fallo simulado de DB');
    prisma.autor.findUnique.mockRejectedValueOnce(mockError);

    await request(app)
      .post('/login')
      .send({ email: 'error500@test.com' })
      .expect(500)
      .then(res => {
        expect(res.body.error).toMatch(/interno del servidor/i);
      });
    expect(prisma.autor.findUnique).toHaveBeenCalledWith({
      where: { email: 'error500@test.com' },
    });
  });

  /**
   * @beforeEach
   * @description
   * Limpia los mocks de Prisma antes de cada test para evitar contaminación entre pruebas.
   */
  beforeEach(() => {
    prisma.autor.findUnique.mockClear();
    prisma.autor.create.mockClear();
    prisma.autor.update.mockClear();
    prisma.$disconnect.mockClear();
  });

  /**
   * @afterAll
   * @description
   * Cierra la conexión mock de Prisma después de todos los tests.
   */
  afterAll(async () => {
    await prisma.$disconnect();
  });

});
