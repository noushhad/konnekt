import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
import { Alert, Text } from 'react-native';

export default function ScannerScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onScan = ({ data }: { data: string }) => {
    try {
      if (data.startsWith('konnekt://') || data.startsWith(Linking.createURL('/'))) {
        const parsed = Linking.parse(data);
        const path = parsed.path || '';
        if (path.startsWith('u/')) {
          const username = path.split('/')[1];
          if (username) { navigation.navigate('PublicProfile', { username }); return; }
        }
      }
      Alert.alert('Invalid QR', 'Not a Konnekt QR.');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  if (hasPermission === null) return <Text>Requesting camera permission…</Text>;
  if (hasPermission === false) return <Text>No access to camera.</Text>;

  return <BarCodeScanner onBarCodeScanned={onScan} style={{ flex: 1 }} />;
}
