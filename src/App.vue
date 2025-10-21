<!--
  App Root Component

  Main application wrapper
  Uses router-view to render current page
  Key attribute ensures proper reloading when routes change
-->

<template>
  <div id="app" class="min-h-screen">
    <!--
      Router view with dynamic key
      The key forces component to reload when switching between games
      This ensures the correct Google CSE is loaded for each game
    -->
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script setup>
/**
 * App Component Script
 *
 * Minimal root component
 * All logic is delegated to child views and components
 */

// No additional logic needed in root component
// All state management is handled by Pinia stores
// All routing is handled by Vue Router
</script>

<style>
/* Global styles are defined in assets/index.css */
/* This style block is intentionally minimal */

#app {
  /* Ensure app takes full height */
  min-height: 100vh;
}
</style>