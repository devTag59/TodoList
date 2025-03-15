import React, { useState, useCallback } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import "./navigation/tabsNavigator"
const fetchNotificationCount = async () => {
  try {
    const response = await fetch("http://10.1.19.2:3000/notifications");
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
        tabBarActiveTintColor: "white", // Cor do ícone/texto ativo
        tabBarInactiveTintColor: "#a0a0a0", // Cor do ícone/texto inativo
        headerShown: false, // Oculta o cabeçalho
        tabBarStyle: {
          height: 80, // Aumenta a altura da barra de abas
          borderTopWidth: 0, // Remove a borda superior
          backgroundColor: "#ADD8E6", // Azul fraco como fundo da barra de abas
          margin: 5,
          borderRadius: 30, // Borda arredondada
          position: 'absolute',
        },
        tabBarItemStyle: {
          justifyContent: "center", // Centraliza o conteúdo verticalmente
        },
        tabBarLabelStyle: {
          fontSize: 12, // Tamanho da fonte do texto da aba
          fontWeight: "bold", // Peso da fonte do texto da aba
          marginBottom: 10, // Ajusta o espaçamento do texto
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