import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';

const COLORS = {
  primary: '#004cca',
  onPrimary: '#ffffff',
  primaryContainer: '#0062ff',
  secondary: '#006e2f',
  secondaryContainer: '#6bff8f',
  onSecondaryContainer: '#002109',
  background: '#faf8ff',
  surfaceLowest: '#ffffff',
  surfaceContainer: '#eaedff',
  onSurface: '#131b2e',
  onSurfaceVariant: '#424656',
  white: '#ffffff',
  outline: '#e2e8f0',
  outlineVariant: '#c2c6d9',
  slate200: '#e2e8f0',
  slate300: '#cbd5e1',
  slate400: '#94a3b8',
  blue50: '#eff6ff',
  blue600: '#2563eb',
  surfaceDark: '#0f172a',
  surfaceLowestDark: '#1e293b',
};

const PROFILE_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxAnyKDWZ87oUd1JDaboKd-9qOfpRQaDF9Uz0Q5piwRqrbUQKIwnBxyFRUA_XPibpcttqm9R49k6YOb9GkBMx-L5ESbf7obI6Yb2hsOT59KLU49cSRghLGJzTViQYs1KrwHmiNQmjRdUXHxkrsyH3R1y8ij0EOtQSP8bKPpwiFWu0lbWo0SFhBlApkVwPBpEzE3buZpPhUsusndkH_-Ksiv2m81gKXDPUxSuVuZ4IlqtvR-z_9Hng9dga3RL9HGcdRJqUsCwzRRgtU';
const TRAINING_BG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuACG0CbtOlCnPNkZPrC6L1ONtTfjpQfPWZ6a-KpqMbYppz804bHhTZ6r_9gu3ZQuAnIQ0l-y_uwTCMXaQXnF-jNx_E_BpA73j2_qYUahvBlVbrrXPcRLkGHlEeINDieu2vXOTq4Dy64lZy7i51bTs6ujzSdy00bDjf10W3lz3O4nYqAbZpBgrYlEZcl_Xy9h7uUv4bl9o7z0ZZjXJZTj2ST3Vnzuc0UIVihJYV1VmUbjU2mThXlxrHFcfJNJpE7vjJo1oPUE2nOWmJf';

const ACTIVITIES = [
  { id: 'strength', name: 'STRENGTH', icon: 'fitness-center' },
  { id: 'cardio', name: 'CARDIO', icon: 'directions-run' },
  { id: 'flex', name: 'FLEXIBILITY', icon: 'self-improvement' },
  { id: 'sports', name: 'SPORTS', icon: 'sports-basketball' },
];

const INTENSITIES = [
  { id: 1, label: 'LOW' },
  { id: 2, label: 'MED' },
  { id: 3, label: 'HIGH' },
  { id: 4, label: 'MAX' },
];

export default function AddWorkoutScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  
  const [selectedActivity, setSelectedActivity] = useState('strength');
  const [duration, setDuration] = useState('45');
  const [selectedIntensity, setSelectedIntensity] = useState(1);

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
        <View style={styles.titleSection}>
          <Text style={[styles.mainTitle, isDark && styles.textDark]}>Log Activity</Text>
          <Text style={styles.mainSubtitle}>Precision tracking for your peak performance.</Text>
        </View>

        <View style={styles.formGrid}>
          
          {/* Activity Selection Card */}
          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={styles.cardLabel}>ACTIVITY TYPE</Text>
            <View style={styles.activityGrid}>
              {ACTIVITIES.map((act) => {
                const isActive = selectedActivity === act.id;
                return (
                  <Pressable 
                    key={act.id} 
                    style={[
                      styles.activityBtn,
                      isDark && styles.activityBtnDark,
                      isActive && styles.activityBtnActive,
                      isActive && isDark && styles.activityBtnActiveDark
                    ]}
                    onPress={() => setSelectedActivity(act.id)}
                  >
                    <MaterialIcons 
                      name={act.icon as any} 
                      size={28} 
                      color={isActive ? COLORS.primary : COLORS.onSurfaceVariant} 
                      style={{ marginBottom: 8 }}
                    />
                    <Text style={[
                      styles.activityBtnText,
                      isActive && styles.activityBtnTextActive,
                      !isActive && isDark && { color: COLORS.slate400 }
                    ]}>
                      {act.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Duration */}
          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={styles.cardLabel}>DURATION (MINUTES)</Text>
            <View style={styles.durationWrapper}>
              <TextInput 
                style={[styles.durationInput, isDark && styles.durationInputDark]}
                keyboardType="number-pad"
                value={duration}
                onChangeText={setDuration}
                placeholder="45"
                placeholderTextColor={COLORS.slate300}
              />
              <Text style={styles.durationUnit}>MIN</Text>
            </View>
          </View>

          {/* Intensity */}
          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={styles.cardLabel}>INTENSITY LEVEL</Text>
            <View style={styles.intensityRow}>
              {INTENSITIES.map((intensity) => {
                const isActive = selectedIntensity === intensity.id;
                return (
                  <Pressable 
                    key={intensity.id}
                    style={styles.intensityCol}
                    onPress={() => setSelectedIntensity(intensity.id)}
                  >
                    <View style={[
                      styles.intensityBox,
                      isDark && styles.intensityBoxDark,
                      isActive && styles.intensityBoxActive,
                      isActive && isDark && styles.intensityBoxActiveDark
                    ]}>
                      <Text style={[
                        styles.intensityNum,
                        isActive && styles.intensityNumActive,
                        !isActive && isDark && { color: COLORS.slate400 }
                      ]}>
                        {intensity.id}
                      </Text>
                    </View>
                    <Text style={styles.intensityLabel}>{intensity.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Visual Context Card */}
          <View style={styles.contextCard}>
            <Image source={{ uri: TRAINING_BG }} style={styles.contextImage} />
            <View style={styles.contextOverlay}>
              <Text style={styles.contextText}>Consistency is the bridge between goals and accomplishment.</Text>
            </View>
          </View>

          {/* Action Button */}
          <Pressable style={({ pressed }) => [
            styles.saveBtn,
            pressed && styles.saveBtnPressed
          ]}>
            <Text style={styles.saveBtnText}>Save Workout</Text>
          </Pressable>

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
    backgroundColor: COLORS.slate200,
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
    marginBottom: 8,
  },
  mainSubtitle: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },
  formGrid: {
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.surfaceLowest,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: COLORS.surfaceLowestDark,
    borderColor: COLORS.slate700,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 16,
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  activityBtn: {
    width: '48%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  activityBtnDark: {
    backgroundColor: COLORS.surfaceDark,
    borderColor: COLORS.slate600,
  },
  activityBtnActive: {
    backgroundColor: COLORS.blue50,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  activityBtnActiveDark: {
    backgroundColor: 'rgba(0, 76, 202, 0.2)',
  },
  activityBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
  },
  activityBtnTextActive: {
    color: COLORS.primary,
  },
  durationWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  durationInput: {
    width: '100%',
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  durationInputDark: {
    backgroundColor: COLORS.surfaceDark,
    color: COLORS.white,
  },
  durationUnit: {
    position: 'absolute',
    right: 16,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.slate400,
  },
  intensityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  intensityCol: {
    flex: 1,
    alignItems: 'center',
  },
  intensityBox: {
    width: '100%',
    height: 48,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  intensityBoxDark: {
    backgroundColor: COLORS.surfaceDark,
    borderColor: COLORS.slate600,
  },
  intensityBoxActive: {
    backgroundColor: COLORS.blue50,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  intensityBoxActiveDark: {
    backgroundColor: 'rgba(0, 76, 202, 0.2)',
  },
  intensityNum: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
  },
  intensityNumActive: {
    color: COLORS.primary,
  },
  intensityLabel: {
    fontSize: 10,
    color: COLORS.slate400,
    fontWeight: '500',
  },
  contextCard: {
    height: 192,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 8,
  },
  contextImage: {
    width: '100%',
    height: '100%',
  },
  contextOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    padding: 24,
  },
  contextText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
  saveBtnText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.onPrimary,
  }
});
