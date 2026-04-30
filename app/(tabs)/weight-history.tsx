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
  onSecondaryContainer: '#002109',
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

const PROFILE_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHjMaVQQrsNbpo21Uu677SXjYsLaSOhsDCfsqwrL8UgggqIn0OKwEHMdF98Qdm0QDX5lWZURJJJNEueNTx_AmngGZMvnAOCOjv5qh6cFLvD8pN9jnMXJh5duTCSqnrttvJCEJOsWfT0cUa5UEF-x-XF-OKnQPSU-Tv9KcFhLYifuAF7nIwMVJiqM6V5UyUjRq2_CoxVN2VdA-Qr1T57QhoAdr5mvWmqRHKal-h6409QeHaZh701EG364lFqiqD5XVc5x1McfiGS0Ss';

const CHART_DATA = [
  { day: 'Mon', height: '85%', opacity: 0.1 },
  { day: 'Tue', height: '82%', opacity: 0.15 },
  { day: 'Wed', height: '80%', opacity: 0.2 },
  { day: 'Thu', height: '78%', opacity: 0.3, active: true },
  { day: 'Fri', height: '81%', opacity: 0.15 },
  { day: 'Sat', height: '84%', opacity: 0.1 },
  { day: 'Sun', height: '83%', opacity: 0.1 },
];

const LOGS = [
  {
    id: 1,
    weight: '78.4 kg',
    time: 'Today, 07:30 AM',
    diff: '-0.2 kg',
    trend: 'down',
  },
  {
    id: 2,
    weight: '78.6 kg',
    time: 'Yesterday, 07:15 AM',
    diff: '+0.1 kg',
    trend: 'up',
  },
  {
    id: 3,
    weight: '78.5 kg',
    time: 'Oct 24, 08:00 AM',
    diff: '--',
    trend: 'none',
  }
];

export default function WeightHistoryScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: PROFILE_IMAGE }} style={styles.profileImage} />
          <Text style={[styles.headerTitle, isDark && styles.textDark]}>Pulse Fitness</Text>
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
          <Text style={[styles.mainTitle, isDark && styles.textDark]}>Weight History</Text>
          <Text style={styles.mainSubtitle}>Tracking your journey to precision</Text>
        </View>

        {/* Trend Chart Card */}
        <View style={[styles.chartCard, isDark && styles.cardDark]}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartLabel}>CURRENT WEIGHT</Text>
              <View style={styles.currentWeightRow}>
                <Text style={[styles.currentWeightValue, isDark && styles.textDark]}>78.4</Text>
                <Text style={styles.currentWeightUnit}>kg</Text>
              </View>
            </View>
            <View style={styles.trendBadge}>
              <MaterialIcons name="trending-down" size={14} color={COLORS.secondary} />
              <Text style={styles.trendBadgeText}>-1.2kg this month</Text>
            </View>
          </View>

          {/* Bar Chart Area */}
          <View style={styles.chartArea}>
            {/* Grid lines */}
            <View style={styles.gridLinesContainer}>
              <View style={styles.gridLine} />
              <View style={styles.gridLine} />
              <View style={styles.gridLine} />
            </View>
            
            {/* Bars */}
            <View style={styles.barsContainer}>
              {CHART_DATA.map((item, index) => (
                <View key={index} style={styles.barCol}>
                  <View style={styles.barTrack}>
                    <View 
                      style={[
                        styles.barFill, 
                        { height: item.height as any, opacity: item.opacity },
                        item.active && { opacity: 0.8 }
                      ]} 
                    />
                  </View>
                  <Text style={[
                    styles.barLabel, 
                    item.active && styles.barLabelActive
                  ]}>
                    {item.day}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, isDark && styles.cardDark]}>
            <Text style={styles.statCardLabel}>Body Fat</Text>
            <View style={styles.statCardValueRow}>
              <Text style={[styles.statCardValue, isDark && styles.textDark]}>18.4</Text>
              <Text style={styles.statCardUnit}>%</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, isDark && styles.cardDark]}>
            <Text style={styles.statCardLabel}>BMI</Text>
            <View style={styles.statCardValueRow}>
              <Text style={[styles.statCardValue, isDark && styles.textDark]}>24.2</Text>
              <Text style={styles.statCardUnit}>Normal</Text>
            </View>
          </View>
        </View>

        {/* History List */}
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={[styles.historyTitle, isDark && styles.textDark]}>Recent Logs</Text>
            <Pressable>
              <Text style={styles.viewAllText}>View All</Text>
            </Pressable>
          </View>

          <View style={styles.logsContainer}>
            {LOGS.map((log) => (
              <Pressable 
                key={log.id} 
                style={({ pressed }) => [
                  styles.logItem,
                  isDark && styles.cardDark,
                  pressed && (isDark ? { backgroundColor: COLORS.surfaceLowestDark } : { backgroundColor: COLORS.slate50 })
                ]}
              >
                <View style={styles.logLeft}>
                  <View style={styles.logIconBox}>
                    <MaterialIcons name="scale" size={20} color={COLORS.primary} />
                  </View>
                  <View>
                    <Text style={[styles.logWeight, isDark && styles.textDark]}>{log.weight}</Text>
                    <Text style={styles.logTime}>{log.time}</Text>
                  </View>
                </View>
                <View style={styles.logRight}>
                  <Text style={[
                    styles.logDiff,
                    log.trend === 'down' ? { color: COLORS.secondary } : 
                    log.trend === 'up' ? { color: COLORS.error } : 
                    { color: COLORS.slate400 }
                  ]}>
                    {log.diff}
                  </Text>
                  <MaterialIcons name="chevron-right" size={20} color={COLORS.slate300} />
                </View>
              </Pressable>
            ))}
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
  chartCard: {
    backgroundColor: COLORS.surfaceLowest,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(194, 198, 217, 0.3)',
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
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  chartLabel: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginBottom: 4,
  },
  currentWeightRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  currentWeightValue: {
    fontSize: 32,
    fontWeight: '600',
    color: COLORS.primary,
  },
  currentWeightUnit: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(107, 255, 143, 0.3)', // secondaryContainer approx
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  trendBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSecondaryContainer,
  },
  chartArea: {
    height: 160,
    width: '100%',
    position: 'relative',
    marginTop: 16,
  },
  gridLinesContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    paddingBottom: 24, // make room for labels
  },
  gridLine: {
    height: 1,
    backgroundColor: COLORS.slate100,
    width: '100%',
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  barTrack: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: '10%',
    marginBottom: 8,
  },
  barFill: {
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: '100%',
  },
  barLabel: {
    fontSize: 12,
    color: COLORS.slate400,
  },
  barLabelActive: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surfaceLowest,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.slate100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statCardLabel: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginBottom: 4,
  },
  statCardValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  statCardValue: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  statCardUnit: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
  },
  historySection: {
    marginBottom: 24,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  logsContainer: {
    gap: 12,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surfaceLowest,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.slate100,
  },
  logLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logWeight: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  logTime: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  logRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  logDiff: {
    fontSize: 12,
    fontWeight: '600',
  }
});
