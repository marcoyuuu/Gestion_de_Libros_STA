/**
/**
 * @fileoverview
 * Pantalla de login para la app de gestión de libros.
 * Permite al usuario autenticarse mediante email y gestiona la sesión global.
 */

import React, { useState } from 'react';
import { View, TextInput, Text, ActivityIndicator, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, ImageBackground } from 'react-native';
import { HeaderWithBack } from '../../components/HeaderWithBack';
import { login as loginApi } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';
import theme from '../../constants/Colors';
import { spacing } from '../../constants/Spacing';

/**
 * Componente funcional para la pantalla de login.
 * Realiza validación, muestra errores y gestiona la sesión.
 */

import { useRouter } from 'expo-router';

export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const isValidEmail = (val: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
  const isButtonEnabled = isValidEmail(email) && !loading;

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
      // Redirige inmediatamente tras login exitoso
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <HeaderWithBack title="Inicio de sesión" onBack={() => router.back()} />
        <View style={styles.container}>
          {error ? (
            <View style={styles.errorCard}>
              <Text style={styles.errorTitle}>¡Error al iniciar sesión!</Text>
              <Text style={styles.errorMessage}>{error}</Text>
            </View>
          ) : null}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Correo</Text>
            <TextInput
              placeholder=""
              value={email}
              onChangeText={setEmail}
              style={[styles.input, error && styles.inputError]}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity
            style={[styles.button, !isButtonEnabled && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={!isButtonEnabled}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color={theme.light.background} />
            ) : (
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.info}>Se creará una cuenta si no existe</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.light.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    backgroundColor: 'transparent',
  },
  formGroup: {
    width: '100%',
    marginBottom: spacing.xl,
    marginTop: spacing.XXLHeight,
  },
  label: {
    color: theme.light.tint,
    fontSize: 18,
    marginBottom: spacing.small,
    marginLeft: spacing.small,
    fontWeight: '400',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: theme.light.tint,
    borderRadius: spacing.mediumLargeHeight,
    padding: spacing.medium,
    fontSize: 18,
    backgroundColor: theme.light.background,
    color: theme.light.text,
    marginBottom: spacing.xl,
  },
  inputError: {
    borderColor: theme.light.error,
  },
  button: {
    width: '75%',
    alignSelf: 'center',
    backgroundColor: theme.light.tint,
    borderRadius: spacing.mediumLargeHeight,
    paddingVertical: spacing.medium,
    alignItems: 'center',
    marginTop: spacing.mediumLargeHeight,
    marginBottom: spacing.largeHeight,
  },
  buttonDisabled: {
    backgroundColor: theme.light.greenLight,
  },
  buttonText: {
    color: theme.light.background,
    fontSize: 20,
    fontWeight: '400',
  },
  errorCard: {
    width: '100%',
    backgroundColor: theme.light.error,
    borderRadius: spacing.mediumLargeHeight,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.light.text,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  errorTitle: {
    color: theme.light.background,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: spacing.small,
    textAlign: 'center',
  },
  errorMessage: {
    color: theme.light.background,
    fontSize: 16,
    textAlign: 'center',
  },
  info: {
    color: theme.light.label,
    fontSize: 15,
    textAlign: 'center',
    marginTop: spacing.XXLHeight,
    marginBottom: spacing.medium,
  },
});
