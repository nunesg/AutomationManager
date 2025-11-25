'use client'

import React, { useContext, useEffect, useState } from "react";
import { useAppContext } from "../system_store";
import ObjectsList from "./objects_list";
import ObjectsCRUD from "./objects_crud";
import Expand from "../expand";

function Objects() {
  
    const [showCrud, setShowCrud] = useState(false);
    const {apiBase, currentSystemName} = useAppContext();

    const toggleState = () => {
        setShowCrud(!showCrud);
    };
  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        padding: "2rem", 
        fontFamily: "sans-serif",
        gap: "10px"
        }}>
      
      <div style={{
        fontSize: '28px',
        fontWeight: 400
      }}>
        {currentSystemName}
      </div>
      <div style={{
        fontSize: '16px',
        textAlign: 'center',
        maxWidth: '70%'
      }}>
        The list below shows all the objects registered under the system named {currentSystemName}
      </div>
      
      <ObjectsList />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#888888',
        borderRadius: '10px',
        padding: '10px'
      }}>
        {
            showCrud && <Expand text="done" toggleState={toggleState} />
            ||
            !showCrud && <Expand text="edit" toggleState={toggleState} />
        }
        {
            showCrud && <ObjectsCRUD />
        }
      </div>
    </div>
  );
}

export default Objects;