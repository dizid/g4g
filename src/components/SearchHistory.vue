<!--
  SearchHistory Component

  Displays recent search history with:
  - List of recent searches
  - Click to repeat search
  - Remove individual items
  - Clear all history button

  Emits:
  - search: When a history item is clicked
-->

<template>
  <div
    v-if="hasHistory"
    class="glass-card p-6 animate-slide-up"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-white flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Recent Searches
      </h3>

      <!-- Clear all button -->
      <button
        @click="clearAll"
        class="text-sm text-white/50 hover:text-red-400 transition-colors duration-200"
      >
        Clear All
      </button>
    </div>

    <!-- History list -->
    <div class="space-y-2">
      <div
        v-for="(term, index) in recentSearches"
        :key="index"
        class="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 group"
      >
        <!-- Search icon -->
        <svg class="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        <!-- Search term - clickable -->
        <button
          @click="repeatSearch(term)"
          class="flex-1 text-left text-white/80 hover:text-white transition-colors duration-200"
        >
          {{ term }}
        </button>

        <!-- Remove button -->
        <button
          @click="removeItem(term)"
          class="opacity-0 group-hover:opacity-100 text-white/40 hover:text-red-400 transition-all duration-200"
          aria-label="Remove from history"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * SearchHistory Component Script
 *
 * Manages display and interaction with search history
 * Uses Pinia store for state management
 */

import { computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';

// Emit definition
const emit = defineEmits(['search']);

// Store access
const gameStore = useGameStore();

// Computed: Get recent searches from store
const recentSearches = computed(() => {
  return gameStore.recentSearches;
});

// Computed: Check if there's any history
const hasHistory = computed(() => {
  return recentSearches.value.length > 0;
});

/**
 * Repeat a search from history
 * @param {string} term - Search term to repeat
 */
function repeatSearch(term) {
  emit('search', term);
}

/**
 * Remove a single item from history
 * @param {string} term - Search term to remove
 */
function removeItem(term) {
  gameStore.removeFromHistory(term);
}

/**
 * Clear all search history
 */
function clearAll() {
  if (confirm('Are you sure you want to clear all search history?')) {
    gameStore.clearHistory();
  }
}
</script>
