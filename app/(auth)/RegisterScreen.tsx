// app/auth/register.tsx  (or RegisterScreen.tsx)
import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { supabase } from '../../src/lib/supabase';

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const register = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return Alert.alert('Register error', error.message);

    // Go let them set username & handles
    if (data.user) navigation.replace('EditProfile', { firstTime: true });
    else Alert.alert('Check your email to confirm.');
  };

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <TextInput placeholder="Email" autoCapitalize="none" onChangeText={setEmail} style={{ borderWidth:1, padding:10 }}/>
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} style={{ borderWidth:1, padding:10 }}/>
      <Button title="Create account" onPress={register} />
    </View>
  );
}
