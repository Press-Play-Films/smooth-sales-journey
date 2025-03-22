
/**
 * Browser storage utilities with fallbacks
 */
import { isBrowser } from './core';

// Safe localStorage wrapper with fallbacks
export const safeStorage = {
  getItem: (key: string, defaultValue: string = ''): string => {
    if (!isBrowser) return defaultValue;
    try {
      const value = localStorage.getItem(key);
      return value !== null ? value : defaultValue;
    } catch (e) {
      console.error('Error accessing localStorage:', e);
      return defaultValue;
    }
  },
  
  setItem: (key: string, value: string): boolean => {
    if (!isBrowser) return false;
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.error('Error writing to localStorage:', e);
      return false;
    }
  },
  
  removeItem: (key: string): boolean => {
    if (!isBrowser) return false;
    try {
      localStorage.setItem(key, '');
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Error removing localStorage item:', e);
      return false;
    }
  }
};
