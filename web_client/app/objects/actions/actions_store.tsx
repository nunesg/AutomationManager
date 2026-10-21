'use client'

// store.ts
import { createContext, useContext, useState, ReactNode } from 'react';
import { ActionData } from "../objects_store";

type ActionsContextType = {
  actions: ActionData[];
  setActions: (actions: ActionData[]) => void;
  updateActionsList: (systems: Response) => void;
};

const ActionsContext = createContext<ActionsContextType | undefined>(undefined);

export function ActionsProvider({ children }: { children: ReactNode }) {
  const [actions, setActions] = useState<ActionData[]>([]);

  const updateActionsList = async (items: Response) => {
    const json = await items.json();
    console.log("json = ", json);
    const data = JSON.parse(json.dataJson);
    console.log(typeof data);
    // setActions(data);
  };

  return (
    <ActionsContext.Provider value={{ 
        actions,
        setActions,
        updateActionsList
        }}>
      {children}
    </ActionsContext.Provider>
  );
}

export const useActionsContext = () => {
  const context = useContext(ActionsContext);
  if (!context) throw new Error('useActionsContext must be used within ActionsProvider');
  return context;
};