import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  SafeAreaView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchCurrentUser, logoutUser } from '@/store/authSlice';

const COLORS = {
  primary: '#004cca',
  primaryContainer: '#0062ff',
  onPrimaryContainer: '#f3f3ff',
  secondary: '#006e2f',
  secondaryContainer: '#6bff8f',
  onSecondaryContainer: '#002109',
  tertiary: '#7b4d00',
  tertiaryContainer: '#ffddb8',
  onTertiaryContainer: '#2a1700',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
  background: '#faf8ff',
  surfaceLowest: '#ffffff',
  surfaceContainer: '#eaedff',
  onSurface: '#131b2e',
  onSurfaceVariant: '#424656',
  white: '#ffffff',
  outline: '#e2e8f0',
  outlineVariant: '#c2c6d9',
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate300: '#cbd5e1',
  slate400: '#94a3b8',
  slate600: '#475569',
  surfaceDark: '#0f172a',
  surfaceLowestDark: '#1e293b',
  errorContainerDark: '#93000a',
  onErrorContainerDark: '#ffdad6',
};

const PROFILE_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8qvFaBVV4hi7TzvTR2vgT2rGUFMRBVtt_moD9DqhawWYP1L05XB90BltkqXLLgVi-cEmMm8nOgJuhf74ScgJj9q0Gr3k4aF5SsgrsxojZymYN3smbj5w9qb3fMM8xbE_TtZMcvQDysAw8jZm4Pwh_PlqZ7anKtkCl3XRfN_FQLAm6UAfEwUSb4sl5o1ajqpOqr6Fd2jj2LUWzNSAd_gztzc-ahbAjbprMy2xYCcNix_dRbd1txvnOj_86u5H3d_PI7Do_Vd_TvMHC';
const APP_BAR_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjpFkE7FV4TNY0xMInWFL2TtiRpLD-6GlY9ufUhd2q07YBEIsILB3jx6iryIICE1WD9rWSs1JDfRR3exvdGvQruRpkkATKNnc4_FVd7qKWQjDqgquviTSOFINKaOm-4TgJLtvV-CaZUDhe3SNLluVYFaHewQrRugzkIzMFUAFAqy-jyVEjqI_81_jr0UN8d_R3E826OKmCJfivF6AxP_hQz8hUC_0BawVc8KYFL49LgR5dHDNoFLjb93-xYXCnhhFtnB0Y3Vo_SQ93';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: APP_BAR_IMAGE }} style={styles.appBarImage} />
          <Text style={[styles.headerTitle, isDark && styles.textDark]}>Pulse Fitness</Text>
        </View>
        <Pressable style={styles.notificationBtn}>
          <MaterialIcons name="notifications" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />
        </Pressable>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Info */}
        <View style={styles.sectionGap}>
          <View style={[styles.profileCard, isDark && styles.cardDark]}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarBorder}>
                <Image source={{ uri: user?.avatar || PROFILE_IMAGE }} style={styles.profileAvatar} />
              </View>
              <Pressable style={styles.editBtn}>
                <MaterialIcons name="edit" size={14} color={COLORS.white} />
              </Pressable>
            </View>
            <Text style={[styles.userName, isDark && styles.textDark]}>{user?.name || 'User Profile'}</Text>
            <Text style={styles.userSubtitle}>{user?.email || 'Loading...'}</Text>

            <View style={styles.statsRow}>
              <View style={styles.statCol}>
                <Text style={styles.statValue}>124</Text>
                <Text style={styles.statLabel}>Workouts</Text>
              </View>
              <View style={[styles.statCol, styles.statBorder, isDark && styles.statBorderDark]}>
                <Text style={styles.statValue}>8.4k</Text>
                <Text style={styles.statLabel}>Calories</Text>
              </View>
              <View style={styles.statCol}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Badges</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Settings Bento */}
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Settings</Text>
          
          <View style={styles.settingsList}>
            {/* Notifications */}
            <Pressable style={({ pressed }) => [
              styles.settingCard, 
              isDark && styles.cardDark,
              pressed && (isDark ? { backgroundColor: COLORS.surfaceLowestDark } : { backgroundColor: COLORS.slate50 })
            ]}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(0, 76, 202, 0.1)' }]}>
                  <MaterialIcons name="notifications-active" size={20} color={COLORS.primary} />
                </View>
                <View>
                  <Text style={[styles.settingName, isDark && styles.textDark]}>Notifications</Text>
                  <Text style={styles.settingSub}>Push, Email & SMS</Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={COLORS.slate300} />
            </Pressable>

            {/* Account Privacy */}
            <Pressable style={({ pressed }) => [
              styles.settingCard, 
              isDark && styles.cardDark,
              pressed && (isDark ? { backgroundColor: COLORS.surfaceLowestDark } : { backgroundColor: COLORS.slate50 })
            ]}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(123, 77, 0, 0.1)' }]}>
                  <MaterialIcons name="lock" size={20} color={COLORS.tertiary} />
                </View>
                <View>
                  <Text style={[styles.settingName, isDark && styles.textDark]}>Account Privacy</Text>
                  <Text style={styles.settingSub}>Public, Friends or Private</Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={COLORS.slate300} />
            </Pressable>

            {/* Units Toggle */}
            <View style={[styles.settingCardConfig, isDark && styles.cardDark]}>
              <View style={styles.settingCardConfigHeader}>
                <View style={styles.settingLeft}>
                  <View style={[styles.iconBox, { backgroundColor: 'rgba(107, 255, 143, 0.2)' }]}>
                    <MaterialIcons name="straighten" size={20} color={COLORS.onSecondaryContainer} />
                  </View>
                  <View>
                    <Text style={[styles.settingName, isDark && styles.textDark]}>Units</Text>
                    <Text style={styles.settingSub}>Measurement system</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.toggleContainer, isDark && { backgroundColor: COLORS.surfaceDark }]}>
                <Pressable 
                  style={[styles.toggleBtn, unitSystem === 'metric' ? (isDark ? styles.toggleActiveDark : styles.toggleActive) : null]}
                  onPress={() => setUnitSystem('metric')}
                >
                  <Text style={[
                    styles.toggleText, 
                    unitSystem === 'metric' ? styles.toggleTextActive : styles.toggleTextInactive,
                    isDark && unitSystem === 'metric' && { color: COLORS.white }
                  ]}>
                    Metric (kg/cm)
                  </Text>
                </Pressable>
                <Pressable 
                  style={[styles.toggleBtn, unitSystem === 'imperial' ? (isDark ? styles.toggleActiveDark : styles.toggleActive) : null]}
                  onPress={() => setUnitSystem('imperial')}
                >
                  <Text style={[
                    styles.toggleText, 
                    unitSystem === 'imperial' ? styles.toggleTextActive : styles.toggleTextInactive,
                    isDark && unitSystem === 'imperial' && { color: COLORS.white }
                  ]}>
                    Imperial (lb/in)
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Help & Support */}
            <Pressable style={({ pressed }) => [
              styles.settingCard, 
              isDark && styles.cardDark,
              pressed && (isDark ? { backgroundColor: COLORS.surfaceLowestDark } : { backgroundColor: COLORS.slate50 })
            ]}>
              <View style={styles.settingLeft}>
                <View style={[styles.iconBox, { backgroundColor: isDark ? COLORS.slate600 : COLORS.slate100 }]}>
                  <MaterialIcons name="help" size={20} color={isDark ? COLORS.slate300 : COLORS.slate600} />
                </View>
                <View>
                  <Text style={[styles.settingName, isDark && styles.textDark]}>Help & Support</Text>
                  <Text style={styles.settingSub}>FAQs and Live Chat</Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={COLORS.slate300} />
            </Pressable>
          </View>
        </View>

        {/* Logout */}
        <View style={styles.logoutSection}>
          <Pressable 
            style={({ pressed }) => [
              styles.logoutBtn,
              isDark && { backgroundColor: COLORS.errorContainerDark },
              pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }
            ]}
            onPress={handleLogout}
          >
            <MaterialIcons name="logout" size={20} color={isDark ? COLORS.onErrorContainerDark : COLORS.onErrorContainer} />
            <Text style={[styles.logoutText, isDark && { color: COLORS.onErrorContainerDark }]}>Logout</Text>
          </Pressable>
          <Text style={styles.versionText}>App Version 4.12.0 (Build 942)</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outline,
    zIndex: 50,
  },
  headerDark: {
    backgroundColor: '#0f172a',
    borderBottomColor: '#1e293b',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  appBarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceContainer,
    borderWidth: 2,
    borderColor: COLORS.primaryContainer,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2563eb',
    letterSpacing: -0.5,
  },
  textDark: {
    color: COLORS.white,
  },
  notificationBtn: {
    padding: 4,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionGap: {
    marginBottom: 40,
    marginTop: 8,
  },
  profileCard: {
    backgroundColor: COLORS.surfaceLowest,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.slate100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: COLORS.surfaceLowestDark,
    borderColor: COLORS.slate700,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarBorder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: COLORS.primaryContainer,
    overflow: 'hidden',
  },
  profileAvatar: {
    width: '100%',
    height: '100%',
  },
  editBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    padding: 6,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  userSubtitle: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.slate50,
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.slate50,
  },
  statBorderDark: {
    borderColor: COLORS.slate700,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 10,
    color: '#737687',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  settingsSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.onSurface,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  settingsList: {
    gap: 16,
  },
  settingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLowest,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.slate100,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.onSurface,
  },
  settingSub: {
    fontSize: 12,
    color: '#737687',
    marginTop: 2,
  },
  settingCardConfig: {
    backgroundColor: COLORS.surfaceLowest,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.slate100,
  },
  settingCardConfigHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceContainer,
    padding: 4,
    borderRadius: 8,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleActive: {
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  toggleActiveDark: {
    backgroundColor: COLORS.slate600,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '500',
  },
  toggleTextActive: {
    color: COLORS.primary,
  },
  toggleTextInactive: {
    color: '#737687',
  },
  logoutSection: {
    marginTop: 16,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.errorContainer,
    paddingVertical: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.onErrorContainer,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 10,
    color: '#737687',
    marginTop: 24,
  }
});
