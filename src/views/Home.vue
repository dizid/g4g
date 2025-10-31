<!--
  Home View - Main Landing Page

  Features:
  - Modern gaming-themed hero section
  - Grid of game cards with glassmorphism effects
  - Favorites section
  - Search history
  - Animated transitions
  - Responsive design

  Uses Pinia store for state management
  Integrates with Google Custom Search Engine
-->

<template>
  <div class="min-h-screen bg-gradient-animated">
    <!-- Navigation Header -->
    <nav class="glass-card m-4 p-6 animate-slide-up">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <!-- Logo and brand -->
        <router-link
          to="/"
          class="flex items-center gap-3 group"
        >
          <div class="w-10 h-10 bg-gradient-to-br from-gaming-primary to-gaming-secondary rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
            <span class="text-2xl">🎮</span>
          </div>
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gradient-primary">
              Google 4 Games
            </h1>
            <p class="text-sm text-white/60 hidden md:block">
              Your Ultimate Gaming Search Engine
            </p>
          </div>
        </router-link>

        <!-- Navigation links -->
        <div class="flex items-center gap-4">
          <router-link
            to="/about"
            class="text-white/70 hover:text-white transition-colors duration-200 text-sm md:text-base"
          >
            About
          </router-link>

          <!-- Stats badge -->
          <div class="hidden md:flex items-center gap-2 glass-card px-4 py-2">
            <span class="text-white/60 text-sm">Games:</span>
            <span class="text-gaming-primary font-bold">{{ totalGames }}</span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content container -->
    <div class="max-w-7xl mx-auto px-4 py-8">

      <!-- Hero Section -->
      <div class="text-center mb-12 animate-slide-up">
        <h2 class="text-4xl md:text-6xl font-bold text-white mb-4">
          Search Your Favorite
          <span class="text-gradient-neon"> Games</span>
        </h2>
        <p class="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
          Discover guides, tips, strategies, and news for all your favorite games in one place
        </p>
      </div>

      <!-- Favorites Section (if any favorites exist) -->
      <div v-if="hasFavorites" class="mb-8 animate-slide-up">
        <div class="glass-card p-6">
          <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            Your Favorites
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <GameCard
              v-for="game in favoriteGames"
              :key="game.id"
              :game="game"
              :isSelected="game.id === currentGame.id"
              @select="handleGameSelect"
            />
          </div>
        </div>
      </div>

      <!-- Game Selection Grid -->
      <div class="mb-8 animate-slide-up">
        <div class="glass-card p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-white">
              Select a Game
            </h3>

            <!-- Category filter (optional future enhancement) -->
            <div class="text-sm text-white/50">
              {{ games.length }} games available
            </div>
          </div>

          <!-- Games grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <GameCard
              v-for="game in games"
              :key="game.id"
              :game="game"
              :isSelected="game.id === currentGame.id"
              @select="handleGameSelect"
            />
          </div>
        </div>
      </div>

      <!-- Search Section -->
      <div ref="searchSection" class="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <!-- Search Box (takes 3 columns on lg, full width on mobile) -->
        <div class="lg:col-span-3">
          <div class="glass-card p-6 animate-slide-up">
            <!-- Current game indicator -->
            <div class="flex items-center gap-3 mb-4 p-4 rounded-lg bg-white/5">
              <div class="text-3xl">{{ currentGame.icon }}</div>
              <div class="flex-1">
                <p class="text-sm text-white/60">Currently searching in:</p>
                <h3 class="text-xl font-bold text-white">{{ currentGame.name }}</h3>
              </div>
              <div
                class="px-4 py-2 rounded-lg bg-gradient-to-r text-white text-sm font-semibold"
                :class="currentGame.color"
              >
                Active
              </div>
            </div>

            <!-- Search component -->
            <Searchbox ref="searchboxComponent" :key="searchKey" />
          </div>
        </div>

        <!-- Search History (takes 1 column on lg) -->
        <div>
          <SearchHistory @search="handleHistorySearch" />
        </div>
      </div>

      <!-- Footer -->
      <footer class="glass-card p-6 text-center animate-slide-up">
        <p class="text-white/60">
          Made with <span class="text-red-500">❤️</span> by
          <a
            href="https://dizid.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gaming-primary hover:text-gaming-secondary transition-colors duration-200 font-semibold"
          >
            dizid
          </a>
          · {{ currentYear }}
        </p>
        <p class="text-white/40 text-sm mt-2">
          Powered by Google Custom Search · Vue 3 · Tailwind CSS
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup>
/**
 * Home View Script
 *
 * Main landing page logic including:
 * - Game selection handling
 * - Search engine initialization
 * - Route parameter processing
 * - State management integration
 */

import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGameStore } from '@/stores/gameStore';
import GameCard from '@/components/GameCard.vue';
import Searchbox from '@/components/Searchbox.vue';
import SearchHistory from '@/components/SearchHistory.vue';

// Router and route access
const route = useRoute();
const router = useRouter();

// Game store access
const gameStore = useGameStore();

// Component state
const searchKey = ref(0);
const searchSection = ref(null);
const searchboxComponent = ref(null);

// Computed properties from store
const allGames = computed(() => gameStore.games);
const currentGame = computed(() => gameStore.currentGame);
const favoriteGames = computed(() => gameStore.favoritesGamesObjects);
const hasFavorites = computed(() => favoriteGames.value.length > 0);

// Filter out favorited games from the main games list
const games = computed(() => {
  return allGames.value.filter(game => !gameStore.isFavorite(game.id));
});

const totalGames = computed(() => allGames.value.length);

// Get current year for footer
const currentYear = new Date().getFullYear();

/**
 * Handle game selection from GameCard
 * Updates route and triggers search engine reload
 * Scrolls to search section after selection
 *
 * @param {Object} game - Selected game object
 */
function handleGameSelect(game) {
  // Update store
  gameStore.selectGame(game.id);

  // Update URL route
  if (game.id === 'all') {
    router.push({ path: '/' });
  } else {
    router.push({ path: `/${game.id}` });
  }

  // Force search box to reload
  searchKey.value += 1;

  // Scroll to search section after game selection
  nextTick(() => {
    if (searchSection.value) {
      searchSection.value.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}

/**
 * Handle search from history
 * Executes the search programmatically using the store
 *
 * @param {string} searchTerm - Search term from history
 */
function handleHistorySearch(searchTerm) {
  // Execute the search programmatically
  gameStore.executeSearch(searchTerm);
}

/**
 * Initialize game selection based on route parameter
 * Called on mount and when route changes
 */
function initializeGameFromRoute() {
  const slug = route.params.slug;

  if (slug) {
    // Find game by slug/id
    const game = games.value.find(g => g.id === slug);
    if (game) {
      gameStore.selectGame(game.id);
    } else {
      // Invalid slug, redirect to home
      gameStore.selectGame('all');
      router.push({ path: '/' });
    }
  } else {
    // No slug, use default (all games)
    gameStore.selectGame('all');
  }

  // Force searchbox reload
  searchKey.value += 1;
}

// Watch for route changes
watch(
  () => route.params.slug,
  () => {
    initializeGameFromRoute();
  }
);

// Component lifecycle - mounted
onMounted(() => {
  // Initialize store (load from localStorage)
  gameStore.initialize();

  // Initialize game based on route
  initializeGameFromRoute();
});
</script>

<style scoped>
/* Component-specific styles */

/* Ensure proper spacing and layout */
.min-h-screen {
  min-height: 100vh;
}

/* Add stagger animation to grid items */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
}

/* Stagger delays for multiple elements */
.animate-slide-up:nth-child(1) {
  animation-delay: 0ms;
}

.animate-slide-up:nth-child(2) {
  animation-delay: 100ms;
}

.animate-slide-up:nth-child(3) {
  animation-delay: 200ms;
}

.animate-slide-up:nth-child(4) {
  animation-delay: 300ms;
}
</style>
