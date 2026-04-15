import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { Card } from './Card';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, ThemeColors } from '../hooks/ThemeProvider';

interface WorkoutItemProps extends ViewProps {
  title: string;
  duration: number;
  caloriesBurned: number;
  type: 'cardio' | 'strength' | 'flexibility' | 'other';
  date: string;
}

export const WorkoutItem: React.FC<WorkoutItemProps> = ({
  title, duration, caloriesBurned, type, date, style,
}) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const getIcon = (): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case 'cardio': return 'bicycle-outline';
      case 'strength': return 'barbell-outline';
      case 'flexibility': return 'body-outline';
      default: return 'fitness-outline';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'cardio': return colors.accentBlue;
      case 'strength': return colors.accentRed;
      case 'flexibility': return colors.accentAmber;
      default: return colors.primary;
    }
  };

  const typeColor = getTypeColor();

  return (
    <Card style={[styles.card, style]}>
      <View style={styles.row}>
        <View style={[styles.iconContainer, { backgroundColor: typeColor + '18' }]}>
          <Ionicons name={getIcon()} size={26} color={typeColor} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Ionicons name="time-outline" size={14} color={colors.outline} />
              <Text style={styles.statText}>{duration} min</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.outlineVariant }]} />
            <View style={styles.stat}>
              <Ionicons name="flame-outline" size={14} color={colors.primary} />
              <Text style={[styles.statText, { color: colors.primary, fontWeight: '700' }]}>
                {caloriesBurned} kcal
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  card: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  date: {
    fontSize: 12,
    color: colors.outline,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    gap: 10,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statDivider: {
    width: 1,
    height: 14,
  },
  statText: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
});
