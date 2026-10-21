'use client'

import { ActionsProvider } from "./actions_store";

export default function ActionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ActionsProvider>
        {children}
    </ActionsProvider>
  );
}
