"use client";

import Header from "@/app/components/Header";
import { headerItems } from "@/lib/data";
import { useState } from "react";

export default function GalleryLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <>
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        headerItems={headerItems}
      />
      {children}
    </>
  );
}
