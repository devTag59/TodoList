import { router } from "expo-router";
import {View, Text, Button} from "react-native"
export default function Login(){
    return (
        <View className="flex-1 justify-center items-center p-5 bg-slate-200">
            <Text className="text-red-400">Login</Text>
            <Button title="Entrar" onPress={()=>{router.push("/auth/signUp")}}/>
        </View>
    );
}
