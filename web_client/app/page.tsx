'use client'

import React, { useState } from "react";
import SystemList from "./system_list";
import SystemCRUD from "./system_crud";
import Expand from "./expand";

function App() {

  const [showCrud, setShowCrud] = useState(false);
  const toggleState = () => {
    setShowCrud(!showCrud);
  };

  return (

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        textAlign: 'center',
        padding: "2rem", 
        fontFamily: "sans-serif",
        gap: '10px'
        }}>
 
        <div style={{
          fontSize: '40px',
          fontWeight: 400,
        }}> 
          Automation Manager
        </div>

        <div>
          Click on a system below to manage it
        </div>
        <SystemList></SystemList>


        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '10px',
          padding: '10px',
          maxWidth: '70%'
        }}
        className="bg-gray-600">
          
          {
            showCrud && <Expand currentState={showCrud} toggleState={toggleState} />
            ||
            !showCrud && <Expand currentState={showCrud} toggleState={toggleState} />
          }
          {
            showCrud && <SystemCRUD />
          }


        </div>

      </div>
  );
}

export default App;