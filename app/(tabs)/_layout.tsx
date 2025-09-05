import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true, // show header
        tabBarActiveTintColor: '#2f95dc',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan QR',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="qr-code-scanner" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved Profiles',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="save" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
