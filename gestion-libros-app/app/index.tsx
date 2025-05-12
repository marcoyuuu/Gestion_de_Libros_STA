// Entry point: Show LoginScreen first, then navigate to (tabs) after login
import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import LoginScreen from './screens/LoginScreen';

export default function AppEntry() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  // When login is successful, navigate to the main tabs
  const handleLogin = (email: string) => {
    // Optionally store email (e.g., AsyncStorage)
    setLoggedIn(true);
    router.replace('/(tabs)'); // Replace so user can't go back to login
  };

  if (!loggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Fallback (should not render)
  return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>;
}
