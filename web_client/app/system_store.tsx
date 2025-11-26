'use client'

// store.ts
import { createContext, useContext, useState, ReactNode } from 'react';

type SystemData = {
    id: number;
    name: string;
};

type AppContextType = {
  systems: SystemData[] | null;
  setSystems: (systems: SystemData[]) => void;
  updateSystemsList: (systems: Response) => void;
  apiBase: string;
  currentSystemName: string;
  setCurrentSystemName: (name: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [systems, setSystems] = useState<SystemData[]>([]);
  const [currentSystemName, setCurrentSystemName] = useState<string>("");
  const apiBase = "http://192.168.1.22:3050/api"; // your FastAPI server

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
        currentSystemName, 
        setCurrentSystemName }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};