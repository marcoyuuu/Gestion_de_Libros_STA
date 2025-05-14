

import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function BookFormScreen() {
  // Si params.id existe, es modo edición
  const params = useLocalSearchParams();
  const router = useRouter();
  const isEdit = !!params.id;
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [autores, setAutores] = useState<{ id: number; nombre: string }[]>([]);
  const [selectedAutorId, setSelectedAutorId] = useState<string>('');
  const [loadingAutores, setLoadingAutores] = useState(false);
  const [errorAutores, setErrorAutores] = useState<string | null>(null);
  const [loadingLibro, setLoadingLibro] = useState(false);
  // Si es edición, obtener datos del libro
  useEffect(() => {
    const fetchLibro = async () => {
      if (!isEdit || !params.id) return;
      setLoadingLibro(true);
      try {
        // Usar la IP/emulador adecuada según tu entorno
        const res = await axios.get(`http://10.0.2.2:7000/libros/${params.id}`);
        const libro = res.data;
        setTitle(libro.titulo || '');
        setGenre(libro.genero || '');
        setRating(libro.valoracion?.toString() || '');
        // Preferir autorId directo, si no existe usar autor.id
        if (libro.autorId !== undefined && libro.autorId !== null) {
          setSelectedAutorId(libro.autorId.toString());
        } else if (libro.autor && libro.autor.id !== undefined && libro.autor.id !== null) {
          setSelectedAutorId(libro.autor.id.toString());
        }
      } catch (err) {
        console.error('Error al cargar libro:', err);
        alert('Error al cargar los datos del libro.');
      } finally {
        setLoadingLibro(false);
      }
    };
    fetchLibro();
  }, [isEdit, params.id]);

  useEffect(() => {
    const fetchAutores = async () => {
      setLoadingAutores(true);
      setErrorAutores(null);
      try {
        // Try multiple endpoints for emulator/device compatibility
        const urls = [
          'http://10.0.2.2:7000/autores',
          'http://localhost:7000/autores',
        ];
        let autoresData = null;
        for (const url of urls) {
          try {
            const res = await axios.get(url);
            autoresData = res.data;
            break;
          } catch (err) {
            // Try next URL
          }
        }
        if (!autoresData) throw new Error('No se pudo obtener la lista de autores');
        setAutores(autoresData);
        if (autoresData.length > 0) {
          setSelectedAutorId(autoresData[0].id.toString());
        }
      } catch (err: any) {
        setErrorAutores('Error al cargar autores');
      } finally {
        setLoadingAutores(false);
      }
    };
    fetchAutores();
  }, []);

  const handleSubmit = async () => {
  const handleDelete = async () => {
    if (!isEdit || !params.id) return;
    Alert.alert(
      'Eliminar libro',
      '¿Seguro que deseas eliminar este libro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`http://10.0.2.2:7000/libros/${params.id}`);
              router.replace('/(tabs)');
            } catch (err) {
              console.error('Error al eliminar libro:', err);
              alert('Error al eliminar el libro.');
            }
          },
        },
      ]
    );
  };
    try {
      const payload = {
        titulo: title,
        genero: genre,
        valoracion: Number(rating),
        autorId: Number(selectedAutorId),
      };
      if (isEdit && params.id) {
        // PUT para actualizar libro existente
        console.log('Actualizando libro:', payload);
        const res = await axios.put(`http://10.0.2.2:7000/libros/${params.id}`, payload);
        console.log('Libro actualizado:', res.data);
      } else {
        // POST para crear nuevo libro
        console.log('Enviando libro:', payload);
        const res = await axios.post('http://10.0.2.2:7000/libros', payload);
        console.log('Libro creado:', res.data);
      }
      router.replace('/(tabs)');
    } catch (err) {
      console.error('Error al guardar libro:', err);
      alert('Error al guardar el libro.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEdit ? 'Editar Libro' : 'Agregar Libro'}</Text>
      {loadingLibro ? (
        <Text style={styles.loading}>Cargando datos del libro...</Text>
      ) : (
        <>
          <TextInput
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            placeholder="Género"
            value={genre}
            onChangeText={setGenre}
            style={styles.input}
          />
          <TextInput
            placeholder="Rating (1-5)"
            value={rating}
            onChangeText={setRating}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.label}>Autor</Text>
          {loadingAutores ? (
            <Text style={styles.loading}>Cargando autores...</Text>
          ) : errorAutores ? (
            <Text style={styles.error}>{errorAutores}</Text>
          ) : (
            <Picker
              selectedValue={selectedAutorId}
              onValueChange={itemValue => setSelectedAutorId(itemValue)}
              style={styles.picker}
            >
              {autores.map(autor => (
                <Picker.Item key={autor.id} label={autor.nombre} value={autor.id.toString()} />
              ))}
            </Picker>
          )}
          <Button title="Guardar" onPress={handleSubmit} />
          {isEdit && (
            <Button
              title="Eliminar"
              color="#d32f2f"
              onPress={handleDelete}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  picker: {
    marginBottom: 24,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
  },
  loading: {
    color: '#888',
    marginBottom: 16,
  },
  error: {
    color: '#d32f2f',
    marginBottom: 16,
  },
});
