<!--
  GameCard Component

  Displays a single game as an interactive card with:
  - Game icon and name
  - Gradient background based on game color
  - Hover effects with scale and glow
  - Favorite toggle button
  - Click to select game

  Props:
  - game: Game object with id, name, icon, color, description
  - isSelected: Boolean indicating if this game is currently selected
-->

<template>
  <div
    @click="selectGame"
    class="game-card group relative overflow-hidden"
    :class="[
      isSelected ? 'ring-4 ring-gaming-primary shadow-neon-strong' : '',
      'cursor-pointer'
    ]"
  >
    <!-- Gradient background -->
    <div
      class="absolute inset-0 bg-gradient-to-br opacity-20 group-hover:opacity-30 transition-opacity duration-300"
      :class="game.color"
    />

    <!-- Content -->
    <div class="relative z-10">
      <!-- Header with icon and favorite button -->
      <div class="flex items-start justify-between mb-3">
        <div
          class="text-4xl transform group-hover:scale-110 transition-transform duration-300"
        >
          {{ game.icon }}
        </div>

        <!-- Favorite button -->
        <button
          @click.stop="toggleFavorite"
          class="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          :class="isFavorite ? 'text-red-500' : 'text-white/50'"
          :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        >
          <svg
            class="w-5 h-5 fill-current"
            viewBox="0 0 20 20"
          >
            <path
              v-if="isFavorite"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            />
            <path
              v-else
              fill-rule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clip-rule="evenodd"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </button>
      </div>

      <!-- Game name -->
      <h3 class="text-xl font-bold text-white mb-2 group-hover:text-gradient-primary transition-all duration-300">
        {{ game.name }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-white/70 line-clamp-2">
        {{ game.description }}
      </p>

      <!-- Category badge -->
      <div class="mt-3">
        <span class="badge bg-white/10 text-white/80 capitalize">
          {{ game.category }}
        </span>
      </div>
    </div>

    <!-- Selection indicator -->
    <div
      v-if="isSelected"
      class="absolute top-2 right-2 w-3 h-3 bg-gaming-primary rounded-full animate-pulse"
    />
  </div>
</template>

<script setup>
/**
 * GameCard Component Script
 *
 * Handles game selection and favorite toggling
 * Emits events to parent component
 */

import { computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';

// Props definition
const props = defineProps({
  game: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
});

// Emit definition
const emit = defineEmits(['select']);

// Store access
const gameStore = useGameStore();

// Computed: Check if game is favorited
const isFavorite = computed(() => {
  return gameStore.isFavorite(props.game.id);
});

/**
 * Handle game selection
 * Emits select event to parent
 */
function selectGame() {
  emit('select', props.game);
}

/**
 * Toggle favorite status for this game
 * Prevents event propagation to avoid triggering selection
 */
function toggleFavorite() {
  gameStore.toggleFavorite(props.game.id);
}
</script>

<style scoped>
/* Additional component-specific styles if needed */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
