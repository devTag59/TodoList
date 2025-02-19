import { View } from "react-native";
import Login from "./auth/login";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function app() {
  const router = useRouter();
  useEffect(() => {
    const timout = setTimeout(() => {
      const loggedIn = true;
      if (loggedIn) {
        router.navigate("/menu_tabs/notifications");
      } else {
        return null;
      }
    }, 1000);
    return () => clearTimeout(timout);
  }, [router]);
  return <Login />;
}
