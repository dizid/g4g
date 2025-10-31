/**
 * Game Configuration
 *
 * Centralized configuration for all supported games.
 * Each game has a unique Google Programmable Search Engine (CSE) ID
 * for dedicated search functionality.
 *
 * To update a game's CSE ID:
 * 1. Find the game in this list
 * 2. Update the searchEngineId field
 * 3. No other changes needed
 */

export const GAMES = [
  {
    id: 'all',
    name: 'All Games',
    icon: '🎮',
    description: 'Search across all gaming content',
    searchEngineId: 'a9a230432b58ecd21',
    color: 'from-indigo-500 to-purple-600',
    category: 'general',
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    icon: '⚡',
    description: 'Battle Royale tips, guides & news',
    searchEngineId: '22f2b892095830119',
    color: 'from-blue-500 to-cyan-500',
    category: 'battle-royale',
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    icon: '⛏️',
    description: 'Builds, mods & crafting guides',
    searchEngineId: '9602c93f57213795b',
    color: 'from-green-500 to-emerald-600',
    category: 'sandbox',
  },
  {
    id: 'clashroyale',
    name: 'Clash Royale',
    icon: '👑',
    description: 'Deck strategies & card guides',
    searchEngineId: '078e1680c0ebaf715',
    color: 'from-orange-500 to-red-500',
    category: 'strategy',
  },
  {
    id: 'destiny2',
    name: 'Destiny 2',
    icon: '🌟',
    description: 'Raids, weapons & exotic guides',
    searchEngineId: '8ecad2f2d493f4ab5',
    color: 'from-purple-500 to-pink-500',
    category: 'fps',
  },
  {
    id: 'valorant',
    name: 'Valorant',
    icon: '🎯',
    description: 'Agent guides & tactical tips',
    searchEngineId: 'a9a230432b58ecd21',
    color: 'from-red-500 to-rose-600',
    category: 'fps',
  },
  {
    id: 'leagueoflegends',
    name: 'League of Legends',
    icon: '⚔️',
    description: 'Champion builds & strategies',
    searchEngineId: 'a9a230432b58ecd21',
    color: 'from-yellow-500 to-amber-600',
    category: 'moba',
  },
  {
    id: 'roblox',
    name: 'Roblox',
    icon: '🎲',
    description: 'Game guides & creation tips',
    searchEngineId: 'a9a230432b58ecd21',
    color: 'from-pink-500 to-fuchsia-600',
    category: 'sandbox',
  },
  {
    id: 'apexlegends',
    name: 'Apex Legends',
    icon: '🔫',
    description: 'Legend guides & battle strategies',
    searchEngineId: 'a9a230432b58ecd21',
    color: 'from-red-600 to-orange-600',
    category: 'battle-royale',
  },
  {
    id: 'genshinimpact',
    name: 'Genshin Impact',
    icon: '✨',
    description: 'Character builds & world guides',
    searchEngineId: 'a9a230432b58ecd21',
    color: 'from-cyan-500 to-blue-600',
    category: 'rpg',
  },
];

/**
 * Get a game by ID
 * @param {string} gameId - The game ID to find
 * @returns {Object|undefined} Game object or undefined if not found
 */
export function getGameById(gameId) {
  return GAMES.find(game => game.id === gameId);
}

/**
 * Get games by category
 * @param {string} category - The category to filter by
 * @returns {Array} Array of games in the category
 */
export function getGamesByCategory(category) {
  return GAMES.filter(game => game.category === category);
}

/**
 * Get all unique categories
 * @returns {Array} Array of unique category strings
 */
export function getCategories() {
  return [...new Set(GAMES.map(game => game.category))];
}
