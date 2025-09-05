import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { supabase } from "../src/lib/supabase";

export default function RootLayout() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    getSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: true }}>
      {session ? (
        // ✅ Logged in → Home is the first screen
        <>
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="(profile)/EditProfileScreen" options={{ title: "Edit Profile" }} />
          <Stack.Screen name="(profile)/MyQRScreen" options={{ title: "My QR" }} />
          <Stack.Screen name="(profile)/PublicProfileScreen" options={{ title: "Profile" }} />
          <Stack.Screen name="(saved)/SavedProfilesScreen" options={{ title: "Saved Profiles" }} />
          <Stack.Screen name="ScannerScreen" options={{ title: "Scan" }} />
        </>
      ) : (
        // ❌ Not logged in → Login first
        <>
          <Stack.Screen name="(auth)/LoginScreen" options={{ title: "Login" }} />
          <Stack.Screen name="(auth)/RegisterScreen" options={{ title: "Register" }} />
        </>
      )}
    </Stack>
  );
}
