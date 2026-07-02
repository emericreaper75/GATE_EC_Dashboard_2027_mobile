import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS } from '../styles/colors';
import { TYPOGRAPHY } from '../styles/typography';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import ChecklistScreen from '../screens/ChecklistScreen';
import PriorityBoardScreen from '../screens/PriorityBoardScreen';
import SubjectTrackerScreen from '../screens/SubjectTrackerScreen';
import PYQLogScreen from '../screens/PYQLogScreen';
import MockAnalyzerScreen from '../screens/MockAnalyzerScreen';
import FormulaSheetScreen from '../screens/FormulaSheetScreen';
import ErrorJournalScreen from '../screens/ErrorJournalScreen';
import WeeklyReviewScreen from '../screens/WeeklyReviewScreen';
import ReminderScreen from '../screens/ReminderScreen';
import SpacedRepetitionScreen from '../screens/SpacedRepetitionScreen';
import LearningNotesScreen from '../screens/LearningNotesScreen';
import FocusTimerScreen from '../screens/FocusTimerScreen';
import StrategyPlanScreen from '../screens/StrategyPlanScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MoreMenuScreen from '../screens/MoreMenuScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const STACK_OPTS = {
  headerStyle: { backgroundColor: COLORS.bg.elevated },
  headerTintColor: COLORS.text.primary,
  headerTitleStyle: { fontWeight: TYPOGRAPHY.weights.semibold, fontSize: TYPOGRAPHY.sizes.md },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: COLORS.bg.primary },
};

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={STACK_OPTS}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'GATE EC 2027' }} />
    </Stack.Navigator>
  );
}

function TasksStack() {
  return (
    <Stack.Navigator screenOptions={STACK_OPTS}>
      <Stack.Screen name="Checklist" component={ChecklistScreen} options={{ title: 'Daily Checklist' }} />
      <Stack.Screen name="PriorityBoard" component={PriorityBoardScreen} options={{ title: 'Priority Board' }} />
    </Stack.Navigator>
  );
}

function SubjectsStack() {
  return (
    <Stack.Navigator screenOptions={STACK_OPTS}>
      <Stack.Screen name="SubjectTracker" component={SubjectTrackerScreen} options={{ title: 'Subject Tracker' }} />
    </Stack.Navigator>
  );
}

function PYQStack() {
  return (
    <Stack.Navigator screenOptions={STACK_OPTS}>
      <Stack.Screen name="PYQLog" component={PYQLogScreen} options={{ title: 'PYQ Log' }} />
      <Stack.Screen name="MockAnalyzer" component={MockAnalyzerScreen} options={{ title: 'Mock Analyzer' }} />
    </Stack.Navigator>
  );
}

function MoreStack() {
  return (
    <Stack.Navigator screenOptions={STACK_OPTS}>
      <Stack.Screen name="MoreMenu" component={MoreMenuScreen} options={{ title: 'More' }} />
      <Stack.Screen name="ErrorJournal" component={ErrorJournalScreen} options={{ title: 'Error Journal' }} />
      <Stack.Screen name="FormulaSheet" component={FormulaSheetScreen} options={{ title: 'Formula Sheets' }} />
      <Stack.Screen name="WeeklyReview" component={WeeklyReviewScreen} options={{ title: 'Weekly Review' }} />
      <Stack.Screen name="Reminders" component={ReminderScreen} options={{ title: 'Reminders' }} />
      <Stack.Screen name="SpacedRepetition" component={SpacedRepetitionScreen} options={{ title: 'Recall Queue' }} />
      <Stack.Screen name="LearningNotes" component={LearningNotesScreen} options={{ title: 'Learning Notes' }} />
      <Stack.Screen name="FocusTimer" component={FocusTimerScreen} options={{ title: 'Focus Timer' }} />
      <Stack.Screen name="StrategyPlan" component={StrategyPlanScreen} options={{ title: 'Strategy Plan' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.bg.elevated,
          borderTopColor: COLORS.border,
          borderTopWidth: 0.5,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: COLORS.accent.primary,
        tabBarInactiveTintColor: COLORS.text.muted,
        tabBarLabelStyle: {
          fontSize: TYPOGRAPHY.sizes.xs,
          fontWeight: TYPOGRAPHY.weights.medium,
        },
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TasksStack"
        component={TasksStack}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="checkbox-marked-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SubjectsStack"
        component={SubjectsStack}
        options={{
          tabBarLabel: 'Subjects',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="PYQStack"
        component={PYQStack}
        options={{
          tabBarLabel: 'PYQ',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-list-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MoreStack"
        component={MoreStack}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dots-grid" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
