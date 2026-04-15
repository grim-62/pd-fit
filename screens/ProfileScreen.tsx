import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Ionicons } from '@expo/vector-icons';
import { currentUser } from '../utils/dummyData';
import { CustomButton } from '../components/CustomButton';
import { useTheme, ThemeColors } from '../hooks/ThemeProvider';

export const ProfileScreen = () => {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Header title="Profile" />

        {/* Avatar & Info */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{currentUser.name.charAt(0)}</Text>
          </View>
          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.email}>{currentUser.email}</Text>
          <Text style={styles.joined}>Member since {currentUser.joinDate}</Text>
        </View>

        {/* Body Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Body Metrics</Text>
          <View style={styles.metricsContainer}>
            <Card variant="filled" style={styles.metricCard}>
              <Ionicons name="scale-outline" size={20} color={colors.primary} />
              <Text style={styles.metricValue}>{currentUser.weight}</Text>
              <Text style={styles.metricLabel}>kg</Text>
            </Card>
            <Card variant="filled" style={styles.metricCard}>
              <Ionicons name="resize-outline" size={20} color={colors.accentBlue} />
              <Text style={styles.metricValue}>{currentUser.height}</Text>
              <Text style={styles.metricLabel}>cm</Text>
            </Card>
            <Card variant="filled" style={styles.metricCard}>
              <Ionicons name="flag-outline" size={20} color={colors.accentAmber} />
              <Text style={styles.metricValue}>{currentUser.goalWeight}</Text>
              <Text style={styles.metricLabel}>goal kg</Text>
            </Card>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <Card style={styles.settingsCard}>
            {/* Dark Mode */}
            <View style={styles.settingRow}>
              <View style={[styles.settingIcon, { backgroundColor: colors.primaryDark + '15' }]}>
                <Ionicons name="moon-outline" size={20} color={colors.primaryDark} />
              </View>
              <Text style={styles.settingText}>Dark Mode</Text>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{
                  false: colors.surfaceContainerHigh,
                  true: colors.primaryDark,
                }}
                thumbColor={colors.surfaceContainerLowest}
              />
            </View>

            <View style={styles.settingSpacer} />

            {/* Edit Profile */}
            <TouchableOpacity style={styles.settingRow} activeOpacity={0.6}>
              <View style={[styles.settingIcon, { backgroundColor: colors.accentBlue + '15' }]}>
                <Ionicons name="person-outline" size={20} color={colors.accentBlue} />
              </View>
              <Text style={styles.settingText}>Edit Profile</Text>
              <View style={styles.chevronCircle}>
                <Ionicons name="chevron-forward" size={16} color={colors.outline} />
              </View>
            </TouchableOpacity>

            <View style={styles.settingSpacer} />

            {/* Notifications */}
            <TouchableOpacity style={styles.settingRow} activeOpacity={0.6}>
              <View style={[styles.settingIcon, { backgroundColor: colors.accentAmber + '15' }]}>
                <Ionicons name="notifications-outline" size={20} color={colors.accentAmber} />
              </View>
              <Text style={styles.settingText}>Notifications</Text>
              <View style={styles.chevronCircle}>
                <Ionicons name="chevron-forward" size={16} color={colors.outline} />
              </View>
            </TouchableOpacity>

            <View style={styles.settingSpacer} />

            {/* Daily Goal */}
            <TouchableOpacity style={styles.settingRow} activeOpacity={0.6}>
              <View style={[styles.settingIcon, { backgroundColor: colors.accentGreen + '15' }]}>
                <Ionicons name="trophy-outline" size={20} color={colors.accentGreen} />
              </View>
              <Text style={styles.settingText}>Daily Calorie Goal</Text>
              <Text style={styles.settingValue}>{currentUser.dailyCalorieGoal}</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Logout */}
        <View style={styles.logoutContainer}>
          <CustomButton title="Log Out" variant="outline" icon="log-out-outline" onPress={() => {}} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  // Profile Header
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    // Soft glow
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.onPrimary,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.3,
  },
  email: {
    fontSize: 15,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  joined: {
    fontSize: 12,
    color: colors.outline,
    marginTop: 4,
  },
  // Sections
  section: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  // Metrics
  metricsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 18,
    marginBottom: 0,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  // Settings
  settingsCard: {
    padding: 8,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 14,
  },
  settingValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  settingSpacer: {
    height: 4,
  },
  chevronCircle: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Logout
  logoutContainer: {
    paddingHorizontal: 24,
    marginTop: 40,
  },
});
