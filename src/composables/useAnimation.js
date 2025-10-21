/**
 * Animation Composable
 *
 * Provides reusable animation utilities and helpers
 * for creating smooth, performant animations throughout the app
 */

import { ref, onMounted } from 'vue';

/**
 * Slide-up animation on mount
 * @param {number} delay - Delay before animation starts (ms)
 * @returns {Object} Reactive animation state
 */
export function useSlideUpAnimation(delay = 0) {
  const isVisible = ref(false);

  onMounted(() => {
    setTimeout(() => {
      isVisible.value = true;
    }, delay);
  });

  return {
    isVisible,
    animationClass: 'transition-all duration-500 ease-out',
    visibilityClass: isVisible.value ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  };
}

/**
 * Staggered animation for lists
 * @param {number} itemCount - Number of items to animate
 * @param {number} staggerDelay - Delay between each item (ms)
 * @returns {Function} Function to get delay for item index
 */
export function useStaggerAnimation(itemCount, staggerDelay = 100) {
  const getItemDelay = (index) => {
    return index * staggerDelay;
  };

  const getItemStyle = (index) => {
    return {
      animationDelay: `${getItemDelay(index)}ms`
    };
  };

  return {
    getItemDelay,
    getItemStyle
  };
}

/**
 * Fade in animation
 * @param {number} duration - Animation duration (ms)
 * @returns {Object} Animation utilities
 */
export function useFadeIn(duration = 300) {
  const isVisible = ref(false);

  const show = () => {
    isVisible.value = true;
  };

  const hide = () => {
    isVisible.value = false;
  };

  return {
    isVisible,
    show,
    hide,
    transitionClass: `transition-opacity duration-${duration}`,
    opacityClass: isVisible.value ? 'opacity-100' : 'opacity-0'
  };
}
