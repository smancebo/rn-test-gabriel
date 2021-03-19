import AsyncStorage from '@react-native-async-storage/async-storage';
import * as servicesKeys from '../utils/constants/services';
import * as storageKeys from '../utils/constants/storageKeys';

export const setData = async (key, value) => {
    await AsyncStorage.setItem(key, value);
};

export const getData = async (key) => {
    const value = await AsyncStorage.getItem(key);
    return value;
}

export const initializeDefaultSource = async () => {
    const _value = await AsyncStorage.getItem(storageKeys.NEWS_SOURCE_STORAGE_KEY);
    if (!_value) {
        await AsyncStorage.setItem(storageKeys.NEWS_SOURCE_STORAGE_KEY, servicesKeys.DEFAULT_SOURCE_VALUE);
    }
}