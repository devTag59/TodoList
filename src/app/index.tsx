import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import Notifications from './notifications';

export default function App() {
  const [title, setTitle] = useState("Afazeres");
  const [body, setBody] = useState("Grandeza me esperando");
  const [hora, setHora] = useState("");
  const [minuto, setMinuto] = useState("");
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);

  // Define a hora e o minuto atuais ao montar o componente
  useEffect(() => {
    const now = new Date();
    setHora(now.getHours().toString().padStart(2, "0")); // Ex: "09"
    setMinuto(now.getMinutes().toString().padStart(2, "0")); // Ex: "05"
  }, []);

  // Atualiza a data sempre que a hora ou o minuto mudar
  useEffect(() => {
    const updateScheduledDate = () => {
      const now = new Date();
      const hour = parseInt(hora, 10);
      const minute = parseInt(minuto, 10);

      if (!isNaN(hour) && !isNaN(minute) && hour >= 0 && hour < 24 && minute >= 0 && minute < 60) {
        const newScheduledDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);

        // Garante que o horário seja no futuro
        if (newScheduledDate > now) {
          setScheduledDate(newScheduledDate);
        } else {
          setScheduledDate(null);
          console.log("Erro", "A hora deve ser no futuro!");
        }
      } else {
        setScheduledDate(null);
        console.log("Erro", "Hora ou minuto inválidos!");
      }
    };

    updateScheduledDate();
  }, [hora, minuto]); // Executa quando a hora ou minuto mudam

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="O que queres fazer"
        />
        <TextInput 
          className='w-full h-14 text-center'
          value={body}
          onChangeText={setBody}
          placeholder="Como queres fazer???"
        />
        
        {/* Input para a Hora */}
        <TextInput
          value={hora}
          onChangeText={setHora}
          placeholder="Hora (0-23)"
          keyboardType="numeric"
          maxLength={2}
        />
        
        {/* Input para os Minutos */}
        <TextInput
          value={minuto}
          onChangeText={setMinuto}
          placeholder="Minuto (0-59)"
          keyboardType="numeric"
          maxLength={2}
        />
        
        {/* Envia a data correta para o Notifications apenas se for válida */}
        {scheduledDate && <Notifications title={title} body={body} data={scheduledDate} />}
      </View>
    </GestureHandlerRootView>
  );
}
