import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function BookFormScreen({ route }) {
  // Si route.params.book existe, es modo edición
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = () => {
    // POST o PUT según modo
  };

  return (
    <View>
      <Text>{route?.params?.book ? 'Editar Libro' : 'Agregar Libro'}</Text>
      <TextInput placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Género" value={genre} onChangeText={setGenre} />
      <TextInput placeholder="Rating (1-5)" value={rating} onChangeText={setRating} keyboardType="numeric" />
      <Button title="Guardar" onPress={handleSubmit} />
    </View>
  );
}
