import { useRouter } from 'expo-router';
import { Button, View } from 'react-native';
import { supabase } from '../../src/lib/supabase';

export default function HomeTab() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace('/(auth)/login'); // Correct path
  };

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <Button title="My QR" onPress={() => router.push('/(tabs)/mycard')} />
      <Button title="Scan QR" onPress={() => router.push('/(tabs)/scan')} />
      <Button title="Saved Profiles" onPress={() => router.push('/(tabs)/saved')} />
      <Button title="Logout" onPress={logout} color="red" />
      <Button title="Go to Login" onPress={() => router.replace('/(auth)/login')} />
    </View>
  );
}
