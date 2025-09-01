import React, { useState, useCallback } from "react";
import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// Defina a interface para a notificação
interface Notification {
  id: number;
  title: string;
  body: string;
  date: string;
}

const NotificationScreen: React.FC = () => {
  const [notify, setNotify] = useState<Notification[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const buscarNotifications = async () => {
    try {
      setRefreshing(true);
      const response = await fetch("http://localhost:3000/notifications");
      const data = await response.json();
      setNotify(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      buscarNotifications();
    }, [])
  );

  const onRefresh = useCallback(() => {
    buscarNotifications();
  }, []);

  // Função para formatar a data de forma mais amigável
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Hoje às ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Ontem às ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  return (
    <View className="flex-1 bg-slate-200 pt-10">
      <Text className="text-3xl font-bold text-center m-4 text-teal-800">
        Notificações Agendadas
      </Text>
      
      <FlatList
        data={notify}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Image 
              source={require("../../../assets/fundo.png")} 
              className="w-48 h-40 opacity-80"
              resizeMode="contain"
            />
            <Text className="text-2xl font-bold text-center text-slate-600 mt-4">
              Nenhuma notificação agendada.
            </Text>
            <Text className="text-lg text-center text-slate-500 mt-2 px-8">
              Quando você agendar lembretes, eles aparecerão aqui.
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        renderItem={({ item }: { item: Notification }) => (
          <View className="bg-slate-50 rounded-2xl p-5 mb-3 shadow-md shadow-slate-300">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-xl font-bold text-blue-300 flex-1">
                {item.title}
              </Text>
              <View className="w-3 h-3 rounded-full bg-green-400 ml-2" />
            </View>
            <Text className="text-lg text-green-300 mb-2 leading-6">
              {item.body}
            </Text>
            <Text className="text-sm text-slate-500 italic">
              {formatDate(item.date)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default NotificationScreen;