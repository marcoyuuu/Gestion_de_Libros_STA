
import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable, TouchableWithoutFeedback } from 'react-native';
import theme from '../constants/Colors';
import { spacing } from '../constants/Spacing';

// Puedes reemplazar esto por tu propio ícono SVG si lo tienes
const AlertIcon = () => (
  <Text style={{ fontSize: 40, color: theme.light.error, marginBottom: spacing.medium }}>⚠️</Text>
);

export interface ConfirmarEliminarProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  mensaje?: string;
}

export const ConfirmarEliminar: React.FC<ConfirmarEliminarProps> = ({ visible, onCancel, onConfirm, mensaje }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.centeredView} pointerEvents="box-none">
        <View style={styles.modalView}>
          <AlertIcon />
          <Text style={styles.texto}>
            {mensaje || '¿Estás seguro de que deseas eliminar este libro?\nEsta acción no se puede deshacer.'}
          </Text>
          <View style={styles.buttonRow}>
            <Pressable style={[styles.button, styles.cancelar]} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.eliminar]} onPress={onConfirm}>
              <Text style={[styles.buttonText, { color: theme.light.error }]}>Eliminar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 320,
    backgroundColor: theme.light.background,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  texto: {
    color: theme.light.label,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: spacing.large,
    marginTop: spacing.small,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.medium,
    gap: spacing.medium,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: spacing.medium,
    marginHorizontal: spacing.small,
    alignItems: 'center',
  },
  cancelar: {
    backgroundColor: theme.light.tint,
  },
  eliminar: {
    backgroundColor: theme.light.error,
  },
  buttonText: {
    color: theme.light.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
