'use client'

import React, { useContext, useEffect } from "react";
import { useAppContext, type SystemData } from "./system_store";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"

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
                <Button key={system.id}
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
            ))}
        </div>
    );
}