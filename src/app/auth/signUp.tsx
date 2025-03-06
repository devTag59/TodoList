import React, { useEffect, useState } from "react";
import { 
View, Text, TextInput, Button, Alert, StyleSheet 
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as yup from "yup";
import { User } from "./root_user/user";

// Definição do esquema de validação
const schema = yup.object().shape({
name: yup.string().required("O nome é obrigatório"),
email: yup.string().email("Email inválido").required("O email é obrigatório"),
password: yup
.string()
.min(6, "A senha deve ter pelo menos 6 caracteres")
.required("A senha é obrigatória"),
});

export default function SignUp() {
type User = {
name: string;
email: string;
password: string;
};
const [storedUser, setStoredUser] = useState<User | null>(null);// Estado para armazenar os dados carregados
const {
control,
handleSubmit,
formState: { errors },
} = useForm({
resolver: yupResolver(schema),
});

// 🔹 Função para salvar o usuário no AsyncStorage
const saveUser = async (data: any) => {
try {
    await AsyncStorage.setItem("@user_data", JSON.stringify(data));
    Alert.alert("Cadastro realizado!", "Usuário salvo no dispositivo.");
    getUserData(); // Atualiza os dados na tela
    console.log(data)
} catch (error) {
    Alert.alert("Erro", "Não foi possível salvar os dados.");
}
};

// 🔹 Função para recuperar os dados do usuário
const getUserData = async () => {
try {
    const data = await AsyncStorage.getItem("@user_data");
    if (data) {
    setStoredUser(JSON.parse(data));
    console.log(data) // Converte JSON para objeto
    }
} catch (error) {
    Alert.alert("Erro", "Não foi possível recuperar os dados.");
}
};

// 🔹 Função para remover os dados salvos
const removeUser = async () => {
try {
    await AsyncStorage.removeItem("@user_data");
    setStoredUser(null); // Remove do estado
    Alert.alert("Dados removidos!", "O usuário foi apagado.");
} catch (error) {
    Alert.alert("Erro", "Não foi possível remover os dados.");
}
};

// 🔹 Carregar os dados do usuário ao iniciar o app
useEffect(() => {
getUserData();
}, []);

return (
<View style={styles.container}>
    <Text>Nome:</Text>
    <Controller
    control={control}
    name="name"
    render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        />
    )}
    />
    {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
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
    {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

    <Button title="Cadastrar" onPress={handleSubmit(saveUser)} />

    {storedUser && (
        <User nome={storedUser.name} email={storedUser.email} senha={storedUser.password}/>
    )}
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 20,
justifyContent: "center",
},
input: {
borderWidth: 1,
borderColor: "#ccc",
padding: 10,
marginBottom: 10,
borderRadius: 5,
},
error: {
color: "red",
marginBottom: 10,
},
userBox: {
marginTop: 20,
padding: 15,
backgroundColor: "#e0ffe0",
borderRadius: 5,
},
userTitle: {
fontWeight: "bold",
marginBottom: 5,
},
});
