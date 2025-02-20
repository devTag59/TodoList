import React, { useEffect } from "react";
import { Text, View, Button } from "react-native";
import * as Notifications from "expo-notifications";

// Configurar o comportamento das notificações
Notifications.setNotificationHandler({
handleNotification: async () => ({
shouldShowAlert: true,
shouldPlaySound: true,
shouldSetBadge: true,
}),
});

export default function Notification() {
useEffect(() => {
// Solicitar permissão para notificações
const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
    alert("Permissão para notificações negada!");
    }
};

requestPermissions();
}, []);

return (
<></>
);
}
