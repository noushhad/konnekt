// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createClient } from '@supabase/supabase-js';
// import 'react-native-get-random-values';
// import 'react-native-url-polyfill/auto';

// const url = process.env.EXPO_PUBLIC_SUPABASE_URL!;
// const anon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// export const supabase = createClient(url, anon, {
//   auth: {
//     storage: AsyncStorage,          // persist session on device
//     persistSession: true,
//     autoRefreshToken: true,
//     detectSessionInUrl: false,      // RN doesn’t use URL-based auth callbacks
//   },
// });


// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
