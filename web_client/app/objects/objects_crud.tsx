'use client'

import React, { useState } from "react";
import { useAppContext } from "../system_store";
import { useObjectsContext } from "./objects_store";


export default function ObjectCRUD() {
    const [objName, setObjName] = useState("");
    const { apiBase, currentSystemName } = useAppContext();
    const {updateObjectsList} = useObjectsContext();

    // Add an item
    const addItem = async () => {
        if (!objName || objName == "") return;
        try {
            const res = await fetch(`${apiBase}/add/object`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: objName,
                    sysName: currentSystemName
                })
            });
            updateObjectsList(res);
            setObjName("");
        } catch (err) {
            console.error("Error adding object:", err);
        }
    };

    // Delete an item
    const deleteItem = async () => {
        if (!objName) return;
        try {
            const res = await fetch(`${apiBase}/delete/object`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: objName,
                    sysName: currentSystemName
                })
            });
            updateObjectsList(res);
            setObjName("");
        } catch (err) {
            console.error("Error deleting object:", err);
        }
    };

    const buttons = [
        {
            buttonName: 'Add Object',
            onClick: addItem
        },
        {
            buttonName: 'Delete Object',
            onClick: deleteItem
        }
    ];

    return (
        <div>
            <div style={{
               fontSize: '24px',
               fontWeight: 400 
            }}>CRUD for Objects</div>
            <div>
                Use the field below to add the object name you wanna modify for the system {currentSystemName}
            </div>
            <input
                type="text"
                value={objName}
                placeholder="Enter object name"
                onChange={(e) => setObjName(e.target.value)}
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