/**
 * Vue Router Configuration
 *
 * Defines application routes:
 * - Home page (/) - main search interface
 * - Game-specific pages (/:slug) - search for specific game
 * - About page (/about) - information about the site
 *
 * Uses HTML5 History mode for clean URLs
 */

import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';

// Route definitions
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Google 4 Games - Your Ultimate Gaming Search Engine'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About - Google 4 Games'
    }
  },
  {
    // Dynamic route for game-specific searches
    // Must be last to avoid catching /about
    path: '/:slug',
    name: 'GameSearch',
    component: Home,
    props: true,
    meta: {
      title: 'Google 4 Games'
    }
  },
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
  // Scroll to top on route change
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// Navigation guard to update page title
router.beforeEach((to, from, next) => {
  // Update document title based on route meta
  document.title = to.meta.title || 'Google 4 Games';
  next();
});

export default router;
