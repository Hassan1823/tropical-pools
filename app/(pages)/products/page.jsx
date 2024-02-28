"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ProductCard from "@/app/components/product-card";
import { FaCartShopping } from "react-icons/fa6";

import { ProductsData } from "@/lib/data";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useGetProductsMutation,
  useProductsByNameMutation,
} from "@/redux/features/products/productApi";

import Loader from "@/app/components/Loader";
import { toast } from "sonner";

const range = 8;

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(range);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  // const [searchProductsData, setSearchProductsData] = useState([]);
  const [searchMode, setSearchMode] = useState(false);

  // ! get products starts here

  const [getProducts, { data, isSuccess, isLoading, error }] =
    useGetProductsMutation();

  useEffect(() => {
    if (!searchMode) {
      getProducts({
        limit,
        currentPage,
      });
    }
  }, [currentPage]);

  useEffect(() => {
    if (isSuccess) {
      console.log("success");
      // console.log(data);
      setCurrentPage(data?.currentPage);
      setTotalPages(data?.totalPages);
      setProducts(data?.products);
      setSearchMode(false);
    }
    if (error) {
      console.log("error");
    }
  }, [isSuccess, error]);
  // ! get products ends here

  // ~-----------------

  // ! products by names search starts here
  const [
    productsByName,
    { isSuccess: searchSuccess, error: searchError, data: searchData },
  ] = useProductsByNameMutation();

  const searchProducts = async () => {
    if (search) {
      (prevCurrentPage) => setCurrentPage(1);
      (prevLimit) => setLimit(range);
      setProducts([]);
      await productsByName({ title: search });
    } else {
      setSearchMode(false);
      toast.error("Please Enter Some Value");
    }
  };

  useEffect(() => {
    if (searchSuccess) {
      setSearchMode(true);
      console.log("Successfully Search");
      // (prevProducts) => setProducts(data?.products);
      setProducts(searchData?.products);
      // setSearchProductsData(searchData?.products);
      console.log(searchData);
    }
    if (searchError) {
      if ("data" in searchError) {
        const errorMessage = searchError.data.message;
        toast.error(errorMessage);
      }
    }
  }, [searchSuccess, searchError]);
  // ! products by names search ends here

  const handleNextPage = () => {
    if (currentPage >= 1 && currentPage < totalPages) {
      setCurrentPage((prevCurrentPage) => currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage <= totalPages && currentPage >= 1) {
      setCurrentPage((prevCurrentPage) => currentPage - 1);
    }
  };

  let pages = 1;
  if (!searchMode) {
    pages = data?.totalPages;
  }
  if (searchMode) {
    pages = searchData?.totalPages;
  }

  const indexLimit = pages >= 3 ? 3 : pages;

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="w-full min-h-screen h-auto">
          {/* head bar  */}
          <div className="w-full h-auto py-8 md:px-20 px-8 flex justify-between items-center gap-8">
            {/* search bar */}
            <div className="flex w-full max-w-sm items-center space-x-2">
              <div className="flex justify-center items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  type="submit"
                  size="sm"
                  onClick={() => searchProducts()}
                >
                  Search
                </Button>
              </div>
              <Button
                type="submit"
                size="sm"
                onClick={() =>
                  getProducts({
                    limit,
                    currentPage,
                  })
                }
              >
                X
              </Button>
            </div>

            {/* cart */}
            <Link href={"/cart"} passHref>
              <FaCartShopping className="w-8 h-8 text-blue-500" />
            </Link>
          </div>

          {/* ProductsPage */}
          <div className="w-full h-auto p-8 flex flex-wrap justify-center items-center gap-8">
            {products ? (
              <>
                {products.map((product, index) => (
                  <ProductCard
                    product={product}
                    key={index}
                    deleteBtn={false}
                  />
                ))}
              </>
            ) : (
              <>
                <h1 className="w-full h-auto flex justify-center items-center text-center p-4">
                  {"No Product Found"}
                </h1>
              </>
            )}
          </div>

          <div className="w-full py-8">
            {pages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem
                    className={`cursor-pointer ${
                      currentPage <= 1 && "cursor-not-allowed"
                    }`}
                  >
                    <PaginationPrevious onClick={handlePreviousPage} />
                  </PaginationItem>
                  {products &&
                    ProductsData.slice(0, indexLimit).map((page, index) => (
                      <PaginationItem key={index}>
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
                    <PaginationNext onClick={handleNextPage} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
