

import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function BookFormScreen() {
  // Si params.id existe, es modo edición
  const params = useLocalSearchParams();
  const router = useRouter();
  const isEdit = !!params.id;
  const [title, setTitle] = useState(params.title?.toString() || '');
  const [genre, setGenre] = useState(params.genre?.toString() || '');
  const [rating, setRating] = useState(params.rating?.toString() || '');

  const handleSubmit = () => {
    // POST o PUT según modo
    if (isEdit) {
      // Actualizar libro existente (PUT)
    } else {
      // Crear nuevo libro (POST)
    }
    // Después de guardar, volver a HomeScreen
    router.replace('/(tabs)');
  };

  return (
    <View>
      <Text>{isEdit ? 'Editar Libro' : 'Agregar Libro'}</Text>
      <TextInput placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Género" value={genre} onChangeText={setGenre} />
      <TextInput placeholder="Rating (1-5)" value={rating} onChangeText={setRating} keyboardType="numeric" />
      <Button title="Guardar" onPress={handleSubmit} />
    </View>
  );
}
