import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../src/lib/supabase';

export default function RootLayout() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) =>
      setSession(s)
    );

    return () => sub.subscription.unsubscribe();
  }, []);

  if (loading) return null; // optional splash

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {session ? (
        // Logged in → Tabs
        <Stack.Screen name="(tabs)/home" />
      ) : (
        // Not logged in → Auth flow
        <>
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen name="(auth)/register" />
        </>
      )}
    </Stack>
  );
}
