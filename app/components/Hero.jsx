"use client";

import React, { useEffect, useState } from "react";
import bgImage from "@/public/images/hero-bg.jpg";
import { cn } from "@/lib/utils";

import { Permanent_Marker } from "next/font/google";
const h1Font = Permanent_Marker({
  weight: ["400"],
  subsets: ["latin"],
});

const textArray = ["Products", "Maintenance", "Construction"];
const Hero = () => {
  const [currentText, setCurrentText] = useState("Products");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentText((prevText) => {
        const nextIndex = (textArray.indexOf(prevText) + 1) % textArray.length;
        return textArray[nextIndex];
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="object-contain w-full h-auto "
      style={{
        backgroundImage: `url(${bgImage.src})`, // Set the background image using inline style
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-start justify-center w-full h-screen space-y-4 text-white px-[10%] pb-[10%] duration-300 bg-black/60">
        <h1
          className={cn(
            "flex flex-wrap gap-2 text-5xl font-semibold lg:text-8xl md:text-6xl font-marker",
            h1Font.className
          )}
        >
          Topical
          <span className="text-blue-300">Pools</span>
        </h1>
        <p className="flex flex-wrap gap-2 text-3xl font-semibold lg:text-4xl">
          Your Complete Pool{" "}
          <span className="text-blue-300 animate-pulse">{currentText}</span>
        </p>

        <button className="p-3 font-semibold bg-blue-400 rounded-md">
          Get A Quote
        </button>
      </div>
    </div>
  );
};

export default Hero;
