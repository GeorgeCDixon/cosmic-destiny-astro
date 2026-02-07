import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileFormData, ReadingHistory, User } from '../types';

// Storage Keys
const KEYS = {
  USER: '@user',
  BIRTH_CHART: '@birth_chart',
  READING_HISTORY: '@reading_history',
  AUTH_TOKEN: '@auth_token',
};

// User Management
export const saveUser = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const userData = await AsyncStorage.getItem(KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const clearUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(KEYS.USER);
    await AsyncStorage.removeItem(KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error clearing user:', error);
  }
};

// Birth Chart Management
export const saveBirthChart = async (birthChart: ProfileFormData): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.BIRTH_CHART, JSON.stringify(birthChart));
  } catch (error) {
    console.error('Error saving birth chart:', error);
    throw error;
  }
};

export const getBirthChart = async (): Promise<ProfileFormData | null> => {
  try {
    const chartData = await AsyncStorage.getItem(KEYS.BIRTH_CHART);
    return chartData ? JSON.parse(chartData) : null;
  } catch (error) {
    console.error('Error getting birth chart:', error);
    return null;
  }
};

// Reading History Management
export const saveReadingToHistory = async (reading: ReadingHistory): Promise<void> => {
  try {
    const historyData = await AsyncStorage.getItem(KEYS.READING_HISTORY);
    const history: ReadingHistory[] = historyData ? JSON.parse(historyData) : [];
    
    // Add new reading to the beginning
    history.unshift(reading);
    
    await AsyncStorage.setItem(KEYS.READING_HISTORY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving reading to history:', error);
    throw error;
  }
};

export const getReadingHistory = async (): Promise<ReadingHistory[]> => {
  try {
    const historyData = await AsyncStorage.getItem(KEYS.READING_HISTORY);
    return historyData ? JSON.parse(historyData) : [];
  } catch (error) {
    console.error('Error getting reading history:', error);
    return [];
  }
};

export const clearReadingHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(KEYS.READING_HISTORY);
  } catch (error) {
    console.error('Error clearing reading history:', error);
  }
};

// Auth Token Management
export const saveAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.AUTH_TOKEN, token);
  } catch (error) {
    console.error('Error saving auth token:', error);
    throw error;
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Clear All Data (for sign out)
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      KEYS.USER,
      KEYS.BIRTH_CHART,
      KEYS.READING_HISTORY,
      KEYS.AUTH_TOKEN,
    ]);
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
};