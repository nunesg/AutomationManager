'use client'

import React, { ReactNode, useContext, useState, useEffect } from "react";
import { useAppContext } from "../system_store";
import { useObjectsContext, type ObjectData, type ActionData } from "./objects_store";
import { Button } from "@/components/ui/button";
import { DeleteSideBtn, ListItems } from "@/components/ui/ui_utils";
import { useRouter } from 'next/navigation';

export default function ObjectsList() {
    const router = useRouter();
    const {apiBase, currentSystem} = useAppContext();
    const {objects, updateObjectsList, setCurrentObject} = useObjectsContext();

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
        if (objects != null && objects[index] != null) {
            console.log('routing to actions');
            setCurrentObject(objects[index]);
            router.push("/objects/actions")
        }
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

    const onExpandItem = (index: number) => {
        return (
            <SendAction onSubmitCall={(value: string) => {
                onSubmitCall(index, value);
            }}/>
        );
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
                    shouldExpand={true} onExpandItem={onExpandItem} />
    );
}

function SendAction({onSubmitCall}: {onSubmitCall: (value: string) => void}): React.ReactNode {
    const [inputValue, setInputValue] = useState("");
    return (
        <div style={{ 
            display: 'flex',
            flex: 1, 
            flexDirection: "column", 
            padding: '32px',
            gap: '8px',
            alignItems: 'center',
            backgroundColor: 'rgb(70, 137, 145)',
            border: '1px solid rgba(255, 255, 255, 1)',
            borderRadius: '20px'
            }} >
            
            <div style={{ 
                display: 'flex',
                flex: 1,
                flexDirection: 'column'
            }}  >
                <div style={{
                    fontSize: '20px'
                }}> 
                    Send Call 
                </div>
                <p> type the api you would like to call for this object </p>
            </div>
            
            <div style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: '8px', 
                maxWidth: '300px' 
                }}>
                <input 
                    type="text" 
                    placeholder="Enter text..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ display: 'flex', flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                />
                <Button
                    onClick={() => {
                        onSubmitCall ? onSubmitCall(inputValue) : undefined;
                    }}
                    className="
                        hover:bg-zinc-600 
                        hover:scale-105 
                        active:bg-zinc-500 
                        active:scale-80
                        transition-all duration-150
                    "
                >
                    Submit!
                </Button>
            </div>
        </div>
    )
}