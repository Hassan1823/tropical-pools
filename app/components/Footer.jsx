"use client";
import React from "react";
import Link from "next/link";

import { FaFacebook, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="border-t-2 flex flex-col items-center justify-center w-full h-auto p-[3%] space-y-4 text-center text-white bg-blue-950">
      <Link href={"/"} passHref>
        <h1 className="text-3xl font-bold text-white cursor-pointer lg:text-4xl">
          Tropical Pools
        </h1>
      </Link>
      <div className="flex flex-wrap items-center justify-center w-full gap-4 text-center">
        <Link passHref href="/">
          Home
        </Link>
        <Link passHref href="/contact">
          Contact Us
        </Link>
        <Link passHref href="/about">
          About Us
        </Link>
        <Link passHref href="/products">
          Products
        </Link>
        <Link passHref href="/gallery">
          Pool Gallery
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-center w-full space-x-4">
        <Link href="">
          <FaFacebook className="w-6 h-6 duration-300 hover:scale-110 hover:shadow-lg" />
        </Link>
        <Link href="">
          <RiInstagramFill className="w-6 h-6 duration-300 hover:scale-110 hover:shadow-lg" />
        </Link>
        <Link href="">
          <FaTwitter className="w-6 h-6 duration-300 hover:scale-110 hover:shadow-lg" />
        </Link>
      </div>
      {/* <p className="text-sm">
      tropical@gmail.com
      </p> */}
      <div className="w-full text-xs">
        {" "}
        Copyright © 2024 - All right reserved by Tropical Pools
      </div>
    </div>
  );
};

export default Footer;
