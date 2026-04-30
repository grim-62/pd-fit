import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../store/authSlice';
import { RootState } from '../../store/store';
import type { AppDispatch } from '../../store/store';

// Design tokens based on the Stitch UI
const COLORS = {
  primary: '#004cca',
  primaryContainer: '#0062ff',
  onPrimaryFixedVariant: '#003ea8',
  surfaceContainerLow: '#f5f6fc',
  outline: '#737687',
  onSurface: '#131b2e',
  onSurfaceVariant: '#424656',
  white: '#ffffff',
  transparentWhite: 'rgba(255, 255, 255, 0.95)',
};

const BACKGROUND_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKC-IdT6WRJWKs5RUkt5NBwqC9hQYaRfF-CdCyaOVwa6TdSijv-uK0vYlYVpJUeUL5H-JCITIUd51gOyXOZjF0GrAbHjd9QXgx1GGVRKbR1Kojn8R8ZzlYjsNZ4ZzlbZnApLtnEp64KmGNhtOC0aZxDBZNfnAe40tNYSr7QW9zPQHU88xhTzKOMX8zY9GdLu9pX-JaSEaJ-pcwHGKzFVKYvTYuhOoWs_Jb6yhO9EKsIFgtFKiRdSrft7ymkimDaoExM0Q6rzaODCJs';

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password');
      return;
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return;
    }

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      // Login successful, navigate to home
      router.replace('/(tabs)');
    } catch (err) {
      // Error is already in state, will be displayed
      console.error('Login error:', err);
    }
  };

  return (
    <ImageBackground 
      source={{ uri: BACKGROUND_IMAGE }} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <MaterialIcons name="bolt" size={36} color={COLORS.white} />
            </View>
            <Text style={styles.title}>Pulse Fitness</Text>
            <Text style={styles.subtitle}>Your peak performance journey starts right here.</Text>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="mail" size={20} color={COLORS.outline} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  placeholderTextColor={COLORS.outline}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <View style={styles.passwordLabelRow}>
                <Text style={styles.label}>PASSWORD</Text>
                <Pressable>
                  <Text style={styles.forgotText}>FORGOT?</Text>
                </Pressable>
              </View>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="lock" size={20} color={COLORS.outline} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={COLORS.outline}
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

            {/* Error message */}
            {error && (
              <Text style={{ color: '#ef4444', marginBottom: 16, textAlign: 'center' }}>
                {error}
              </Text>
            )}

            {/* Submit Button */}
            <Pressable style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.submitButtonPressed,
              isLoading && { opacity: 0.7 }
            ]} onPress={handleLogin} disabled={isLoading}>
              <Text style={styles.submitButtonText}>{isLoading ? 'Signing In...' : 'Sign In'}</Text>
              {!isLoading && <MaterialIcons name="arrow-forward" size={20} color={COLORS.white} />}
            </Pressable>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
              <View style={styles.divider} />
            </View>

            {/* Social Logins */}
            <View style={styles.socialContainer}>
              <Pressable style={styles.socialButton}>
                <MaterialIcons name="account-circle" size={24} color={COLORS.onSurface} />
              </Pressable>
            </View>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>{"Don't have an account? "}</Text>
              <Pressable onPress={() => router.push('/(auth)/register')}>
                <Text style={styles.registerLink}>Register</Text>
              </Pressable>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>PRECISION TRACKING • PROFESSIONAL RESULTS</Text>
            <View style={styles.footerLinks}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
              <Text style={styles.footerDot}>•</Text>
              <Text style={styles.footerLink}>Terms of Service</Text>
            </View>
          </View>

        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(19, 27, 46, 0.7)',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 64,
    height: 64,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    maxWidth: 280,
  },
  formContainer: {
    backgroundColor: COLORS.transparentWhite,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  forgotText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(115, 118, 135, 0.2)',
  },
  inputIcon: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 16,
    fontSize: 16,
    color: COLORS.onSurface,
  },
  visibilityBtn: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 8,
    gap: 8,
  },
  submitButtonPressed: {
    backgroundColor: COLORS.onPrimaryFixedVariant,
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
    backgroundColor: 'rgba(115, 118, 135, 0.1)',
  },
  dividerText: {
    fontSize: 12,
    color: COLORS.outline,
    paddingHorizontal: 16,
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#f5f6fc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(115, 118, 135, 0.1)',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },
  registerLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  footerContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 1,
    marginBottom: 8,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  footerLink: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.3)',
  },
  footerDot: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.3)',
  }
});
