import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../styles/global.css";
export default function RootLayout() {
  return (
    <>
      <Stack
      >
        <Stack.Screen name="index"/>
      </Stack>
      <StatusBar backgroundColor="gray" style="light"/>
    </>
  );
}
