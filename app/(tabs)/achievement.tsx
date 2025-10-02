import { FlatList, StyleSheet, Text, View } from 'react-native';

const achievements = [
  { game: 'DroneSnap', achievement: 'First Aerial Photo Captured' },
  { game: 'DroneSnap', achievement: '100 Successful Flight Missions' },
  { game: 'DroneSnap', achievement: 'Advanced Mapping Project Completed' },
  { game: 'DroneSnap', achievement: 'Night Flight Mastery Achieved' },
  { game: 'DroneSnap', achievement: 'Panoramic Shot Award Winner' },
];

export default function AchievementScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      <FlatList
        data={achievements}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.game}>{item.game}</Text>
            <Text style={styles.achievement}>{item.achievement}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFD700',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  game: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFEE77',
    marginBottom: 4,
  },
  achievement: {
    fontSize: 16,
    color: '#CCCCCC',
  },
});
