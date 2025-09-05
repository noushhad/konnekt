// // app/(tabs)/index.tsx
// import { StyleSheet, Text, View } from 'react-native';

// export default function HomeScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🏠 Home</Text>
//       <Text style={styles.subtitle}>Welcome to your app!</Text>
//       <Text style={styles.text}>
//         This is your custom Home screen. Replace this with your real content.
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 18,
//     marginBottom: 20,
//     color: '#555',
//   },
//   text: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#333',
//   },
// });

// app/(tabs)/index.tsx
// app/(tabs)/index.tsx
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return <Tabs />;
}
