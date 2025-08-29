import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { getSavedProfiles } from '../../src/state/useSavedProfiles';

export default function SavedProfilesScreen({ navigation }: any) {
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => setProfiles(await getSavedProfiles());
    const unsub = navigation.addListener('focus', load);
    return unsub;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Saved Profiles</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('PublicProfile', { username: item.username })}
            style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: '#ddd' }}
          >
            <Text style={{ fontSize: 16 }}>{item.display_name || item.username}</Text>
            <Text style={{ color: 'gray' }}>@{item.username}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
