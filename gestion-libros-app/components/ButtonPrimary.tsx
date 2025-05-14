
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../constants/Colors';
import { spacing } from '../constants/Spacing';


export interface ButtonPrimaryProps {
  children?: React.ReactNode;
  testID?: string;
  style?: any;
}


export const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ children = 'Iniciar sesión', testID, style }) => {
  return (
    <View style={[styles.root, style]} testID={testID}>
      <Text style={styles.iniciarSesion}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 207,
    height: 50,
    borderRadius: spacing.medium,
    backgroundColor: theme.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iniciarSesion: {
    color: theme.light.background,
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '400',
  },
});
