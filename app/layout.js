"use client";

import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { useState } from "react";
import Footer from "./components/Footer";

const inter = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header open={open} setOpen={setOpen} activeItem={activeItem} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
