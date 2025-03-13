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
      const response = await fetch("http://192.168.1.10:3000/notifications");
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
      <Text style={styles.title}>Notificações Agendadas</Text>
      <FlatList
        data={notify}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhuma notificação agendada.
          </Text>
        }
        showsVerticalScrollIndicator={false}
        horizontal={false}
        renderItem={({ item }: { item: Notification }) => (
          <View className="flex-1 bottom-10 justify-center items-baseline p-5 bg-slate-50 overflow-hidden m-3 rounded-2xl border">
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text>{item.body}</Text>
            <Text style={styles.notificationDate}>
              {new Date(item.date).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  notificationItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  notificationDate: {
    fontSize: 12,
    color: "#666",
  },
});

export default NotificationScreen;
