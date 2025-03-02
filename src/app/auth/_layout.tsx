import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../../styles/global.css";
export default function AuthLayout() {
  return (
    <>
      <Stack
      screenOptions={{headerShown:false}}>
        <Stack.Screen name="login"/>
        <Stack.Screen name="signUp"/>
      </Stack>
      <StatusBar backgroundColor="gray" style="light"/>
    </>
  );
}
