import React from 'react';
import { View, Text, StyleSheet, Image, ViewProps } from 'react-native';
import { Card } from './Card';
import { useTheme, ThemeColors } from '../hooks/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

interface MealItemProps extends ViewProps {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  time: string;
  imageUri?: string;
}

export const MealItem: React.FC<MealItemProps> = ({
  name, calories, protein, carbs, fats, time, imageUri, style,
}) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <Card style={[styles.card, style]}>
      <View style={styles.row}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.placeholderImage]}>
            <Ionicons name="restaurant-outline" size={22} color={colors.primary} />
          </View>
        )}
        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
          <Text style={styles.calories}>{calories} kcal</Text>
          <View style={styles.macrosRow}>
            <View style={styles.macroPill}>
              <Text style={styles.macroText}>P {protein}g</Text>
            </View>
            <View style={styles.macroPill}>
              <Text style={styles.macroText}>C {carbs}g</Text>
            </View>
            <View style={styles.macroPill}>
              <Text style={styles.macroText}>F {fats}g</Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  card: {
    padding: 14,
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  placeholderImage: {
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    color: colors.outline,
  },
  calories: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 3,
  },
  macrosRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 6,
  },
  macroPill: {
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  macroText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
});
