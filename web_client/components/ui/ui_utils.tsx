
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

export function ListItems({ list, onSelectItem, onDeleteItem }: ListItemsProps) {
    const [deleteIndex, setDeleteIndex] = useState(-1);
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
                <DeleteSideBtn key={item.id} 
                    onButtonClicked={() => onDeleteItem(index)} 
                    index={index} 
                    activeIndex={deleteIndex}
                    onPointerOver={() => setDeleteIndex(index)}
                    onPointerLeave={() => setDeleteIndex(-1)}
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
            ))}
        </div>
    );
}