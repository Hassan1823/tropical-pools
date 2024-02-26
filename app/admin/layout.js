"use client";

import { useState } from "react";

import Header from "@/app/components/Header";
import { headerAdminItems } from "@/lib/data";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <>
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        headerItems={headerAdminItems}
      />
      {children}
    </>
  );
}
