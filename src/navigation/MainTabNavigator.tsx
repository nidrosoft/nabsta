/**
 * MainTabNavigator
 * Bottom tab navigation for main app sections
 */

import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Platform, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Home2, MessageText, Add, ClipboardText, User } from 'iconsax-react-native';
import { HomeScreen } from '../screens/main/HomeScreen';
import { ListingsScreen } from '../screens/listings';
import { AccountScreen } from '../screens/main/AccountScreen';
import { SellFlowScreen } from '../screens/sell';
import { ListingDetailScreen } from '../screens/listing';
import { InboxStackNavigator } from './InboxStackNavigator';
import { ChatScreen } from '../screens/chat';
import { ListingTypeBottomSheet } from '../components/common';
import { MainTabParamList, CategoryType } from '../types';
import { theme } from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

interface MainTabNavigatorProps {
  onCategoryPress: (category: CategoryType) => void;
  onNavigateToChat?: (params: any) => void;
}


export const MainTabNavigator: React.FC<MainTabNavigatorProps> = ({ onCategoryPress, onNavigateToChat }) => {
  const [showListingSheet, setShowListingSheet] = useState(false);
  const [showSellFlow, setShowSellFlow] = useState(false);
  const [showListingDetail, setShowListingDetail] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(1000)).current; // Start off-screen

  const handleTabPress = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  // Animate listing detail in when shown
  React.useEffect(() => {
    if (showListingDetail) {
      slideAnim.setValue(1000); // Start off-screen
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 65,
        friction: 10,
        useNativeDriver: true,
      }).start();
    }
  }, [showListingDetail]);

  const handlePostPress = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setShowListingSheet(true);
  };

  const handleSelectListingType = (type: string) => {
    console.log('Selected listing type:', type);
    if (type === 'sell') {
      setShowSellFlow(true);
    } else {
      // TODO: Handle other listing types
      console.log('Other listing types coming soon');
    }
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary.start,
          tabBarInactiveTintColor: theme.colors.text.secondary,
          tabBarStyle: {
            backgroundColor: theme.colors.background.primary,
            borderTopWidth: 1,
            borderTopColor: theme.colors.ui.border,
            paddingTop: 12,
            paddingBottom: 12,
            height: 80,
            paddingHorizontal: theme.spacing.md,
          },
          tabBarLabelStyle: {
            fontSize: theme.typography.fontSize.xs,
            fontWeight: theme.typography.fontWeight.medium,
            marginTop: 4,
          },
          tabBarItemStyle: {
            paddingVertical: 4,
          },
          lazy: false,
        }}
        screenListeners={{
          tabPress: handleTabPress,
        }}
      >
        <Tab.Screen
          name="Home"
          component={() => <HomeScreen onCategoryPress={onCategoryPress} onListingPress={() => setShowListingDetail(true)} />}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <Home2 size={24} color={color} variant={focused ? 'Bold' : 'Linear'} />
            ),
          }}
        />

        <Tab.Screen
          name="Inbox"
          component={InboxStackNavigator}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              // ALWAYS reset to InboxMain, regardless of current state
              e.preventDefault(); // Prevent default tab press
              
              // Reset the entire tab navigator to Inbox with InboxMain
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Inbox',
                    state: {
                      routes: [{ name: 'InboxMain' }],
                    },
                  },
                ],
              });
              
              // Haptic feedback
              if (Platform.OS === 'ios') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
            },
          })}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <MessageText size={24} color={color} variant={focused ? 'Bold' : 'Linear'} />
            ),
          }}
        />

      <Tab.Screen
        name="Post"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handlePostPress();
          },
        }}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <TouchableOpacity
              style={styles.fabContainer}
              onPress={handlePostPress}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={theme.colors.primary.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.fab}
              >
                <Add size={28} color={theme.colors.text.white} variant="Linear" />
              </LinearGradient>
            </TouchableOpacity>
          ),
        }}
      >
        {() => <HomeScreen onCategoryPress={onCategoryPress} />}
      </Tab.Screen>

      <Tab.Screen
        name="Listings"
        component={ListingsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <ClipboardText size={24} color={color} variant={focused ? 'Bold' : 'Linear'} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <User size={24} color={color} variant={focused ? 'Bold' : 'Linear'} />
          ),
        }}
      />
    </Tab.Navigator>

    <ListingTypeBottomSheet
      visible={showListingSheet}
      onClose={() => setShowListingSheet(false)}
      onSelectType={handleSelectListingType}
    />

    {showSellFlow && (
      <View style={styles.sellFlowOverlay}>
        <SellFlowScreen
          onClose={() => setShowSellFlow(false)}
          onPublish={() => {
            console.log('Listing published!');
          }}
        />
      </View>
    )}

    {showListingDetail && (
      <Animated.View style={[styles.sellFlowOverlay, { transform: [{ translateX: slideAnim }] }]}>
        <ListingDetailScreen 
          onBack={() => {
            // Slide out animation
            Animated.timing(slideAnim, {
              toValue: 1000,
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              setShowListingDetail(false);
              slideAnim.setValue(1000); // Reset for next time
            });
          }}
          onOpenChat={() => {
            // Navigate immediately without waiting for slide-out
            if (onNavigateToChat) {
              onNavigateToChat({
                conversationId: 'new',
                itemTitle: 'iPhone 13 Pro Max 256GB',
                itemPrice: 299.99,
                itemImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
                contactName: 'John Doe',
                contactAvatar: 'https://i.pravatar.cc/150?img=12',
                contactRating: 4.9,
                contactLocation: 'San Francisco, CA',
                isVerified: true,
                conversationType: 'buying',
                fromHome: true,
              });
            }
            // Close listing detail immediately
            setShowListingDetail(false);
            slideAnim.setValue(1000); // Reset for next time
          }}
        />
      </Animated.View>
    )}
  </>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    top: -20,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.lg,
  },
  sellFlowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background.primary,
    zIndex: 1000,
  },
});
