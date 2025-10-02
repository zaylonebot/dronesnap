import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { db } from '../../firebase';

type Item = {
  id: string;
  name: string;
};

export default function CrudExample() {
  const [loading, setLoading] = useState(false);
  const [crudError, setCrudError] = useState('');
  const [success, setSuccess] = useState('');
  const [item, setItem] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    setCrudError('');
    try {
      const querySnapshot = await getDocs(collection(db, 'items'));
      const data: Item[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as { name: string }) }));
      setItems(data);
    } catch (e) {
      setCrudError('Failed to load items.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    setCrudError('');
    setSuccess('');
    if (item) {
      setLoading(true);
      try {
        await addDoc(collection(db, 'items'), { name: item });
        setSuccess('Item added!');
        setItem('');
        await fetchItems();
      } catch (e) {
        setCrudError('Failed to add item: ' + (e instanceof Error ? e.message : String(e)));
      }
      setLoading(false);
    }
  };

  const updateItem = async () => {
    setCrudError('');
    setSuccess('');
    if (editId && editText) {
      setLoading(true);
      try {
        await updateDoc(doc(db, 'items', editId), { name: editText });
        setSuccess('Item updated!');
        setEditId(null);
        setEditText('');
        await fetchItems();
      } catch (e) {
        setCrudError('Failed to update item: ' + (e instanceof Error ? e.message : String(e)));
      }
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setCrudError('');
    setSuccess('');
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'items', id));
      setSuccess('Item deleted!');
      await fetchItems();
    } catch (e) {
      setCrudError('Failed to delete item: ' + (e instanceof Error ? e.message : String(e)));
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add new project!</Text>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Add new project"
          placeholderTextColor="#aaaaaa"
          value={item}
          onChangeText={setItem}
        />
        <Button title="Add" onPress={addItem} />
      </View>
      {loading && <Text style={styles.loading}>Loading...</Text>}
      {crudError ? <Text style={styles.error}>{crudError}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
      {!loading && items.length === 0 && !crudError ? (
        <Text style={styles.noItems}>No items found.</Text>
      ) : null}
      {!loading && items.length > 0 && (
        <FlatList
          style={{ maxHeight: 250 }}
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Button
                title="Edit"
                onPress={() => { setEditId(item.id); setEditText(item.name); }}
                disabled={editId === item.id}
              />
              {editId !== item.id && (
                <Button title="Delete" onPress={() => deleteItem(item.id)} />
              )}
              {editId === item.id && (
                <View style={styles.editRow}>
                  <Text style={styles.editingLabel}>Editing: {item.name}</Text>
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
          )}
        />
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
  loading: {
    textAlign: 'center',
    color: '#FFEE77',
    marginTop: 10,
    fontSize: 16,
  },
  error: {
    textAlign: 'center',
    color: '#FF4C4C',
    marginTop: 10,
    fontSize: 16,
  },
  success: {
    textAlign: 'center',
    color: '#00FF99',
    marginTop: 10,
    fontSize: 16,
  },
  noItems: {
    textAlign: 'center',
    color: '#FFEE77',
    marginTop: 30,
    fontSize: 18,
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
  editingLabel: {
    marginRight: 10,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
