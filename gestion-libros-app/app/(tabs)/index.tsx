

import React from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View, FlatList, Button, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  // books: array de libros (simulado)
  const books = [
    { id: '1', title: 'Cien Años de Soledad', genre: 'Realismo Mágico', rating: 5, author: 'Gabriel García Márquez' },
    { id: '2', title: 'Don Quijote', genre: 'Novela', rating: 4, author: 'Miguel de Cervantes' },
  ];

  const handleBookPress = (book: typeof books[0]) => {
    // Navega a la pantalla de detalles pasando los datos del libro
    router.push({
      pathname: '/screens/BookDetailScreen',
      params: {
        title: book.title,
        author: book.author,
        genre: book.genre,
        rating: book.rating.toString(),
      },
    });
  };

  const renderBook = ({ item }: { item: typeof books[0] }) => (
    <TouchableOpacity onPress={() => handleBookPress(item)}>
      <View style={styles.bookItem}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookMeta}>{item.genre} · ⭐{item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Libros</Text>
      <FlatList
        data={books}
        keyExtractor={item => item.id}
        renderItem={renderBook}
        ListEmptyComponent={<Text>No hay libros registrados.</Text>}
        contentContainerStyle={books.length === 0 && { flex: 1, justifyContent: 'center' }}
      />
      <Button title="Agregar Libro" onPress={() => { /* Navega a BookFormScreen */ }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  bookItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  bookMeta: {
    fontSize: 14,
    color: '#666',
  },
});
