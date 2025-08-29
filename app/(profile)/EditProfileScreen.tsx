// app/profile/edit.tsx  (or EditProfileScreen.tsx)
import React, { useEffect, useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { supabase } from '../../src/lib/supabase';

export default function EditProfileScreen({ navigation, route }: any) {
  const [username, setUsername] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');

  // Load existing profile if any
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      if (error) return Alert.alert('Error', error.message);
      if (data) {
        setUsername(data.username ?? '');
        setInstagram(data.handles?.instagram ?? '');
        setLinkedin(data.handles?.linkedin ?? '');
      }
    })();
  }, []);

  const save = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Alert.alert('Not signed in');

    // Will throw if username not unique (constraint in DB)
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        username,
        display_name: username,
        handles: { instagram, linkedin },
        is_public: true
      })
      .eq('id', user.id);

    if (error) return Alert.alert('Save error', error.message);
    Alert.alert('Saved!');
    navigation.navigate('Home');
  };

  return (
    <View style={{ padding: 24, gap: 12 }}>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={{ borderWidth:1, padding:10 }}/>
      <TextInput placeholder="Instagram" value={instagram} onChangeText={setInstagram} style={{ borderWidth:1, padding:10 }}/>
      <TextInput placeholder="LinkedIn" value={linkedin} onChangeText={setLinkedin} style={{ borderWidth:1, padding:10 }}/>
      <Button title="Save" onPress={save} />
    </View>
  );
}
