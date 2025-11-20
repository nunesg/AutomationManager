'use client'

import React, { useContext, useEffect, useState } from "react";
import { useAppContext } from "../system_store";
import ObjectsList from "./objects_list";
import ObjectsCRUD from "./objects_crud";

function Objects() {
  
    const [objectsList, setObjectsList] = useState([]);
    const {apiBase, currentSystemName} = useAppContext();

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column'
    }}>
      
      <div style={{
        fontSize: '24px',
        fontWeight: 400
      }}>
        {currentSystemName}'s objects list
      </div>
      <div style={{
        fontSize: '16px'
      }}>
        The list below shows all the objects registered under the system named {currentSystemName}
      </div>
      
      <ObjectsList></ObjectsList>
    </div>
  );
}

export default Objects;