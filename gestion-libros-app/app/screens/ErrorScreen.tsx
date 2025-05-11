import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ErrorScreen({ message, onRetry }) {
  return (
    <View>
      <Text>{message || 'Ocurrió un error'}</Text>
      {onRetry && <Button title="Reintentar" onPress={onRetry} />}
    </View>
  );
}
