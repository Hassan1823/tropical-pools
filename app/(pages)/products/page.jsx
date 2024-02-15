"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FaCartShopping } from "react-icons/fa6";
import ProductCard from "@/app/components/product-card";

import { ProductsData } from "@/lib/data";

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <div className="w-full min-h-screen h-auto">
      {/* head bar  */}
      <div className="w-full h-auto py-8 md:px-20 px-8 flex justify-between items-center gap-8">
        {/* search bar */}
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="submit" size="sm">
            Search
          </Button>
        </div>

        {/* cart */}
        <Link href={"/cart"} passHref>
          <FaCartShopping className="w-8 h-8 text-blue-500" />
        </Link>
      </div>

      {/* ProductsPage */}
      <div className="w-full h-auto p-8 flex flex-wrap justify-center items-center gap-8">
        {ProductsData.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
