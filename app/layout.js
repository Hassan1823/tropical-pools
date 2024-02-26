"use client";

import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { Outfit } from "next/font/google";
import { Providers } from "./Provider";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <SessionProvider>
            <div>{children}</div>
            <Footer />
            <Toaster />
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
