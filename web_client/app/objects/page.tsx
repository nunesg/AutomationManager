'use client'

import React, { useContext, useEffect, useState } from "react";
import { useAppContext } from "../system_store";

function Objects() {
  
    const [objectsList, setObjectsList] = useState([]);
    const {apiBase, currentSystemName} = useAppContext();

    const updateList = async (items: Response) => {
        const json = await items.json();
        console.log("json = ", json);
        const data = JSON.parse(json.dataJson);
        console.log(typeof data);
        setObjectsList(data);
    };

    useEffect(() => {
        const initList = async () => {
            const res = await fetch(`${apiBase}/list/objects`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: `${currentSystemName}`
                })
            });
            updateList(res);
        };
        initList();
    });
  return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: '0 0 auto', padding: "2rem", fontFamily: "sans-serif"}}>
        {objectsList != null && objectsList.map((obj) => (
                <button key={obj.id}
                    style={{
                        borderRadius: "5px",
                        backgroundColor: "darkblue",
                        fontSize: "16px",
                        padding: "10px",
                        minWidth: "300px"

                    }}
                    onClick={() => {}}
                    >
                    {obj.name}
                </button>
            ))}
      </div>
  );
}

export default Objects;