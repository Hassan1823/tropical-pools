"use client";

import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { useState } from "react";
import Footer from "./components/Footer";
import { Providers } from "./Provider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

const inter = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <SessionProvider>
            <Header open={open} setOpen={setOpen} activeItem={activeItem} />
            {children}
            <Footer />
            <Toaster />
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
