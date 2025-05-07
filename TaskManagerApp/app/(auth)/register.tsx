import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import API from '../../lib/api';
import { Link } from 'expo-router';
//register page
export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const register = async () => {
    setMsg('');
    if (!username || !password) {
      setMsg('Both fields are required.');
      return;
    }

    try {
      await API.post('/auth/register/', { username, password });
      setMsg('Registration successful! You can now log in.');
    } catch (err: any) {
      if (err.response?.status === 400) {
        setMsg('Username already exists.');
      } else {
        setMsg('Registration failed. Try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>
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
      <Button title="Register" onPress={register} />
      {msg ? <Text style={styles.message}>{msg}</Text> : null}

      <Text style={{ marginTop: 20 }}>
        Already have an account?{' '}
        <Link href="/(auth)/login">
          <Text style={styles.link}>Login here</Text>
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
  message: {
    marginTop: 10,
    color: 'green',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
