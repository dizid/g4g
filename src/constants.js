/**
 * Application Constants
 *
 * Centralized constants used throughout the application
 * for configuration, animation timings, and storage keys
 */

// LocalStorage Keys
export const STORAGE_KEYS = {
  SEARCH_HISTORY: 'g4g_search_history',
  FAVORITES: 'g4g_favorites',
  PREFERENCES: 'g4g_preferences',
};

// Animation Timings (in milliseconds)
export const ANIMATION_TIMINGS = {
  TRANSITION_DURATION: 200,
  SLIDE_UP_DURATION: 600,
  FADE_IN_DURATION: 300,
  LOADING_TIMEOUT: 5000, // CSE loading timeout
};

// User Preferences Defaults
export const PREFERENCES_DEFAULTS = {
  MAX_HISTORY_ITEMS: 10,
  SHOW_SEARCH_SUGGESTIONS: true,
  THEME: 'dark',
};

// CSE Configuration
export const CSE_CONFIG = {
  MAX_RETRIES: 3,
  LOAD_TIMEOUT: 5000,
};

// Game Categories
export const GAME_CATEGORIES = {
  GENERAL: 'general',
  BATTLE_ROYALE: 'battle-royale',
  SANDBOX: 'sandbox',
  STRATEGY: 'strategy',
  FPS: 'fps',
  MOBA: 'moba',
  RPG: 'rpg',
};
