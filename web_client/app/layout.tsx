'use client'

import { Geist, Geist_Mono } from "next/font/google";
import { AppProvider } from "./system_store";
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
      >

        <AppProvider>
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: '0 0 auto',
            backgroundColor: "gray", 
            borderRadius: "20px", 
            width: '600px'
          }}>
            {children}
          </div>

        </AppProvider>
      </body>
    </html>
  );
}
