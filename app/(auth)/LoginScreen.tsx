// app/auth/login.tsx
import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { supabase } from '../../src/lib/supabase';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return Alert.alert('Login error', error.message);
    navigation.replace('Home');
  };

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <TextInput placeholder="Email" autoCapitalize="none" onChangeText={setEmail} style={{ borderWidth:1, padding:10 }}/>
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={{ borderWidth:1, padding:10 }}/>
      <Button title="Login" onPress={login} />
      <Button title="Create account" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
