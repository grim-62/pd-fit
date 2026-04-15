import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { MealItem } from '../components/MealItem';
import { DUMMY_MEALS } from '../utils/dummyData';
import { useTheme, ThemeColors } from '../hooks/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const MealHistoryScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation<any>();

  // Calculate daily totals
  const todayMeals = DUMMY_MEALS.filter(m => m.date === 'Today');
  const todayCalories = todayMeals.reduce((sum, m) => sum + m.calories, 0);
  const todayProtein = todayMeals.reduce((sum, m) => sum + m.protein, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Diet" subtitle="Track your nutrition journey." />

      {/* Daily Summary Strip */}
      <View style={styles.summaryStrip}>
        <View style={styles.summaryItem}>
          <Ionicons name="flame-outline" size={16} color={colors.primary} />
          <Text style={styles.summaryValue}>{todayCalories}</Text>
          <Text style={styles.summaryLabel}>kcal</Text>
        </View>
        <View style={[styles.summaryDivider, { backgroundColor: colors.outlineVariant }]} />
        <View style={styles.summaryItem}>
          <Ionicons name="nutrition-outline" size={16} color={colors.accentBlue} />
          <Text style={styles.summaryValue}>{todayProtein}g</Text>
          <Text style={styles.summaryLabel}>protein</Text>
        </View>
        <View style={[styles.summaryDivider, { backgroundColor: colors.outlineVariant }]} />
        <View style={styles.summaryItem}>
          <Ionicons name="restaurant-outline" size={16} color={colors.accentAmber} />
          <Text style={styles.summaryValue}>{todayMeals.length}</Text>
          <Text style={styles.summaryLabel}>meals</Text>
        </View>
      </View>

      <View style={styles.container}>
        <FlatList
          data={DUMMY_MEALS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const showDateHeader = index === 0 || DUMMY_MEALS[index - 1].date !== item.date;
            return (
              <View>
                {showDateHeader && (
                  <Text style={styles.dateHeader}>{item.date}</Text>
                )}
                <MealItem {...item} />
              </View>
            );
          }}
        />
      </View>

      {/* FAB */}
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
  // Summary strip
  summaryStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 24,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    paddingVertical: 14,
    marginBottom: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  summaryDivider: {
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
