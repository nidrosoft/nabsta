/**
 * RootNavigator
 * Main navigation container
 */

import React, { useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { AuthScreen, SignInScreen, PhoneAuthScreen, PhoneVerificationScreen } from '../screens/auth';
import { MainTabNavigator } from './MainTabNavigator';
import { CategoryDetailScreen } from '../screens/main/CategoryDetailScreen';
import { RootStackParamList, CategoryType } from '../types';
import { defaultScreenOptions } from './transitions';

const Stack = createNativeStackNavigator<RootStackParamList>();

type AppState = 'splash' | 'onboarding' | 'auth' | 'signIn' | 'phoneAuth' | 'phoneVerification' | 'main';

export const RootNavigator: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('splash');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const navigationRef = useRef<any>(null);

  const handleSplashFinish = () => {
    setAppState('onboarding');
  };

  const handleOnboardingComplete = () => {
    setAppState('auth');
  };

  const handleAuthComplete = () => {
    setAppState('main');
  };

  const handleSignIn = () => {
    setAppState('signIn');
  };

  const handleBackToAuth = () => {
    setAppState('auth');
  };

  const handleBackToSignIn = () => {
    setAppState('signIn');
  };

  const handlePhoneAuth = () => {
    setAppState('phoneAuth');
  };

  const handlePhoneSubmit = (phone: string) => {
    setPhoneNumber(phone);
    setAppState('phoneVerification');
  };

  const handlePhoneVerify = (code: string) => {
    // TODO: Verify code with backend
    console.log('Verifying code:', code);
    setAppState('main');
  };

  const handleGoogleAuth = () => {
    // TODO: Implement Google auth
    setAppState('main');
  };

  const handleFacebookAuth = () => {
    // TODO: Implement Facebook auth
    setAppState('main');
  };

  const handleCategoryPress = (category: CategoryType) => {
    setSelectedCategory(category);
  };

  const handleCategoryBack = () => {
    setSelectedCategory(null);
  };

  const handleNavigateToChat = (params: any) => {
    if (navigationRef.current) {
      navigationRef.current.navigate('Inbox', {
        screen: 'Chat',
        params: params,
      });
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={defaultScreenOptions}>
        {appState === 'splash' && (
          <Stack.Screen 
            name="Splash"
            options={{ animation: 'fade' }}
          >
            {() => <SplashScreen onFinish={handleSplashFinish} />}
          </Stack.Screen>
        )}

        {appState === 'onboarding' && (
          <Stack.Screen 
            name="Onboarding"
            options={{ animation: 'slide_from_right' }}
          >
            {() => <OnboardingScreen onComplete={handleOnboardingComplete} />}
          </Stack.Screen>
        )}

        {appState === 'auth' && (
          <Stack.Screen 
            name="Auth"
            options={{ animation: 'slide_from_right' }}
          >
            {() => <AuthScreen onAuthComplete={handleAuthComplete} onSignIn={handleSignIn} />}
          </Stack.Screen>
        )}

        {appState === 'signIn' && (
          <Stack.Screen 
            name="SignIn"
            options={{ animation: 'slide_from_right' }}
          >
            {() => (
              <SignInScreen
                onBack={handleBackToAuth}
                onPhoneAuth={handlePhoneAuth}
                onGoogleAuth={handleGoogleAuth}
                onFacebookAuth={handleFacebookAuth}
              />
            )}
          </Stack.Screen>
        )}

        {appState === 'phoneAuth' && (
          <Stack.Screen 
            name="PhoneAuth"
            options={{ animation: 'slide_from_right' }}
          >
            {() => (
              <PhoneAuthScreen
                onBack={handleBackToSignIn}
                onSubmit={handlePhoneSubmit}
              />
            )}
          </Stack.Screen>
        )}

        {appState === 'phoneVerification' && (
          <Stack.Screen 
            name="PhoneVerification"
            options={{ animation: 'slide_from_right' }}
          >
            {() => (
              <PhoneVerificationScreen
                onBack={handleBackToSignIn}
                onVerify={handlePhoneVerify}
                phoneNumber={phoneNumber}
              />
            )}
          </Stack.Screen>
        )}

        {appState === 'main' && (
          <>
            <Stack.Screen 
              name="Main"
              options={{ animation: 'fade' }}
            >
              {() => <MainTabNavigator onCategoryPress={handleCategoryPress} onNavigateToChat={handleNavigateToChat} />}
            </Stack.Screen>
            
            {selectedCategory && (
              <Stack.Screen 
                name="CategoryDetail" 
                options={{ 
                  animation: 'slide_from_right',
                  gestureEnabled: true,
                  fullScreenGestureEnabled: true,
                }}
              >
                {() => (
                  <CategoryDetailScreen
                    category={selectedCategory}
                    onBack={handleCategoryBack}
                  />
                )}
              </Stack.Screen>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
