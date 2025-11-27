'use client'

import React, { useState } from "react";
import { useAppContext } from "./system_store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px',
        }}>
            <div style={{
                margin: 0,
                fontSize: '16px',
                textAlign: 'center',
                padding: '0 30px 0 30px'
            }}>
                Use the field below to add the system name you wanna modify
            </div>
            <Input
                type="text"
                value={systemName}
                placeholder="Enter system name"
                onChange={(e) => setSystemName(e.target.value)}
                className="placeholder:text-gray-600"
                style={{ margin: "1rem", maxWidth: "50%" }}
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
                        <Button
                            onClick={btn.onClick}
                            key={index}
                        >
                            {btn.buttonName}
                        </Button>
                    )
                }
            </div>
        </div>
    );
}