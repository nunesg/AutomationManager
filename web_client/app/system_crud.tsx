'use client'

import React, { useEffect, useState } from "react";
import { useAppContext } from "./system_store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function SystemCRUD() {
    const [systemName, setSystemName] = useState("");
    const [systemObj, setSystemObj] = useState({id: 0, name: ""});
    const { apiBase, updateSystemsList } = useAppContext();

    useEffect(() => {
        setSystemObj({
            id: 0,
            name: systemName
        });
    }, [systemName]);

    // Add an item
    const addItem = async () => {
        if (!systemObj.name || systemObj.name == "") return;
        try {
            const res = await fetch(`${apiBase}/add/system`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(systemObj)
            });
            updateSystemsList(res);
            setSystemName("");
        } catch (err) {
            console.error("Error adding item:", err);
        }
    };

    const buttons = [
        {
            buttonName: 'Add System',
            onClick: addItem
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
                Put the name of the system you wanna add on the field below
            </div>
            <Input
                type="text"
                value={systemName}
                placeholder="Enter system name"
                onChange={(e) => setSystemName(e.target.value)}
                className="placeholder:text-zinc-400"
                style={{ margin: "1rem", maxWidth: "50%" }}
            />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '10px'
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