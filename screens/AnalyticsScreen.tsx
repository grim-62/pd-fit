import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Ionicons } from '@expo/vector-icons';
import { DUMMY_STATS } from '../utils/dummyData';
import { useTheme, ThemeColors } from '../hooks/ThemeProvider';

export const AnalyticsScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Header title="Progress" subtitle="Analytics and milestones." />

        {/* Overview Cards */}
        <View style={styles.section}>
          <View style={styles.overviewGrid}>
            <Card variant="filled" style={styles.gridCard}>
              <View style={styles.gridIconBg}>
                <Ionicons name="calendar-outline" size={20} color={colors.primary} />
              </View>
              <Text style={styles.gridValue}>{DUMMY_STATS.activeStreak}</Text>
              <Text style={styles.gridLabel}>Day Streak</Text>
            </Card>
            <Card variant="filled" style={styles.gridCard}>
              <View style={styles.gridIconBg}>
                <Ionicons name="time-outline" size={20} color={colors.accentBlue} />
              </View>
              <Text style={styles.gridValue}>{Math.floor(DUMMY_STATS.totalMinutesActive / 60)}h</Text>
              <Text style={styles.gridLabel}>Active Time</Text>
            </Card>
          </View>
        </View>

        {/* Activity This Week */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity This Week</Text>
          <Card>
            <View style={styles.barChartContainer}>
              {DUMMY_STATS.weeklyActivity.map((day, index) => {
                const maxVal = Math.max(...DUMMY_STATS.weeklyActivity.map(d => d.value));
                const heightPct = Math.max(8, (day.value / maxVal) * 100);
                const isHighest = day.value === maxVal;
                return (
                  <View key={index} style={styles.barColumn}>
                    <View style={styles.barBackground}>
                      <View
                        style={[
                          styles.barFill,
                          {
                            height: `${heightPct}%` as any,
                            backgroundColor: isHighest ? colors.primary : colors.secondaryContainer,
                          },
                        ]}
                      />
                    </View>
                    <Text style={[
                      styles.barLabel,
                      isHighest && { color: colors.primary, fontWeight: '700' },
                    ]}>{day.day}</Text>
                  </View>
                );
              })}
            </View>
          </Card>
        </View>

        {/* Daily Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Goals</Text>
          <Card>
            {/* Calories */}
            <View style={styles.goalRow}>
              <View style={styles.goalLabelRow}>
                <Ionicons name="flame-outline" size={16} color={colors.accentGreen} />
                <Text style={styles.goalText}>Calories</Text>
              </View>
              <Text style={styles.goalValues}>1,800 / 2,200</Text>
            </View>
            <View style={styles.progressBackground}>
              <View style={[styles.progressFill, { width: '82%', backgroundColor: colors.accentGreen }]} />
            </View>

            {/* Protein */}
            <View style={[styles.goalRow, { marginTop: 20 }]}>
              <View style={styles.goalLabelRow}>
                <Ionicons name="nutrition-outline" size={16} color={colors.accentBlue} />
                <Text style={styles.goalText}>Protein</Text>
              </View>
              <Text style={styles.goalValues}>140 / 160g</Text>
            </View>
            <View style={styles.progressBackground}>
              <View style={[styles.progressFill, { width: '87%', backgroundColor: colors.accentBlue }]} />
            </View>

            {/* Water */}
            <View style={[styles.goalRow, { marginTop: 20 }]}>
              <View style={styles.goalLabelRow}>
                <Ionicons name="water-outline" size={16} color={colors.primary} />
                <Text style={styles.goalText}>Water</Text>
              </View>
              <Text style={styles.goalValues}>6 / 8 glasses</Text>
            </View>
            <View style={styles.progressBackground}>
              <View style={[styles.progressFill, { width: '75%', backgroundColor: colors.primary }]} />
            </View>
          </Card>
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
  section: {
    paddingHorizontal: 24,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  // Overview
  overviewGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  gridCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 22,
    marginBottom: 0,
  },
  gridIconBg: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  gridValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  gridLabel: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  // Bar Chart
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
    paddingHorizontal: 4,
    paddingTop: 8,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barBackground: {
    width: 14,
    height: 110,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 7,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: 14,
    borderRadius: 7,
  },
  barLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    marginTop: 8,
    fontWeight: '500',
  },
  // Goals
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  goalText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  goalValues: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  progressBackground: {
    height: 8,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});
