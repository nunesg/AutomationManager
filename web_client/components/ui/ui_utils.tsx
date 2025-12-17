
import React, { ReactNode, ComponentProps, useContext, useEffect } from "react";
import Image from "next/image"
import { Button } from "@/components/ui/button"

type DeleteSideBtnProps = ComponentProps<"div"> & {
    onButtonClicked: () => void;
};

export function DeleteSideBtn({ onButtonClicked, children }: DeleteSideBtnProps) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "5px"
        }}>
            {children}
            <Button 
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
            </Button>
        </div>
    );
}
