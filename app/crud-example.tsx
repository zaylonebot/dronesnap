import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { db } from '../firebase';

type Item = {
  id: string;
  name: string;
};

export default function CrudExample() {
  const [item, setItem] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const data: Item[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as { name: string }) }));
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    if (item) {
      await addDoc(collection(db, 'items'), { name: item });
      setItem('');
      fetchItems();
    }
  };

  const updateItem = async () => {
    if (editId && editText) {
      await updateDoc(doc(db, 'items', editId), { name: editText });
      setEditId(null);
      setEditText('');
      fetchItems();
    }
  };

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, 'items', id));
    fetchItems();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a new Project!</Text>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Add a new project"
          placeholderTextColor="#aaaaaa"
          value={item}
          onChangeText={setItem}
        />
        <Button title="Add" onPress={addItem} />
      </View>
      <FlatList
        style={{ maxHeight: 250 }}
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Button title="Edit" onPress={() => { setEditId(item.id); setEditText(item.name); }} />
            <Button title="Delete" onPress={() => deleteItem(item.id)} />
          </View>
        )}
      />
      {editId && (
        <View style={styles.editRow}>
          <TextInput
            style={styles.input}
            placeholder="Edit item"
            placeholderTextColor="#aaaaaa"
            value={editText}
            onChangeText={setEditText}
          />
          <Button title="Update" onPress={updateItem} />
        </View>
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFD700',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    backgroundColor: '#2a2a2a',
    color: '#FFD700',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    backgroundColor: '#2a2a2a',
    padding: 8,
    borderRadius: 8,
  },
  itemText: {
    flex: 1,
    color: '#FFEE77',
    fontSize: 16,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
