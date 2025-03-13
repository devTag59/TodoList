import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NotificationProvider } from "./_utils/NotificationContext";
import { TabsNavigator } from "./navigation/tabsNavigator";

export  function IndexTabs() {
  return (
    <NotificationProvider>
      <NavigationContainer>
        <TabsNavigator />
      </NavigationContainer>
    </NotificationProvider>
  );
}