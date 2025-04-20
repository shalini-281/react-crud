import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./App.css"; // Importing the CSS file

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsCollection = collection(db, "items");

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const snapshot = await getDocs(itemsCollection);
      setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      setError("Error fetching items. Please try again.");
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (item.trim() === "") {
      alert("Please enter a valid item");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await addDoc(itemsCollection, { text: item });
      setItem("");
      fetchItems();
    } catch (error) {
      setError("Error adding item. Please try again.");
      console.error("Error adding item:", error);
    }
  };

  const handleUpdate = async (id, newText) => {
    const ref = doc(db, "items", id);
    try {
      await updateDoc(ref, { text: newText });
      setEditId(null);
      fetchItems();
    } catch (error) {
      setError("Error updating item. Please try again.");
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setLoading(true);
      setError(null);
      try {
        const ref = doc(db, "items", id);
        await deleteDoc(ref);
        fetchItems();
      } catch (error) {
        setError("Error deleting item. Please try again.");
        console.error("Error deleting item:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Task Manager with React & Firebase</h1>

      <div>
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Add new item"
        />
        <button onClick={handleAdd} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {error && <p>{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {items.map((entry) => (
            <li key={entry.id}>
              {editId === entry.id ? (
                <>
                  <input
                    defaultValue={entry.text}
                    onBlur={(e) => handleUpdate(entry.id, e.target.value)}
                    autoFocus
                  />
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {entry.text}
                  <button onClick={() => setEditId(entry.id)}>Edit</button>
                  <button onClick={() => handleDelete(entry.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
