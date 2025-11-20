import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

interface UserProps {
  id: number;
  senha: string;
  email: string;
}

const Login = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Buscar usuários da API quando o componente montar
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://192.168.1.13:3000/users");
      const usersData = await response.json();
      setUsers(usersData);
      console.log(usersData)
    } catch (error) {
      console.log("Erro ao buscar usuários:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    // Verificar se existe algum usuário com o email e senha correspondentes
    const userFound = users.find(user => 
      user.email === email && user.senha === senha
    );

    if (userFound) {
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      router.push("/menu_tabs/screens/NotificationScreen");
    } else {
      Alert.alert("Erro", "Email ou senha incorretos.");
      console.log("errado")
    }
    
    setLoading(false);
  };

  return (
    <View className="flex-1 flex items-center justify-center overflow-hidden">
      <Image source={require("../../assets/Grupo.png")} />
      <View className="w-full h-full flex-1 flex-column items-center justify-between absolute p-5 gap-5">
        <View className="flex-1 text-center items-center justify-around">
          <Text className="font-bold text-3xl text-teal-800">TODO-LIST</Text>
          <Text className="font-medium text-xl text-slate-400 text-center">
            Faça login e organize sua vida de uma forma que nunca fez antes
          </Text>
        </View>
   
        <View className="flex-1 w-full flex-column items-baseline justify-around">
          <Text className="text-xl text-slate-400 font-bold">Email</Text>
          <TextInput
            className="w-full h-14 bg-slate-50 rounded-full border-2 border-green-200 p-2"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
          <Text className="text-xl text-slate-400 font-bold">Senha</Text>
          <TextInput
            className="w-full h-14 bg-slate-50 rounded-full border-2 border-green-200 p-2"
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
       
            editable={!loading}
          />
        </View>
        
        <View className="w-full flex-1 flex flex-column justify-center gap-5">
          <TouchableOpacity
            className="w-full h-12 bg-green-600 rounded-full items-center justify-center"
            onPress={() => router.push("/auth/signUp")}
            disabled={loading}
          >
            <Text className="text-xl font-bold text-slate-50">Criar conta</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="w-full h-12 bg-blue-600 rounded-full items-center justify-center"
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-xl font-bold text-slate-50">Entrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;