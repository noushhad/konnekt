// app/profile/public.tsx  (or PublicProfileScreen.tsx)
import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { supabase } from '../../src/lib/supabase';

export default function PublicProfileScreen({ route }: any) {
  const { username } = route.params;
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .maybeSingle();
      if (error) return Alert.alert('Error', error.message);
      setProfile(data);
    })();
  }, [username]);

  if (!profile) return <Text style={{ padding: 24 }}>Loading…</Text>;

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>
        {profile.display_name || profile.username}
      </Text>
      {!!profile.bio && <Text>{profile.bio}</Text>}
      {/* render social buttons from profile.handles here */}
    </View>
  );
}
