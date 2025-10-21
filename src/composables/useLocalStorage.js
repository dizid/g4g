/**
 * LocalStorage Composable
 *
 * Provides reactive localStorage utilities with automatic
 * serialization/deserialization and error handling
 */

import { ref, watch } from 'vue';

/**
 * Create a reactive ref synced with localStorage
 * @param {string} key - localStorage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {Object} Reactive storage ref and utilities
 */
export function useLocalStorage(key, defaultValue) {
  // Initialize ref with stored value or default
  const storedValue = ref(getStoredValue(key, defaultValue));

  /**
   * Get value from localStorage with error handling
   * @param {string} key - Storage key
   * @param {*} fallback - Fallback value
   * @returns {*} Parsed value or fallback
   */
  function getStoredValue(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return fallback;
    }
  }

  /**
   * Save value to localStorage
   * @param {*} value - Value to save
   */
  function saveValue(value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }

  /**
   * Remove value from localStorage
   */
  function removeValue() {
    try {
      localStorage.removeItem(key);
      storedValue.value = defaultValue;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }

  // Watch for changes and sync to localStorage
  watch(
    storedValue,
    (newValue) => {
      saveValue(newValue);
    },
    { deep: true }
  );

  return {
    value: storedValue,
    remove: removeValue
  };
}

/**
 * Manage an array in localStorage
 * @param {string} key - localStorage key
 * @param {number} maxItems - Maximum items to store
 * @returns {Object} Array management utilities
 */
export function useStorageArray(key, maxItems = 10) {
  const items = ref(getStoredValue(key, []));

  function getStoredValue(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return fallback;
    }
  }

  function saveItems() {
    try {
      localStorage.setItem(key, JSON.stringify(items.value));
    } catch (error) {
      console.error(`Error saving array to localStorage:`, error);
    }
  }

  /**
   * Add item to array (at beginning)
   * @param {*} item - Item to add
   */
  function add(item) {
    // Remove if already exists
    remove(item);

    // Add to beginning
    items.value.unshift(item);

    // Limit size
    if (items.value.length > maxItems) {
      items.value = items.value.slice(0, maxItems);
    }

    saveItems();
  }

  /**
   * Remove item from array
   * @param {*} item - Item to remove
   */
  function remove(item) {
    const index = items.value.indexOf(item);
    if (index > -1) {
      items.value.splice(index, 1);
      saveItems();
    }
  }

  /**
   * Clear all items
   */
  function clear() {
    items.value = [];
    localStorage.removeItem(key);
  }

  /**
   * Check if item exists
   * @param {*} item - Item to check
   * @returns {boolean} True if exists
   */
  function has(item) {
    return items.value.includes(item);
  }

  return {
    items,
    add,
    remove,
    clear,
    has
  };
}
