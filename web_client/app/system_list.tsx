'use client'

import React, { useContext, useEffect } from "react";
import { useAppContext, type SystemData } from "./system_store";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"

import { DeleteSideBtn } from "@/components/ui/ui_utils"

export default function SystemList() {
    const router = useRouter();
    const { apiBase, systems, updateSystemsList, setCurrentSystem } = useAppContext();
    
    useEffect(() => {
        const initList = async () => {
            const res = await fetch(`${apiBase}/list/systems`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: ""
            });
            updateSystemsList(res);
        };
        if (systems?.length == 0) {
            initList();
        }
    });

    const onButtonClicked = (data: SystemData) => {
        console.log(`system ${data.name} with id ${data.id} clicked!`);
        setCurrentSystem(data);
        router.push('/objects')
    };


    // Delete an item
    const deleteItem = async (data: SystemData) => {
        try {
            const res = await fetch(`${apiBase}/delete/system`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            updateSystemsList(res);
        } catch (err) {
            console.error("Error deleting item:", err);
        }
    };

    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '20px',
            margin: '1rem',
         }}>
            {systems != null && systems.map((system) => (
                <DeleteSideBtn key={system.id} onButtonClicked={() => deleteItem(system)}>
                    <Button
                        onClick={() => onButtonClicked(system)}
                        className="
                            hover:bg-zinc-600 
                            hover:scale-105 
                            active:bg-zinc-500 
                            active:scale-80
                            transition-all duration-150
                        "
                        >
                        {system.name}
                    </Button>
                </DeleteSideBtn>
            ))}
        </div>
    );
}