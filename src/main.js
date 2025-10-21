/**
 * Main Application Entry Point
 *
 * Initializes the Vue 3 application with:
 * - Vue Router for navigation
 * - Pinia for state management
 * - Tailwind CSS for styling
 */

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Import global styles (Tailwind + custom CSS)
import './assets/index.css';

// Create Pinia instance for state management
const pinia = createPinia();

// Create and configure Vue app
const app = createApp(App);

// Register plugins
app.use(pinia);   // State management
app.use(router);  // Routing

// Mount app to DOM
app.mount('#app');
