"use client";

import { ReactNode } from "react";
import { AssetUIProvider } from "@/context/AssetsContext";
import Navbar from "@/components/Navbar/Navbar";

import "./globals.css"; 

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-[#121212] text-black dark:text-white">
        <AssetUIProvider>
          <div className="flex flex-col max-h-screen">
            <Navbar />
            <div className="flex-1 overflow-y-auto">{children}</div>
          </div>
        </AssetUIProvider>
      </body>
    </html>
  );
}
