// app/(tabs)/home.tsx
import * as Linking from 'expo-linking';
import { Image, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

// Example: Replace with your auth/user context
const mockUser = {
  username: 'noushhad',
  photoURL: 'https://i.pravatar.cc/150?img=3',
};

export default function HomeScreen() {
  const profileUrl = Linking.createURL(`/profile/${mockUser.username}`);

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <Image source={{ uri: mockUser.photoURL }} style={styles.avatar} />
      <Text style={styles.username}>@{mockUser.username}</Text>

      {/* QR Code Section */}
      <View style={styles.qrContainer}>
        <QRCode value={profileUrl} size={200} />
      </View>

      <Text style={styles.infoText}>Scan this QR to view my profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
  },
  qrContainer: {
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
});
