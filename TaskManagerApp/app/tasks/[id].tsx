import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router'; // Make sure to import useRouter
import API from '../../lib/api';
import * as SecureStore from 'expo-secure-store';

export default function TaskDetail() {
  const { id } = useLocalSearchParams(); // Access the route params (id)
  const router = useRouter(); // Access the router for navigation
  const [title, setTitle] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [msg, setMsg] = useState<string>('');

  useEffect(() => {
    const fetchTaskData = async () => {
      const token = await SecureStore.getItemAsync('access');
      if (!token) {
        setMsg('Token not found');
        return;
      }

      try {
        const res = await API.get(`/tasks/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTitle(res.data.title);
        setStatus(res.data.status);
      } catch (err) {
        setMsg('Failed to fetch task');
      }
    };

    if (id) {
      fetchTaskData();
    }
  }, [id]);

  const updateTask = async () => {
    const token = await SecureStore.getItemAsync('access');
    if (!token) {
      setMsg('Token not found');
      return;
    }

    try {
      await API.put(`/tasks/${id}/`, { title, status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg('Task updated successfully');
      router.push('/tasks');  // Redirect to the task list after update
    } catch (err) {
      setMsg('Failed to update task');
    }
  };

  const deleteTask = async () => {
    const token = await SecureStore.getItemAsync('access');
    if (!token) {
      setMsg('Token not found');
      return;
    }

    try {
      await API.delete(`/tasks/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg('Task deleted');
      router.push('/tasks');  // Redirect to task list after deletion
    } catch (err) {
      setMsg('Failed to delete task');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Details</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={styles.input}
      />
      <TextInput
        value={status}
        onChangeText={setStatus}
        placeholder="Status"
        style={styles.input}
      />
      <Button title="Update Task" onPress={updateTask} />
      <Button title="Delete Task" onPress={deleteTask} color="#f44336" />
      <Text style={styles.msg}>{msg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  msg: {
    marginTop: 10,
    color: 'red',
  },
});
