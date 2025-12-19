'use client'

import { ObjectsProvider } from "./objects_store";

export default function ObjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ObjectsProvider>
        {children}
    </ObjectsProvider>
  );
}
