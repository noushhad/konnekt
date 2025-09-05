import { Camera } from 'expo-camera'; // Should work if types are correct
import * as Linking from 'expo-linking';
import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

export default function ScanScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<any>(null);
  const [type, setType] = useState(
    // @ts-ignore
    Camera.Constants.Type.back // Ignore TS error if necessary
  );

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (
      data.startsWith('konnekt://') ||
      data.startsWith(Linking.createURL('/'))
    ) {
      const parsed = Linking.parse(data);
      const username = parsed.path?.split('/')[1];
      if (username) {
        navigation.navigate('PublicProfile', { username });
        return;
      }
    }
    Alert.alert('Invalid QR', 'Not a Konnekt QR.');
  };

  if (hasPermission === null) return <Text>Requesting camera permission…</Text>;
  if (hasPermission === false) return <Text>No access to camera.</Text>;

  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        onBarCodeScanned={handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ['qr'],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
});