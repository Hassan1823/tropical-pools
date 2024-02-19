"use client";

import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { Outfit } from "next/font/google";
import { useState } from "react";
import { Providers } from "./Provider";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

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
            <div>{children}</div>
            <Footer />
            <Toaster />
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
