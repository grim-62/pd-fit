import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, TouchableOpacityProps, View } from 'react-native';
import { useTheme, ThemeColors } from '../hooks/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  icon,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const containerMap = {
    primary: styles.primaryContainer,
    secondary: styles.secondaryContainer,
    outline: styles.outlineContainer,
    text: styles.textContainer,
  };

  const textMap = {
    primary: styles.primaryText,
    secondary: styles.secondaryText,
    outline: styles.outlineText,
    text: styles.textBtnText,
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerMap[variant], style]}
      disabled={loading || props.disabled}
      activeOpacity={0.75}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.onPrimary : colors.primary} />
      ) : (
        <View style={styles.inner}>
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color={variant === 'primary' ? colors.onPrimary : colors.primary}
              style={{ marginRight: 8 }}
            />
          )}
          <Text style={[styles.text, textMap[variant]]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 100, // full roundness
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryContainer: {
    backgroundColor: colors.primary,
    // Soft glow
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  secondaryContainer: {
    backgroundColor: colors.secondaryContainer,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.outline,
  },
  textContainer: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  primaryText: {
    color: colors.onPrimary,
  },
  secondaryText: {
    color: colors.primary,
  },
  outlineText: {
    color: colors.primary,
  },
  textBtnText: {
    color: colors.primary,
  },
});
