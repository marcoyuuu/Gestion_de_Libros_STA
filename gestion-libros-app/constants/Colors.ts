/**
 * Colores base utilizados en la aplicación.
 * @constant
 * @type {Object}
 */
const colors = {
  greenDark: '#2B775E',    // Verde oscuro principal
  green: '#5ABD8C',        // Verde estándar
  greenLight: '#AFDFC7',   // Verde claro
  greenSuccess: '#4ADE80', // Verde para mensajes de éxito
  redAlert: '#F56C6C',     // Rojo para alertas o errores
  grayText: '#707070',     // Gris para texto principal
  grayMuted: '#9CA3AF',    // Gris para texto secundario o deshabilitado
  white: '#FFFFFF',        // Blanco
  black: '#000000',        // Negro
};

/**
 * Temas de color para la aplicación, diferenciando entre modo claro y oscuro.
 * @constant
 * @type {Object}
 * @property {Object} light - Paleta de colores para el tema claro.
 * @property {Object} dark - Paleta de colores para el tema oscuro.
 */
const theme = {
  light: {
    text: colors.black,            // Color de texto principal
    background: colors.white,      // Fondo principal
    tint: colors.green,            // Color de acento
    tabIconDefault: colors.grayMuted,   // Icono de pestaña por defecto
    tabIconSelected: colors.greenDark,  // Icono de pestaña seleccionada
    error: colors.redAlert,        // Color para mensajes de error
    success: colors.greenSuccess,  // Color para mensajes de éxito
    inputBorder: colors.greenLight,// Borde de inputs
    label: colors.grayText,        // Color de etiquetas
  },
  dark: {
    text: colors.white,
    background: colors.black,
    tint: colors.greenLight,
    tabIconDefault: colors.grayMuted,
    tabIconSelected: colors.green,
    error: colors.redAlert,
    success: colors.greenSuccess,
    inputBorder: colors.green,
    label: colors.grayMuted,
  },
};

/**
 * Exporta el objeto de temas de color para su uso en la aplicación.
 */
export default theme;
