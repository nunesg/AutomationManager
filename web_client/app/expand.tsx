'use client'

interface ExpandProps {
    text: string;
    toggleState: () => void;
}

export default function Expand({text, toggleState}: ExpandProps) {
  return (

      <button style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "sans-serif",
        color: "#CCCCCC"}}
        onClick={toggleState}
        >

        {`< ${text} >`}

      </button>
  );
}