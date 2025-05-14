// Entry point: Show LoginScreen first, then navigate to (tabs) after login
/**
 * @fileoverview
 * Entry point: Muestra LoginScreen si no hay sesión, o navega a tabs si está logueado.
 * El control de sesión se gestiona vía AuthContext.
 */
// Redirige a la pantalla de bienvenida por defecto
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function IndexRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/welcome');
  }, []);
  return null;
}
