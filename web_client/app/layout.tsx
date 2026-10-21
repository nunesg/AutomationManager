'use client'

import { AppProvider } from "./system_store";
import { Card } from "@/components/ui/card";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased bg-zinc-400`}
        style={{
          width: "100%",
          height: "100%",
          color: "#FFFFFF"
        }}
      >

        <AppProvider>
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center"
          }}>
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
