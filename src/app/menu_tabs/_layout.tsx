import React, { useState, useCallback } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import "./navigation/tabsNavigator"
const fetchNotificationCount = async () => {
  try {
    const response = await fetch("http://192.168.1.13:3000/notifications");
    const notifications = await response.json();
    return notifications.length; // Retorna a quantidade de notificações
  } catch (error) {
    console.error("Erro ao buscar notificações:", error);
    return 0; // Retorna 0 em caso de erro
  }
};
export default function TabsLayout() {
  const [notificationCount, setNotificationCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const loadNotificationCount = async () => {
        const count = await fetchNotificationCount();
        setNotificationCount(count);
      };

      loadNotificationCount();
    }, [])
  );

  const badge=notificationCount
  return (
  <Tabs
  screenOptions={{
    tabBarActiveTintColor: "#FFFFFF",
    tabBarInactiveTintColor: "#E6F7FF",
    headerShown: false,
    tabBarStyle: {
      height: 85,
      borderTopWidth: 0,
      backgroundColor: "#08308F",
      margin: 12,
      borderRadius: 35,
      position: 'relative',
      // Sombra mais pronunciada
      shadowColor: "#4A90E2",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    tabBarItemStyle: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
      marginHorizontal: 6,
      marginVertical: 10,
      height: 50,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "700",
      marginBottom: 12,
      textShadowColor: "rgba(0, 0, 0, 0.3)",
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    // Indicador visual melhorado
    tabBarIndicatorStyle: {
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      height: 45,
      borderRadius: 22,
      top: 10,
    },
  }}
>

      <Tabs.Screen
        name="screens/Casa"
        options={{
          tabBarLabel: ({ focused }) => <Text style={{ color: focused ? "white" : "#a0a0a0" }}>Casa</Text>,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="screens/other"
        options={{
          tabBarLabel: ({ focused }) => <Text style={{ color: focused ? "white" : "#a0a0a0" }}>Perfil</Text>,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="screens/NotificationScreen"
        options={{
          tabBarLabel: ({ focused }) => <Text style={{ color: focused ? "white" : "#a0a0a0" }}>Lista</Text>,
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={24} color={color} />
          ),
          tabBarBadge: badge, // Variavel para adicionar notificacoes com o número 3
        }}
      />
    </Tabs>
  );
}