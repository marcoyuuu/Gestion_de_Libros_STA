import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  // Aquí podrías obtener el email del usuario autenticado
  const userEmail = 'usuario@ejemplo.com'; // Simulado

  const handleLogout = () => {
    // Lógica para cerrar sesión
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
