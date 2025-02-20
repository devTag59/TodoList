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
        router.navigate("/menu_tabs/Casa");
      } else {
        return null;
      }
    }, 5000);
    return () => clearTimeout(timout);
  }, [router]);
  return <Login />;
}
