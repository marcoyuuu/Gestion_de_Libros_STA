
import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';


export default function BookDetailScreen() {
  // Recibe los datos del libro por params
  const params = useLocalSearchParams();
  const router = useRouter();
  const { id, title, author, genre, rating } = params;

  const handleDelete = () => {
    Alert.alert('¿Eliminar libro?', 'Esta acción no se puede deshacer.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => {/* Eliminar libro */} },
    ]);
  };

  const handleEdit = () => {
    // Navega a BookFormScreen en modo edición, pasando el ID del libro
    router.push({
      pathname: '/screens/BookFormScreen',
      params: { id },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Libro</Text>
      <Text style={styles.label}>Título:</Text>
      <Text style={styles.value}>{title}</Text>
      <Text style={styles.label}>Autor:</Text>
      <Text style={styles.value}>{author}</Text>
      <Text style={styles.label}>Género:</Text>
      <Text style={styles.value}>{genre}</Text>
      <Text style={styles.label}>Rating:</Text>
      <Text style={styles.value}>{rating}</Text>
      <Button title="Editar" onPress={handleEdit} />
      <Button title="Eliminar" color="red" onPress={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#888',
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 2,
  },
});
