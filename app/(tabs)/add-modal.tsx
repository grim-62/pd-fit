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
  tertiaryFixed: '#ffddb8',
  onTertiaryFixedVariant: '#653e00',
  background: '#faf8ff',
  surfaceLowest: '#ffffff',
  surfaceContainerLow: '#f2f3ff',
  onSurface: '#131b2e',
  onSurfaceVariant: '#424656',
  white: '#ffffff',
  outline: '#e2e8f0',
  outlineVariant: '#c2c6d9',
  slate200: '#e2e8f0',
  blue50: '#eff6ff',
  blue100: '#dbeafe',
  blue600: '#2563eb',
  blue800: '#1e40af',
  blue900: '#1e3a8a',
  surfaceDark: '#0f172a',
  surfaceLowestDark: '#1e293b',
};

const PROFILE_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxHUcFuZFmu2UmDcfmMEXoWhAE53WwRhER9FWOXWeoPLpvtSS_pUsC76raKdNoVImvEosoEeF6bDMUURpOr86wpppTj8nBjUkEfzLTw-9K7Z6XEadhIo-npR69klEEys_zavhnVR_CkQ422H7nSpd-Euhynd3Y7qSPwIu3wrzJ1_UmysDW17qNR3LiSmzujpb-ov_W4KX0haJuSQnUdn6TR0BQkz-XaG9DoyPZgCvjX2XZ3UwaCKhJ7Vw5NqDy_fXVayYJJ69YRZFx';
const MEAL_BG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUgY6xxelXDqoNCJQML7HeK95FvhQVIgYgAz_ucWJfa9LIiJEKveoMX77NilWlYofMwg5Gm5ZhfLB6VpQXtKNSg0ml9xgLUSf8TTEmNd8193kB6uyb8wNl3peaO2HGnER9JLZOYSvmdAdWCxqGiscD6uf8PQ-JH0vvJ2eUM2VMWURmj74Y8VKHA1FdyafBGHFAi4xDvFPQ0QCErIwmN6s-FepwlwTPaHHT3wWSFJ5jwzi628CB1FQqlqRSq_P0f-tQRkze5a7-nMcx';

export default function AddMealScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  
  const [mealText, setMealText] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: PROFILE_IMAGE }} style={styles.profileImage} />
          <Text style={[styles.headerTitle, isDark && styles.textDark]}>Pulse Fitness</Text>
        </View>
        <Pressable style={styles.notificationBtn}>
          <MaterialIcons name="notifications" size={24} color={isDark ? '#3b82f6' : '#2563eb'} />
        </Pressable>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={[styles.mainTitle, isDark && styles.textDark]}>Log Meal</Text>
          <Text style={styles.mainSubtitle}>Track your nutrition to reach your performance goals.</Text>
        </View>

        {/* Meal Entry Form */}
        <View style={[styles.formCard, isDark && styles.cardDark]}>
          
          {/* Image Upload Box */}
          <Pressable style={[styles.imageUploadBox, isDark && styles.imageUploadBoxDark]}>
            <Image source={{ uri: MEAL_BG }} style={styles.imageUploadBg} />
            <View style={styles.imageUploadContent}>
              <MaterialIcons name="add-a-photo" size={36} color={COLORS.primary} />
              <Text style={styles.imageUploadTitle}>ADD FOOD PHOTO</Text>
              <Text style={styles.imageUploadSub}>Optional, but helps tracking</Text>
            </View>
          </Pressable>

          {/* Date & Time Grid */}
          <View style={styles.rowGrid}>
            <View style={styles.gridCol}>
              <Text style={styles.inputLabel}>Date</Text>
              <View style={styles.inputWrapper}>
                <TextInput 
                  style={[styles.input, isDark && styles.inputDark]} 
                  value="2023-10-27"
                  editable={false}
                />
                <MaterialIcons name="calendar-today" size={20} color={COLORS.onSurfaceVariant} style={styles.inputIcon} />
              </View>
            </View>
            <View style={styles.gridCol}>
              <Text style={styles.inputLabel}>Meal Time</Text>
              <View style={styles.inputWrapper}>
                <TextInput 
                  style={[styles.input, isDark && styles.inputDark]} 
                  value="12:30"
                  editable={false}
                />
                <MaterialIcons name="schedule" size={20} color={COLORS.onSurfaceVariant} style={styles.inputIcon} />
              </View>
            </View>
          </View>

          {/* Meal Items */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Meal Items</Text>
            <TextInput
              style={[styles.textArea, isDark && styles.inputDark]}
              placeholder="2 eggs, 1 slice of toast, 1/2 avocado..."
              placeholderTextColor={COLORS.outlineVariant}
              multiline
              numberOfLines={4}
              value={mealText}
              onChangeText={setMealText}
            />
            <View style={styles.tagsContainer}>
              <View style={styles.tagGreen}>
                <Text style={styles.tagGreenText}>High Protein</Text>
              </View>
              <View style={styles.tagOrange}>
                <Text style={styles.tagOrangeText}>Healthy Fats</Text>
              </View>
            </View>
          </View>

          {/* Quick Select */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Quick Add Recent</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickAddScroll}>
              <Pressable style={[styles.quickAddBtn, isDark && styles.quickAddBtnDark]}>
                <MaterialIcons name="history" size={16} color={COLORS.onSurface} />
                <Text style={[styles.quickAddText, isDark && styles.textDark]}>Oatmeal & Berries</Text>
              </Pressable>
              <Pressable style={[styles.quickAddBtn, isDark && styles.quickAddBtnDark]}>
                <MaterialIcons name="history" size={16} color={COLORS.onSurface} />
                <Text style={[styles.quickAddText, isDark && styles.textDark]}>Protein Shake</Text>
              </Pressable>
            </ScrollView>
          </View>

          {/* Save Button */}
          <Pressable style={({ pressed }) => [
            styles.saveBtn,
            pressed && styles.saveBtnPressed
          ]}>
            <MaterialIcons name="check-circle" size={24} color={COLORS.onPrimary} />
            <Text style={styles.saveBtnText}>Save Meal</Text>
          </Pressable>

        </View>

        {/* AI Suggestion */}
        <View style={styles.aiCard}>
          <View style={styles.aiIconBox}>
            <MaterialIcons name="lightbulb" size={24} color={COLORS.white} />
          </View>
          <View style={styles.aiContent}>
            <Text style={styles.aiTitle}>AI Nutritionist Tip</Text>
            <Text style={styles.aiText}>
              Based on your training schedule, adding 20g more protein to this meal would optimize your recovery for tonight's session.
            </Text>
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
    backgroundColor: '#dbe1ff',
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
    fontSize: 16,
    color: COLORS.onSurfaceVariant,
  },
  formCard: {
    backgroundColor: COLORS.surfaceLowest,
    borderRadius: 32,
    padding: 24,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.slate100,
    marginBottom: 32,
  },
  cardDark: {
    backgroundColor: COLORS.surfaceLowestDark,
    borderColor: COLORS.slate700,
  },
  imageUploadBox: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceContainerLow,
    borderWidth: 2,
    borderColor: COLORS.outlineVariant,
    borderStyle: 'dashed',
    overflow: 'hidden',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageUploadBoxDark: {
    backgroundColor: COLORS.surfaceDark,
    borderColor: COLORS.slate600,
  },
  imageUploadBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
  imageUploadContent: {
    alignItems: 'center',
  },
  imageUploadTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 8,
    letterSpacing: 0.5,
  },
  imageUploadSub: {
    fontSize: 10,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
  },
  rowGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  gridCol: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.onSurface,
  },
  inputDark: {
    backgroundColor: COLORS.surfaceDark,
    color: COLORS.white,
  },
  inputIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  textArea: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: COLORS.onSurface,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  tagGreen: {
    backgroundColor: COLORS.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagGreenText: {
    color: COLORS.onSecondaryContainer,
    fontSize: 10,
    fontWeight: '500',
  },
  tagOrange: {
    backgroundColor: COLORS.tertiaryFixed,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagOrangeText: {
    color: COLORS.onTertiaryFixedVariant,
    fontSize: 10,
    fontWeight: '500',
  },
  quickAddScroll: {
    gap: 12,
    paddingBottom: 8,
  },
  quickAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceLowest,
    borderWidth: 1,
    borderColor: COLORS.slate200,
  },
  quickAddBtnDark: {
    backgroundColor: COLORS.surfaceDark,
    borderColor: COLORS.slate600,
  },
  quickAddText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.onSurface,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  saveBtnText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.onPrimary,
  },
  aiCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    backgroundColor: COLORS.blue50,
    borderWidth: 1,
    borderColor: COLORS.blue100,
    borderRadius: 32,
    padding: 24,
  },
  aiIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.blue600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiContent: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.blue900,
    marginBottom: 4,
  },
  aiText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.blue800,
    opacity: 0.8,
  }
});
