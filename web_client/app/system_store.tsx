'use client'

// store.ts
import { createContext, useContext, useState, ReactNode } from 'react';

export type SystemData = {
    id: number;
    name: string;
};

type AppContextType = {
  systems: SystemData[] | null;
  setSystems: (systems: SystemData[]) => void;
  updateSystemsList: (systems: Response) => void;
  apiBase: string;
  currentSystem: SystemData;
  setCurrentSystem: (data: SystemData) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [systems, setSystems] = useState<SystemData[]>([]);
  const [currentSystem, setCurrentSystem] = useState<SystemData>({id: 0, name: "Default"});
  const ip = process.env.NEXT_PUBLIC_LOCAL_IP;
  const apiBase = `http://${ip}:3050/api`; // your FastAPI server

  const updateSystemsList = async (items: Response) => {
    const json = await items.json();
    console.log("json = ", json);
    const data = JSON.parse(json.dataJson);
    console.log(typeof data);
    setSystems(data);
  };

  return (
    <AppContext.Provider value={{ 
        systems, 
        setSystems, 
        updateSystemsList, 
        apiBase, 
        currentSystem, 
        setCurrentSystem }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};