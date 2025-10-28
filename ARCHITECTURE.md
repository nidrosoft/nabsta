# NABSTA Architecture Documentation

## 📐 Project Structure

```
nabsta/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── common/             # Shared across the app
│   │   │   ├── Button.tsx      # Primary button with gradient support
│   │   │   ├── CategoryCard.tsx # Category display card
│   │   │   ├── SearchBar.tsx   # Search input with location
│   │   │   ├── ComingSoonBanner.tsx # Placeholder banner
│   │   │   └── index.ts        # Barrel export
│   │   ├── home/               # Home screen specific
│   │   │   ├── CategoryGrid.tsx # 3-column category grid
│   │   │   ├── DiscoverBanner.tsx # Local events banner
│   │   │   ├── ListingCard.tsx # Individual listing card
│   │   │   └── index.ts
│   │   └── auth/               # Auth specific (future)
│   │
│   ├── screens/                # Screen components
│   │   ├── SplashScreen.tsx    # Initial loading screen
│   │   ├── onboarding/
│   │   │   └── OnboardingScreen.tsx # 3-page onboarding
│   │   ├── auth/
│   │   │   └── AuthScreen.tsx  # Sign in/up with social auth
│   │   └── main/
│   │       ├── HomeScreen.tsx  # Main home with categories & feed
│   │       ├── InboxScreen.tsx # Messages (coming soon)
│   │       ├── PostScreen.tsx  # Create listing (coming soon)
│   │       ├── ListingsScreen.tsx # User listings (coming soon)
│   │       ├── AccountScreen.tsx # Profile (coming soon)
│   │       ├── CategoryDetailScreen.tsx # Category view
│   │       └── index.ts
│   │
│   ├── navigation/             # Navigation setup
│   │   ├── RootNavigator.tsx   # Main navigation controller
│   │   └── MainTabNavigator.tsx # Bottom tab navigation
│   │
│   ├── theme/                  # Design system
│   │   ├── colors.ts           # Color palette with gradient
│   │   ├── spacing.ts          # 8px grid spacing system
│   │   ├── typography.ts       # Font sizes and weights
│   │   ├── shadows.ts          # Soft shadow definitions
│   │   ├── borderRadius.ts     # Border radius values
│   │   └── index.ts            # Theme aggregator
│   │
│   ├── constants/              # App constants
│   │   └── categories.ts       # Category definitions
│   │
│   ├── types/                  # TypeScript definitions
│   │   ├── navigation.ts       # Navigation types
│   │   ├── models.ts           # Data models
│   │   └── index.ts
│   │
│   ├── services/               # Business logic (future)
│   ├── hooks/                  # Custom hooks (future)
│   ├── utils/                  # Utility functions (future)
│   └── assets/                 # Static assets
│       ├── images/
│       └── icons/
│
├── App.tsx                     # App entry point
├── app.json                    # Expo configuration
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
└── README.md                   # Project documentation
```

## 🎯 Design Patterns

### 1. Component Architecture

**Atomic Design Principles:**
- **Atoms**: Button, Text, Icon
- **Molecules**: SearchBar, CategoryCard, ListingCard
- **Organisms**: CategoryGrid, DiscoverBanner
- **Templates**: Screen layouts
- **Pages**: Complete screens

### 2. State Management Strategy

**Current (MVP):**
- Local React state with `useState`
- Props drilling for simple data flow

**Future Scaling:**
- **Global State**: React Context API or Zustand
- **Server State**: React Query for API data
- **Form State**: React Hook Form
- **Persistence**: AsyncStorage for offline data

### 3. Navigation Pattern

**Stack-based navigation:**
```
RootNavigator (Stack)
├── Splash
├── Onboarding
├── Auth
└── Main (Tab Navigator)
    ├── Home (Stack)
    │   ├── HomeMain
    │   ├── CategoryDetail
    │   └── ListingDetail
    ├── Inbox
    ├── Post
    ├── Listings
    └── Account
```

### 4. Theming System

**Centralized design tokens:**
- All visual properties defined in `src/theme/`
- Easy to maintain and update
- Consistent across the app
- Type-safe with TypeScript

**Usage:**
```typescript
import { theme } from '../theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary.start,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md,
  },
});
```

## 🔄 Data Flow

### Current Flow (MVP)
```
User Action → Component State → UI Update
```

### Future Flow (With Backend)
```
User Action → API Call → React Query Cache → UI Update
              ↓
         AsyncStorage (Offline)
```

## 📦 Module Organization

### Barrel Exports
Each module directory has an `index.ts` for clean imports:

```typescript
// Instead of:
import { Button } from '../components/common/Button';
import { SearchBar } from '../components/common/SearchBar';

// Use:
import { Button, SearchBar } from '../components/common';
```

### Type Safety
- All components have TypeScript interfaces
- Props are strictly typed
- Navigation routes are typed
- Data models are defined

## 🚀 Scalability Features

### 1. Modular Structure
- Each feature is self-contained
- Easy to add new categories
- Components are reusable

### 2. Performance Optimizations (Ready)
- FlatList for long lists
- Image optimization with expo-image
- Lazy loading ready
- Code splitting ready

### 3. Testing Ready
- Component structure supports unit tests
- Screen structure supports integration tests
- Navigation structure supports E2E tests

### 4. Internationalization Ready
- Text can be extracted to i18n files
- Theme supports RTL layouts
- Date/number formatting ready

## 🎨 Component Guidelines

### Creating New Components

1. **Location**: Place in appropriate directory
   - Shared: `src/components/common/`
   - Feature-specific: `src/components/[feature]/`

2. **Structure**:
```typescript
/**
 * ComponentName
 * Brief description
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface ComponentNameProps {
  // Props definition
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  // Props destructuring
}) => {
  return (
    <View style={styles.container}>
      {/* Component JSX */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Styles using theme tokens
  },
});
```

3. **Export**: Add to `index.ts` in the same directory

### Styling Guidelines

1. **Use theme tokens** for all values
2. **Soft shadows** with low opacity
3. **Apple-inspired** rounded corners
4. **Consistent spacing** using 8px grid
5. **Gradient** for primary actions

## 🔐 Security Considerations (Future)

- Secure storage for tokens
- API key management
- Input validation
- XSS prevention
- HTTPS only

## 📱 Platform Considerations

### iOS
- Safe area handling
- Native feel with haptics
- Apple design guidelines

### Android
- Material Design principles
- Back button handling
- Status bar theming

### Web
- Responsive design
- Keyboard navigation
- SEO optimization

## 🎯 Next Development Steps

1. **Backend Integration**
   - Set up API service layer
   - Implement authentication
   - Add data fetching

2. **Feature Completion**
   - Listing detail view
   - Search & filter
   - Create listing flow
   - Messaging system

3. **User Experience**
   - Loading states
   - Error handling
   - Offline support
   - Push notifications

4. **Testing**
   - Unit tests for components
   - Integration tests for screens
   - E2E tests for critical flows

5. **Performance**
   - Image optimization
   - List virtualization
   - Code splitting
   - Bundle size optimization

---

**Last Updated**: Initial Setup
**Version**: 1.0.0
**Status**: MVP Foundation Complete
