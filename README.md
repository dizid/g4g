# Google 4 Games (G4G)

The ultimate gaming search engine - specialized search across 10+ popular games with a modern, responsive interface.

## 🎮 Features

- **Multi-Game Search**: Search guides, strategies, and community content for popular games
- **Favorites Management**: Save your favorite games for quick access
- **Search History**: Automatic tracking of recent searches with one-click re-execution
- **Responsive Design**: Mobile-first approach supporting all screen sizes
- **Modern UI**: Glassmorphism design with smooth animations and gradient effects
- **PWA Ready**: Progressive Web App support for offline-capable structure
- **Dark Theme**: Gaming-optimized dark theme with vibrant neon accents

## 🎯 Supported Games

The app supports searching across 10 popular games:

1. **All Games** - Cross-game search
2. **Fortnite** - Battle Royale tips, guides & news
3. **Minecraft** - Builds, mods & crafting guides
4. **Clash Royale** - Deck strategies & card guides
5. **Destiny 2** - Raids, weapons & exotic guides
6. **Valorant** - Agent guides & tactical tips
7. **League of Legends** - Champion builds & strategies
8. **Roblox** - Game guides & creation tips
9. **Apex Legends** - Legend guides & battle strategies
10. **Genshin Impact** - Character builds & world guides

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ and npm 6+

### Installation

```bash
# Clone the repository
git clone https://github.com/dizid/g4g.git
cd g4g

# Install dependencies
npm install

# Start development server
npm run serve
```

The app will be available at `http://localhost:8080`

## 📦 Available Scripts

```bash
# Development server with hot reload
npm run serve

# Build for production
npm run build

# Run ESLint for code quality
npm run lint
```

## 🏗️ Project Structure

```
src/
├── components/           # Vue components
│   ├── GameCard.vue     # Individual game card
│   ├── Searchbox.vue    # Google CSE integration
│   └── SearchHistory.vue # Recent searches display
│
├── views/               # Page views
│   ├── Home.vue         # Main landing page
│   └── About.vue        # Information page
│
├── stores/              # Pinia state management
│   └── gameStore.js     # Game state & actions
│
├── config/              # Configuration files
│   └── games.js         # Game definitions & CSE IDs
│
├── composables/         # Reusable Vue composition functions
│   ├── useAnimation.js  # Animation utilities (available for future use)
│   └── useLocalStorage.js # Storage management (available for future use)
│
├── router/              # Vue Router configuration
│   └── index.js         # Route definitions
│
├── constants.js         # Application constants
├── App.vue              # Root component
└── main.js              # Entry point
```

## 🛠️ Technology Stack

- **Vue 3** - Progressive JavaScript framework
- **Vue Router 4** - Client-side routing
- **Pinia** - Lightweight state management
- **Tailwind CSS 3** - Utility-first CSS framework
- **Heroicons Vue** - Beautiful SVG icon library
- **Google Custom Search Engine** - Game-specific search functionality

## 🔧 Configuration

### Adding or Updating Games

Games are configured in `src/config/games.js`. To add a new game:

```javascript
{
  id: 'gameid',
  name: 'Game Name',
  icon: '🎮',
  description: 'Game description',
  searchEngineId: 'YOUR_CSE_ID',
  color: 'from-blue-500 to-cyan-500',
  category: 'category-name',
}
```

To update a game's Google Custom Search Engine ID, simply modify the `searchEngineId` field.

### Customizing Constants

Application constants (animation timings, storage keys, etc.) are defined in `src/constants.js`:

```javascript
export const ANIMATION_TIMINGS = {
  TRANSITION_DURATION: 200,
  SLIDE_UP_DURATION: 600,
  FADE_IN_DURATION: 300,
  LOADING_TIMEOUT: 5000,
};

export const STORAGE_KEYS = {
  SEARCH_HISTORY: 'g4g_search_history',
  FAVORITES: 'g4g_favorites',
  PREFERENCES: 'g4g_preferences',
};
```

## 🎨 Customization

### Color Scheme

The app uses a gaming-optimized color palette defined in `tailwind.config.js`:

- **Primary**: Indigo (#6366f1)
- **Secondary**: Purple (#8b5cf6)
- **Accent**: Pink (#ec4899)
- **Dark Background**: #0a0e27
- **Darker Background**: #060816

### Animations

Custom animations available in Tailwind config:
- `glow` - 2s infinite glow effect
- `float` - 3s floating animation
- `slide-up` - 0.5s entrance animation
- `fade-in` - 0.3s fade in effect
- `pulse-slow` - 3s slow pulse

## 💾 State Management (Pinia)

The `gameStore` manages:

- **Selected Game** - Currently active game for searching
- **Search History** - User's recent searches (max 10)
- **Favorites** - User's favorite games
- **Preferences** - User theme and display preferences
- **CSE Loading State** - Current search engine loading status

All state is persisted to browser localStorage automatically.

## 🔍 Search Functionality

### Programmatic Search

Execute searches programmatically using the store:

```javascript
gameStore.executeSearch('minecraft building guide');
```

This will:
1. Add the search term to history
2. Fill the search input
3. Trigger the search in Google CSE
4. Display results

### Search History

Recent searches are automatically tracked and can be:
- Clicked to repeat the search
- Removed individually
- Cleared all at once

## 🚨 Error Handling

- **CSE Load Failures**: Automatic retry with up to 3 attempts
- **localStorage Errors**: Graceful fallback with console warnings
- **Invalid Routes**: Auto-redirect to home page
- **Missing Games**: Validation before CSE initialization

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- Mobile (default)
- Tablet (md: 768px+)
- Desktop (lg: 1024px+)
- Large Desktop (xl: 1280px+)

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest 2 versions)
- Supports ES6+ with Babel transpilation

## 🔐 Privacy & Data

- All data stored in browser localStorage (100% client-side)
- No user data is sent to external servers (except Google CSE)
- Search terms only visible in browser history
- Can be cleared anytime via the app

## 📖 Development Guide

### Adding a New Feature

1. Create component in `src/components/`
2. Update Pinia store if state needed (`src/stores/gameStore.js`)
3. Add view or integrate into existing view in `src/views/`
4. Update router if new page (`src/router/index.js`)

### Code Quality

The project uses:
- ESLint for code quality
- Prettier for formatting
- Vue 3 Composition API best practices

Run linting:
```bash
npm run lint
```

## 🚀 Deployment

### Netlify

The project includes a `_redirects` file for Single Page Application (SPA) routing on Netlify.

Build command: `npm run build`
Publish directory: `dist/`

### Environment Setup

Create `.npmrc` file in project root:
```
legacy-peer-deps=true
```

This resolves peer dependency conflicts between Vue CLI 5 and Vue 3.4.

## 📝 Recent Improvements (v1.1)

- ✅ Extracted game configuration to separate config file
- ✅ Added centralized constants for better maintainability
- ✅ Implemented programmatic search execution
- ✅ Added CSE load error handling with auto-retry
- ✅ Enhanced Searchbox component with error states
- ✅ Updated web manifest with correct branding
- ✅ Created comprehensive documentation
- ✅ Improved code organization and modularity

## 🐛 Known Limitations

- Search requires Google Custom Search Engine IDs (free tier has daily limits)
- CSE results embedded directly in page (Google's limitation)
- No advanced search filters (future enhancement)

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

Created by [dizid](https://dizid.com)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues first

---

**Last Updated**: October 2024
**Version**: 1.1.0
