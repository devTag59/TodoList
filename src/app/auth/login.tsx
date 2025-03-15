import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
StyleSheet,
View,
TextInput,
Button,
Alert,
Image,
Text,
TouchableOpacity,
} from "react-native";

export interface UserProps {
senha: string;
email: string;
}

const Login = () => {
const { users } = useLocalSearchParams(); // Recebe os usuários passados como parâmetro
const [email, setEmail] = useState("");
const [senha, setSenha] = useState("");
const router = useRouter();

// Converte a string de usuários de volta para um array
const usersArray: UserProps[] = users ? JSON.parse(users as string) : [];

const handleLogin = () => {
// Verifica se o email e senha correspondem a algum usuário
const user = usersArray.find((u) => u.email === email && u.senha === senha);

if (user) {
    Alert.alert("Sucesso", "Login realizado com sucesso!");
    // Redireciona para a próxima tela (ex: Home)
    router.push("/menu_tabs/screens/NotificationScreen");
} else {
    Alert.alert("Erro", "Email ou senha incorretos.");
}
};

return (
<View className="flex-1 flex items-center justify-center overflow-hidden">
    <Image source={require("../../assets/Grupo.png")} />
    <View className="w-full h-full flex-1 flex-column items-center justify-between absolute p-5 gap-5">
        <View className="flex-1 text-center items-center justify-around">
        <Text className="font-bold text-3xl  text-teal-800">TODO-LIST</Text>
    <Text className="font-medium text-xl text-slate-400 text-center">
        Faça login e organize sua vida de uma forma que nunca fez antes
    </Text>
        </View>
   
    <View className="flex-1 w-full flex-column items-baseline justify-around">
        <Text className="text-xl text-slate-400 font-bold">Email</Text>
        <TextInput
        className="w-full h-14 bg-slate-50 rounded-full  border-2 border-green-200 p-2"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        />
        <Text className="text-xl text-slate-400 font-bold">Senha</Text>
        <TextInput
        className="w-full h-14 bg-slate-50 rounded-full  border-2 border-green-200 p-2"
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        />
    </View>
    <View className="w-full flex-1 flex flex-column justify-center gap-5">
        <TouchableOpacity
        className="w-full h-12 bg-green-600 rounded-full items-center justify-center"
        onPress={() => router.push("/auth/signUp")}
        >
        <Text className="text-xl font-bold text-slate-50">Criar conta</Text>
        </TouchableOpacity>
        <TouchableOpacity
        className="w-full h-12 bg-blue-600 rounded-full items-center justify-center"
        onPress={handleLogin}
        >
        <Text className="text-xl font-bold text-slate-50">Entrar</Text>
        </TouchableOpacity>
    </View>
    </View>
</View>
);
};
export default Login;
