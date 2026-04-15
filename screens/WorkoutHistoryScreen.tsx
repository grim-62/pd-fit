import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { WorkoutItem } from '../components/WorkoutItem';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DUMMY_WORKOUTS } from '../utils/dummyData';
import { useTheme, ThemeColors } from '../hooks/ThemeProvider';

export const WorkoutHistoryScreen = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  // Calculate total stats
  const totalDuration = DUMMY_WORKOUTS.reduce((sum, w) => sum + w.duration, 0);
  const totalBurned = DUMMY_WORKOUTS.reduce((sum, w) => sum + w.caloriesBurned, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Workouts" subtitle="Your sweat equity." />

      {/* Stats Strip */}
      <View style={styles.statsStrip}>
        <View style={styles.stripItem}>
          <Ionicons name="time-outline" size={16} color={colors.primary} />
          <Text style={styles.stripValue}>{totalDuration}</Text>
          <Text style={styles.stripLabel}>min</Text>
        </View>
        <View style={[styles.stripDivider, { backgroundColor: colors.outlineVariant }]} />
        <View style={styles.stripItem}>
          <Ionicons name="flame-outline" size={16} color={colors.accentRed} />
          <Text style={styles.stripValue}>{totalBurned.toLocaleString()}</Text>
          <Text style={styles.stripLabel}>kcal</Text>
        </View>
        <View style={[styles.stripDivider, { backgroundColor: colors.outlineVariant }]} />
        <View style={styles.stripItem}>
          <Ionicons name="trophy-outline" size={16} color={colors.accentAmber} />
          <Text style={styles.stripValue}>{DUMMY_WORKOUTS.length}</Text>
          <Text style={styles.stripLabel}>sessions</Text>
        </View>
      </View>

      <View style={styles.container}>
        <FlatList
          data={DUMMY_WORKOUTS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const showDateHeader = index === 0 || DUMMY_WORKOUTS[index - 1].groupDate !== item.groupDate;
            return (
              <View>
                {showDateHeader && (
                  <Text style={styles.dateHeader}>{item.groupDate}</Text>
                )}
                <WorkoutItem
                  title={item.title}
                  duration={item.duration}
                  caloriesBurned={item.caloriesBurned}
                  type={item.type}
                  date={item.date}
                />
              </View>
            );
          }}
        />
      </View>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AddWorkout')}
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
  statsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 24,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    paddingVertical: 14,
    marginBottom: 8,
  },
  stripItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  stripValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  stripLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  stripDivider: {
    width: 1,
    height: 20,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginTop: 20,
    marginBottom: 10,
    letterSpacing: -0.2,
  },
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
