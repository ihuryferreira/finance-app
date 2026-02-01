import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#d8dfd4",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#2C5F30",
          borderTopColor: "#363434",
        },
      }}
    >
      {/* Aba inicial (index.tsx) */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Início", // muda o título da aba
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />

      {/* Aba de transações */}
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transações",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="money" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
