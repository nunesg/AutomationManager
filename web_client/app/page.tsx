'use client'

import React, { useState } from "react";

function App() {
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState([]);

  const API_BASE = "http://localhost:3050/api"; // your FastAPI server

  const showItemsLocal = async (items: Response) => {
    const json = await items.json();
    console.log("json = ", json);
    const data = JSON.parse(json.dataJson);
    console.log(typeof data);
    setItems(data);
  };

  // Fetch all items
  const showItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/list/systems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: ""
      });
      showItemsLocal(res)
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  // Add an item
  const addItem = async () => {
    if (!itemName || itemName == "") return;
    try {
      const res = await fetch(`${API_BASE}/add/system`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${itemName}`
        })
      });
      showItemsLocal(res);
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  // Delete an item
  const deleteItem = async () => {
    if (!itemName) return;
    try {
      const res = await fetch(`${API_BASE}/delete/system`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${itemName}`
        })
      });
      showItemsLocal(res);
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Rachel's amazing System Manager</h1>

      <input
        type="text"
        value={itemName}
        placeholder="Enter system name"
        onChange={(e) => setItemName(e.target.value)}
        style={{ padding: "0.5rem", fontSize: "1rem" }}
      />

      <div style={{ marginTop: "1rem", backgroundColor: "red", padding: "20px"}}>
        <button onClick={showItems} style={{ marginRight: "0.5rem" }}>
          Show Items
        </button>
        <button onClick={addItem} style={{ marginRight: "0.5rem" }}>
          Add Item
        </button>
        <button onClick={deleteItem}>Delete Item</button>
        <div style={{ marginTop: "1rem", backgroundColor: "blue"}}>
          Rachel & Gustavo
        </div>
      </div>

      <ul style={{ marginTop: "1rem" }}>
        {items.map((item) => (
          <li key={item.id}>{item.id}  -  {item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;