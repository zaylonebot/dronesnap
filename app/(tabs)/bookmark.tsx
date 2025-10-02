import { SectionList, StyleSheet, Text, View } from 'react-native';

const bookmarkedProjects = [
  {
    title: 'Real Estate Shoots',
    data: ['Luxury Villa Aerials', 'Condo Exterior Flyover'],
  },
  {
    title: 'Construction & Mapping',
    data: ['Site Progress - Phase 1', '3D Mapping Survey Shots'],
  },
  {
    title: 'Events & Cinematic',
    data: ['Wedding Highlights - Drone Reel', 'Brand Promo - Aerial Footage'],
  },
];

export default function BookmarkScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarked Drone Projects</Text>
      <SectionList
        sections={bookmarkedProjects}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a1a', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFD700', 
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 8,
    color: '#FFDD33', 
    letterSpacing: 1.2,
  },
  item: {
    fontSize: 16,
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#444', 
    color: '#FFEE77', 
    paddingLeft: 10,
  },
});
