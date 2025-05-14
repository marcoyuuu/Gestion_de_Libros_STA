import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import PersonSvg from '../assets/images/person_book.svg';
import { dimensions } from '../constants/Dimensions';
import theme from '../constants/Colors';
import { spacing } from '../constants/Spacing';

export default function WelcomeScreen() {
  const router = useRouter();
  const handleLogin = () => {
    router.push('/screens/login');
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Book Manager</Text>
        <Text style={styles.subtitle}>{`Tu gestor de\nlibros favoritos`}</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <View style={styles.illustrationContainer}>
          <PersonSvg width={dimensions.PersonSvgWidth} height={dimensions.PersonSvgHeight} />
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
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.large,
    paddingTop: spacing.xl,
    paddingBottom: spacing.largeHeight,
  },
  title: {
    fontSize: spacing.xxl,
    fontWeight: '600',
    color: theme.light.tint,
    fontStyle: 'italic',
    marginBottom: spacing.mediumHeight,
    marginTop: spacing.XXLHeight,
  },
  subtitle: {
    fontSize: spacing.large,
    color: theme.light.label,
    textAlign: 'center',
    marginBottom: spacing.XLHeight,
  },
  button: {
    backgroundColor: theme.light.tint,
    borderRadius: spacing.medium,
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.XXLHeight,
    minWidth: spacing.xxxl,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.light.background,
    fontSize: spacing.large,
    fontWeight: '500',
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start', // Align to left
    width: '100%',
    marginTop: spacing.XXXLHeight,
    marginLeft: spacing.negativeSmall,
  },
});
