import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

export interface UserProps {
senha: string;
email: string;
}

const User = () => {
const [users, setUsers] = useState<UserProps[]>([]);
const router = useRouter();

const buscarUsers = async () => {
try {
    const response = await fetch("http://10.1.19.2:3000/users");
    const data = await response.json();
    setUsers(data);
    console.log("Dados dos usuários:", data);

    // Passar os dados para a tela de login
    router.push({
    pathname: "/auth/login",
    params: { users: JSON.stringify(data) }, // Passa os usuários como string
    });
} catch (error) {
    console.log("Erro pegando os dados:", error);
}
};

useFocusEffect(
useCallback(() => {
    buscarUsers();
}, [])
);

return (
<View style={styles.container}>
    <Text>Buscando dados dos usuários...</Text>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
},
});

export default User;