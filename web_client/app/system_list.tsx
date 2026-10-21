'use client'

import React, { useContext, useEffect } from "react";
import { useAppContext, type SystemData } from "./system_store";
import { useRouter } from 'next/navigation';

import { ListItems } from "@/components/ui/ui_utils"

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

    const onButtonClicked = (index: number) => {
        const data = systems ? systems[index] : {id: 0, name: ""};
        console.log(`system ${data.name} with id ${data.id} clicked!`);
        setCurrentSystem(data);
        router.push('/objects');
    };


    // Delete an item
    const deleteItem = async (index: number) => {
        const data = systems ? systems[index] : {id: 0, name: ""};
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
        <ListItems list={systems ?? []} onExpandItem={() => {}} onSelectItem={onButtonClicked} onDeleteItem={deleteItem} />
    );
}