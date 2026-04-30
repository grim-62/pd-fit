import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, Link } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../../store/authSlice';
import { RootState } from '../../store/store';
import type { AppDispatch } from '../../store/store';

// Design tokens
const COLORS = {
  primary: '#004cca',
  primaryContainer: '#0062ff',
  onPrimaryContainer: '#f3f3ff',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f5f6fc',
  outline: '#737687',
  outlineVariant: '#c2c6d9',
  onSurface: '#131b2e',
  onSurfaceVariant: '#424656',
  white: '#ffffff',
  background: '#faf8ff',
  googleBlue: '#1877F2',
};

const BACKGROUND_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYF8HAhgkwMNrrGjmkRVmW55JBC_G7mX3x1ZD31aSqWvFnY5jEzdakkWO7bg_tCgqNHrhWIhQzbGIILW-PCiZbFmYcsNPnxHuX4NhI8ywmoE9F0tPVkwvfSKB5DqjavXH7WNB1204crI1dXngPTdMvFZV_Tx3XosbZ-IrtUKrv8qmDAjRAw9QJttn2K7uGxNA99Z-WzpyTWY2sKux1-LKP9S8FiR2bO6PqTnypN1uTjg7P103HDn--nIXUPavnWrkSkLbcWMNXbN19';
const GOOGLE_LOGO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD56Gbe6YrOdNYQyoAE930nHzT31x5IKLiBD8upD0AqXgyjX_gwldCKnDgAat75haIW5PuGT22b2cV-V7FfoHqlqvqWO3A_niYLOcbSN7WEZ4cvyA1hGlD2z9gEB1UNOXQystZ8zYPNlJuXrKG3v7eQzCQESJxUYsXMe7tEkRLHgfMU7L2XzlYiZRCyJEPiR3EpcSK-j-zDnWaVn6NOMnM3Hf7ZObI4ZceflgZxcmwGEDylbPf6TzEaU0XWI7ouOM6i3QJyRthbclQw';

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = async () => {
    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return;
    }

    if (!termsAccepted) {
      Alert.alert('Validation Error', 'Please accept the terms and conditions');
      return;
    }

    try {
      const result = await dispatch(registerUser({ 
        username: fullName, 
        email, 
        password 
      })).unwrap();
      // Registration successful, navigate to home
      router.replace('/(tabs)');
    } catch (err) {
      // Error is already in state, will be displayed
      console.error('Registration error:', err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image 
        source={{ uri: BACKGROUND_IMAGE }} 
        style={styles.blurBackground} 
        blurRadius={50} 
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <MaterialIcons name="fitness-center" size={32} color={COLORS.onPrimaryContainer} />
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your high-performance fitness journey with Pulse Fitness today.</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>FULL NAME</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="person" size={20} color={COLORS.outline} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor={COLORS.outlineVariant}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="mail" size={20} color={COLORS.outline} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="john@example.com"
                  placeholderTextColor={COLORS.outlineVariant}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>PASSWORD</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="lock" size={20} color={COLORS.outline} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={COLORS.outlineVariant}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <Pressable 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.visibilityBtn}
                >
                  <MaterialIcons 
                    name={showPassword ? "visibility" : "visibility-off"} 
                    size={20} 
                    color={COLORS.outline} 
                  />
                </Pressable>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>CONFIRM PASSWORD</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="lock-reset" size={20} color={COLORS.outline} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={COLORS.outlineVariant}
                  secureTextEntry={!showPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
            </View>

            {/* Terms Checkbox */}
            <View style={styles.termsContainer}>
              <Pressable 
                style={[styles.checkbox, termsAccepted && styles.checkboxActive]} 
                onPress={() => setTermsAccepted(!termsAccepted)}
              >
                {termsAccepted && <MaterialIcons name="check" size={14} color={COLORS.white} />}
              </Pressable>
              <Text style={styles.termsText}>
                I agree to the <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </View>

            {/* Error message */}
            {error && (
              <Text style={{ color: '#ef4444', marginBottom: 16, textAlign: 'center', fontSize: 14 }}>
                {error}
              </Text>
            )}

            {/* Submit Button */}
            <Pressable 
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.submitButtonPressed,
                isLoading && { opacity: 0.7 }
              ]} 
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text style={styles.submitButtonText}>{isLoading ? 'Creating Account...' : 'Create Account'}</Text>
            </Pressable>

            {/* Social Separator */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR REGISTER WITH</Text>
              <View style={styles.divider} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialGrid}>
              <Pressable style={styles.socialButton}>
                <Image source={{ uri: GOOGLE_LOGO }} style={styles.socialIconImage} />
                <Text style={styles.socialButtonText}>GOOGLE</Text>
              </Pressable>
              <Pressable style={styles.socialButton}>
                <MaterialIcons name="facebook" size={20} color={COLORS.googleBlue} style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>FACEBOOK</Text>
              </Pressable>
            </View>
          </View>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Pressable onPress={() => router.replace('/(auth)/login')}>
              <Text style={styles.loginLink}>Log In</Text>
            </Pressable>
          </View>

          {/* Footer */}
          <Text style={styles.footerText}>PRECISION HEALTH • DATA DRIVEN • PULSE FITNESS</Text>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  blurBackground: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 400,
    height: 400,
    opacity: 0.15,
    borderRadius: 200,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  logoContainer: {
    width: 64,
    height: 64,
    backgroundColor: COLORS.primaryContainer,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: COLORS.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(194, 198, 217, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
    marginBottom: 6,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputIcon: {
    paddingLeft: 16,
    paddingRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingRight: 16,
    fontSize: 16,
    color: COLORS.onSurface,
  },
  visibilityBtn: {
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    lineHeight: 20,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.outlineVariant,
  },
  dividerText: {
    fontSize: 12,
    color: COLORS.outline,
    paddingHorizontal: 16,
    fontWeight: '600',
  },
  socialGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceContainerLowest,
  },
  socialIconImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  socialIcon: {
    marginRight: 8,
  },
  socialButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  loginText: {
    fontSize: 16,
    color: COLORS.onSurfaceVariant,
  },
  loginLink: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 10,
    color: COLORS.outline,
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 20,
  }
});
