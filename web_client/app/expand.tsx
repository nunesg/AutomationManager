'use client'

import { Button } from "@/components/ui/button"

interface ExpandProps {
    text: string;
    toggleState: () => void;
}

export default function Expand({text, toggleState}: ExpandProps) {
  return (

      <Button style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        }}
        onClick={toggleState}
        variant="ghost"
        >

        {text}

      </Button>
  );
}