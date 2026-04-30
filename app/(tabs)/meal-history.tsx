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
  primaryContainer: '#dbe1ff',
  onPrimaryContainer: '#00174b',
  secondary: '#006e2f',
  secondaryContainer: '#6bff8f',
  onSecondaryContainer: '#002109',
  tertiary: '#7b4d00',
  tertiaryContainer: '#ffddb8',
  onTertiaryContainer: '#2a1700',
  background: '#faf8ff',
  surfaceLowest: '#ffffff',
  surfaceContainer: '#eaedff',
  onSurface: '#131b2e',
  onSurfaceVariant: '#424656',
  white: '#ffffff',
  outline: '#e2e8f0',
  outlineVariant: '#c2c6d9',
  slate200: '#e2e8f0',
  slate700: '#334155',
  surfaceDark: '#0f172a',
  surfaceLowestDark: '#1e293b',
};

const PROFILE_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDos1P2LKKJqEK5avncr5X4OumJK8qO2Fp6AtUCMnZxQhTq5Z3iN6NZOk4x8xfNStaA79L-_hb8Lf9eTHBBRss6PCKv5BMZCskhhavmk_tp80QVuAvSlKSj7RtZWQPzQok3pzwxsNLArZzu5MVOvo-Cr6nivrEwmU7fXv8wr51ZZDlf6ykcoCU6dlkHyMIIeKyY0F5vRLrDIk31yITBt5AnPUrfW6wsZDQDM-uI0Xb5J1_1PF4908DLfTYCAGaC3YM9m0HsoeWpNwnI';

const MEALS = [
  {
    id: 1,
    title: 'Mediterranean Bowl',
    time: '1:30 PM',
    desc: 'Grilled chicken breast, mixed greens, feta cheese, and balsamic vinaigrette. High protein focus.',
    calories: '650 kcal',
    protein: '45g Protein',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYOp4wQn66cD-3Aueqa21vLWJB_PLycr5rKs12vTE-1XQb2_-1NtA4CLi0ycc8iN4ZS7lxbKCToSFnvzxwbNTC0Jfh7UviqEnslwqTOnFsMg1c3Z3Cfh11y0TsOmEbnpAjIB_HoefB7a_iuNWLWN8ptqZzT7OOsITljgsPi1datNqbNOvT--Gv9WSUpB4YflBSEaA-Fklc4qkTBA4AWYXtXl7QcuPBhq161nZkT4odTztZmjU5On8I9clkgCFTZ5KRlWGWZnIoHddA',
    icon: 'lunch-dining',
    iconBg: COLORS.primaryContainer,
    iconColor: COLORS.primary,
  },
  {
    id: 2,
    title: 'Berry Protein Oats',
    time: '8:15 AM',
    desc: 'Steel-cut oats with whey protein, blueberries, and a sprinkle of almonds. Pre-workout fuel.',
    calories: '420 kcal',
    protein: '30g Protein',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJTemn0TEZMHlzbQhxbaQ2bc5nL2UbwGx1zewwhBSjm_mJsukxIkEe1V0h1pu7AF9TEIZc8e5q9WRYImuRD_mBYA9TBwYPE2_3PDlqbwzDMswL6438Sr4DG8sPe1Xxa27cTg4WHj6uwjd3lo3urrNIe3HzqW344Qa3YcfINk_tPjDx1OvsAd6vL9KVbDPdzAtV0vxBAaIhhv3-ZXNGnWGoAS_sH8v38-1uHDjSU0Rd2jg4KukFiYlMgocHsaAi07zIoiuAme_q2FRZ',
    icon: 'coffee',
    iconBg: COLORS.tertiaryContainer,
    iconColor: COLORS.tertiary,
  }
];

const YESTERDAY_MEALS = [
  {
    id: 3,
    title: 'Grilled Salmon Dinner',
    time: '7:45 PM',
    desc: 'Fresh salmon with asparagus and steamed broccoli. Rich in Omega-3 for recovery.',
    calories: '580 kcal',
    protein: '42g Protein',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJkusSGrDjmuLiaXSGkrlhg8Qk_4xH4fU3G33IGhFP84YjAOXxcaKSJCQnl8FrV13MUmiEhK5orgfmFhWdWrGXfPFDFmdFjNIBzIx-3znc3woJb7suMVAXB1nTBaAB-QTZYW0Mw0eCB1hW1JesIM1dtkhhYwi79JtMW97jZfy-QVQNrT3UWzz8C1S-zI0RdX_dnc2lx9jqZIiH-uBwu9eL-C2lBkE4yd_lMwPs36HXN6HYfWTLikDcodhWmeDe3YwNd5MOsrO7vQK9',
    icon: 'dinner-dining',
    iconBg: COLORS.slate200,
    iconColor: COLORS.slate700,
  }
];

export default function MealHistoryScreen() {
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
          <Text style={[styles.mainTitle, isDark && styles.textDark]}>Meal History</Text>
          <Text style={styles.mainSubtitle}>Track your nutrition journey and maintain your high-performance discipline.</Text>
        </View>

        {/* Stats Bento */}
        <View style={styles.statsGrid}>
          {/* Avg Calories */}
          <View style={[styles.statCard, isDark && styles.cardDark]}>
            <View style={styles.statHeader}>
              <MaterialIcons name="restaurant" size={20} color={COLORS.primary} />
              <Text style={styles.statLabel}>Avg Calories</Text>
            </View>
            <Text style={[styles.statValue, isDark && styles.textDark]}>2,450</Text>
            <View style={styles.statTrendRow}>
              <MaterialIcons name="trending-up" size={14} color={COLORS.secondary} />
              <Text style={styles.statTrendText}>3% from last week</Text>
            </View>
          </View>

          {/* Logged Today */}
          <View style={[styles.statCard, isDark && styles.cardDark]}>
            <View style={styles.statHeader}>
              <MaterialIcons name="timer" size={20} color={COLORS.tertiary} />
              <Text style={styles.statLabel}>Logged Today</Text>
            </View>
            <Text style={[styles.statValue, isDark && styles.textDark]}>3 Meals</Text>
            <Text style={styles.statSubText}>1,200 kcal remaining</Text>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineContainer}>
          
          {/* Date Divider */}
          <View style={styles.dateDivider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dateText}>TODAY, OCT 24</Text>
            <View style={styles.dividerLine} />
          </View>

          {MEALS.map((meal, index) => (
            <View key={meal.id} style={styles.timelineItem}>
              {/* Vertical Line */}
              {index !== MEALS.length - 1 && <View style={styles.timelineLine} />}
              
              {/* Icon */}
              <View style={[styles.timelineIconBox, { backgroundColor: meal.iconBg }]}>
                <MaterialIcons name={meal.icon as any} size={20} color={meal.iconColor} />
              </View>

              {/* Card */}
              <View style={[styles.mealCard, isDark && styles.cardDark]}>
                <Image source={{ uri: meal.image }} style={styles.mealImage} />
                <View style={styles.mealInfo}>
                  <View style={styles.mealHeader}>
                    <Text style={[styles.mealTitle, isDark && styles.textDark]} numberOfLines={1}>{meal.title}</Text>
                    <Text style={styles.mealTime}>{meal.time}</Text>
                  </View>
                  <Text style={styles.mealDesc} numberOfLines={2}>{meal.desc}</Text>
                  <View style={styles.tagsContainer}>
                    <View style={styles.tagGreen}>
                      <Text style={styles.tagGreenText}>{meal.calories}</Text>
                    </View>
                    <View style={styles.tagGray}>
                      <Text style={styles.tagGrayText}>{meal.protein}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}

          {/* Date Divider Yesterday */}
          <View style={[styles.dateDivider, { marginTop: 16 }]}>
            <View style={styles.dividerLine} />
            <Text style={styles.dateText}>YESTERDAY, OCT 23</Text>
            <View style={styles.dividerLine} />
          </View>

          {YESTERDAY_MEALS.map((meal) => (
            <View key={meal.id} style={styles.timelineItem}>
              <View style={[styles.timelineIconBox, { backgroundColor: meal.iconBg }]}>
                <MaterialIcons name={meal.icon as any} size={20} color={meal.iconColor} />
              </View>

              <View style={[styles.mealCard, isDark && styles.cardDark]}>
                <Image source={{ uri: meal.image }} style={styles.mealImage} />
                <View style={styles.mealInfo}>
                  <View style={styles.mealHeader}>
                    <Text style={[styles.mealTitle, isDark && styles.textDark]} numberOfLines={1}>{meal.title}</Text>
                    <Text style={styles.mealTime}>{meal.time}</Text>
                  </View>
                  <Text style={styles.mealDesc} numberOfLines={2}>{meal.desc}</Text>
                  <View style={styles.tagsContainer}>
                    <View style={styles.tagGreen}>
                      <Text style={styles.tagGreenText}>{meal.calories}</Text>
                    </View>
                    <View style={styles.tagGray}>
                      <Text style={styles.tagGrayText}>{meal.protein}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}

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
    borderWidth: 2,
    borderColor: 'rgba(0, 76, 202, 0.2)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primaryContainer, // It was blue-600 in the HTML, using our primary text dark equivalent if possible. Let's stick to blue.
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
    marginBottom: 8,
  },
  mainSubtitle: {
    fontSize: 16,
    color: COLORS.onSurfaceVariant,
    lineHeight: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surfaceLowest,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: COLORS.surfaceLowestDark,
    borderColor: COLORS.slate700,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  statTrendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statTrendText: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.secondary,
  },
  statSubText: {
    fontSize: 10,
    color: COLORS.onSurfaceVariant,
  },
  timelineContainer: {
    paddingBottom: 20,
  },
  dateDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.outlineVariant,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
    letterSpacing: 1,
  },
  timelineItem: {
    paddingLeft: 48,
    position: 'relative',
    marginBottom: 24,
  },
  timelineLine: {
    position: 'absolute',
    left: 19,
    top: 40,
    bottom: -32, // Connects to the next item
    width: 2,
    backgroundColor: COLORS.primaryContainer,
    opacity: 0.5,
  },
  timelineIconBox: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  mealCard: {
    backgroundColor: COLORS.surfaceLowest,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  mealImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceContainer,
  },
  mealInfo: {
    flex: 1,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.onSurface,
    flex: 1,
    marginRight: 8,
  },
  mealTime: {
    fontSize: 10,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  mealDesc: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    lineHeight: 18,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagGreen: {
    backgroundColor: COLORS.secondaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  tagGreenText: {
    color: COLORS.onSecondaryContainer,
    fontSize: 10,
    fontWeight: '500',
  },
  tagGray: {
    backgroundColor: COLORS.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  tagGrayText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    fontWeight: '500',
  }
});
