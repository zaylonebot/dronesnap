import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../../firebase';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSignup = async () => {
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Signup error');
    }
  };

  const handleSignin = async () => {
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Signin error');
    }
  };

  const handleSignout = async () => {
    setError('');
    try {
      await signOut(auth);
      setUser(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Signout error');
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>Welcome, {user.email}</Text>
          <Button title="Sign Out" onPress={handleSignout} />
        </>
      ) : (
        <>
          <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaaaaa"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaaaaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={isLogin ? handleSignin : handleSignup} />
          <Button
            title={isLogin ? 'No account? Sign Up' : 'Have an account? Sign In'}
            onPress={() => setIsLogin(!isLogin)}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFD700',
  },
  input: {
    width: '80%',
    height: 45,
    borderColor: '#FFD700',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#2a2a2a',
    color: '#FFD700',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
