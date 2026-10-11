'use client'

import React, { useContext, useEffect } from "react";
import { useAppContext } from "../system_store";
import { useObjectsContext, type ObjectData, type ActionData } from "./objects_store";
import { Button } from "@/components/ui/button"
import { DeleteSideBtn, ListItems } from "@/components/ui/ui_utils";

export default function ObjectsList() {
    const {apiBase, currentSystem} = useAppContext();
    const {objects, updateObjectsList} = useObjectsContext();

    useEffect(() => {
        const initList = async () => {
            const res = await fetch(`${apiBase}/list/objects`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentSystem)
            });
            updateObjectsList(res);
        };
        initList();
    }, [currentSystem]);

    const onButtonClicked = (index: number) => {
        const data = objects ? objects[index] : {id: 0, name: ""};
        console.log(data.name + " clicked!");
    };

    const onSubmitCall = async (index: number, callStr: string) => {
        const object = objects ? objects[index] : {id: 0, name: "", systemId: 0};
        const data: ActionData = {
            id: 0,
            name: callStr,
            systemId: object.systemId,
            objectId: object.id
        };
        try {
            console.log(`trying to submit call to item ${JSON.stringify(object)}`)
            const res = await fetch(`${apiBase}/call/action`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
        } catch (err) {
            console.error("Error deleting object:", err);
        }
    };


    // Delete an item
    const deleteItem = async (index: number) => {
        const object = objects ? objects[index] : {id: 0, name: ""};
        try {
            console.log(`trying to delete item ${JSON.stringify(object)}`)
            const res = await fetch(`${apiBase}/delete/object`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(object)
            });
            updateObjectsList(res);
        } catch (err) {
            console.error("Error deleting object:", err);
        }
    };

    return (
        <ListItems list={objects ?? []} onSelectItem={onButtonClicked} onDeleteItem={deleteItem} 
                    onSubmitCall={onSubmitCall} />
    );
}