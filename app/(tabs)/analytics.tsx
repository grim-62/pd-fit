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

const COLORS = {
  primary: '#004cca',
  primaryContainer: '#0062ff',
  onPrimaryContainer: '#f3f3ff',
  secondary: '#006e2f',
  secondaryContainer: '#6bff8f',
  onSecondaryContainer: '#007432',
  tertiaryContainer: '#9c6300',
  error: '#ba1a1a',
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
  surfaceDark: '#0f172a',
  surfaceLowestDark: '#1e293b',
};

const PROFILE_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuASCRJFTNV2dR2HkVKUDoTYEdvQNBS_lsOB-MQRI8qHT4lBFRUlXcRMLrvsCp6SSZ8z1WsPajS1yrKdcqC1SQ8leDXP0bzFqKYqVPPf9CCABSYNIy58_0TSVO8UJlQZ_xsQt1u4EFXoXQNuz7_PHVYWNs0ctwZEfI_CqMmALJI2akLjcg1mk8F0qQ5i9G5uQ8sewxQoE8bRjaPDhUSoEweIqUBDwIKh5hegZ5ZO_5w370lKUG4Y90XEKu94w-X33VrnhXVuhCcKsSsI';

// Calorie bar data
const CALORIE_DATA = [
  { day: 'M', height: '60%', isToday: false },
  { day: 'T', height: '85%', isToday: false },
  { day: 'W', height: '40%', isToday: false },
  { day: 'T', height: '70%', isToday: false },
  { day: 'F', height: '95%', isToday: false },
  { day: 'S', height: '80%', isToday: true },
  { day: 'S', height: '0%', isToday: false },
];

const CONSISTENCY = [true, true, false, true, true, true, false];

// Mock Heatmap Data (28 days)
const HEATMAP_DATA = [
  0.1, 0.4, 0.1, 1.0, 0.2, 0.1, 0.6,
  1.0, 0.8, 0.4, 0.1, 0.9, 0.3, 0.1,
  0.1, 0.2, 0.1, 0.4, 0.1, 0.5, 0.1,
  0.7, 0.1, 0.3, 1.0, 0.1, 0.0, 0.0,
];

export default function AnalyticsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
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
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={[styles.mainTitle, isDark && styles.textDark]}>Activity Analytics</Text>
          <Text style={styles.mainSubtitle}>Your progress over the last 7 days</Text>
        </View>

        <View style={styles.bentoGrid}>
          {/* Calorie Intake Card - Full Width */}
          <View style={[styles.cardFull, isDark && styles.cardDark]}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.cardLabel}>CALORIES INTAKE</Text>
                <View style={styles.rowBaseline}>
                  <Text style={[styles.cardValue, isDark && styles.textDark]}>2,140</Text>
                  <Text style={styles.cardSubValue}> / 2,500 kcal</Text>
                </View>
              </View>
              <View style={styles.iconBoxPrimary}>
                <MaterialIcons name="restaurant" size={20} color={COLORS.primary} />
              </View>
            </View>

            {/* Calorie Bar Chart */}
            <View style={styles.barChartContainer}>
              {CALORIE_DATA.map((item, index) => (
                <View key={index} style={styles.barCol}>
                  <View style={[
                    styles.barTrack, 
                    isDark && styles.barTrackDark,
                    item.isToday && styles.barTrackToday
                  ]}>
                    <View style={[
                      styles.barFill, 
                      { height: item.height as any },
                      item.isToday && styles.barFillToday
                    ]} />
                  </View>
                  <Text style={[
                    styles.barDayText, 
                    item.isToday && styles.barDayTextToday
                  ]}>
                    {item.day}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.bentoRow}>
            {/* Weight Trend Card */}
            <View style={[styles.cardHalf, isDark && styles.cardDark]}>
              <Text style={styles.cardLabel}>WEIGHT</Text>
              <Text style={[styles.cardValueSmall, isDark && styles.textDark]}>78.4 kg</Text>
              <View style={styles.trendRow}>
                <MaterialIcons name="trending-down" size={16} color={COLORS.secondary} />
                <Text style={styles.trendText}>-1.2% this week</Text>
              </View>
              
              {/* Sparkline Mock (Curved shape) */}
              <View style={styles.sparklineContainer}>
                <View style={styles.sparklineLine} />
              </View>
            </View>

            {/* Consistency Card */}
            <View style={[styles.cardHalf, isDark && styles.cardDark]}>
              <Text style={styles.cardLabel}>CONSISTENCY</Text>
              <Text style={[styles.cardValueSmall, isDark && styles.textDark]}>5/7 Days</Text>
              
              <View style={styles.consistencyRow}>
                {CONSISTENCY.map((done, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.consistencyDot, 
                      done ? styles.consistencyDone : (isDark ? styles.consistencyMissDark : styles.consistencyMiss)
                    ]}
                  >
                    {done && <MaterialIcons name="check" size={10} color={COLORS.white} />}
                  </View>
                ))}
              </View>
              <Text style={styles.consistencySubtext}>85% of monthly goal</Text>
            </View>
          </View>
        </View>

        {/* Training Volume Heatmap */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Training Volume</Text>
          <View style={[styles.cardFull, isDark && styles.cardDark]}>
            <View style={styles.heatmapHeader}>
              <View style={styles.heatmapLegend}>
                <View style={[styles.legendBox, { backgroundColor: 'rgba(0, 76, 202, 0.2)' }]} />
                <Text style={styles.legendText}>Low</Text>
                <View style={[styles.legendBox, { backgroundColor: COLORS.primary }]} />
                <Text style={styles.legendText}>High</Text>
              </View>
              <Pressable>
                <Text style={styles.detailLinkText}>Detailed Log</Text>
              </Pressable>
            </View>
            
            <View style={styles.heatmapGrid}>
              {HEATMAP_DATA.map((val, idx) => (
                <View 
                  key={idx} 
                  style={[
                    styles.heatmapSquare,
                    val === 0 
                      ? (isDark ? { backgroundColor: COLORS.surfaceDark, borderWidth: 1, borderColor: COLORS.slate400 } : { backgroundColor: COLORS.slate50, borderWidth: 1, borderColor: COLORS.slate100 })
                      : { backgroundColor: COLORS.primary, opacity: val }
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Top Muscle Groups */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Top Muscle Groups</Text>
          <View style={styles.muscleList}>
            
            <View style={[styles.muscleItem, isDark && styles.cardDark]}>
              <View style={styles.muscleLeft}>
                <View style={[styles.muscleIconBox, { backgroundColor: 'rgba(156, 99, 0, 0.1)' }]}>
                  <MaterialIcons name="fitness-center" size={20} color={COLORS.tertiaryContainer} />
                </View>
                <View>
                  <Text style={[styles.muscleName, isDark && styles.textDark]}>Chest & Triceps</Text>
                  <Text style={styles.muscleSub}>3 sessions this week</Text>
                </View>
              </View>
              <View style={styles.muscleRight}>
                <Text style={styles.muscleValue}>42%</Text>
                <Text style={styles.muscleLabel}>Volume</Text>
              </View>
            </View>

            <View style={[styles.muscleItem, isDark && styles.cardDark]}>
              <View style={styles.muscleLeft}>
                <View style={[styles.muscleIconBox, { backgroundColor: 'rgba(107, 255, 143, 0.1)' }]}>
                  <MaterialIcons name="directions-run" size={20} color={COLORS.onSecondaryContainer} />
                </View>
                <View>
                  <Text style={[styles.muscleName, isDark && styles.textDark]}>Legs & Core</Text>
                  <Text style={styles.muscleSub}>2 sessions this week</Text>
                </View>
              </View>
              <View style={styles.muscleRight}>
                <Text style={styles.muscleValue}>31%</Text>
                <Text style={styles.muscleLabel}>Volume</Text>
              </View>
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
    borderWidth: 1,
    borderColor: 'rgba(0, 76, 202, 0.2)',
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
  titleSection: {
    marginBottom: 24,
    marginTop: 8,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  mainSubtitle: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },
  bentoGrid: {
    gap: 16,
    marginBottom: 24,
  },
  cardFull: {
    backgroundColor: COLORS.surfaceLowest,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.slate100,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHalf: {
    flex: 1,
    backgroundColor: COLORS.surfaceLowest,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.slate100,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: COLORS.surfaceLowestDark,
    borderColor: COLORS.slate700,
  },
  bentoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  rowBaseline: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  cardValueSmall: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  cardSubValue: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },
  iconBoxPrimary: {
    backgroundColor: 'rgba(0, 98, 255, 0.1)',
    padding: 8,
    borderRadius: 8,
  },
  barChartContainer: {
    flexDirection: 'row',
    height: 128,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  barTrack: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.slate100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'flex-end',
  },
  barTrackDark: {
    backgroundColor: COLORS.surfaceDark,
  },
  barTrackToday: {
    borderWidth: 2,
    borderColor: 'rgba(0, 98, 255, 0.3)',
  },
  barFill: {
    width: '100%',
    backgroundColor: 'rgba(0, 76, 202, 0.2)', // primary/20
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  barFillToday: {
    backgroundColor: COLORS.primary,
  },
  barDayText: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.slate400,
    marginTop: 8,
  },
  barDayTextToday: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  trendText: {
    fontSize: 10,
    color: COLORS.secondary,
  },
  sparklineContainer: {
    height: 48,
    marginTop: 16,
    justifyContent: 'center',
  },
  sparklineLine: {
    height: 20,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
    borderRightWidth: 3,
    borderRightColor: COLORS.primary,
    borderBottomRightRadius: 20,
    opacity: 0.5,
    transform: [{ rotate: '-15deg'}],
    width: '100%',
  },
  consistencyRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 16,
  },
  consistencyDot: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  consistencyDone: {
    backgroundColor: COLORS.secondary,
  },
  consistencyMiss: {
    backgroundColor: COLORS.slate100,
  },
  consistencyMissDark: {
    backgroundColor: COLORS.surfaceDark,
  },
  consistencySubtext: {
    fontSize: 10,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.onSurface,
    marginBottom: 16,
  },
  heatmapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  heatmapLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendBox: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 10,
    color: COLORS.onSurfaceVariant,
    marginRight: 8,
  },
  detailLinkText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  heatmapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  heatmapSquare: {
    width: '11.5%', // approx 1/7 minus gap
    aspectRatio: 1,
    borderRadius: 4,
  },
  muscleList: {
    gap: 12,
  },
  muscleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLowest,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.slate100,
  },
  muscleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  muscleIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  muscleName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  muscleSub: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
  },
  muscleRight: {
    alignItems: 'flex-end',
  },
  muscleValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  muscleLabel: {
    fontSize: 10,
    color: COLORS.onSurfaceVariant,
  }
});
