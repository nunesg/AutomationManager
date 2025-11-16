'use client'

import React, { useState } from "react";
import { AppProvider, useAppContext } from "./system_store";
import SystemList from "./system_list";
import SystemCRUD from "./system_crud";

function App() {
  
  return (
    <AppProvider>

      <div style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', padding: "2rem", fontFamily: "sans-serif"}}>
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

        <SystemCRUD></SystemCRUD>

      </div>
    </AppProvider>
  );
}

export default App;