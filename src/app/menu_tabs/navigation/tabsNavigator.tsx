import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Casa from "../screens/Casa";
import NotificationScreen from "../screens/NotificationScreen";
import Other from "../screens/other";

const Tab = createBottomTabNavigator();

export function TabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Casa" component={Casa} />
      <Tab.Screen name="Other" component={Other} />
      <Tab.Screen name="NotificationScreen" component={NotificationScreen} />
    </Tab.Navigator>
  );
}