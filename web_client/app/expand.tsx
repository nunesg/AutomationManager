'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ExpandProps {
    currentState: boolean;
    toggleState: () => void;
}

export default function Expand({currentState, toggleState}: ExpandProps) {

  const uri = !currentState ? "/edit_icon_white.png" : "/cancel_icon_white.png";
  
  return (

      <Button 
        onClick={toggleState}
        variant="ghost"
        size="icon"
        className="flex items-center justify-center rounded-full 
            hover:bg-zinc-400 
            hover:scale-125 
            transition-all duration-150
            active:bg-zinc-300 
            active:scale-80"
        >
        <Image
          src={uri}
          alt="icon"
          width={20}
          height={20}
        />
      </Button>
  );
}