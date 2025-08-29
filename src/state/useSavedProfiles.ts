import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEY = 'saved_profiles';

export type SavedProfile = { username: string; display_name?: string };

export async function saveProfile(profile: SavedProfile) {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  const list: SavedProfile[] = raw ? JSON.parse(raw) : [];
  if (!list.find(p => p.username === profile.username)) {
    list.push(profile);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
}

export async function getSavedProfiles(): Promise<SavedProfile[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}
