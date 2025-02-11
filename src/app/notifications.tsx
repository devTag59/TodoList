import React from "react";
import { Alert, Button, View } from "react-native";
import * as Notifications from "expo-notifications";

// Interface para as props
interface NotificationProps {
title: string;
body: string;
data: Date; // Data e hora agendadas
}

// Componente de Notificação
const Notification: React.FC<NotificationProps> = ({ title, body, data }) => {
// Função para validar a hora
const handleAgenda = (selectedTime: Date) => {
const now = new Date();

if (selectedTime > now) {
    return selectedTime; // Retorna a data se for no futuro
} else {
    Alert.alert("Hora inválida", "Escolha um horário no futuro.");
    return null;
}
};

// Função para agendar a notificação
const scheduleNotification = async () => {
const hora = handleAgenda(data);
if (!hora) return; // Se for inválido, não agenda

// Configurações da notificação
await Notifications.scheduleNotificationAsync({
    content: {
    title: title,
    body: body,
    data: { scheduledTime: hora.toISOString() }, // Salva a hora agendada
    },
    trigger: { date: hora } as Notifications.NotificationTriggerInput, // Usa a data diretamente
});

console.log("Notificação agendada para:", hora);
Alert.alert("Notificação agendada com sucesso!");
};

return (
<View>
    <Button title="Agendar Notificação" onPress={scheduleNotification} />
</View>
);
};

export default Notification;
