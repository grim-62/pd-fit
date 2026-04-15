import React from 'react';
import { AppNavigator } from './navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './hooks/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
