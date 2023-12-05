// utils/localStorageUtils.ts
const LOCAL_STORAGE_KEY = 'ai-gallery';

export const localStorageUtils = {
  setItem: (key: string, value: any) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(`${LOCAL_STORAGE_KEY}:${key}`, serializedValue);
    } catch (error) {
      console.error('Error setting localStorage item:', error);
    }
  },

  getItem: (key: string) => {
    try {
      const serializedValue = localStorage.getItem(`${LOCAL_STORAGE_KEY}:${key}`);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      console.error('Error getting localStorage item:', error);
      return null;
    }
  },

  removeItem: (key: string) => {
    try {
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}:${key}`);
    } catch (error) {
      console.error('Error removing localStorage item:', error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};
