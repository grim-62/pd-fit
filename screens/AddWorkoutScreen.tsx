import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Text, TouchableOpacity, Alert } from 'react-native';
import { Header } from '../components/Header';
import { InputField } from '../components/InputField';
import { CustomButton } from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme, ThemeColors } from '../hooks/ThemeProvider';

export const AddWorkoutScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [selectedType, setSelectedType] = useState<string>('strength');
  const [workoutName, setWorkoutName] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [notes, setNotes] = useState('');

  const workoutTypes = [
    { id: 'strength', name: 'Strength', icon: 'barbell-outline' as const, color: colors.accentRed },
    { id: 'cardio', name: 'Cardio', icon: 'bicycle-outline' as const, color: colors.accentBlue },
    { id: 'flexibility', name: 'Flexibility', icon: 'body-outline' as const, color: colors.accentAmber },
    { id: 'other', name: 'Other', icon: 'fitness-outline' as const, color: colors.primary },
  ];

  const handleSave = () => {
    if (!workoutName.trim()) {
      Alert.alert('Missing Info', 'Please enter a workout name.');
      return;
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <Header title="Log Workout" subtitle="Keep track of your active sessions." />

          <View style={styles.formContainer}>
            {/* Workout Type Selector */}
            <Text style={styles.sectionLabel}>WORKOUT TYPE</Text>
            <View style={styles.typeContainer}>
              {workoutTypes.map((type) => {
                const isActive = selectedType === type.id;
                return (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.typeBtn,
                      isActive && { backgroundColor: type.color + '18', borderColor: type.color },
                    ]}
                    onPress={() => setSelectedType(type.id)}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.typeIconBg,
                      { backgroundColor: isActive ? type.color + '25' : colors.surfaceContainerHigh },
                    ]}>
                      <Ionicons
                        name={type.icon}
                        size={22}
                        color={isActive ? type.color : colors.outline}
                      />
                    </View>
                    <Text style={[
                      styles.typeText,
                      isActive && { color: type.color, fontWeight: '700' },
                    ]}>{type.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <InputField
              label="Workout Name"
              placeholder="e.g. Upper Body Power"
              value={workoutName}
              onChangeText={setWorkoutName}
            />

            <View style={styles.row}>
              <View style={styles.flex1}>
                <InputField
                  label="Duration (min)"
                  placeholder="e.g. 45"
                  keyboardType="numeric"
                  value={duration}
                  onChangeText={setDuration}
                />
              </View>
              <View style={styles.spacer} />
              <View style={styles.flex1}>
                <InputField
                  label="Calories Burned"
                  placeholder="e.g. 320"
                  keyboardType="numeric"
                  value={caloriesBurned}
                  onChangeText={setCaloriesBurned}
                />
              </View>
            </View>

            <InputField
              label="Notes (Optional)"
              placeholder="How did it feel?"
              multiline
              numberOfLines={3}
              value={notes}
              onChangeText={setNotes}
              style={{ height: 100, textAlignVertical: 'top' }}
            />

            <CustomButton
              title="Save Workout"
              icon="checkmark-circle-outline"
              style={styles.saveButton}
              onPress={handleSave}
            />

            <CustomButton
              title="Cancel"
              variant="text"
              onPress={() => navigation.goBack()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 60,
  },
  backBtn: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    marginBottom: 12,
    letterSpacing: 0.8,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  typeBtn: {
    width: '47%',
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1.5,
    borderColor: 'transparent',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  typeIconBg: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  typeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  row: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  spacer: {
    width: 12,
  },
  saveButton: {
    marginTop: 24,
  },
});
