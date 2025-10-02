import { ScrollView, StyleSheet, Text } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About DroneSnap</Text>
      <Text style={styles.description}>
        DroneSnap is a professional aerial drone service dedicated to capturing breathtaking perspectives from above.
        Whether it's real estate, events, construction progress, or cinematic visuals, DroneSnap delivers high-quality
        aerial photography and videography tailored to your needs.
      </Text>

      <Text style={styles.feature}>◉ Aerial Photography & Videography – Stunning 4K visuals for real estate, marketing, and events.</Text>
      <Text style={styles.feature}>◉ Site Surveys & Mapping – Accurate aerial views for land development, construction, and inspections.</Text>
      <Text style={styles.feature}>◉ Cinematic Drone Shoots – Creative storytelling from the sky for brands, films, and social media.</Text>
      <Text style={styles.feature}>◉ Event Coverage – Capture unforgettable moments with dynamic aerial angles and wide perspectives.</Text>
      <Text style={styles.feature}>◉ Custom Drone Solutions – Tailored services to match any project, industry, or vision.</Text>

      <Text style={styles.footer}>
        With DroneSnap, the sky is no longer the limit — it’s your canvas. Elevate your project with a new perspective today.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1a1a1a', 
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFD700', 
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  description: {
    fontSize: 17,
    marginBottom: 25,
    color: '#FFDD33', 
    lineHeight: 24,
    textAlign: 'center',
  },
  feature: {
    fontSize: 16,
    marginBottom: 15,
    color: '#FFD700',
    lineHeight: 24,
  },
  footer: {
    marginTop: 30,
    fontSize: 17,
    fontWeight: '600',
    color: '#FFEE77',
    textAlign: 'center',
    letterSpacing: 1.2,
  },
});
