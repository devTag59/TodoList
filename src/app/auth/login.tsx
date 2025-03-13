import React from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

// Esquema de validação para login
const schema = yup.object().shape({
email: yup.string().email("Email inválido").required("O email é obrigatório"),
password: yup.string().required("A senha é obrigatória"),
});

export default function Login() {
const navigation = useNavigation();
const {
control,
handleSubmit,
formState: { errors },
} = useForm({
resolver: yupResolver(schema),
});

// Função para validar o login
const handleLogin = async (data: any) => {
try {
    const storedData = await AsyncStorage.getItem("@user_data");
    if (storedData) {
    const user = JSON.parse(storedData);
    if (user.email === data.email && user.password === data.password) {
        Alert.alert("Login realizado!", "Bem-vindo de volta.");
        console.log(data);
        console.log(user.password);
        router.push("/menu_tabs/screens/Casa");
    } else {
        Alert.alert("Erro", "Email ou senha incorretos.");
    }
    } else {
    Alert.alert("Erro", "Nenhum usuário cadastrado.");
    }
} catch (error) {
    Alert.alert("Erro", "Não foi possível acessar os dados.");
}

};

return (
<View style={styles.container}>
    <Text>Email:</Text>
    <Controller
    control={control}
    name="email"
    render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        keyboardType="email-address"
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        />
    )}
    />
    {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

    <Text>Senha:</Text>
    <Controller
    control={control}
    name="password"
    render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        />
    )}
    />
    {errors.password && (
    <Text style={styles.error}>{errors.password.message}</Text>
    )}

    <Button title="Entrar" onPress={handleSubmit(handleLogin)} />
    <Text
    style={styles.switchText}
    onPress={() => router.push("/auth/signUp")}
    >
    Ainda não tem conta? Cadastre-se
    </Text>
</View>
);
}

const styles = StyleSheet.create({
container: { flex: 1, padding: 20, justifyContent: "center" },
input: {
borderWidth: 1,
borderColor: "#ccc",
padding: 10,
marginBottom: 10,
borderRadius: 5,
},
error: { color: "red", marginBottom: 10 },
switchText: { marginTop: 20, textAlign: "center", color: "blue" },
});
