import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import API from '../../lib/api';
import * as SecureStore from 'expo-secure-store';

export default function CreateTask() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status , setStatus] = useState('');

  const handleSubmit = async () => {
    const token = await SecureStore.getItemAsync('access');
    try {
      await API.post(
        '/tasks/',
        { title, description,status}, // status is optional, defaults to 'pending'
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('Success', 'Task created');
      router.push('/tasks'); // Go back to task list
    } catch (error) {
      Alert.alert('Error', 'Failed to create task');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Task</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Create Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
