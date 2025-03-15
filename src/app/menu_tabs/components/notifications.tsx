import React, { useState } from "react";
import { Alert, Button } from "react-native";

export const Notification: React.FC<{
  title: string;
  body: string;
  data: Date;
}> = ({ title, body, data }) => {
  const [able, setAble] = useState(false);

  const handleAgenda = (selectedTime: Date) => {
    const now = new Date();
    if (selectedTime > now) {
      return selectedTime;
    } else {
      Alert.alert("Hora inválida", "Escolha um horário no futuro.");
      return null;
    }
  };

  const scheduleNotification = async () => {
    const hora = handleAgenda(data);
    if (!hora) {
      console.log("Hora inválida, saindo...");
      return;
    }

    // Busca o último ID das notificações existentes
    try {
      // Dados da notificação com o novo ID
      const newNotification = {
        title,
        body,
        date: hora.toISOString(), // Converte a data para uma string ISO
      };

      // Envia a notificação para o JSON Server
      const postResponse = await fetch("http://10.1.19.2:3000/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNotification),
      });

      if (postResponse.ok) {
        console.log("notifica")
        Alert.alert(
          "Notificação agendada!",
          `Será enviada em ${hora.toLocaleTimeString()}`
        );
        setAble(true);
      } else {
        Alert.alert("Erro", "Não foi possível agendar a notificação.");
      }
    } catch (error) {
      console.error("Erro ao enviar notificação:", error);
      Alert.alert("Erro", "Ocorreu um erro ao agendar a notificação.");
    }
  };

  return (
    <Button
      title="Agendar Notificação"
      onPress={scheduleNotification}
      //disabled={able}
    />
  );
};