import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';

// Screens (PascalCase file names)
import LoginScreen from './app/(auth)/LoginScreen';
import RegisterScreen from './app/(auth)/RegisterScreen';
import HomeScreen from './app/HomeScreen';
import EditProfileScreen from './app/(profile)/EditProfileScreen';
import MyQRScreen from './app/(profile)/MyQRScreen';
import PublicProfileScreen from './app/(profile)/PublicProfileScreen';
import ScannerScreen from './app/ScannerScreen';
import SavedProfilesScreen from './app/(saved)/SavedProfilesScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  EditProfile: { firstTime?: boolean } | undefined;
  MyQR: undefined;
  Scanner: undefined;
  SavedProfiles: undefined;
  PublicProfile: { username: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: [Linking.createURL('/'), 'konnekt://'],
  config: {
    screens: {
      PublicProfile: 'u/:username',
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Login">
        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />

        {/* App */}
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
        <Stack.Screen name="MyQR" component={MyQRScreen} options={{ title: 'My QR' }} />
        <Stack.Screen name="Scanner" component={ScannerScreen} options={{ title: 'Scan' }} />
        <Stack.Screen name="SavedProfiles" component={SavedProfilesScreen} options={{ title: 'Saved Profiles' }} />

        {/* Deep-linked */}
        <Stack.Screen name="PublicProfile" component={PublicProfileScreen} options={{ title: 'Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
