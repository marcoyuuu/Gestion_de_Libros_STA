

import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Linking } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import theme from '../../constants/Colors';
import colors from '../../constants/Colors';
import { spacing } from '../../constants/Spacing';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import { HeaderNoBack } from '../../components/HeaderNoBack';


export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const userNombre = user?.nombre || 'Nombre no disponible';
  const userEmail = user?.email || 'usuario@ejemplo.com';

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${userEmail}`);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <HeaderNoBack title="Mi Cuenta" />
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <MaterialIcons name="account-circle" size={90} color="#222" />
        </View>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{userNombre}</Text>
        <Text style={styles.label}>Correo:</Text>
        <Text style={[styles.value, styles.email]} onPress={handleEmailPress}>
          {userEmail}
        </Text>
        <ButtonPrimary style={[styles.logoutBtn, { backgroundColor: '#d32f2f' }] }>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minHeight: 40 }}
            onTouchEnd={handleLogout}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Cerrar sesión"
          >
            <MaterialIcons name="logout" size={22} color={theme.light.background} style={{ marginRight: spacing.small, marginTop: -6 }} />
            <Text style={{ color: theme.light.background, fontWeight: '400', fontSize: 20, fontFamily: 'Roboto', marginTop: -6 }}>Cerrar sesión</Text>
          </View>
        </ButtonPrimary>
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versión 1.0.0{"\n"}Book Manager</Text>
          <Image source={require('../../assets/images/icon.png')} style={styles.versionIcon} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#7a7a7a',
    marginTop: 12,
    textAlign: 'center',
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'center',
    color: '#222',
  },
  email: {
    color: '#0a0a0a',
    textDecorationLine: 'underline',
  },
  logoutBtn: {
    marginTop: 24,
    marginBottom: 32,
    alignSelf: 'center',
    width: 220,
  },
  versionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 10,
  },
  versionText: {
    fontSize: 15,
    color: '#222',
    textAlign: 'right',
  },
  versionIcon: {
    width: 100,
    height: 100,
    marginLeft: 8,
  },
});
