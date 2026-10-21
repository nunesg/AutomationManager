'use client'

import React, { useContext, useEffect, useState } from "react";
import { useAppContext } from "../../system_store";
import { useObjectsContext } from "../objects_store";
import { useActionsContext } from "./actions_store";
import ActionsCRUD from "./actions_crud";
import ActionsList from "./actions_list";
import Expand from "../../expand";

function Actions() {
  
    const [showCrud, setShowCrud] = useState(false);
    const {currentSystem} = useAppContext();
    const {currentObject} = useObjectsContext();

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
        {currentObject?.name}
      </div>
      <div style={{
        fontSize: '16px',
        textAlign: 'center',
        padding: "0 30px 0 30px"
      }}>
        The list below shows all the actions registered under the object named {currentObject?.name} from system {currentSystem.name}
      </div>
      
      <ActionsList />
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
            showCrud && <ActionsCRUD />
        }
      </div>
    </div>
  );
}

export default Actions;