import AsyncStorage from './easi6Storage';

const AUTHENTICATION_STORAGE_KEY = 'DriverState:Authentication';

export async function getAuthenticationToken() {
  try {
    const token = await AsyncStorage.getItem(AUTHENTICATION_STORAGE_KEY);
    if (token) {
      return JSON.parse(token);
    }
    return null;
  } catch (e) {
    return null;
  }
}

export async function setAuthenticationToken(token) {
  return AsyncStorage.setItem(AUTHENTICATION_STORAGE_KEY, JSON.stringify(token));
}

export async function clearAuthenticationToken() {
  return AsyncStorage.removeItem(AUTHENTICATION_STORAGE_KEY);
}

export async function getDriverId() {
  try {
    return await AsyncStorage.getItem('driverId');
  } catch (e) {
    return null;
  }
}
