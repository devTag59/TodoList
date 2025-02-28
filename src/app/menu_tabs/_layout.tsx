import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import "./tabs_conf"
export default function TabsLayout() {
  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: 'blue', // Cor do ícone/texto ativo
      tabBarInactiveTintColor: 'gray', // Cor do ícone/texto inativo
      headerShown:false
    }}>
      <Tabs.Screen
        name="Casa"
        options={{
          title: 'Casa',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="other"
        options={{
          title: 'Definições',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
      name='Perfil'
      options={{
        title: "Perfil",
        tabBarIcon:({color, size})=>(
          <Ionicons name='search' size={size} color={color}/>
        )
      }}
      />
    </Tabs>
  );
}