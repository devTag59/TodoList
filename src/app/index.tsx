import { Alert, View } from "react-native";
import Login from "./auth/login";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications"
import Welcome from "./auth/welcome";
/*Notifications.setNotificationHandler({
  handleNotification:async ()=> ({
    shouldShowAlert: true,
    shouldPlaySound:true,
    shouldSetBadge:true,

  }),
});
*/
export default function app() {
/*
  //pedindo permissao ao usuario
  useEffect(()=>{
    const requestPermission= async()=>{
      const{status}=await Notifications.requestPermissionsAsync();
      if (status!=="granted") {
        Alert.alert("permição negada")
      }
    }
    Notifications.requestPermissionsAsync()
  },[])
  */
  //caba aqui bloco de permission
  const router = useRouter();
  useEffect(() => {
    const timout = setTimeout(() => {
      const loggedIn = false;
      if (loggedIn) {
        router.navigate("/menu_tabs/Casa");
      } else {
        return null;
      }
    }, 5000);
    return () => clearTimeout(timout);
  }, [router]);
  return <Welcome/>;
}
