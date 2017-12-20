import {AsyncStorage} from 'react-native';

const AUTHENTICATION_STORAGE_KEY = 'LoginState:Authentication';

export async function getAuthenticationToken() {
  const token = await AsyncStorage.getItem(AUTHENTICATION_STORAGE_KEY);
  if (token) {
    return JSON.parse(token);
  }
  return null;
}

export async function setAuthenticationToken(token) {
  return AsyncStorage.setItem(AUTHENTICATION_STORAGE_KEY, JSON.stringify(token));
}

export async function clearAuthenticationToken() {
  return AsyncStorage.removeItem(AUTHENTICATION_STORAGE_KEY);
}
