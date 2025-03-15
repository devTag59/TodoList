import React from "react";
import { View, Text, Button, Image } from "react-native";
import { useRouter } from "expo-router";
const getImage = (name: string) => {
switch (name) {
case "Fundo":
    return require("../../assets/fundo.png");
case "senhora":
    return require("../../assets/Grupo.png");
}
};
export default function Welcome() {
const imageName = "senhora";
const router = useRouter();
const loggedIn = false;
const handleContinue = () => {
console.log("cliquei em continuar");
if (loggedIn) {
    router.push("/menu_tabs/screens/Casa");
} else {
    router.push("/auth/login");
}
};
return (
<View className="flex-1 justify-center items-center p-5 bg-slate-200 overflow-hidden">
    <Image source={getImage(imageName)} className="absolute top-0" />
    <View className="w-full h-full flex-1 justify-around items-center top-0 left-0">
    <Image
        source={require("../../assets/fundo.png")}
        className="top-10 w-23 h-30"
    />
    <View className="items-center">
        <Text className="text-3xl font-bold text-green-800">TODO-LIST</Text>
        <View className="w-full h-30 p-5 text-center">
        <Text className="text-center text-lg text-slate-500">
            Gerencie o seu dia a dia de uma forma mais organizada e controlada
            para que nada lhe passe despercebido
        </Text>
        </View>

        <Button title="Continuar" onPress={handleContinue} />
    </View>
    </View>
</View>
);
}
