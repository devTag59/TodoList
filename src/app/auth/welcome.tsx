import react from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
export default function Welcome() {
const router=useRouter();
const loggedIn=true;
const handleContinue=()=>{
    console.log("cliquei em continuar");
    if (loggedIn) {
        router.push("/menu_tabs/Casa");
    } else{
        router.push("/auth/login");
    }
};
return (
<View className="flex-1 justify-center items-center p-5 bg-slate-200">
    <Text>Bem-vindo</Text>
    <Button title="Continuar" onPress={handleContinue}/>
</View>
);
}