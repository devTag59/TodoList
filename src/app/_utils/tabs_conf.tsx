import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {NotificationProvider} from "./NotificationContext";
import { Notification } from "./notifications";


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
function NotificationScreen() {
return (
<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Notificações</Text>
</View>
);
}
function NotificationList() {
    return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>lista de Notificações</Text>
    </View>
    );
    }
// Criar o navegador de abas
const Tab = createBottomTabNavigator();

export function TabsNavigator() {
return (
    <NotificationProvider>
<NavigationContainer>

    <Tab.Navigator>
        <Notification title="Sample Title" body="Sample Body" data={new Date()} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="NotificationScreen" component={NotificationScreen}/>
        <Tab.Screen name="NotificationList" component={NotificationList}/>
    </Tab.Navigator>
   
</NavigationContainer>
</NotificationProvider>
);
}
