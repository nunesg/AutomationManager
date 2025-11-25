'use client'

import React, { useContext, useEffect } from "react";
import { useAppContext } from "../system_store";
import { useObjectsContext } from "./objects_store";
import { Button } from "@/components/ui/button"

export default function ObjectsList() {
    const {apiBase, currentSystemName} = useAppContext();
    const {objects, updateObjectsList} = useObjectsContext();

    useEffect(() => {
        const initList = async () => {
            const res = await fetch(`${apiBase}/list/objects`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: `${currentSystemName}`
                })
            });
            updateObjectsList(res);
        };
        initList();
    }, [currentSystemName]);

    const onButtonClicked = (name: string) => {
        console.log(name + " clicked!");
    };

    return (
        <div style={{display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '20px',
            margin: '1rem'
            }}>
        {objects != null && objects.map((obj) => (
                <Button key={obj.id}
                    onClick={() => {onButtonClicked(obj.name)}}
                    >
                    {obj.name}
                </Button>
            ))}
      </div>
    );
}