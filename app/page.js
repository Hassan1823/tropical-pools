"use client";

import { headerItems } from "@/lib/data";
import Heading from "@/utils/Heading";
import AboutComp from "./components/About";
import Hero from "./components/Hero";
import CustomerReview from "./components/customer-review";
import PoolCard from "./components/pool-card";

import Header from "@/app/components/Header";
import { useState } from "react";
export default function Hom() {
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
      <Heading
        title={"Tropical Pools"}
        description={"The Project By Abdullah"}
        keywords={"tropical pools"}
      />
      <div className="w-full h-auto ">
        <Hero />
        <AboutComp />
        <PoolCard />
        <CustomerReview />
      </div>
    </>
  );
}
