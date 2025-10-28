/**
 * InboxStackNavigator
 * Stack navigator for inbox and chat screens
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InboxScreen } from '../screens/main/InboxScreen';
import { ChatScreen } from '../screens/chat/ChatScreen';
import { InboxStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<InboxStackParamList>();

export const InboxStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="InboxMain"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 300,
      }}
    >
      <Stack.Screen 
        name="InboxMain" 
        component={InboxScreen}
        options={{
          // This ensures InboxMain is always the initial screen
        }}
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{
          animation: 'slide_from_right',
          animationDuration: 300,
        }}
      />
    </Stack.Navigator>
  );
};
