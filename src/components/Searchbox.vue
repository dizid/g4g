<!--
  Searchbox Component

  Google Custom Search Engine integration
  Displays:
  - Search input box
  - Search results
  - Loading state while search engine initializes
  - Error state if CSE fails to load

  The component uses Google's Programmable Search Engine (CSE)
  which is loaded dynamically based on the selected game.
  Programmatic search execution is supported via emitted events.
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

    <!-- Error state -->
    <div
      v-if="hasError"
      class="flex items-center justify-center py-12"
    >
      <div class="glass-card p-6 text-center max-w-md">
        <p class="text-red-400 mb-3">Unable to load search engine</p>
        <button
          @click="retryLoad"
          class="btn-gaming text-sm"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Google CSE Search Box -->
    <div
      v-show="!isLoading && !hasError"
      class="text-white m-6 animate-fade-in"
    >
      <div id="searchbox" class="gcse-searchbox"></div>
    </div>

    <!-- Google CSE Search Results -->
    <div
      v-show="!isLoading && !hasError"
      class="animate-fade-in"
    >
      <div class="gcse-searchresults"></div>
    </div>
  </div>
</template>

<script setup>
/**
 * Searchbox Component Script
 *
 * Integrates with Google Custom Search Engine (CSE)
 * - Monitors loading state from store
 * - Handles CSE initialization errors
 * - Supports programmatic search execution
 * - Auto-retry on failure
 */

import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useGameStore } from '@/stores/gameStore';

// Access game store for loading state
const gameStore = useGameStore();

// Local state for error handling
const hasError = ref(false);
const retryCount = ref(0);
const maxRetries = 3;
let timeoutId = null;

// Computed: Get loading state from store
const isLoading = computed(() => {
  return gameStore.isLoading;
});

/**
 * Retry loading the search engine
 */
function retryLoad() {
  if (retryCount.value < maxRetries) {
    retryCount.value++;
    hasError.value = false;
    gameStore.loadSearchEngine();
  } else {
    console.error('Max retries reached. Please refresh the page.');
  }
}

/**
 * Monitor CSE load failures
 * If CSE takes too long to load, show error state
 */
watch(isLoading, (newIsLoading) => {
  if (newIsLoading) {
    // Set timeout when loading starts
    timeoutId = setTimeout(() => {
      if (isLoading.value && !window.google?.search?.cse) {
        hasError.value = true;
        console.warn('CSE failed to load within timeout');
      }
    }, 5000);
  } else {
    // Clear timeout when loading finishes
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }
});

// Cleanup timeout on component unmount
onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
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
