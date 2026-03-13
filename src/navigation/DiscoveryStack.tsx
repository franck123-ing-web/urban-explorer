import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DiscoveryScreen from '../screens/DiscoveryScreen';
import HomeScreen from '../screens/HomeScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import { DiscoveryStackParamList } from '../types/Navigation';
const Stack = createNativeStackNavigator<DiscoveryStackParamList>();

export default function DiscoveryStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ListeLieux"
        component={DiscoveryScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DetailLieu"
        component={PlaceDetailScreen}
        options={{ title: 'Détail du lieu' }}
      />

    </Stack.Navigator>
  );
}