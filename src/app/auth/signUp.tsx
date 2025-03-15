import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert,Text } from "react-native";

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleCadastro = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    // Envia os dados para a API
    try {
      const response = await fetch("http://10.1.19.2:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
        // Redireciona para a tela de login após o cadastro
        router.push("/auth/login");
      } else {
        Alert.alert("Erro", "Falha ao cadastrar usuário.");
      }
    } catch (error) {
      console.log("Erro ao cadastrar usuário:", error);
      Alert.alert("Erro", "Falha ao conectar com o servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Cadastrar" onPress={handleCadastro} />
      <Button
        title="Voltar para o Login"
        onPress={() => router.push("/auth/login")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default Cadastro;