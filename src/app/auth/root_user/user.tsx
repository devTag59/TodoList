import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface UserProps {
nome: String;
senha: String;
email: String;
}

const User: React.FC<UserProps> = ({ nome, senha, email }) => {
    console.log(nome, senha, email);
return<></>
};
export { User };
