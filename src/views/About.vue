<!--
  About View - Information Page

  Provides information about:
  - What the website does
  - How to use it
  - Technologies used
  - Credits
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
          </div>
        </router-link>

        <!-- Back to home -->
        <router-link
          to="/"
          class="btn-gaming"
        >
          ← Back to Home
        </router-link>
      </div>
    </nav>

    <!-- Main content -->
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Hero -->
      <div class="text-center mb-12 animate-slide-up">
        <h2 class="text-5xl md:text-6xl font-bold text-white mb-4">
          About <span class="text-gradient-neon">G4G</span>
        </h2>
        <p class="text-xl text-white/70">
          Your Ultimate Gaming Search Engine
        </p>
      </div>

      <!-- What is it -->
      <div class="glass-card p-8 mb-8 animate-slide-up">
        <h3 class="text-3xl font-bold text-white mb-4">What is Google 4 Games?</h3>
        <p class="text-white/80 text-lg leading-relaxed mb-4">
          Google 4 Games (G4G) is a specialized search engine designed specifically for gamers.
          Instead of searching through the entire web, G4G focuses on finding the most relevant
          gaming content for your favorite titles.
        </p>
        <p class="text-white/80 text-lg leading-relaxed">
          Whether you're looking for strategy guides, build recommendations, patch notes,
          community discussions, or the latest news - G4G delivers targeted results from
          trusted gaming sources.
        </p>
      </div>

      <!-- How it works -->
      <div class="glass-card p-8 mb-8 animate-slide-up">
        <h3 class="text-3xl font-bold text-white mb-4">How It Works</h3>
        <div class="space-y-4">
          <div class="flex gap-4">
            <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gaming-primary to-gaming-secondary rounded-lg flex items-center justify-center text-2xl font-bold text-white">
              1
            </div>
            <div>
              <h4 class="text-xl font-semibold text-white mb-2">Select Your Game</h4>
              <p class="text-white/70">
                Choose from our collection of popular games, or search across all gaming content
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gaming-primary to-gaming-secondary rounded-lg flex items-center justify-center text-2xl font-bold text-white">
              2
            </div>
            <div>
              <h4 class="text-xl font-semibold text-white mb-2">Enter Your Query</h4>
              <p class="text-white/70">
                Type what you're looking for - builds, guides, tips, news, or anything gaming-related
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gaming-primary to-gaming-secondary rounded-lg flex items-center justify-center text-2xl font-bold text-white">
              3
            </div>
            <div>
              <h4 class="text-xl font-semibold text-white mb-2">Get Targeted Results</h4>
              <p class="text-white/70">
                Receive search results specifically curated for your selected game and query
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="glass-card p-8 mb-8 animate-slide-up">
        <h3 class="text-3xl font-bold text-white mb-6">Features</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-lg bg-white/5">
            <div class="text-2xl mb-2">🎮</div>
            <h4 class="font-semibold text-white mb-2">10+ Popular Games</h4>
            <p class="text-white/70 text-sm">
              Dedicated search engines for Fortnite, Minecraft, Valorant, and more
            </p>
          </div>

          <div class="p-4 rounded-lg bg-white/5">
            <div class="text-2xl mb-2">⚡</div>
            <h4 class="font-semibold text-white mb-2">Lightning Fast</h4>
            <p class="text-white/70 text-sm">
              Powered by Google Custom Search for instant, reliable results
            </p>
          </div>

          <div class="p-4 rounded-lg bg-white/5">
            <div class="text-2xl mb-2">❤️</div>
            <h4 class="font-semibold text-white mb-2">Favorites</h4>
            <p class="text-white/70 text-sm">
              Save your favorite games for quick access
            </p>
          </div>

          <div class="p-4 rounded-lg bg-white/5">
            <div class="text-2xl mb-2">🕐</div>
            <h4 class="font-semibold text-white mb-2">Search History</h4>
            <p class="text-white/70 text-sm">
              Easily repeat previous searches with built-in history
            </p>
          </div>

          <div class="p-4 rounded-lg bg-white/5">
            <div class="text-2xl mb-2">📱</div>
            <h4 class="font-semibold text-white mb-2">Fully Responsive</h4>
            <p class="text-white/70 text-sm">
              Works beautifully on desktop, tablet, and mobile devices
            </p>
          </div>

          <div class="p-4 rounded-lg bg-white/5">
            <div class="text-2xl mb-2">🎨</div>
            <h4 class="font-semibold text-white mb-2">Modern Design</h4>
            <p class="text-white/70 text-sm">
              Beautiful glassmorphism UI with smooth animations
            </p>
          </div>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="glass-card p-8 mb-8 animate-slide-up">
        <h3 class="text-3xl font-bold text-white mb-6">Built With</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div class="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-3xl">
              🖖
            </div>
            <h4 class="font-semibold text-white">Vue 3</h4>
            <p class="text-white/60 text-sm">Framework</p>
          </div>

          <div>
            <div class="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-3xl">
              🎨
            </div>
            <h4 class="font-semibold text-white">Tailwind CSS</h4>
            <p class="text-white/60 text-sm">Styling</p>
          </div>

          <div>
            <div class="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-3xl">
              🍍
            </div>
            <h4 class="font-semibold text-white">Pinia</h4>
            <p class="text-white/60 text-sm">State Management</p>
          </div>

          <div>
            <div class="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center text-3xl">
              🔍
            </div>
            <h4 class="font-semibold text-white">Google CSE</h4>
            <p class="text-white/60 text-sm">Search Engine</p>
          </div>
        </div>
      </div>

      <!-- Credits -->
      <div class="glass-card p-8 text-center animate-slide-up">
        <h3 class="text-3xl font-bold text-white mb-4">Made With Love</h3>
        <p class="text-white/80 text-lg mb-4">
          Created by <a href="https://dizid.com" target="_blank" rel="noopener noreferrer" class="text-gaming-primary hover:text-gaming-secondary font-semibold">dizid</a>
        </p>
        <p class="text-white/60">
          © {{ currentYear }} Google 4 Games. All rights reserved.
        </p>
        <div class="mt-6">
          <router-link
            to="/"
            class="btn-gaming inline-block"
          >
            Start Searching →
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * About View Script
 *
 * Simple information page
 * No complex state management needed
 */

// Get current year for copyright
const currentYear = new Date().getFullYear();
</script>

<style scoped>
/* Component-specific styles */
</style>
