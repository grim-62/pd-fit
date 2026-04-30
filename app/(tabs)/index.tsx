import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  Platform,
  SafeAreaView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';

const COLORS = {
  primary: '#004cca',
  primaryFixed: '#dbe1ff',
  primaryContainer: '#0062ff',
  onPrimaryContainer: '#f3f3ff',
  secondary: '#006e2f',
  background: '#faf8ff',
  surfaceLowest: '#ffffff',
  surfaceContainer: '#eaedff',
  onSurface: '#131b2e',
  onSurfaceVariant: '#424656',
  white: '#ffffff',
  orange50: '#fff7ed',
  orange600: '#ea580c',
  emerald50: '#ecfdf5',
  emerald600: '#059669',
  blue50: '#eff6ff',
  blue600: '#2563eb',
  green50: '#f0fdf4',
  green600: '#16a34a',
  outline: '#e2e8f0',
};

const PROFILE_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdzni759K9Xcg1DKyX_SuVGATBYszm2K97QuQYbJ3-agYfvy_yeMRMmC8L5-QI4BCxi8hwxLAjLW_QXusd34RTp--0zCChwSl-cHkMdW527KHetmY8_TN1lI68ZpK020Z1l5ZwWcDZjem5rA0SaWX_gMNXFSv6VDPTvo0IyLxhyQOrX2ITGAF1uVwWLc3s_i3ug6WRKBFS9BUiveupIWYwQFJN21H57Bh_7_Cqz8DhyLs3bEYuLTmo7p3p7ikNDGe0S68l4pxmYB3P';

export default function DashboardScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header (Fixed) */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: PROFILE_IMAGE }} style={styles.profileImage} />
          <Text style={[styles.headerTitle, isDark && styles.textDark]}>PD-Fitness</Text>
        </View>
        <Pressable style={styles.notificationBtn}>
          <MaterialIcons name="notifications" size={24} color={isDark ? '#94a3b8' : '#64748b'} />
        </Pressable>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Daily Pulse Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Daily Pulse</Text>
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeText}>NOV 14</Text>
            </View>
          </View>

          <View style={styles.grid}>
            {/* Energy Card */}
            <View style={[styles.card, isDark && styles.cardDark]}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="local-fire-department" size={20} color={COLORS.primary} />
                <Text style={styles.cardLabel}>ENERGY</Text>
              </View>
              <View style={styles.cardValueRow}>
                <Text style={[styles.cardValue, isDark && styles.textDark]}>1,840</Text>
                <Text style={styles.cardUnit}>kcal</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '75%' }]} />
              </View>
            </View>

            {/* Weight Card */}
            <View style={[styles.card, isDark && styles.cardDark]}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="monitor-weight" size={20} color={COLORS.secondary} />
                <Text style={[styles.cardLabel, { color: COLORS.secondary }]}>WEIGHT</Text>
              </View>
              <View style={styles.cardValueRow}>
                <Text style={[styles.cardValue, isDark && styles.textDark]}>74.2</Text>
                <Text style={styles.cardUnit}>kg</Text>
              </View>
              <View style={styles.cardTrendRow}>
                <MaterialIcons name="trending-down" size={14} color={COLORS.secondary} />
                <Text style={styles.cardTrendText}>-0.5kg this week</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Today's Session Section */}
        <View style={styles.sessionCard}>
          <View style={styles.sessionBgPattern}>
            <MaterialIcons name="fitness-center" size={160} color="rgba(255,255,255,0.1)" />
          </View>
          <View style={styles.sessionContent}>
            <View style={styles.sessionHeaderRow}>
              <View>
                <View style={styles.sessionBadge}>
                  <Text style={styles.sessionBadgeText}>TODAY'S SESSION</Text>
                </View>
                <Text style={styles.sessionTitle}>Hypertrophy Upper B</Text>
              </View>
              <View style={styles.sessionIconBox}>
                <MaterialIcons name="fitness-center" size={24} color={COLORS.white} />
              </View>
            </View>

            <View style={styles.sessionDetailsRow}>
              <View style={styles.sessionDetailItem}>
                <MaterialIcons name="schedule" size={16} color={COLORS.onPrimaryContainer} />
                <Text style={styles.sessionDetailText}>45 min</Text>
              </View>
              <View style={styles.sessionDetailItem}>
                <MaterialIcons name="bolt" size={16} color={COLORS.onPrimaryContainer} />
                <Text style={styles.sessionDetailText}>Medium Intensity</Text>
              </View>
            </View>

            <Pressable 
              style={({ pressed }) => [
                styles.startWorkoutBtn,
                pressed && styles.startWorkoutBtnPressed
              ]}
              onPress={() => router.push('/(tabs)/add-workout')}
            >
              <Text style={styles.startWorkoutText}>Start Workout</Text>
            </Pressable>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark, { marginBottom: 16 }]}>Quick Actions</Text>
          <View style={styles.grid}>
            <Pressable 
              style={[styles.actionCard, isDark && styles.cardDark]}
              onPress={() => router.push('/(tabs)/add-modal')}
            >
              <View style={[styles.actionIconBox, { backgroundColor: COLORS.orange50 }]}>
                <MaterialIcons name="restaurant" size={24} color={COLORS.orange600} />
              </View>
              <View>
                <Text style={[styles.actionTitle, isDark && styles.textDark]}>Add Meal</Text>
                <Text style={styles.actionSubtitle}>Log breakfast</Text>
              </View>
            </Pressable>

            <Pressable 
              style={[styles.actionCard, isDark && styles.cardDark]}
              onPress={() => router.push('/(tabs)/log-weight')}
            >
              <View style={[styles.actionIconBox, { backgroundColor: COLORS.emerald50 }]}>
                <MaterialIcons name="history-edu" size={24} color={COLORS.emerald600} />
              </View>
              <View>
                <Text style={[styles.actionTitle, isDark && styles.textDark]}>Log Weight</Text>
                <Text style={styles.actionSubtitle}>Daily check-in</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Recent Activity</Text>
            <Pressable onPress={() => router.push('/(tabs)/meal-history')}>
              <Text style={styles.viewAllText}>VIEW ALL</Text>
            </Pressable>
          </View>

          <View style={[styles.activityList, isDark && styles.cardDark]}>
            {/* Activity 1 */}
            <View style={styles.activityItem}>
              <View style={styles.activityInfo}>
                <View style={[styles.activityIconBox, { backgroundColor: COLORS.blue50 }]}>
                  <MaterialIcons name="directions-run" size={20} color={COLORS.blue600} />
                </View>
                <View>
                  <Text style={[styles.activityTitle, isDark && styles.textDark]}>Morning Run</Text>
                  <Text style={styles.activitySubtitle}>5.2 km • 28 min</Text>
                </View>
              </View>
              <Text style={styles.activityTime}>7:30 AM</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Activity 2 */}
            <View style={styles.activityItem}>
              <View style={styles.activityInfo}>
                <View style={[styles.activityIconBox, { backgroundColor: COLORS.green50 }]}>
                  <MaterialIcons name="egg-alt" size={20} color={COLORS.green600} />
                </View>
                <View>
                  <Text style={[styles.activityTitle, isDark && styles.textDark]}>Breakfast</Text>
                  <Text style={styles.activitySubtitle}>420 kcal • High Protein</Text>
                </View>
              </View>
              <Text style={styles.activityTime}>8:15 AM</Text>
            </View>
          </View>
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
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceContainer,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.blue600,
    letterSpacing: -0.5,
  },
  notificationBtn: {
    padding: 4,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 24,
  },
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  textDark: {
    color: COLORS.white,
  },
  dateBadge: {
    backgroundColor: COLORS.primaryFixed,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  dateBadgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    gap: 16,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.surfaceLowest,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.outline,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  cardValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  cardUnit: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: COLORS.surfaceContainer,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  cardTrendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardTrendText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  sessionCard: {
    backgroundColor: COLORS.primaryContainer,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  sessionBgPattern: {
    position: 'absolute',
    right: -20,
    bottom: -20,
    opacity: 0.5,
  },
  sessionContent: {
    padding: 24,
  },
  sessionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sessionBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  sessionBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  sessionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.white,
  },
  sessionIconBox: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionDetailsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  sessionDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sessionDetailText: {
    color: COLORS.onPrimaryContainer,
    fontSize: 14,
  },
  startWorkoutBtn: {
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  startWorkoutBtnPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  startWorkoutText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  actionCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLowest,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.outline,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.onSurface,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
  },
  viewAllText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  activityList: {
    backgroundColor: COLORS.surfaceLowest,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.outline,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  activityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  activityIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.onSurface,
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },
  activityTime: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.outline,
  }
});
