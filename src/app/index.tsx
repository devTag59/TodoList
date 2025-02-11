import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Notification from './notifications';

export default function App() {
  const [title, setTitle] = useState('Afazeres');
  const [body, setBody] = useState('Grandeza me esperando');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');

  // Função para criar a data agendada
  const createScheduledTime = () => {
    const now = new Date();
    const hours = parseInt(hour, 10);
    const minutes = parseInt(minute, 10);

    if (isNaN(hours) || isNaN(minutes)) {
      Alert.alert('Erro', 'Digite uma hora e minuto válidos.');
      return null;
    }

    // Cria uma data com a hora e minuto fornecidos, usando a data atual
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );
  };

  const scheduledTime = createScheduledTime();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="O que queres fazer"
      />
      <TextInput
        style={styles.input}
        value={body}
        onChangeText={setBody}
        placeholder="Como queres fazer???"
      />
      <TextInput
        style={styles.input}
        value={hour}
        onChangeText={setHour}
        placeholder="Hora (HH)"
        keyboardType="numeric"
        maxLength={2} // Limita a 2 dígitos
      />
      <TextInput
        style={styles.input}
        value={minute}
        onChangeText={setMinute}
        placeholder="Minuto (MM)"
        keyboardType="numeric"
        maxLength={2} // Limita a 2 dígitos
      />
      {scheduledTime && (
        <Notification title={title} body={body} data={scheduledTime} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});