'use client'

import React, { useContext, useEffect, useState } from "react";
import { useAppContext } from "../system_store";
import ObjectsList from "./objects_list";
import ObjectsCRUD from "./objects_crud";
import Expand from "../expand";

function Objects() {
  
    const [showCrud, setShowCrud] = useState(false);
    const {apiBase, currentSystem} = useAppContext();

    const toggleState = () => {
        setShowCrud(!showCrud);
    };
  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        textAlign: "center",
        padding: "2rem", 
        fontFamily: "sans-serif",
        gap: "10px"
        }}>
      
      <div style={{
        fontSize: '28px',
        fontWeight: 400
      }}>
        {currentSystem.name}
      </div>
      <div style={{
        fontSize: '16px',
        textAlign: 'center',
        padding: "0 30px 0 30px"
      }}>
        The list below shows all the objects registered under the system named {currentSystem.name}
      </div>
      
      <ObjectsList />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '10px',
        padding: '10px',
        maxWidth: '70%'
      }}
      className="bg-gray-600"
      >
        {
            showCrud && <Expand currentState={showCrud} toggleState={toggleState} />
            ||
            !showCrud && <Expand currentState={showCrud} toggleState={toggleState} />
        }
        {
            showCrud && <ObjectsCRUD />
        }
      </div>
    </div>
  );
}

export default Objects;