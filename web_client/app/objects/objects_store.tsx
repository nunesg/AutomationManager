'use client'

// store.ts
import { createContext, useContext, useState, ReactNode } from 'react';

type ObjectData = {
    id: number;
    name: string;
    sysName: string;
};

type ObjectContextType = {
  objects: ObjectData[] | null;
  setObjects: (objects: ObjectData[]) => void;
  updateObjectsList: (systems: Response) => void;
};

const ObjectContext = createContext<ObjectContextType | undefined>(undefined);

export function ObjectsProvider({ children }: { children: ReactNode }) {
  const [objects, setObjects] = useState<ObjectData[]>([]);

  const updateObjectsList = async (items: Response) => {
    const json = await items.json();
    console.log("json = ", json);
    const data = JSON.parse(json.dataJson);
    console.log(typeof data);
    setObjects(data);
  };

  return (
    <ObjectContext.Provider value={{ 
        objects,
        setObjects,
        updateObjectsList
        }}>
      {children}
    </ObjectContext.Provider>
  );
}

export const useObjectsContext = () => {
  const context = useContext(ObjectContext);
  if (!context) throw new Error('useObjectContext must be used within ObjectsProvider');
  return context;
};