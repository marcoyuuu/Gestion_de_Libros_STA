




import React, { useEffect, useState } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import axios from 'axios';
import { getApiBaseUrl } from '../../lib/api';
import { ButtonPrimary } from '../../components/ButtonPrimary';
import { HeaderNoBack } from '../../components/HeaderNoBack';
import theme from '../../constants/Colors';
import { spacing } from '../../constants/Spacing';
import Ionicons from '@expo/vector-icons/Ionicons';


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
    <TouchableOpacity onPress={() => handleBookPress(item)} activeOpacity={0.85} style={styles.cardTouchable}>
      <View style={styles.bookCard}>
        <Text style={styles.bookTitle}>{item.titulo}</Text>
        <Text style={styles.bookAuthor}>{item.autor?.nombre}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <HeaderNoBack title="Mis Libros" />
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator style={{ marginTop: spacing.xl }} color={theme.light.tint} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : books.length === 0 ? (
          <Text style={styles.emptyText}>
            No hay libros registrados aún. ¡Agrega el primero!
          </Text>
        ) : (
          <FlatList
            data={books}
            keyExtractor={item => item.id?.toString()}
            renderItem={renderBook}
            contentContainerStyle={{ paddingBottom: spacing.XXLHeight }}
            showsVerticalScrollIndicator={false}
          />
        )}
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={handleAddBook}
          activeOpacity={0.85}
        >
          <ButtonPrimary style={styles.addButton}>
            <View style={styles.addButtonContent}>
              <Ionicons name="add" size={24} color={theme.light.background} style={{ marginRight: spacing.small, marginTop: -6 }} />
              <Text style={styles.addButtonText}>Añadir libro</Text>
            </View>
          </ButtonPrimary>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  // header and headerTitle styles moved to HeaderNoBack
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.medium,
    alignItems: 'stretch',
  },
  cardTouchable: {
    marginBottom: spacing.large,
  },
  bookCard: {
    backgroundColor: theme.light.background,
    borderRadius: spacing.small,
    paddingVertical: spacing.mediumHeight,
    paddingHorizontal: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 0,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.light.text,
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: 15,
    color: theme.light.label,
    fontWeight: '400',
  },
  errorText: {
    color: theme.light.error,
    marginTop: spacing.xl,
    textAlign: 'center',
    fontSize: 16,
  },
  emptyText: {
    color: theme.light.grayMuted,
    marginTop: spacing.xl,
    textAlign: 'center',
    fontSize: 16,
  },
  addButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: spacing.largeHeight,
    alignItems: 'center',
    zIndex: 10,
    paddingBottom: 0,
  },
  addButton: {
    width: 240,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: spacing.mediumLargeHeight,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    justifyContent: 'center',
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    paddingTop: 0,
    paddingBottom: 0,
  },
  addButtonText: {
    color: theme.light.background,
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Roboto',
    marginTop: -6, // Sube el texto visualmente dentro del botón
  },
});
