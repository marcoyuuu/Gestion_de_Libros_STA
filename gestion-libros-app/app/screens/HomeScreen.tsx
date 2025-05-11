import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';

export default function HomeScreen() {
  // books: array de libros
  // navigation: para navegar a detalles o agregar libro

  return (
    <View>
      <Text>Lista de Libros</Text>
      {/* FlatList para mostrar libros */}
      <Button title="Agregar Libro" onPress={() => { /* Navega a BookFormScreen */ }} />
    </View>
  );
}
