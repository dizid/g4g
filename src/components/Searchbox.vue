<!--
  Searchbox Component

  Google Custom Search Engine integration
  Displays:
  - Search input box
  - Search results
  - Loading state while search engine initializes

  The component uses Google's Programmable Search Engine (CSE)
  which is loaded dynamically based on the selected game
-->

<template>
  <div class="searchbox-container">
    <!-- Loading state -->
    <div
      v-if="isLoading"
      class="flex items-center justify-center py-12"
    >
      <div class="spinner"></div>
      <span class="ml-3 text-white/70">Loading search engine...</span>
    </div>

    <!-- Google CSE Search Box -->
    <div class="text-white m-6 animate-fade-in">
      <div id="searchbox" class="gcse-searchbox"></div>
    </div>

    <!-- Google CSE Search Results -->
    <div class="animate-fade-in">
      <div class="gcse-searchresults"></div>
    </div>
  </div>
</template>

<script setup>
/**
 * Searchbox Component Script
 *
 * Integrates with Google Custom Search Engine
 * Monitors loading state from store
 */

import { computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';

// Access game store for loading state
const gameStore = useGameStore();

// Computed: Get loading state from store
const isLoading = computed(() => {
  return gameStore.isLoading;
});
</script>

<style scoped>
/* Component-specific styles for Google CSE integration */

/* Ensure search box and results are properly styled */
.searchbox-container {
  min-height: 200px;
}

/* Override some Google CSE default styles to match our theme */
:deep(.gsc-control-cse) {
  background-color: transparent !important;
  border: none !important;
  padding: 0 !important;
}

:deep(.gsc-input-box) {
  background-color: rgba(255, 255, 255, 0.05) !important;
  border: 2px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 12px !important;
}

:deep(.gsc-input) {
  color: white !important;
}

:deep(.gsc-search-button) {
  background: linear-gradient(to right, #6366f1, #8b5cf6) !important;
  border: none !important;
  border-radius: 8px !important;
}

:deep(.gsc-results) {
  background-color: transparent !important;
}

:deep(.gs-title) {
  color: #6366f1 !important;
}

:deep(.gs-snippet) {
  color: rgba(255, 255, 255, 0.7) !important;
}
</style>
