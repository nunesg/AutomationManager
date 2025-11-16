'use client'

import React, { useState } from "react";
import { useAppContext } from "./system_store";


export default function SystemCRUD() {
    const [systemName, setSystemName] = useState("");
    const { apiBase, updateSystemsList } = useAppContext();

    // Add an item
    const addItem = async () => {
        if (!systemName || systemName == "") return;
        try {
            const res = await fetch(`${apiBase}/add/system`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: `${systemName}`
                })
            });
            updateSystemsList(res);
            setSystemName("");
        } catch (err) {
            console.error("Error adding item:", err);
        }
    };

    // Delete an item
    const deleteItem = async () => {
        if (!systemName) return;
        try {
            const res = await fetch(`${apiBase}/delete/system`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: `${systemName}`
                })
            });
            updateSystemsList(res);
            setSystemName("");
        } catch (err) {
            console.error("Error deleting item:", err);
        }
    };

    const buttons = [
        {
            buttonName: 'Add System',
            onClick: addItem
        },
        {
            buttonName: 'Delete System',
            onClick: deleteItem
        }
    ];

    return (
        <div>
            <div style={{
               fontSize: '24px',
               fontWeight: 400 
            }}>CRUD for Systems</div>
            <div>
                Use the field below to add the system name you wanna modify
            </div>
            <input
                type="text"
                value={systemName}
                placeholder="Enter system name"
                onChange={(e) => setSystemName(e.target.value)}
                style={{ padding: "0.5rem", margin: "1rem", fontSize: "1rem", backgroundColor: "gray", borderRadius: "5px" }}
            />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    gap: '10px'
                }}
            >
                {
                    buttons.map((btn, index) =>
                        <button
                            onClick={btn.onClick}
                            style={{
                                padding: "10px",
                                borderRadius: "5px",
                                backgroundColor: "blue"
                            }}
                            key={index}
                        >
                            {btn.buttonName}
                        </button>
                    )
                }
            </div>
        </div>
    );
}