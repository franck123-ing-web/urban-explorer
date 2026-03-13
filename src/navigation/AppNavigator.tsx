import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import MapScreen from "../screens/MapScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DiscoveryStack from "./DiscoveryStack";

// Typage TypeScript des routes
export type RootTabParamList = {
  Découverte: undefined;
  Carte: undefined;
  Profil: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Découverte"
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",

          tabBarStyle: {
            height: 60,
            paddingBottom: 6,
          },

          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === "Découverte") {
              iconName = "compass";
            } else if (route.name === "Carte") {
              iconName = "map";
            } else {
              iconName = "person";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Découverte"
          component={DiscoveryStack}
          options={{
            title: "Découverte",
          }}
        />

        <Tab.Screen
          name="Carte"
          component={MapScreen}
          options={{
            title: "Carte",
          }}
        />

        <Tab.Screen
          name="Profil"
          component={ProfileScreen}
          options={{
            title: "Mon Profil",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}