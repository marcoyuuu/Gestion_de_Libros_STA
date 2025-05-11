import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setLoading(true);
    // Simula login aquí
    setTimeout(() => {
      setLoading(false);
      // Navega a Home si éxito
    }, 1000);
  };

  return (
    <View>
      <Text>Iniciar sesión</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Continuar" onPress={handleLogin} disabled={loading} />
      {loading && <ActivityIndicator />}
      {error ? <Text>{error}</Text> : null}
    </View>
  );
}
