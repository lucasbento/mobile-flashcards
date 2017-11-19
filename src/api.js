import { AsyncStorage } from 'react-native';

export const endpoints = {
  deck: () => 'deck',
};

export default {
  get: async ({ url }) => JSON.parse(await AsyncStorage.getItem(url)) || [],
  post: async ({ url, data }) => {
    const item = JSON.parse(await AsyncStorage.getItem(url));

    if (!item) {
      await AsyncStorage.setItem(url, JSON.stringify([data]));

      return data;
    }

    await AsyncStorage.setItem(url, JSON.stringify([item, data]));

    return data;
  },
};