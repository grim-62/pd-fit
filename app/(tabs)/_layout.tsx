import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';

const COLORS = {
  primary: '#004cca',
  white: '#ffffff',
  slate400: '#94a3b8',
  slate900: '#0f172a',
  blue50: '#eff6ff',
  blue600: '#2563eb',
  background: '#faf8ff',
  surface: '#ffffff',
  surfaceDark: '#0f172a',
};

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          isDark && styles.tabBarDark
        ],
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.blue600,
        tabBarInactiveTintColor: COLORS.slate400,
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <MaterialIcons name="grid-view" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="meal-history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <MaterialIcons name="history" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add-modal"
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => (
            <View style={styles.addIconContainer}>
              <MaterialIcons name="add-box" size={24} color={COLORS.white} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color }) => <MaterialIcons name="analytics" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="log-weight"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="weight-history"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="add-workout"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === 'ios' ? 88 : 70,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    elevation: 10,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    paddingTop: 8,
  },
  tabBarDark: {
    backgroundColor: COLORS.surfaceDark,
    borderTopColor: '#1e293b',
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
  iconContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  iconContainerFocused: {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
  },
  addIconContainer: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 12,
    marginBottom: 4,
  },
});
