import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../styles/global.css";
export default function RootLayout() {
  return (
    <>
      <Slot />
      <StatusBar backgroundColor="gray" style="light"/>
    </>
  );
}
