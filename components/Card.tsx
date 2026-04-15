import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme, ThemeColors } from '../hooks/ThemeProvider';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'filled';
}

export const Card: React.FC<CardProps> = ({ children, style, variant = 'default', ...props }) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const variantStyle = variant === 'elevated'
    ? styles.elevated
    : variant === 'filled'
    ? styles.filled
    : styles.default;

  return (
    <View style={[styles.card, variantStyle, style]} {...props}>
      {children}
    </View>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  default: {
    backgroundColor: colors.surfaceContainerLowest,
    // Ambient shadow — felt, not seen
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.04,
    shadowRadius: 32,
    elevation: 2,
  },
  elevated: {
    backgroundColor: colors.surfaceContainerLowest,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  filled: {
    backgroundColor: colors.surfaceContainerLow,
  },
});
