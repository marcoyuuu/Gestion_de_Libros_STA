import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../constants/Colors';
import { spacing } from '../constants/Spacing';

interface HeaderWithBackProps {
  title: string;
  onBack: () => void;
  testID?: string;
}

export const HeaderWithBack: React.FC<HeaderWithBackProps> = ({ title, onBack, testID }) => (
  <View style={styles.header}>
    <View style={styles.side}>
      <TouchableOpacity style={styles.backButton} onPress={onBack} hitSlop={16} testID={testID || 'back-btn'}>
        <Ionicons name="arrow-back" size={28} color={theme.light.background} />
      </TouchableOpacity>
    </View>
    <View style={styles.center} pointerEvents="none">
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
    <View style={styles.side} />
  </View>
);

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: theme.light.tint,
    paddingTop: spacing.mediumHeight,
    paddingBottom: spacing.smallHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  side: {
    width: 56, // enough for icon + margin
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    alignSelf: 'center',
    marginLeft: spacing.xl,
    justifyContent: 'center',
    height: 40,
    padding: 4,
  },
  headerTitle: {
    color: theme.light.background,
    fontSize: 24,
    fontWeight: '400',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
