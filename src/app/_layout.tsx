import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "../styles/global.css";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar backgroundColor="gray" style="light" />
    </>
  );
}