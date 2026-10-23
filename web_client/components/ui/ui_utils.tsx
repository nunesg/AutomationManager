
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
    shouldExpand?: boolean;
    onExpandItem?: (itemIndex: number) => React.ReactNode;
    onSelectItem: (itemIndex: number) => void;
    onDeleteItem: (itemIndex: number) => void;
};

export function DeleteSideBtn({ onButtonClicked, index, activeIndex, children, ...props }: DeleteSideBtnProps) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px"
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

export function ListItems({ list, shouldExpand = false, onExpandItem = () => null, onSelectItem, onDeleteItem }: ListItemsProps) {
    const [expandedItemIndex, setExpandedItemIndex] = useState(-1);
    console.log('shouldExpand = ' + shouldExpand);
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '20px',
            margin: '1rem',
        }}>
            {list != null && list.map((item, index) => (
                <div key={index} style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column', 
                    alignItems: 'flex-start',
                    gap: '10px'
                }}
                    >
                    <div key={index} style={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        gap: '20px'
                    }}>
                        {onExpandItem != undefined &&
                            <Button
                                className="
                                        hover:bg-zinc-600 
                                        hover:scale-105 
                                        active:bg-zinc-500 
                                        active:scale-80
                                        transition-all duration-150
                                    "
                                onClick={() => {
                                    setExpandedItemIndex(expandedItemIndex != -1 ? -1 : index);
                                }}
                            >
                                <Image
                                    src={"/expand.png"}
                                    alt="icon"
                                    width={25}
                                    height={25}
                                />
                            </Button>
                        }

                        <DeleteSideBtn key={item.id} 
                            onButtonClicked={() => onDeleteItem(index)} 
                            index={index} 
                            activeIndex={expandedItemIndex}
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
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: '24px'
                    }}>
                        {shouldExpand == true && index === expandedItemIndex && onExpandItem?.(expandedItemIndex)}
                    </div>
                </div>
            ))}
        </div>
    );
}