import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { supabase } from '../../src/lib/supabase';

export default function MyQRScreen() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from('profiles').select('username').eq('id', user.id).maybeSingle();
      setUsername(data?.username ?? null);
    })();
  }, []);

  const value = username ? `konnekt://u/${username}` : '';

  return (
    <View style={{ alignItems: 'center', padding: 24 }}>
      <Text>Scan to view my Konnekt</Text>
      {username ? <QRCode value={value} size={220} /> : <Text>Set your username first.</Text>}
      {username && <Text selectable style={{ marginTop: 8 }}>{value}</Text>}
    </View>
  );
}
