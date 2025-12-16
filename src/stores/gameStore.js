/**
 * Pinia Store - Game Store
 *
 * Manages the application state for:
 * - Currently selected game
 * - List of available games with their configurations
 * - Search history tracking
 * - Favorite games management
 * - User preferences
 */

import { defineStore } from 'pinia';
import { GAMES } from '@/config/games';
import { STORAGE_KEYS, PREFERENCES_DEFAULTS } from '@/constants';

export const useGameStore = defineStore('game', {
  // State: Define reactive data properties
  state: () => ({
    // Currently selected game (default to 'all')
    selectedGame: 'all',

    // Loading state for search engine initialization
    isLoading: false,

    // Available games configuration (imported from config)
    games: GAMES,

    // Search history - stored locally and in state
    searchHistory: [],

    // Favorite games list
    favoriteGames: [],

    // User preferences
    preferences: {
      maxHistoryItems: PREFERENCES_DEFAULTS.MAX_HISTORY_ITEMS,
      showSearchSuggestions: PREFERENCES_DEFAULTS.SHOW_SEARCH_SUGGESTIONS,
      theme: PREFERENCES_DEFAULTS.THEME,
    }
  }),

  // Getters: Computed properties based on state
  getters: {
    /**
     * Get the currently selected game object
     * @returns {Object} Current game configuration
     */
    currentGame: (state) => {
      return state.games.find(game => game.id === state.selectedGame) || state.games[0];
    },

    /**
     * Get all games in a specific category
     * @returns {Function} Function that filters games by category
     */
    gamesByCategory: (state) => (category) => {
      return state.games.filter(game => game.category === category);
    },

    /**
     * Get favorite games objects
     * @returns {Array} Array of favorite game objects
     */
    favoritesGamesObjects: (state) => {
      return state.games.filter(game => state.favoriteGames.includes(game.id));
    },

    /**
     * Check if a game is favorited
     * @returns {Function} Function that checks if game is favorite
     */
    isFavorite: (state) => (gameId) => {
      return state.favoriteGames.includes(gameId);
    },

    /**
     * Get unique game categories
     * @returns {Array} Array of unique categories
     */
    categories: (state) => {
      return [...new Set(state.games.map(game => game.category))];
    },

    /**
     * Get recent search history (limited by preferences)
     * @returns {Array} Recent search terms
     */
    recentSearches: (state) => {
      return state.searchHistory.slice(0, state.preferences.maxHistoryItems);
    }
  },

  // Actions: Methods that can modify state
  actions: {
    /**
     * Set the selected game and load its search engine
     * @param {string} gameId - The ID of the game to select
     */
    selectGame(gameId) {
      this.selectedGame = gameId;
      this.loadSearchEngine();
    },

    /**
     * Load the Google Programmable Search Engine script for current game
     * Removes previous script and cleans up Google's global state before loading new one
     */
    loadSearchEngine() {
      this.isLoading = true;

      // Remove existing Google CSE scripts to prevent conflicts
      const existingScripts = document.querySelectorAll('script[src*="cse.google.com"]');
      existingScripts.forEach(script => script.remove());

      // Remove existing CSE-generated DOM elements
      const cseSelectors = [
        '.gsc-control-cse',
        '.gsc-results-wrapper-overlay',
        '.gsc-modal-background-image'
      ];
      cseSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove());
      });

      // Clear Google's global CSE state to force fresh initialization
      if (window.__gcse) {
        delete window.__gcse;
      }
      if (window.google && window.google.search) {
        delete window.google.search;
      }

      // Get current game's search engine ID
      const game = this.currentGame;
      const scriptUrl = `https://cse.google.com/cse.js?cx=${game.searchEngineId}`;

      // Small delay to ensure cleanup is complete before loading new script
      setTimeout(() => {
        // Create and inject new script
        const script = document.createElement('script');
        script.setAttribute('src', scriptUrl);
        script.setAttribute('async', 'true');

        // Handle script load completion
        script.onload = () => {
          this.isLoading = false;
        };

        script.onerror = () => {
          this.isLoading = false;
          console.error('Failed to load search engine');
        };

        document.head.appendChild(script);
      }, 50);
    },

    /**
     * Toggle a game in favorites list
     * @param {string} gameId - The ID of the game to toggle
     */
    toggleFavorite(gameId) {
      const index = this.favoriteGames.indexOf(gameId);
      if (index > -1) {
        // Remove from favorites
        this.favoriteGames.splice(index, 1);
      } else {
        // Add to favorites
        this.favoriteGames.push(gameId);
      }
      // Persist to localStorage
      this.saveFavorites();
    },

    /**
     * Add a search term to history
     * @param {string} searchTerm - The search term to add
     */
    addToHistory(searchTerm) {
      if (!searchTerm || searchTerm.trim() === '') return;

      // Remove duplicate if exists
      const index = this.searchHistory.indexOf(searchTerm);
      if (index > -1) {
        this.searchHistory.splice(index, 1);
      }

      // Add to beginning of array
      this.searchHistory.unshift(searchTerm);

      // Limit history size
      if (this.searchHistory.length > this.preferences.maxHistoryItems) {
        this.searchHistory = this.searchHistory.slice(0, this.preferences.maxHistoryItems);
      }

      // Persist to localStorage
      this.saveHistory();
    },

    /**
     * Clear search history
     */
    clearHistory() {
      this.searchHistory = [];
      localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
    },

    /**
     * Remove a single item from search history
     * @param {string} searchTerm - The search term to remove
     */
    removeFromHistory(searchTerm) {
      const index = this.searchHistory.indexOf(searchTerm);
      if (index > -1) {
        this.searchHistory.splice(index, 1);
        this.saveHistory();
      }
    },

    /**
     * Save search history to localStorage
     */
    saveHistory() {
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(this.searchHistory));
    },

    /**
     * Load search history from localStorage
     */
    loadHistory() {
      const saved = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
      if (saved) {
        try {
          this.searchHistory = JSON.parse(saved);
        } catch (e) {
          console.error('Failed to load search history', e);
        }
      }
    },

    /**
     * Save favorite games to localStorage
     */
    saveFavorites() {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(this.favoriteGames));
    },

    /**
     * Load favorite games from localStorage
     */
    loadFavorites() {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (saved) {
        try {
          this.favoriteGames = JSON.parse(saved);
        } catch (e) {
          console.error('Failed to load favorites', e);
        }
      }
    },

    /**
     * Save user preferences to localStorage
     */
    savePreferences() {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(this.preferences));
    },

    /**
     * Load user preferences from localStorage
     */
    loadPreferences() {
      const saved = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (saved) {
        try {
          this.preferences = { ...this.preferences, ...JSON.parse(saved) };
        } catch (e) {
          console.error('Failed to load preferences', e);
        }
      }
    },

    /**
     * Execute a search programmatically
     * @param {string} query - The search query to execute
     */
    executeSearch(query) {
      if (!query || query.trim() === '') return;

      // Add to search history
      this.addToHistory(query);

      // Trigger search in Google CSE
      if (window.google && window.google.search && window.google.search.cse) {
        const element = document.querySelector('input.gsc-input');
        if (element) {
          element.value = query;
          const event = new Event('input', { bubbles: true });
          element.dispatchEvent(event);

          // Trigger search button click or submit
          const searchButton = document.querySelector('button.gsc-search-button');
          if (searchButton) {
            searchButton.click();
          }
        }
      }
    },

    /**
     * Initialize store - load all persisted data
     * Call this when the app starts
     */
    initialize() {
      this.loadHistory();
      this.loadFavorites();
      this.loadPreferences();
    }
  }
});
