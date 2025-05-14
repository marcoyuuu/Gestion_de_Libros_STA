/**
 * @fileoverview
 * Contexto de autenticación para la gestión de sesión de usuario.
 * Provee acceso global al usuario autenticado y funciones de login/logout.
 */
import React, { createContext, useContext, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Tipo para el usuario autenticado.
 */
export type AuthUser = {
  autorId: number;
  nombre: string;
  email: string;
};

/**
 * Tipo para el contexto de autenticación.
 */
export type AuthContextType = {
  user: AuthUser | null;
  login: (user: AuthUser) => Promise<void>;
  logout: () => Promise<void>;
};

/**
 * Contexto de autenticación (React Context API).
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook para acceder al contexto de autenticación.
 * @returns El contexto de autenticación
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}

/**
 * Proveedor de autenticación que envuelve la app.
 * @param children Componentes hijos
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Carga usuario desde almacenamiento persistente al iniciar
  React.useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
      setLoading(false);
    })();
  }, []);

  /**
   * Guarda el usuario en el estado y almacenamiento persistente.
   * @param user Usuario autenticado
   */
  const login = async (user: AuthUser) => {
    setUser(user);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  /**
   * Elimina la sesión del usuario.
   */
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  if (loading) {
    // Puedes personalizar este loader según tu app
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
