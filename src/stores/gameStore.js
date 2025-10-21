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

export const useGameStore = defineStore('game', {
  // State: Define reactive data properties
  state: () => ({
    // Currently selected game (default to 'all')
    selectedGame: 'all',

    // Loading state for search engine initialization
    isLoading: false,

    // Available games configuration with Google Programmable Search Engine IDs
    games: [
      {
        id: 'all',
        name: 'All Games',
        icon: '🎮',
        description: 'Search across all gaming content',
        searchEngineId: 'a9a230432b58ecd21',
        color: 'from-indigo-500 to-purple-600',
        category: 'general',
      },
      {
        id: 'fortnite',
        name: 'Fortnite',
        icon: '⚡',
        description: 'Battle Royale tips, guides & news',
        searchEngineId: '22f2b892095830119',
        color: 'from-blue-500 to-cyan-500',
        category: 'battle-royale',
      },
      {
        id: 'minecraft',
        name: 'Minecraft',
        icon: '⛏️',
        description: 'Builds, mods & crafting guides',
        searchEngineId: '9602c93f57213795b',
        color: 'from-green-500 to-emerald-600',
        category: 'sandbox',
      },
      {
        id: 'clashroyale',
        name: 'Clash Royale',
        icon: '👑',
        description: 'Deck strategies & card guides',
        searchEngineId: '078e1680c0ebaf715',
        color: 'from-orange-500 to-red-500',
        category: 'strategy',
      },
      {
        id: 'destiny2',
        name: 'Destiny 2',
        icon: '🌟',
        description: 'Raids, weapons & exotic guides',
        searchEngineId: '8ecad2f2d493f4ab5',
        color: 'from-purple-500 to-pink-500',
        category: 'fps',
      },
      {
        id: 'valorant',
        name: 'Valorant',
        icon: '🎯',
        description: 'Agent guides & tactical tips',
        searchEngineId: 'a9a230432b58ecd21', // Using default for now
        color: 'from-red-500 to-rose-600',
        category: 'fps',
      },
      {
        id: 'leagueoflegends',
        name: 'League of Legends',
        icon: '⚔️',
        description: 'Champion builds & strategies',
        searchEngineId: 'a9a230432b58ecd21', // Using default for now
        color: 'from-yellow-500 to-amber-600',
        category: 'moba',
      },
      {
        id: 'roblox',
        name: 'Roblox',
        icon: '🎲',
        description: 'Game guides & creation tips',
        searchEngineId: 'a9a230432b58ecd21', // Using default for now
        color: 'from-pink-500 to-fuchsia-600',
        category: 'sandbox',
      },
      {
        id: 'apexlegends',
        name: 'Apex Legends',
        icon: '🔫',
        description: 'Legend guides & battle strategies',
        searchEngineId: 'a9a230432b58ecd21', // Using default for now
        color: 'from-red-600 to-orange-600',
        category: 'battle-royale',
      },
      {
        id: 'genshinimpact',
        name: 'Genshin Impact',
        icon: '✨',
        description: 'Character builds & world guides',
        searchEngineId: 'a9a230432b58ecd21', // Using default for now
        color: 'from-cyan-500 to-blue-600',
        category: 'rpg',
      },
    ],

    // Search history - stored locally and in state
    searchHistory: [],

    // Favorite games list
    favoriteGames: [],

    // User preferences
    preferences: {
      maxHistoryItems: 10,
      showSearchSuggestions: true,
      theme: 'dark',
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
     * Removes previous script and loads new one
     */
    loadSearchEngine() {
      this.isLoading = true;

      // Remove existing Google CSE scripts to prevent conflicts
      const existingScripts = document.querySelectorAll('script[src*="cse.google.com"]');
      existingScripts.forEach(script => script.remove());

      // Remove existing CSE elements
      const existingCse = document.querySelectorAll('.gsc-control-cse');
      existingCse.forEach(element => element.remove());

      // Get current game's search engine ID
      const game = this.currentGame;
      const scriptUrl = `https://cse.google.com/cse.js?cx=${game.searchEngineId}`;

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
      localStorage.removeItem('g4g_search_history');
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
      localStorage.setItem('g4g_search_history', JSON.stringify(this.searchHistory));
    },

    /**
     * Load search history from localStorage
     */
    loadHistory() {
      const saved = localStorage.getItem('g4g_search_history');
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
      localStorage.setItem('g4g_favorites', JSON.stringify(this.favoriteGames));
    },

    /**
     * Load favorite games from localStorage
     */
    loadFavorites() {
      const saved = localStorage.getItem('g4g_favorites');
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
      localStorage.setItem('g4g_preferences', JSON.stringify(this.preferences));
    },

    /**
     * Load user preferences from localStorage
     */
    loadPreferences() {
      const saved = localStorage.getItem('g4g_preferences');
      if (saved) {
        try {
          this.preferences = { ...this.preferences, ...JSON.parse(saved) };
        } catch (e) {
          console.error('Failed to load preferences', e);
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
