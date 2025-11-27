'use client'

import { Geist, Geist_Mono } from "next/font/google";
import { AppProvider } from "./system_store";
import { Card } from "@/components/ui/card";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-400`}
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
