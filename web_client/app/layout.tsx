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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: "#000000"
        }}
      >

        <AppProvider>
          <Card className="bg-gray-400 max-w-lg">
            {children}
          </Card>

        </AppProvider>
      </body>
    </html>
  );
}
