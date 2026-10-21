'use client'

import React, { useState } from "react";
import { useAppContext } from "../../system_store";
import { useObjectsContext } from "../objects_store";
import { useActionsContext } from "./actions_store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function ActionsCRUD() {
    const [actionName, setActionName] = useState("");
    const { apiBase } = useAppContext();
    const { currentObject } = useObjectsContext();
    const { updateActionsList } = useActionsContext();

    // Add an item
    const addItem = async () => {
        if (!actionName || actionName == "" || !currentObject) return;
        try {
            const res = await fetch(`${apiBase}/add/action`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: 0,
                    name: actionName,
                    systemId: currentObject.systemId,
                    objectId: currentObject.id
                })
            });
            updateActionsList(res);
            setActionName("");
        } catch (err) {
            console.error("Error adding action:", err);
        }
    };

    const buttons = [
        {
            buttonName: 'Add Action',
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
                Put the action name you want on the field below
            </div>
            <Input
                type="text"
                value={actionName}
                placeholder="Enter action name"
                onChange={(e) => setActionName(e.target.value)}
                className="placeholder:text-zinc-400"
                style={{ margin: "1rem", maxWidth: "50%" }}
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