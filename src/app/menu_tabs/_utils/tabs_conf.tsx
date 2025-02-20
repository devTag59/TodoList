import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

// Telas das abas
function HomeScreen() {
return (
<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Home</Text>
</View>
);
}

function SettingsScreen() {
return (
<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Definições</Text>
</View>
);
}

// Criar o navegador de abas
const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
return (
<NavigationContainer>
    <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
</NavigationContainer>
);
}
