"use client";

import { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import { headerAdminItems } from "@/lib/data";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userLoaded, setUserLoaded] = useState(false);

  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        setLoading(false);
      } else {
        setLoading(false);
        setUserLoaded(true);
      }
    };

    checkAuth();
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  if (!userLoaded) {
    return <Loader />;
  }

  if (user?.role === "admin") {
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
  } else {
    router.push("/login");
    return null;
  }
}
