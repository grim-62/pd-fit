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
  surfaceContainerLow: '#f2f3ff',
  onSurface: '#131b2e',
  onSurfaceVariant: '#424656',
  white: '#ffffff',
  outline: '#e2e8f0',
  outlineVariant: '#c2c6d9',
  slate200: '#e2e8f0',
  emerald50: '#ecfdf5',
  emerald100: '#d1fae5',
  emerald600: '#059669',
  emerald800: '#065f46',
  emerald900: '#064e3b',
  surfaceDark: '#0f172a',
  surfaceLowestDark: '#1e293b',
};

const PROFILE_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxHUcFuZFmu2UmDcfmMEXoWhAE53WwRhER9FWOXWeoPLpvtSS_pUsC76raKdNoVImvEosoEeF6bDMUURpOr86wpppTj8nBjUkEfzLTw-9K7Z6XEadhIo-npR69klEEys_zavhnVR_CkQ422H7nSpd-Euhynd3Y7qSPwIu3wrzJ1_UmysDW17qNR3LiSmzujpb-ov_W4KX0haJuSQnUdn6TR0BQkz-XaG9DoyPZgCvjX2XZ3UwaCKhJ7Vw5NqDy_fXVayYJJ69YRZFx';

export default function LogWeightScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  
  const [weightText, setWeightText] = useState('74.2');
  const [bodyFatText, setBodyFatText] = useState('');

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
          <Text style={[styles.mainTitle, isDark && styles.textDark]}>Log Weight</Text>
          <Text style={styles.mainSubtitle}>Track your daily weight to monitor your progress.</Text>
        </View>

        {/* Weight Entry Form */}
        <View style={[styles.formCard, isDark && styles.cardDark]}>
          
          <View style={styles.weightDisplayBox}>
             <MaterialIcons name="monitor-weight" size={48} color={COLORS.emerald600} style={styles.weightIcon} />
             <Text style={[styles.weightDisplayValue, isDark && styles.textDark]}>{weightText || '0.0'}<Text style={styles.weightDisplayUnit}> kg</Text></Text>
          </View>

          {/* Date & Time Grid */}
          <View style={styles.rowGrid}>
            <View style={styles.gridCol}>
              <Text style={styles.inputLabel}>Date</Text>
              <View style={styles.inputWrapper}>
                <TextInput 
                  style={[styles.input, isDark && styles.inputDark]} 
                  value={new Date().toISOString().split('T')[0]}
                  editable={false}
                />
                <MaterialIcons name="calendar-today" size={20} color={COLORS.onSurfaceVariant} style={styles.inputIcon} />
              </View>
            </View>
            <View style={styles.gridCol}>
              <Text style={styles.inputLabel}>Time</Text>
              <View style={styles.inputWrapper}>
                <TextInput 
                  style={[styles.input, isDark && styles.inputDark]} 
                  value={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  editable={false}
                />
                <MaterialIcons name="schedule" size={20} color={COLORS.onSurfaceVariant} style={styles.inputIcon} />
              </View>
            </View>
          </View>

          {/* Weight Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Weight (kg)</Text>
            <TextInput
              style={[styles.input, isDark && styles.inputDark, styles.largeInput]}
              placeholder="e.g. 74.5"
              placeholderTextColor={COLORS.outlineVariant}
              keyboardType="numeric"
              value={weightText}
              onChangeText={setWeightText}
            />
          </View>

          {/* Body Fat Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Body Fat % (Optional)</Text>
            <TextInput
              style={[styles.input, isDark && styles.inputDark]}
              placeholder="e.g. 15.5"
              placeholderTextColor={COLORS.outlineVariant}
              keyboardType="numeric"
              value={bodyFatText}
              onChangeText={setBodyFatText}
            />
          </View>

          {/* Save Button */}
          <Pressable style={({ pressed }) => [
            styles.saveBtn,
            pressed && styles.saveBtnPressed
          ]}>
            <MaterialIcons name="check-circle" size={24} color={COLORS.onPrimary} />
            <Text style={styles.saveBtnText}>Save Log</Text>
          </Pressable>

        </View>

        {/* AI Suggestion */}
        <View style={styles.aiCard}>
          <View style={styles.aiIconBox}>
            <MaterialIcons name="insights" size={24} color={COLORS.emerald600} />
          </View>
          <View style={styles.aiContent}>
            <Text style={styles.aiTitle}>Progress Insight</Text>
            <Text style={styles.aiText}>
              You are consistently tracking your weight. Based on your recent logs, you are on track with your goal of maintaining weight. Keep it up!
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
  weightDisplayBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingVertical: 16,
  },
  weightIcon: {
    marginBottom: 8,
  },
  weightDisplayValue: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  weightDisplayUnit: {
    fontSize: 24,
    color: COLORS.onSurfaceVariant,
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
  largeInput: {
    fontSize: 20,
    paddingVertical: 16,
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
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: COLORS.emerald600,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 16,
    shadowColor: COLORS.emerald600,
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
    backgroundColor: COLORS.emerald50,
    borderWidth: 1,
    borderColor: COLORS.emerald100,
    borderRadius: 32,
    padding: 24,
  },
  aiIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.emerald100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiContent: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.emerald900,
    marginBottom: 4,
  },
  aiText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.emerald800,
    opacity: 0.8,
  }
});
