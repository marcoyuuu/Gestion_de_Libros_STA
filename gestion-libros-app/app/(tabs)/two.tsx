
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';


export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const userEmail = user?.email || 'usuario@ejemplo.com';

  const handleLogout = async () => {
    await logout();
    router.replace('/login'); // Redirige explícitamente a la pantalla de login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userEmail}</Text>
      </View>
      <Button title="Cerrar sesión" color="#d32f2f" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#888',
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },
});
