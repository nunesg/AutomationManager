
import React, { ReactNode, ComponentProps, useContext, useEffect, useState } from "react";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SystemData } from "@/app/system_store";
import { ObjectData } from "@/app/objects/objects_store";

type DeleteSideBtnProps = ComponentProps<"div"> & {
    onButtonClicked: () => void;
    index: number;
    activeIndex: number;
};

type ListItemType = {
    name: string;
    id: number;
}

type ListItemsProps = ComponentProps<"div"> & {
    list: ListItemType[];
    onSelectItem: (itemIndex: number) => void;
    onDeleteItem: (itemIndex: number) => void;
    onSubmitCall?: (itemIndex: number, callStr: string) => void;
};

export function DeleteSideBtn({ onButtonClicked, index, activeIndex, children, ...props }: DeleteSideBtnProps) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "5px"
            }}
            {...props}
        >
            {children}
            {activeIndex === index && <Button
                onClick={() => onButtonClicked()}
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
                    width={25}
                    height={25}
                />
            </Button>}
        </div>
    );
}

export function ListItems({ list, onSelectItem, onDeleteItem, onSubmitCall }: ListItemsProps) {
    const [deleteIndex, setDeleteIndex] = useState(-1);
    const [inputValue, setInputValue] = useState("");
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '20px',
            margin: '1rem',
        }}>
            {list != null && list.map((item, index) => (
                <div key={index} 
                        onPointerOver={() => setDeleteIndex(index)}
                        onPointerLeave={() => {
                            setDeleteIndex(-1);
                            setInputValue("");
                        }}>
                    <DeleteSideBtn key={item.id} 
                        onButtonClicked={() => onDeleteItem(index)} 
                        index={index} 
                        activeIndex={deleteIndex}
                        >
                        <Button
                            onClick={() => onSelectItem(index)}
                            className="
                                hover:bg-zinc-600 
                                hover:scale-105 
                                active:bg-zinc-500 
                                active:scale-80
                                transition-all duration-150
                            "
                        >
                            {item.name}
                        </Button>
                    </DeleteSideBtn>
                    {index === deleteIndex &&
                        <div style={{ flex: 1, flexDirection: "row", padding: '8px' }} >
                            <div style={{ flex: 1, padding: '8px' }}  >
                                <h2> Send Call </h2>
                                <p> type the api you would like to call for this object </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '300px' }}>
                                <input 
                                    type="text" 
                                    placeholder="Enter text..." 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                                />
                                <Button
                                    onClick={() => {
                                        onSubmitCall ? onSubmitCall(index, inputValue) : undefined;
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
                    }
                </div>
            ))}
        </div>
    );
}