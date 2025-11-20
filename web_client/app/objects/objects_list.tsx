'use client'

import React, { useContext, useEffect } from "react";
import { useAppContext } from "../system_store";
import { useObjectsContext } from "./objects_store";

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
        <div style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', padding: "2rem", fontFamily: "sans-serif"}}>
        {objects != null && objects.map((obj) => (
                <button key={obj.id}
                    style={{
                        borderRadius: "5px",
                        backgroundColor: "darkblue",
                        fontSize: "16px",
                        padding: "10px",
                        minWidth: "300px"

                    }}
                    onClick={() => {onButtonClicked(obj.name)}}
                    >
                    {obj.name}
                </button>
            ))}
      </div>
    );
}