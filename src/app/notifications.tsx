import React from "react";
import { Alert, Button, View } from "react-native";
import * as Notifications from "expo-notifications";

// Interface para as props
interface NotificationProps {
  title: string;
  body: string;
  data: Date; // Data e hora agendadas
}

// Configuração do handler para notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Notification: React.FC<NotificationProps> = ({ title, body, data }) => {
  // Função para validar e ajustar a data
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

    try {
      console.log("Hora agendada:", hora.toISOString());

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger: {
          date: hora, // Usando 'date' para garantir que a notificação seja enviada na hora exata escolhida pelo usuário
        },
      });

      Alert.alert("Notificação agendada!", `Será enviada em ${hora.toLocaleTimeString()}`);
      console.log("Notificação programada para:", hora.toLocaleString());
    } catch (error) {
      console.error("Erro ao agendar notificação:", error);
      Alert.alert("Erro", "Não foi possível agendar a notificação.");
    }
  };

  return (
    <View>
      <Button title="Agendar Notificação" onPress={scheduleNotification} />
    </View>
  );
};

export default Notification;