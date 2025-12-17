'use client'

import React, { useContext, useEffect } from "react";
import { useAppContext, type SystemData } from "./system_store";
import { useRouter } from 'next/navigation';
import Image from "next/image"
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
                <div key={system.id} style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px"
                }}>
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

                    <Button 
                        onClick={() => deleteItem(system)}
                        variant="ghost"
                        size="icon"
                        className="
                            bg-destructive
                            rounded-full 
                            hover:bg-zinc-600 
                            hover:scale-105 
                            active:bg-zinc-500 
                            active:scale-80
                            transition-all duration-150"
                        >
                        <Image
                            src={"/thrash_icon_white.png"}
                            alt="icon"
                            width={20}
                            height={20}
                            />
                    </Button>
                </div>
            ))}
        </div>
    );
}