
/**
 * @fileoverview
 * Pantalla de login para la app de gestión de libros.
 * Permite al usuario autenticarse mediante email y gestiona la sesión global.
 */
import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { login as loginApi } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Componente funcional para la pantalla de login.
 * Realiza validación, muestra errores y gestiona la sesión.
 */
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  /**
   * Maneja el envío del formulario de login.
   * Valida el email, llama a la API y guarda la sesión.
   */
  const handleLogin = async () => {
    setError('');
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Por favor, ingresa un correo válido.');
      return;
    }
    setLoading(true);
    try {
      // Llama a la API de login
      const res = await loginApi(email);
      // Guarda usuario en el contexto global
      await login({ ...res, email });
      // La navegación a la pantalla principal debe hacerse en el layout/app root
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!loading}
      />
      <Button title="Continuar" onPress={handleLogin} disabled={loading} />
      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Text style={styles.info}>Se creará una cuenta si no existe</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    color: '#4CB28A',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#4CB28A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  error: {
    color: '#D32F2F',
    marginTop: 12,
    textAlign: 'center',
  },
  info: {
    marginTop: 32,
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
});
