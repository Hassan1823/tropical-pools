"use client";

import React from "react";

import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";

const AdminAuthWrapper = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (user.role === "admin") {
    return <>{children}</>;
  } else {
    router.push("/login");
    return null;
  }
};

export default AdminAuthWrapper;
