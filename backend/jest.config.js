/**
 * @fileoverview
 * Configuración principal de Jest para pruebas en entorno Node.js.
 * Incluye cobertura de código y configuración de entorno de pruebas.
 */

module.exports = {
  // Define el entorno de pruebas como Node.js
  testEnvironment: 'node',

  // Habilita la recolección de cobertura de código
  collectCoverage: true,

  // Carpeta donde se guardarán los reportes de cobertura
  coverageDirectory: 'coverage',

  // Ignora archivos y carpetas específicas al calcular la cobertura
  coveragePathIgnorePatterns: ['/node_modules/', '/prisma/'],

  // Archivos a ejecutar después de inicializar el entorno de pruebas
  setupFilesAfterEnv: ['./tests/setup.js'],
};
