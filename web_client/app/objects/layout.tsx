'use client'

import { Geist, Geist_Mono } from "next/font/google";
import { ObjectsProvider } from "./objects_store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
