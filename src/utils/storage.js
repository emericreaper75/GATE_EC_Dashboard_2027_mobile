import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId } from './helpers';
import {
  INITIAL_TASKS,
  INITIAL_PRIORITY_BOARD,
  INITIAL_FORMULAS,
  INITIAL_REMINDERS,
  INITIAL_MASTERY,
  INITIAL_MILESTONES,
  DEFAULT_SETTINGS,
} from './initialData';

export const STORE_KEYS = {
  tasks: 'gate:tasks',
  pyqLogs: 'gate:pyq_logs',
  mocks: 'gate:mocks',
  formulas: 'gate:formulas',
  errors: 'gate:errors',
  weeklyReviews: 'gate:weekly_reviews',
  mastery: 'gate:mastery',
  priorityBoard: 'gate:priority_board',
  reminders: 'gate:reminders',
  milestones: 'gate:milestones',
  notes: 'gate:notes',
  settings: 'gate:settings',
};

function getDefaults(key) {
  switch (key) {
    case 'tasks': return INITIAL_TASKS;
    case 'priorityBoard': return INITIAL_PRIORITY_BOARD;
    case 'formulas': return INITIAL_FORMULAS;
    case 'reminders': return INITIAL_REMINDERS;
    case 'mastery': return INITIAL_MASTERY;
    case 'milestones': return INITIAL_MILESTONES;
    case 'settings': return DEFAULT_SETTINGS;
    case 'pyqLogs':
    case 'mocks':
    case 'errors':
    case 'weeklyReviews':
    case 'notes':
      return [];
    default:
      return [];
  }
}

export const storage = {
  async get(key) {
    try {
      const data = await AsyncStorage.getItem(STORE_KEYS[key]);
      if (data !== null) return JSON.parse(data);
      return getDefaults(key);
    } catch (error) {
      return getDefaults(key);
    }
  },

  async set(key, value) {
    try {
      await AsyncStorage.setItem(STORE_KEYS[key], JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  },

  async add(key, item) {
    try {
      const arr = await this.get(key);
      const newItem = { ...item, id: item.id || generateId() };
      const updated = [...(Array.isArray(arr) ? arr : []), newItem];
      await this.set(key, updated);
      return newItem.id;
    } catch (error) {
      return null;
    }
  },

  async update(key, id, changes) {
    try {
      const arr = await this.get(key);
      const updated = Array.isArray(arr)
        ? arr.map(item => item.id === id ? { ...item, ...changes } : item)
        : arr;
      await this.set(key, updated);
      return true;
    } catch (error) {
      return false;
    }
  },

  async delete(key, id) {
    try {
      const arr = await this.get(key);
      const updated = Array.isArray(arr) ? arr.filter(item => item.id !== id) : arr;
      await this.set(key, updated);
      return true;
    } catch (error) {
      return false;
    }
  },

  async exportAll() {
    try {
      const allData = {};
      for (const key of Object.keys(STORE_KEYS)) {
        allData[key] = await this.get(key);
      }
      return JSON.stringify(allData, null, 2);
    } catch (error) {
      return null;
    }
  },

  async importAll(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      for (const [key, value] of Object.entries(data)) {
        if (STORE_KEYS[key]) {
          await this.set(key, value);
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  },

  async resetAll() {
    try {
      await AsyncStorage.multiRemove(Object.values(STORE_KEYS));
      return true;
    } catch (error) {
      return false;
    }
  },
};

export async function initializeDefaults() {
  const keys = Object.keys(STORE_KEYS);
  for (const key of keys) {
    const existing = await AsyncStorage.getItem(STORE_KEYS[key]);
    if (existing === null) {
      const defaults = getDefaults(key);
      await AsyncStorage.setItem(STORE_KEYS[key], JSON.stringify(defaults));
    }
  }
}
