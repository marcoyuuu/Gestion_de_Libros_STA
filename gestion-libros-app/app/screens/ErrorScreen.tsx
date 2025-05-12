import React from 'react';
import { View, Text, Button } from 'react-native';

type ErrorScreenProps = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorScreen({ message, onRetry }: ErrorScreenProps) {
  return (
    <View>
      <Text>{message || 'Ocurrió un error'}</Text>
      {onRetry && <Button title="Reintentar" onPress={onRetry} />}
    </View>
  );
}
