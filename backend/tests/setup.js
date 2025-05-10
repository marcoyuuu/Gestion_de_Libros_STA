
/**
 * @fileoverview
 * Configuración global de Jest para los tests automatizados del backend.
 * - Limpia la base de datos antes de todos los tests.
 * - Desconecta Prisma al finalizar los tests.
 * - Se ejecuta automáticamente gracias a setupFilesAfterEnv en jest.config.js.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

beforeAll(async () => {
  /**
   * Elimina todos los registros de las tablas 'libro' y 'autor' antes de ejecutar los tests.
   * Esto asegura que cada suite de pruebas comience con una base de datos limpia y predecible.
   */
  await prisma.libro.deleteMany();
  await prisma.autor.deleteMany();
});

afterAll(async () => {
  /**
   * Cierra la conexión de Prisma después de finalizar todos los tests.
   * Es importante para liberar recursos y evitar advertencias de conexiones abiertas.
   */
  await prisma.$disconnect();
});
