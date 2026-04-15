import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { useTheme, ThemeColors } from '../hooks/ThemeProvider';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, error, style, ...props }) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={colors.outline}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    marginBottom: 8,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: colors.surfaceContainerHighest,
    borderWidth: 0, // No border — "No-Line" rule
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    color: colors.text,
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: colors.primary,
    paddingHorizontal: 14, // compensate for border
    paddingVertical: 13,
  },
  inputError: {
    borderWidth: 2,
    borderColor: colors.error,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
  },
});
