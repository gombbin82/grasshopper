import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '../models/UserProfile';

const PROFILE_KEY = '@user_profile';

export const ProfileStorage = {
  async save(profile: UserProfile): Promise<void> {
    try {
      const jsonValue = JSON.stringify(profile);
      await AsyncStorage.setItem(PROFILE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  },

  async load(): Promise<UserProfile | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(PROFILE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error loading profile:', error);
      return null;
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(PROFILE_KEY);
    } catch (error) {
      console.error('Error clearing profile:', error);
    }
  },
};
