# NABSTA - Local Marketplace App

A scalable marketplace application built with Expo 54, inspired by OfferUp. Buy, sell, and connect with your local community.

## 🎨 Design

- **Primary Gradient**: Hot pink to deep pink (#FF5D62 → #FD3972)
- **Design Language**: Apple-inspired with soft shadows and smooth interactions
- **UI Framework**: React Native with Expo

## 🏗️ Architecture

### Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Button, SearchBar, etc.)
│   ├── home/           # Home-specific components
│   └── auth/           # Auth-specific components
├── screens/            # Screen components
│   ├── auth/           # Authentication screens
│   ├── onboarding/     # Onboarding flow
│   └── main/           # Main app screens
├── navigation/         # Navigation configuration
├── theme/              # Design system (colors, spacing, typography)
├── constants/          # App constants and configurations
├── types/              # TypeScript type definitions
├── services/           # API and business logic services
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── assets/             # Images, icons, fonts
```

### Key Features

#### Main Categories
1. **For Sale** ✅ (MVP - Active)
   - Cars & Vehicles
   - Electronics
   - Furniture
   - Clothing & Shoes
   - Home & Garden
   - Sports & Outdoors
   - Toys & Games
   - Books & Media
   - Pet Supplies

2. **Jobs** 🚀 (Coming Soon)
3. **Rentals** 🚀 (Coming Soon)
4. **Coupons** 🚀 (Coming Soon)
5. **Services** 🚀 (Coming Soon)
6. **News** 🚀 (Coming Soon)

#### User Flows

**Onboarding Flow:**
1. Splash Screen (2.5s with gradient animation)
2. Onboarding (3 pages)
3. Authentication (Google, Facebook, Phone)
4. Main App

**Main Navigation:**
- Home (Category browsing + For Sale feed)
- Inbox (Messages - Coming Soon)
- Post (Create listings - Coming Soon)
- Listings (User's listings - Coming Soon)
- Account (Profile & settings - Coming Soon)

## 🎯 Design System

### Theme Tokens

**Colors:**
- Primary gradient: `#FF5D62` → `#FD3972`
- Background: White, Light Gray
- Text: Black, Gray shades
- Category colors: Unique color per category

**Spacing:**
- 8px grid system (xs: 4, sm: 8, md: 16, lg: 24, xl: 32, etc.)

**Typography:**
- Font sizes: 12-40px
- Weights: Regular (400), Medium (500), Semibold (600), Bold (700)

**Shadows:**
- Soft shadows with low opacity (0.05-0.12)
- Multiple elevation levels (sm, md, lg, xl)

**Border Radius:**
- Apple-inspired rounded corners (8-24px)
- Full radius for pills

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## 📱 Components

### Common Components
- **Button**: Primary, secondary, outline, text variants with loading states
- **CategoryCard**: Card for displaying categories
- **SearchBar**: Search input with location display
- **ComingSoonBanner**: Placeholder for upcoming features

### Home Components
- **CategoryGrid**: 3-column grid of main categories
- **DiscoverBanner**: Local events discovery banner
- **ListingCard**: Individual listing display

## 🔄 State Management

Currently using React state. Ready to scale with:
- Context API for global state
- React Query for server state
- AsyncStorage for persistence

## 🎨 Customization

All theme values are centralized in `src/theme/`:
- `colors.ts` - Color palette
- `spacing.ts` - Spacing system
- `typography.ts` - Font styles
- `shadows.ts` - Shadow definitions
- `borderRadius.ts` - Border radius values

## 📝 Next Steps

### Phase 1 (MVP)
- [x] Project setup
- [x] Design system
- [x] Onboarding flow
- [x] Authentication UI
- [x] Home screen with categories
- [x] For Sale feed
- [ ] Listing detail view
- [ ] Search functionality
- [ ] Filter implementation
- [ ] Backend integration

### Phase 2
- [ ] User authentication (Firebase/Supabase)
- [ ] Create listing flow
- [ ] Inbox/messaging
- [ ] User profiles
- [ ] Favorites/saved items

### Phase 3
- [ ] Jobs category
- [ ] Rentals category
- [ ] Payment integration
- [ ] Push notifications
- [ ] Reviews & ratings

### Phase 4
- [ ] Coupons category
- [ ] Services category
- [ ] News category
- [ ] Advanced search
- [ ] Map view

## 🏛️ Scalability Considerations

1. **Modular Architecture**: Each feature is self-contained
2. **Component Reusability**: Shared components in `/common`
3. **Type Safety**: Full TypeScript coverage
4. **Performance**: Optimized for millions of users
5. **Code Splitting**: Ready for lazy loading
6. **API Ready**: Service layer prepared for backend integration

## 📄 License

Private project - All rights reserved

## 👥 Team

NABSTA Development Team

---

Built with ❤️ using Expo 54
