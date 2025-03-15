import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// Defina a interface para a notificação
interface Notification {
  id: number;
  title: string;
  body: string;
  date: string; // Ou Date, dependendo de como você está lidando com datas
}

const NotificationScreen: React.FC = () => {
  const [notify, setNotify] = useState<Notification[]>([]);

  const buscarNotifications = async () => {
    try {
      const response = await fetch("http://10.1.19.2:3000/notifications");
      const data = await response.json();
      setNotify(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      buscarNotifications();
    }, [])
  );

  return (
    <ScrollView className="flex-1 bg-slate-200 overflow-hidden ">
      <Text className="text-3xl font-bold text-center">Notificações Agendadas</Text>
      <FlatList
        data={notify}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        ListEmptyComponent={
          <Text className="text-2xl font-bold text-center">
            Nenhuma notificação agendada.
          </Text>
        }
        showsVerticalScrollIndicator={false}
        horizontal={false}
        renderItem={({ item }: { item: Notification }) => (
          <View className="flex-1 bottom-10 justify-center items-baseline p-5 bg-slate-50 overflow-hidden m-3 rounded-2xl border">
            <Text className="text-2xl font-bold text-center">{item.title}</Text>
            <Text className="text-2xl font-normal text-center">{item.body}</Text>
            <Text className="text-2xl font-light text-center">
              {new Date(item.date).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </ScrollView>
  );
};
export default NotificationScreen;
