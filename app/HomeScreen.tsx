import React from 'react';
import { Button, View } from 'react-native';
import { supabase } from '../src/lib/supabase';

export default function HomeScreen({ navigation }: any) {
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Button title="My QR" onPress={() => navigation.navigate('MyQR')} />
      <Button title="Scan QR" onPress={() => navigation.navigate('Scanner')} />
      <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
      <Button title="Saved Profiles" onPress={() => navigation.navigate('SavedProfiles')} />
      <Button title="Logout" onPress={logout} color="red" />
    </View>
  );
}
