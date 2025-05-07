import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import API from '../../lib/api';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

type Task = {
  id: number;
  title: string;
  status: string;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();
  // lists all the tasks 
  const fetchTasks = async () => {
    const token = await SecureStore.getItemAsync('access');
    const res = await API.get('/tasks/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };
  // logout and remove tokens 
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('access');
    await SecureStore.deleteItemAsync('refresh');
    router.replace('/login'); // Use replace so user can't go back to TaskList via back button
  };


  useEffect(() => {
    fetchTasks();
  }, []);
  //edit task moves towards [id].tsx
  const handleEdit = (id: number) => {
    router.push(`/tasks/${id}`);
  };
  // delete task
  const handleDelete = async (id: number) => {
    const token = await SecureStore.getItemAsync('access');
    try {
      await API.delete(`/tasks/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskContainer}>
      <View style={styles.taskDetails}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskStatus}>{item.status}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(item.id)} style={styles.button}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.button, styles.deleteButton]}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Tasks</Text>

      {/* Create Task Button */}
      <TouchableOpacity
        onPress={() => router.push('/tasks/create')}
        style={[styles.button, styles.createButton]}
      >
        <Text style={styles.buttonText}>+ Create Task</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        style={[styles.button, styles.logoutButton]}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>


      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
  taskContainer: {
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  taskDetails: {
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskStatus: {
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  createButton: {
    backgroundColor: '#2196F3',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  logoutButton: {
    backgroundColor: '#9E9E9E',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});
