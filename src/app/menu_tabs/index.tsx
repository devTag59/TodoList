import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import Notification from "./notifications";

export function AppPlus() {
  const [title, setTitle] = useState("Afazeres");
  const [body, setBody] = useState("Grandeza me esperando");
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());

  // Função para criar a data agendada
  const createScheduledTime = () => {
    const now = new Date();
    const hours = Math.round(hour);
    const minutes = Math.round(minute);

    if (isNaN(hours) || isNaN(minutes)) {
      alert("Erro: Digite uma hora e minuto válidos.");
      return null;
    }

    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );
  };

  const scheduledTime = createScheduledTime();

  return (
    <View className="flex-1 justify-center items-center p-5 bg-gradient-to-b from-blue-500 to-purple-600">
      <Text className="text-lg font-bold mb-2 text-300">Título:</Text>
      <TextInput
        className="w-full border border-gray-300 p-2 mb-4 rounded bg-white"
        value={title}
        onChangeText={setTitle}
        placeholder="O que queres fazer"
      />

      <Text className="text-lg font-bold mb-2 text-300">Descrição:</Text>
      <TextInput
        className="w-full border border-gray-300 p-2 mb-4 rounded bg-white"
        value={body}
        onChangeText={setBody}
        placeholder="Como queres fazer???"
      />
      <View className="flex flex-row gap-10">
        <View className="flex flex-column items-center">
          <Text className="text-lg font-bold mb-2 text-300">Hora: {hour}h</Text>
          <View className="flex-row items-center justify-between w-40 my-2">
            <Button
              title="-"
              onPress={() => setHour((prev) => Math.max(0, prev - 1))}
            />
            <Text className="text-lg text-300">{hour}</Text>
            <Button
              title="+"
              onPress={() => setHour((prev) => Math.min(23, prev + 1))}
            />
          </View>
        </View>
        <View className="flex flex-column items-center">
          <Text className="text-lg font-bold mb-2 text-300">
            Minuto: {minute}min
          </Text>
          <View className="flex-row items-center justify-between w-40 my-2">
            <Button
              title="-"
              onPress={() => setMinute((prev) => Math.max(0, prev - 1))}
            />
            <Text className="text-lg text-300">{minute}</Text>
            <Button
              title="+"
              onPress={() => setMinute((prev) => Math.min(59, prev + 1))}
            />
          </View>
        </View>
      </View>
      {scheduledTime && (
        <Notification title={title} body={body} data={scheduledTime} />
      )}
    </View>
  );
}
