"use client";
import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="border-t-2 flex flex-col items-center justify-center w-full h-auto p-[3%] space-y-6 text-center text-white bg-blue-950">
      <div className="flex flex-wrap items-center justify-center w-full space-x-8">
        <Link href="">Home</Link>
        <Link href="">Contact Us</Link>
        <Link href="">About Us</Link>
        <Link href="">Products</Link>
        <Link href="">Pool Gallery</Link>
      </div>
      <div className="flex flex-wrap items-center justify-center w-full space-x-4">
        <Link href="">Instagram</Link>
        <Link href="">Facebook</Link>
        <Link href="">Twitter</Link>
      </div>
      <div className="w-full"> copyrights</div>
    </div>
  );
};

export default Footer;
