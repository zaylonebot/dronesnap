import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ title: 'Login / Signup' }} />
      <Stack.Screen name="crud-example" options={{ title: 'CRUD Example' }} />
    </Stack>
  );
}
