# NABSTA Quick Start Guide

## 🚀 Running the App

The development server is now running! You have several options:

### Option 1: Mobile Device (Recommended for Testing)

1. **Install Expo Go** on your phone:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Scan the QR code** shown in your terminal:
   - iOS: Use the Camera app
   - Android: Use the Expo Go app

### Option 2: iOS Simulator (Mac only)

```bash
# Press 'i' in the terminal, or run:
npm run ios
```

### Option 3: Android Emulator

```bash
# Press 'a' in the terminal, or run:
npm run android
```

### Option 4: Web Browser

```bash
# Press 'w' in the terminal, or run:
npm run web
```

## 📱 App Flow

When you launch the app, you'll experience:

1. **Splash Screen** (2.5 seconds)
   - NABSTA logo with gradient animation
   - Smooth fade-in effect

2. **Onboarding** (3 pages)
   - Buy & Sell Locally
   - Find Jobs & Services
   - Safe & Secure
   - Skip button available

3. **Authentication**
   - Continue with Google
   - Continue with Facebook
   - Continue with Phone
   - (Currently mock - will navigate after 1.5s)

4. **Home Screen**
   - Search bar with location
   - 6 main categories (3x2 grid)
   - Discover local events banner
   - For Sale feed with mock listings

## 🎨 What's Implemented

### ✅ Completed Features

- **Splash Screen**: Gradient background with animated logo
- **Onboarding Flow**: 3-page swipeable onboarding
- **Authentication UI**: Social auth options (UI only)
- **Home Screen**: 
  - Search bar with location
  - Category grid (6 categories)
  - Discover banner
  - For Sale listings feed
- **Bottom Navigation**: 5 tabs (Home active, others show "Coming Soon")
- **Category Navigation**: Tap categories to see detail view
- **Design System**: Complete theme with gradient colors

### 🚧 Coming Soon Features

- Inbox/Messaging
- Create Listing
- My Listings
- Account/Profile
- Jobs, Rentals, Coupons, Services, News categories
- Search functionality
- Filter functionality
- Listing details
- Backend integration

## 🎯 Testing the App

### Things to Try:

1. **Navigate through onboarding**
   - Swipe or tap "Next"
   - Try the "Skip" button

2. **Try authentication**
   - Tap any auth button
   - Watch the loading state

3. **Explore the home screen**
   - Tap different categories
   - Scroll through the For Sale feed
   - Tap the Discover banner

4. **Test bottom navigation**
   - Switch between tabs
   - See "Coming Soon" states

5. **Category details**
   - Tap "For Sale" to see subcategories
   - Tap other categories to see "Coming Soon"

## 🛠️ Development Commands

```bash
# Start development server
npm start

# Type checking
npx tsc --noEmit

# Clear cache and restart
npx expo start -c

# Install new package
npx expo install <package-name>
```

## 📝 Making Changes

### Adding a New Component

1. Create file in `src/components/common/` or feature folder
2. Use the theme tokens from `src/theme/`
3. Export from `index.ts` in the same folder
4. Import and use in your screen

### Modifying Colors

Edit `src/theme/colors.ts`:
```typescript
export const colors = {
  primary: {
    start: '#FF5D62',  // Change these
    end: '#FD3972',    // for different gradient
    gradient: ['#FF5D62', '#FD3972'] as const,
  },
  // ...
};
```

### Adding a New Screen

1. Create screen in `src/screens/main/`
2. Add to navigation in `src/navigation/`
3. Update types in `src/types/navigation.ts`

## 🐛 Troubleshooting

### Metro Bundler Issues
```bash
# Clear cache
npx expo start -c

# Reset everything
rm -rf node_modules
npm install
npx expo start -c
```

### TypeScript Errors
```bash
# Check for errors
npx tsc --noEmit

# Restart TypeScript server in VS Code
Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### App Not Loading
1. Make sure you're on the same WiFi network
2. Check firewall settings
3. Try restarting the Expo server
4. Clear Expo Go app cache

## 📚 Key Files to Know

- `App.tsx` - App entry point
- `src/navigation/RootNavigator.tsx` - Navigation setup
- `src/screens/main/HomeScreen.tsx` - Main home screen
- `src/theme/` - All design tokens
- `src/constants/categories.ts` - Category definitions

## 🎨 Design Guidelines

When building new features, follow these principles:

1. **Use theme tokens** - Never hardcode colors, spacing, etc.
2. **Apple-inspired** - Soft shadows, smooth animations
3. **Consistent spacing** - Use the 8px grid system
4. **Type safety** - Always define TypeScript interfaces
5. **Reusability** - Create components that can be reused

## 🚀 Next Steps

1. **Backend Setup**
   - Choose backend (Firebase, Supabase, custom API)
   - Set up authentication
   - Create database schema

2. **Feature Development**
   - Implement search
   - Add filters
   - Build listing detail view
   - Create listing flow

3. **User Experience**
   - Add loading states
   - Implement error handling
   - Add animations
   - Optimize performance

## 💡 Tips

- Use `console.log()` to debug (shows in terminal)
- Shake device to open Expo menu
- Enable Fast Refresh for instant updates
- Use React DevTools for debugging

---

**Happy Coding! 🎉**

For questions or issues, check the main README.md or ARCHITECTURE.md
