import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DUMMY_PLANS, DUMMY_STATS } from '../utils/dummyData';
import { useTheme, ThemeColors } from '../hooks/ThemeProvider';

export const DashboardScreen = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const todayCalories = 1520;
  const goalCalories = 2200;
  const caloriePercent = Math.round((todayCalories / goalCalories) * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Header title="Dashboard" subtitle="Welcome back, let's crush it today!" />

        {/* Hero Progress Card */}
        <View style={styles.heroSection}>
          <View style={styles.heroCard}>
            <View style={styles.heroTop}>
              <View>
                <Text style={styles.heroLabel}>Today's Calories</Text>
                <Text style={styles.heroValue}>{todayCalories.toLocaleString()}</Text>
              </View>
              <View style={styles.heroRing}>
                <Text style={styles.heroPercent}>{caloriePercent}%</Text>
              </View>
            </View>
            <View style={styles.heroProgressTrack}>
              <View style={[styles.heroProgressFill, { width: `${Math.min(caloriePercent, 100)}%` }]} />
            </View>
            <Text style={styles.heroGoal}>of {goalCalories.toLocaleString()} kcal goal</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <Card variant="filled" style={styles.statCard}>
            <View style={styles.statIconBg}>
              <Ionicons name="flame-outline" size={20} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>{DUMMY_STATS.totalCaloriesBurned.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Burned</Text>
          </Card>
          <Card variant="filled" style={styles.statCard}>
            <View style={styles.statIconBg}>
              <Ionicons name="barbell-outline" size={20} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>{DUMMY_STATS.workoutsCompleted}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </Card>
          <Card variant="filled" style={styles.statCard}>
            <View style={styles.statIconBg}>
              <Ionicons name="trending-up-outline" size={20} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>{DUMMY_STATS.activeStreak}</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </Card>
        </View>

        {/* Today's Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Plan</Text>
          {DUMMY_PLANS.map((plan) => (
            <Card key={plan.id}>
              <View style={styles.planRow}>
                <View style={[styles.planIcon, { backgroundColor: plan.color + '20' }]}>
                  <Ionicons name={plan.icon as any} size={22} color={plan.color} />
                </View>
                <View style={styles.planInfo}>
                  <Text style={styles.planTitle}>{plan.title}</Text>
                  <Text style={styles.planSubtitle}>{plan.subtitle}</Text>
                </View>
                <View style={styles.planChevron}>
                  <Ionicons name="chevron-forward" size={18} color={colors.outline} />
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AddMeal')}
      >
        <Ionicons name="add" size={28} color={colors.onPrimary} />
      </TouchableOpacity>
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
    paddingBottom: 100,
  },
  // Hero
  heroSection: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  heroCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: 24,
    padding: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  heroValue: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 4,
    letterSpacing: -1,
  },
  heroRing: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPercent: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  heroProgressTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    marginTop: 20,
    overflow: 'hidden',
  },
  heroProgressFill: {
    height: '100%',
    backgroundColor: colors.accentGreen,
    borderRadius: 3,
  },
  heroGoal: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 8,
  },
  // Stats
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 10,
    marginTop: 16,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 8,
    marginBottom: 0,
  },
  statIconBg: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  // Section
  section: {
    paddingHorizontal: 24,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planInfo: {
    flex: 1,
    marginLeft: 14,
  },
  planTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  planSubtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 3,
  },
  planChevron: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // FAB
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
});
