'use client'

import React, { useState } from "react";
import { useAppContext } from "../system_store";
import { useObjectsContext } from "./objects_store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function ObjectCRUD() {
    const [objName, setObjName] = useState("");
    const { apiBase, currentSystem } = useAppContext();
    const { updateObjectsList } = useObjectsContext();

    // Add an item
    const addItem = async () => {
        if (!objName || objName == "") return;
        try {
            const res = await fetch(`${apiBase}/add/object`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: 0,
                    name: objName,
                    systemId: currentSystem.id
                })
            });
            updateObjectsList(res);
            setObjName("");
        } catch (err) {
            console.error("Error adding object:", err);
        }
    };

    const buttons = [
        {
            buttonName: 'Add Object',
            onClick: addItem
        }
    ];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px'
        }}>
            <div style={{
                margin: 0,
                fontSize: '16px',
                padding: '0 30px 0 30px',
                textAlign: 'center'
            }}>
                Put the object name you wanna for the system {currentSystem.name} on the field below
            </div>
            <Input
                type="text"
                value={objName}
                placeholder="Enter object name"
                onChange={(e) => setObjName(e.target.value)}
                className="placeholder:text-zinc-400"
                style={{ margin: "1rem", maxWidth: "300px" }}
            />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '10px',
                }}
            >
                {
                    buttons.map((btn, index) =>
                        <Button
                            onClick={btn.onClick}
                            key={index}
                            className="
                                hover:bg-zinc-600 
                                hover:scale-105   
                                active:bg-zinc-500 
                                active:scale-80
                                transition-all duration-150
                            "
                        >
                            {btn.buttonName}
                        </Button>
                    )
                }
            </div>
        </div>
    );
}