import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen } from '../screens/DashboardScreen';
import { AddMealScreen } from '../screens/AddMealScreen';
import { MealHistoryScreen } from '../screens/MealHistoryScreen';
import { AddWorkoutScreen } from '../screens/AddWorkoutScreen';
import { WorkoutHistoryScreen } from '../screens/WorkoutHistoryScreen';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/ThemeProvider';
import { View, Platform } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Diet') {
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'Workout') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'Analytics') {
            iconName = focused ? 'pie-chart' : 'pie-chart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <View style={focused ? {
              backgroundColor: colors.secondaryContainer,
              paddingHorizontal: 16,
              paddingVertical: 6,
              borderRadius: 100,
            } : undefined}>
              <Ionicons name={iconName} size={22} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.outline,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: -2,
        },
        tabBarStyle: {
          backgroundColor: colors.surfaceContainerLowest,
          borderTopWidth: 0, // No-line rule
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          elevation: 0,
          shadowColor: colors.text,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.04,
          shadowRadius: 16,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Diet" component={MealHistoryScreen} />
      <Tab.Screen name="Workout" component={WorkoutHistoryScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { colors, isDarkMode } = useTheme();

  const navTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    dark: isDarkMode,
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      primary: colors.primary,
      background: colors.background,
      card: colors.surfaceContainerLowest,
      text: colors.text,
      border: 'transparent',
      notification: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen
          name="AddMeal"
          component={AddMealScreen}
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="AddWorkout"
          component={AddWorkoutScreen}
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
