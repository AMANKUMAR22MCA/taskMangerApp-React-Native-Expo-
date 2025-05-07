import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import API from '../../lib/api';
import * as SecureStore from 'expo-secure-store';
import { useRouter, Link } from 'expo-router';
//login page 
export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const login = async () => {
    setMsg('');
    if (!username || !password) {
      setMsg('Please enter both fields');
      return;
    }

    try {
      const res = await API.post('/auth/login/', { username, password });
      await SecureStore.setItemAsync('access', res.data.access);
      await SecureStore.setItemAsync('refresh', res.data.refresh);
      router.push('/tasks');
    } catch (err: any) {
      if (err.response?.status === 401) {
        setMsg('Invalid credentials');
      } else {
        setMsg('Login failed. Try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Login" onPress={login} />
      {msg ? <Text style={styles.error}>{msg}</Text> : null}

      <Text style={{ marginTop: 20 }}>
        Don't have an account?{' '}
        <Link href="/(auth)/register">
          <Text style={styles.link}>Register here</Text>
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 24, marginBottom: 16 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
