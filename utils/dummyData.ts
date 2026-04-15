// Types that map to future Database Models
export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  height: number; // cm
  weight: number; // kg
  goalWeight: number; // kg
  dailyCalorieGoal: number;
};

export type Meal = {
  id: string;
  userId: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  time: string;
  date: string; // ISO or readable group string like 'Today'
  imageUri?: string;
};

export type Workout = {
  id: string;
  userId: string;
  title: string;
  duration: number; // minutes
  caloriesBurned: number;
  type: 'cardio' | 'strength' | 'flexibility' | 'other';
  date: string;
  groupDate: string;
  notes?: string;
};

// Dummy Data
export const currentUser: User = {
  id: 'usr_1',
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  joinDate: '2025-01-10',
  height: 175,
  weight: 75,
  goalWeight: 70,
  dailyCalorieGoal: 2400,
};

export const DUMMY_MEALS: Meal[] = [
  {
    id: 'm_1',
    userId: 'usr_1',
    name: 'Oatmeal & Berries',
    calories: 320,
    protein: 10,
    carbs: 55,
    fats: 6,
    time: '08:00 AM',
    date: 'Today',
  },
  {
    id: 'm_2',
    userId: 'usr_1',
    name: 'Grilled Chicken Salad',
    calories: 450,
    protein: 40,
    carbs: 15,
    fats: 22,
    time: '01:00 PM',
    date: 'Today',
  },
  {
    id: 'm_3',
    userId: 'usr_1',
    name: 'Protein Shake',
    calories: 150,
    protein: 25,
    carbs: 5,
    fats: 2,
    time: '04:30 PM',
    date: 'Today',
  },
  {
    id: 'm_4',
    userId: 'usr_1',
    name: 'Salmon & Quinoa',
    calories: 600,
    protein: 45,
    carbs: 40,
    fats: 25,
    time: '08:00 PM',
    date: 'Yesterday',
  },
];

export const DUMMY_WORKOUTS: Workout[] = [
  {
    id: 'w_1',
    userId: 'usr_1',
    title: 'Morning Run',
    duration: 45,
    caloriesBurned: 420,
    type: 'cardio',
    date: 'Today, 07:00 AM',
    groupDate: 'Today',
    notes: 'Felt great, pushed the pace.'
  },
  {
    id: 'w_2',
    userId: 'usr_1',
    title: 'Upper Body Strength',
    duration: 60,
    caloriesBurned: 350,
    type: 'strength',
    date: 'Yesterday, 06:00 PM',
    groupDate: 'Yesterday',
    notes: 'Increased bench press by 5 lbs.'
  },
  {
    id: 'w_3',
    userId: 'usr_1',
    title: 'Yoga Flow',
    duration: 30,
    caloriesBurned: 120,
    type: 'flexibility',
    date: 'Yesterday, 08:00 AM',
    groupDate: 'Yesterday'
  },
  {
    id: 'w_4',
    userId: 'usr_1',
    title: 'Cycling',
    duration: 90,
    caloriesBurned: 700,
    type: 'cardio',
    date: 'Sun, Oct 15',
    groupDate: 'Earlier'
  },
];

export const DUMMY_PLANS = [
  {
    id: 'p_1',
    title: 'Morning Cycling',
    subtitle: '45 mins • Cardio',
    icon: 'bicycle-outline',
    color: '#4ADE80' // Using primary
  },
  {
    id: 'p_2',
    title: 'Healthy Lunch',
    subtitle: 'Chicken Salad • 400 kcal',
    icon: 'restaurant-outline',
    color: '#3B82F6' // Using blue
  }
];

export const DUMMY_STATS = {
  totalCaloriesBurned: 1200,
  workoutsCompleted: 45,
  activeMinutes: 340, // Keeping old field just in case
  streakDays: 12, // Keeping old field just in case
  activeStreak: 12,
  totalMinutesActive: 2400,
  weeklyActivity: [
    { day: 'Mon', value: 120 },
    { day: 'Tue', value: 80 },
    { day: 'Wed', value: 150 },
    { day: 'Thu', value: 60 },
    { day: 'Fri', value: 200 },
    { day: 'Sat', value: 45 },
    { day: 'Sun', value: 90 }
  ]
};
