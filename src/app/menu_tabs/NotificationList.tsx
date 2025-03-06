import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

// Interface para receber a lista de notificações
interface NotificationListProps {
notifications: { title: string; body: string; date: Date }[];
}
const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
    console.log("NotificationList renderizado. Notificações:", notifications); // Depuração
return (
<View style={styles.container} className="flex-1 justify-center items-center content-center p-5 bg-slate-200 mt-10">
    <Text style={styles.title}>Notificações Agendadas</Text>
    <FlatList
    data={notifications}
    keyExtractor={(_, index) => index.toString()}
    ListEmptyComponent={<Text>Nenhuma notificação agendada.</Text>}
    renderItem={({ item }) => (
        <View style={styles.item}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text>{item.body}</Text>
        <Text style={styles.itemDate}>{new Date(item.date).toLocaleString()}</Text>
        </View>
    )}
    />
</View>
);
};

const styles = StyleSheet.create({
container: { flex: 1, padding: 20 },
title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
item: { padding: 10, borderBottomWidth: 1, borderColor: "#ccc" },
itemTitle: { fontSize: 16, fontWeight: "bold" },
itemDate: { fontSize: 12, color: "gray" },
});

export default NotificationList;
