/**
 * @fileoverview
 * API helpers for interacting with the backend server.
 * Provides functions for login and other endpoints.
 */
import axios from 'axios';
import { Platform } from 'react-native';

/**
 * Base URL for the backend API.
 * Update this if your backend runs on a different host/port.
 */
/**
 * Obtiene la URL base del backend Express/Prisma según el entorno de ejecución.
 * - En Android emulador: usa 10.0.2.2
 * - En iOS físico: usa la IP local de tu máquina (debe ser configurada manualmente)
 * - En web o desarrollo local: usa localhost
 * @returns {string} URL base del backend
 */
/**
 * Dirección IP local detectada: 192.168.0.1
 * Usa esta IP para pruebas en iPhone físico o Android físico.
 * Cambia este valor si tu IP local cambia.
 */
const LOCAL_NETWORK_IP = '192.168.0.8';

/**
 * Obtiene la URL base del backend Express/Prisma según el entorno de ejecución.
 * - Android emulador: usa 10.0.2.2
 * - iOS/Android físico: usa la IP local de tu máquina
 * - Web o desarrollo local: usa localhost
 */
export function getApiBaseUrl(): string {
  // Detecta si estamos en un entorno de React Native
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
  if (isReactNative) {
    // @ts-ignore
    if (Platform.OS === 'android') {
      // Android emulador usa 10.0.2.2 para acceder al host
      return 'http://10.0.2.2:7000';
    }
    // iOS físico o Android físico: usa la IP local
    return `http://${LOCAL_NETWORK_IP}:7000`;
  }
  // Web o Node
  return 'http://localhost:7000';
}

/**
 * URL base del backend (por compatibilidad con imports existentes)
 */
export const API_BASE_URL = getApiBaseUrl();

/**
 * Response type for login endpoint.
 */
export type LoginResponse = {
  autorId: number;
  nombre: string;
};

/**
 * Realiza login o registro de usuario en el backend.
 * @param email Email del usuario
 * @returns Datos del autor si el login es exitoso
 * @throws Error si la petición falla
 */
/**
 * Realiza login o registro de usuario en el backend.
 * @param email Email del usuario
 * @returns Datos del autor si el login es exitoso
 * @throws Error si la petición falla
 */
export async function login(email: string): Promise<LoginResponse> {
  try {
    // Usa siempre la URL dinámica para máxima compatibilidad
    const response = await axios.post<LoginResponse>(`${getApiBaseUrl()}/login`, { email }, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000, // Opcional: timeout para evitar cuelgues
    });
    return response.data;
  } catch (error: any) {
    // Extrae mensaje de error útil
    const message = error.response?.data?.error || error.response?.data?.message || error.message || 'Error al iniciar sesión';
    throw new Error(message);
  }
}
