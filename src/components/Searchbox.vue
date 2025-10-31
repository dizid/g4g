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
      ref="searchboxRef"
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

import { computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useGameStore } from '@/stores/gameStore';

// Access game store for loading state
const gameStore = useGameStore();

// Local state for error handling
const hasError = ref(false);
const retryCount = ref(0);
const maxRetries = 3;
let timeoutId = null;

// Ref for the searchbox container
const searchboxRef = ref(null);

// Computed: Get loading state from store
const isLoading = computed(() => {
  return gameStore.isLoading;
});

/**
 * Focus the search input field
 * Retries multiple times because Google CSE renders input asynchronously
 */
function focusInput() {
  const attempts = [100, 300, 600];

  attempts.forEach(delay => {
    setTimeout(() => {
      const input = searchboxRef.value?.querySelector('input.gsc-input');
      if (input) {
        input.focus();
      }
    }, delay);
  });
}

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
 * Monitor CSE load and auto-focus when ready
 */
watch(isLoading, (newIsLoading) => {
  if (newIsLoading) {
    // Set timeout when loading starts
    timeoutId = setTimeout(() => {
      if (isLoading.value && !window.google?.search?.cse) {
        hasError.value = true;
      }
    }, 5000);
  } else {
    // CSE finished loading - focus the input
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    nextTick(() => focusInput());
  }
});

// Cleanup timeout on component unmount
onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});

// Expose focusInput method to parent component
defineExpose({
  focusInput
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
  background-color: rgba(255, 255, 255, 0.08) !important;
  border: 2px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 12px !important;
  padding: 0 !important;
}

/* Main input element styling */
:deep(.gsc-input) {
  background-color: rgba(255, 255, 255, 0.08) !important;
  color: white !important;
  font-size: 16px !important;
  padding: 12px 16px !important;
}

/* Input field - gsib_a is the actual input field */
:deep(.gsib_a) {
  background-color: rgba(255, 255, 255, 0.08) !important;
  color: white !important;
  font-size: 16px !important;
}

/* Placeholder text */
:deep(.gsib_a::placeholder) {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Focus state */
:deep(.gsc-input:focus),
:deep(.gsib_a:focus) {
  background-color: rgba(255, 255, 255, 0.12) !important;
  color: white !important;
}

:deep(.gsc-search-button) {
  background: linear-gradient(to right, #6366f1, #8b5cf6) !important;
  border: none !important;
  border-radius: 8px !important;
}

/* Results styling */
:deep(.gsc-results) {
  background-color: transparent !important;
  margin-top: 20px !important;
}

:deep(.gsc-result) {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.06)) !important;
  border: 1px solid rgba(139, 92, 246, 0.3) !important;
  border-radius: 8px !important;
  padding: 16px !important;
  margin-bottom: 12px !important;
}

:deep(.gsc-result:hover) {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(139, 92, 246, 0.1)) !important;
  border-color: rgba(139, 92, 246, 0.5) !important;
}

:deep(.gs-title) {
  color: #6366f1 !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  margin-bottom: 8px !important;
}

:deep(.gs-title a) {
  color: #6366f1 !important;
  text-decoration: none !important;
}

:deep(.gs-title a:hover) {
  color: #8b5cf6 !important;
  text-decoration: underline !important;
}

:deep(.gs-snippet) {
  color: rgba(255, 255, 255, 0.7) !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
}

:deep(.gs-visibleUrl) {
  color: rgba(255, 255, 255, 0.5) !important;
  font-size: 12px !important;
  margin-top: 8px !important;
}

/* Pagination styling */
:deep(.gsc-cursor) {
  margin-top: 20px !important;
}

:deep(.gsc-cursor-page) {
  color: #6366f1 !important;
  margin: 0 4px !important;
  padding: 4px 8px !important;
}

:deep(.gsc-cursor-current-page) {
  background-color: rgba(99, 102, 241, 0.2) !important;
  color: #6366f1 !important;
  border-radius: 4px !important;
}
</style>
