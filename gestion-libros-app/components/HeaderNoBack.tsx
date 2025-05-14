import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import theme from '../constants/Colors';
import { spacing } from '../constants/Spacing';

interface HeaderNoBackProps {
  title: string;
  testID?: string;
}

export const HeaderNoBack: React.FC<HeaderNoBackProps> = ({ title, testID }) => (
  <View style={styles.header} testID={testID}>
    <View style={styles.side} />
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
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: theme.light.background,
    fontSize: 24,
    fontWeight: '400',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
