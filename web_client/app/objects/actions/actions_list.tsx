'use client'

import React, { ReactNode, useContext, useState, useEffect } from "react";
import { useAppContext } from "../../system_store";
import { useObjectsContext } from "../objects_store";
import { useActionsContext } from "./actions_store";
import { Button } from "@/components/ui/button";
import { DeleteSideBtn, ListItems } from "@/components/ui/ui_utils";

export default function ActionsList() {
    const {apiBase} = useAppContext();
    const {currentObject, updateObjectsList} = useObjectsContext();
    const {actions, updateActionsList} = useActionsContext();

    useEffect(() => {
        if (!currentObject) {
            return;
        }
        const initList = async () => {
            const res = await fetch(`${apiBase}/list/actions`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentObject)
            });
            updateActionsList(res);
        };
        
        initList();
    }, [currentObject]);

    const onButtonClicked = (index: number) => {
        // const data = objects ? objects[index] : {id: 0, name: ""};
        // if (objects && objects[index]) {
        //     setCurrentObject(objects[index]);
        // }
        console.log(actions[index].name + " clicked!");
    };

    const onSubmitCall = async (index: number, callStr: string) => {
        if (!currentObject) {
            return;
        }
        const action = (index != -1) ? actions[index] : {
            id: 0,
            name: callStr, 
            systemId: currentObject.systemId,
            objectId: currentObject.id
        };
        
        try {
            console.log(`trying to submit call to item ${JSON.stringify(action)}`)
            const res = await fetch(`${apiBase}/call/action`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(action)
            });
        } catch (err) {
            console.error("Error calling action:", err);
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
        const action = actions ? actions[index] : {id: 0, name: ""};
        try {
            console.log(`trying to delete item ${JSON.stringify(action)}`)
            const res = await fetch(`${apiBase}/delete/action`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(action)
            });
            updateActionsList(res);
        } catch (err) {
            console.error("Error deleting action:", err);
        }
    };

    return (
        <ListItems list={actions ?? []} onSelectItem={onButtonClicked} onDeleteItem={deleteItem} 
                    onExpandItem={() => {}} />
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