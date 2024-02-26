"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";
import AdminComp from "../components/Admin";

const AdminPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  //   if (user) {
  if (user?.role === "admin") {
    return (
      <div className="">
        <AdminComp user={user} />
      </div>
    );
  } else {
    router.push("/login");
    return null;
  }
};

export default AdminPage;
