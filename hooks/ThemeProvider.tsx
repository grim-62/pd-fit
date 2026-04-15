import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeColors = {
  // Brand
  primary: string;
  primaryDark: string;
  primaryContainer: string;
  primaryLight: string;
  secondary: string;
  secondaryContainer: string;
  tertiary: string;
  tertiaryContainer: string;

  // Surfaces (Tonal Layering)
  background: string;
  surface: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  surfaceDim: string;

  // Text
  text: string;
  textSecondary: string;
  onPrimary: string;
  onSecondary: string;
  onSurface: string;
  onSurfaceVariant: string;

  // Utility
  border: string;
  outline: string;
  outlineVariant: string;
  error: string;
  errorContainer: string;
  white: string;

  // Accent colors for charts / workout types
  accentBlue: string;
  accentRed: string;
  accentAmber: string;
  accentGreen: string;
};

// ── "The Vitality Atelier" Light Palette ──
export const lightColors: ThemeColors = {
  primary: '#2D6A4F',
  primaryDark: '#1B4332',
  primaryContainer: '#126c4a',
  primaryLight: '#40916C',
  secondary: '#3e6750',
  secondaryContainer: '#bdeacd',
  tertiary: '#274f3d',
  tertiaryContainer: '#3f6754',

  background: '#f8faf6',
  surface: '#f8faf6',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f2f4f0',
  surfaceContainer: '#eceeea',
  surfaceContainerHigh: '#e7e9e5',
  surfaceContainerHighest: '#e1e3df',
  surfaceDim: '#d8dbd7',

  text: '#191c1a',
  textSecondary: '#404943',
  onPrimary: '#ffffff',
  onSecondary: '#ffffff',
  onSurface: '#191c1a',
  onSurfaceVariant: '#404943',

  border: '#bfc9c1',
  outline: '#707973',
  outlineVariant: '#bfc9c1',
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  white: '#ffffff',

  accentBlue: '#3B82F6',
  accentRed: '#EF4444',
  accentAmber: '#F59E0B',
  accentGreen: '#4ADE80',
};

// ── "The Vitality Atelier" Dark Palette ──
export const darkColors: ThemeColors = {
  primary: '#86d7ad',
  primaryDark: '#a1f4c8',
  primaryContainer: '#005236',
  primaryLight: '#6abf95',
  secondary: '#a4d1b4',
  secondaryContainer: '#264f39',
  tertiary: '#a5d0b9',
  tertiaryContainer: '#274e3d',

  background: '#191c1a',
  surface: '#191c1a',
  surfaceContainerLowest: '#0e110f',
  surfaceContainerLow: '#1f2220',
  surfaceContainer: '#232624',
  surfaceContainerHigh: '#2e312f',
  surfaceContainerHighest: '#393c3a',
  surfaceDim: '#111413',

  text: '#e1e3df',
  textSecondary: '#bfc9c1',
  onPrimary: '#003822',
  onSecondary: '#11372a',
  onSurface: '#e1e3df',
  onSurfaceVariant: '#bfc9c1',

  border: '#3a4440',
  outline: '#5a635c',
  outlineVariant: '#404943',
  error: '#ffb4ab',
  errorContainer: '#93000a',
  white: '#ffffff',

  accentBlue: '#60A5FA',
  accentRed: '#F87171',
  accentAmber: '#FBBF24',
  accentGreen: '#6EE7B7',
};

type ThemeContextType = {
  isDarkMode: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  colors: lightColors,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
