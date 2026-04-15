import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, ThemeColors } from '../hooks/ThemeProvider';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 24,
    paddingRight: 32, // Asymmetrical margin — editorial feel
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 15,
    color: colors.onSurfaceVariant,
    marginTop: 6,
    letterSpacing: 0.1,
    lineHeight: 22,
  },
});
