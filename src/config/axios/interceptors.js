import * as SessionManager from '../../managers/SessionManager';
import * as storageKeys from '../../utils/constants/storageKeys';

export const requestInterceptor = async (config) => {
    const apiKey = await SessionManager.getData(storageKeys.X_API_KEY_STORAGE_KEY);
    return {
        ...config,
        headers: {
            ...config.headers,
            'X-Api-Key': apiKey
        }
    }
}