'use client'

import React, { useContext, useEffect } from "react";
import { useAppContext } from "./system_store";
import { useRouter } from 'next/navigation';

export default function SystemList() {
    const router = useRouter();
    const { apiBase, systems, updateSystemsList, setCurrentSystemName } = useAppContext();
    
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

    const onButtonClicked = (name: string) => {
        console.log(name + " clicked!");
        setCurrentSystemName(name);
        router.push('/objects')
    };

    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '20px',
            margin: '1rem',
         }}>
            {systems != null && systems.map((system) => (
                <button key={system.id}
                    style={{
                        borderRadius: "5px",
                        backgroundColor: "darkblue",
                        fontSize: "16px",
                        padding: "10px",
                        minWidth: "300px"

                    }}
                    onClick={() => onButtonClicked(system.name)}
                    >
                    {system.name}
                </button>
            ))}
        </div>
    );
}