



import React, { useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useRouter } from 'expo-router';
import { StyleSheet, View, FlatList, Button, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { getApiBaseUrl } from '../../lib/api';

export default function HomeScreen() {
  const router = useRouter();
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${getApiBaseUrl()}/libros`);
      setBooks(res.data);
      console.log('Libros obtenidos:', res.data);
    } catch (err: any) {
      if (err.response && Array.isArray(err.response.data) && err.response.data.length === 0) {
        setBooks([]);
        setError(null);
      } else {
        setError('No se pudo cargar la lista de libros. Intenta más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchBooks();
    }, [])
  );

  const handleBookPress = (book: any) => {
    router.push({
      pathname: '/screens/BookDetailScreen',
      params: { id: book.id, title: book.titulo, author: book.autor?.nombre, genre: book.genero, rating: book.valoracion },
    });
  };

  const handleAddBook = () => {
    router.push('/screens/BookFormScreen');
  };

  const renderBook = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleBookPress(item)}>
      <View style={styles.bookItem}>
        <Text style={styles.bookTitle}>{item.titulo}</Text>
        <Text style={styles.bookMeta}>{item.genero} · ⭐{item.valoracion} · {item.autor?.nombre}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Libros</Text>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : error ? (
        <Text style={{ color: 'red', marginTop: 32, textAlign: 'center' }}>{error}</Text>
      ) : books.length === 0 ? (
        <Text style={{ color: '#888', marginTop: 32, textAlign: 'center', fontSize: 16 }}>
          No hay libros registrados aún. ¡Agrega el primero!
        </Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={item => item.id?.toString()}
          renderItem={renderBook}
        />
      )}
      <Button title="Agregar Libro" onPress={handleAddBook} />
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
