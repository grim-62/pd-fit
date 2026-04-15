import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Header } from '../components/Header';
import { InputField } from '../components/InputField';
import { CustomButton } from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme, ThemeColors } from '../hooks/ThemeProvider';

export const AddMealScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handlePickImage = () => {
    // Placeholder — in real app use expo-image-picker
    Alert.alert('Image Picker', 'This would open the camera or gallery.');
  };

  const handleSave = () => {
    if (!mealName.trim()) {
      Alert.alert('Missing Info', 'Please enter a meal name.');
      return;
    }
    // In real app, save to state/DB here
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

          <Header title="Add Meal" subtitle="Log what you eat to stay on track." />

          {/* Photo Upload */}
          <View style={styles.photoSection}>
            <TouchableOpacity style={styles.photoUpload} onPress={handlePickImage} activeOpacity={0.7}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.photoPreview} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <View style={styles.cameraCircle}>
                    <Ionicons name="camera-outline" size={28} color={colors.primary} />
                  </View>
                  <Text style={styles.photoText}>Tap to add a photo</Text>
                  <Text style={styles.photoSubtext}>Optional</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <InputField
              label="Meal Name"
              placeholder="e.g. Grilled Chicken Salad"
              value={mealName}
              onChangeText={setMealName}
            />

            <InputField
              label="Calories (kcal)"
              placeholder="e.g. 450"
              keyboardType="numeric"
              value={calories}
              onChangeText={setCalories}
            />

            <View style={styles.row}>
              <View style={styles.flex1}>
                <InputField
                  label="Protein (g)"
                  placeholder="e.g. 30"
                  keyboardType="numeric"
                  value={protein}
                  onChangeText={setProtein}
                />
              </View>
              <View style={styles.spacer} />
              <View style={styles.flex1}>
                <InputField
                  label="Carbs (g)"
                  placeholder="e.g. 40"
                  keyboardType="numeric"
                  value={carbs}
                  onChangeText={setCarbs}
                />
              </View>
            </View>

            <InputField
              label="Fats (g)"
              placeholder="e.g. 15"
              keyboardType="numeric"
              value={fats}
              onChangeText={setFats}
            />

            <CustomButton
              title="Save Meal"
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
  // Photo
  photoSection: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  photoUpload: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 20,
    height: 160,
    overflow: 'hidden',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  photoPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  photoText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  photoSubtext: {
    fontSize: 12,
    color: colors.outline,
    marginTop: 2,
  },
  // Form
  formContainer: {
    paddingHorizontal: 24,
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
