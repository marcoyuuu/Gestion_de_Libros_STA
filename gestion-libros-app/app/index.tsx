// Entry point: Show LoginScreen first, then navigate to (tabs) after login
/**
 * @fileoverview
 * Entry point: Muestra LoginScreen si no hay sesión, o navega a tabs si está logueado.
 * El control de sesión se gestiona vía AuthContext.
 */
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
// import LoginScreen from './screens/LoginScreen';
import { useAuth } from '../contexts/AuthContext';

export default function AppEntry() {
  const { user } = useAuth();
  const router = useRouter();

  // Si hay usuario, navega automáticamente a tabs; si no, a login
  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    } else {
      router.replace('/login');
    }
  }, [user]);

  // Fallback (pantalla de carga breve)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  );
}
