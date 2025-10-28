/**
 * Navigation type definitions
 */

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Inbox: undefined;
  Post: undefined;
  Listings: undefined;
  Account: undefined;
};

export type InboxStackParamList = {
  InboxMain: undefined;
  Chat: {
    conversationId: string;
    itemTitle: string;
    itemPrice: number;
    itemImage: string;
    contactName: string;
    contactAvatar: string;
    contactRating: number;
    contactLocation: string;
    isVerified: boolean;
    conversationType: 'buying' | 'selling';
    fromHome?: boolean; // Track if navigation came from Home
  };
};

export type HomeStackParamList = {
  HomeMain: undefined;
  CategoryDetail: { category: CategoryType };
  ForSaleFeed: undefined;
  LocalEvents: undefined;
};

export type CategoryType = 
  | 'forSale' 
  | 'jobs' 
  | 'rentals' 
  | 'coupons' 
  | 'services' 
  | 'news';
