import React, { useState } from "react";
import { Alert, Button} from "react-native";
import * as Notifications from "expo-notifications";
import { useNotification } from "./NotificationContext"; // Importando o contexto
import NotificationList from "../menu_tabs/NotificationList";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const Notification: React.FC<{
  title: string;
  body: string;
  data: Date;
}> = ({ title, body, data }) => {
  const { addNotification } = useNotification(); // Obtendo a função para adicionar notificações
  const [able, setAble] = useState(false);
  const [hour, setHour] = useState(0);
  const intervalo = setTimeout(() => {
    setAble(false);
    return clearTimeout(intervalo);
  }, 5000);
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
    console.log("Aguardando alguns segundos para executar...");

    const hora = handleAgenda(data);
    if (!hora) {
      console.log("Hora inválida, saindo...");
      return;
    }

    // Adiciona a notificação ao contexto imediatamente
    addNotification({ title, body, date: hora });
    <NotificationList notifications={[{ title, body, date: hora }]}/>
    Alert.alert(

      "Notificação agendada!",
      `Será enviada em ${hora.toLocaleTimeString()}`
    );
    setAble(true);

    // Calcula a diferença em milissegundos corretamente
    const agora = new Date();
    const diferencaMs = hora.getMinutes() - agora.getMinutes();

    console.log(`Faltam ${diferencaMs / 1000} segundos para a notificação.`);

    // Verifica se a hora já passou (para evitar agendamentos inválidos)
    if (diferencaMs <= 0) {
        console.log("O horário já passou. Notificação não será agendada.");
        return;
    }

    // Executa a notificação apenas após o tempo determinado
    const timer = setTimeout(async () => {
      try {
        await Notifications.scheduleNotificationAsync({
          content: { title, body },
          trigger: { date: hora } as Notifications.NotificationTriggerInput,
        });

        console.log("Notificação enviada!");

      } catch (error) {
        console.error("Erro ao agendar notificação:", error);
        Alert.alert("Erro", "Não foi possível agendar a notificação.");
      }
    }, 10000); // Aguarda o tempo correto em milissegundos

    return () => {
      console.log("Cancelando o timer...");
      clearTimeout(timer);
    };
};


  return (
    <Button
      title="Agendar Notificação"
      onPress={scheduleNotification}
      disabled={able}
    />
  );
};
