import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';

// Accepts onLogin prop to notify parent when login is successful
type LoginScreenProps = {
  onLogin: (email: string) => void;
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Por favor, ingresa un correo válido.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(email); // Notify parent to proceed
    }, 800);
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
