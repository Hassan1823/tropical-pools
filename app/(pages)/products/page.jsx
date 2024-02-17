"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FaCartShopping } from "react-icons/fa6";
import ProductCard from "@/app/components/product-card";

import { ProductsData } from "@/lib/data";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const range = 3;

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [previous, setPrevious] = useState(0);
  const [limit, setLimit] = useState(range);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    if (previous >= 0 && limit < ProductsData.length) {
      setPrevious((prevPrevious) => setPrevious(previous + range));
      setLimit((prevLimit) => setLimit(limit + range));
      setCurrentPage((prevCurrentPage) => currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (!previous <= 0 && limit >= range) {
      setPrevious((prevPrevious) => setPrevious(previous - range));
      setLimit((prevLimit) => setLimit(limit - range));
      setCurrentPage((prevCurrentPage) => currentPage - 1);
    }
  };

  let pages = Math.ceil(ProductsData.length / range);
  console.log("pages are : ", pages);

  const indexLimit = pages >= 3 ? 3 : pages;
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
        {ProductsData.slice(previous, limit).map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>

      <div className="w-full py-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem
              className={`cursor-pointer ${
                currentPage <= 1 && "cursor-not-allowed"
              }`}
            >
              <PaginationPrevious onClick={handlePreviousPage} />
            </PaginationItem>
            {ProductsData.length / range <= pages &&
              ProductsData.slice(0, indexLimit).map((page, index) => (
                <PaginationItem>
                  <PaginationLink
                    className="cursor-not-allowed"
                    isActive={currentPage === index + 1 ? true : false}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            <PaginationItem
              className={`cursor-pointer ${
                currentPage >= pages && "cursor-not-allowed"
              }`}
            >
              {/* {currentPage === pages && "hello"} */}
              <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ProductsPage;
