import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useNotification } from "../_utils/NotificationContext";

const NotificationScreen: React.FC = () => {
  const { notifications } = useNotification();
  console.log("NotificationScreen renderizado. Notificações:", notifications); // Depuração

  return (
    <View className="flex-1 justify-center items-center content-center p-5 bg-slate-200 mt-10">
      <Text style={styles.title}>Notificações Agendadas</Text>
      <FlatList
        data={notifications}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhuma notificação agendada.
          </Text>
        }
        renderItem={({ item }) => (
          <View className="bg-white p-2 m-2">
            <Text style={{ color: "black" }}>{item.title}</Text>
            <Text>{item.body}</Text>
            <Text style={styles.itemDate}>
              {new Date(item.date).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  itemDate: { fontSize: 12, color: "gray" },
});

export default NotificationScreen;