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
  useProductsByPriceMutation,
} from "@/redux/features/products/productApi";

import Loader from "@/app/components/Loader";
import { toast } from "sonner";

const range = 8;

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(1000);
  const [limit, setLimit] = useState(range);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  // const [searchProductsData, setSearchProductsData] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [priceMode, setPriceMode] = useState(false);

  // ! get products starts here

  const [getProducts, { data, isSuccess, isLoading, error }] =
    useGetProductsMutation();

  useEffect(() => {
    if (!searchMode || !priceMode) {
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
  // ~-----------------

  // * -----------------------------------

  // ! products by price search starts here

  const [
    productsByPrice,
    { isSuccess: priceSuccess, error: priceError, data: priceData },
  ] = useProductsByPriceMutation();

  const priceProducts = async () => {
    if (first && second) {
      (prevCurrentPage) => setCurrentPage(1);
      (prevLimit) => setLimit(range);
      setProducts([]);
      await productsByPrice({ first: first, second: second });
    } else {
      setPriceMode(false);
      toast.error("Please Enter Some Value");
    }
  };

  // useEffect(() => {
  //   if (priceSuccess) {
  //     toast.success("Price filter data success");
  //     console.log("Price data is :");
  //     console.log(priceData);
  //     setProducts(priceData?.products);
  //   }
  //   if (priceError) {
  //     toast.error("Price filter data error");
  //   }
  // }, [priceError, priceSuccess]);

  useEffect(() => {
    if (priceSuccess) {
      setPriceMode(true);
      console.log("Successfully Search");
      // (prevProducts) => setProducts(data?.products);
      setProducts(priceData?.products);
      // setSearchProductsData(priceData?.products);
      console.log(priceData);
    }
    if (priceError) {
      if ("data" in priceError) {
        const errorMessage = priceError.data.message;
        toast.error(errorMessage);
      }
    }
  }, [priceSuccess, priceError]);
  // ! products by price search ends here

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
  if (!searchMode && !priceMode) {
    pages = data?.totalPages;
  }
  if (searchMode) {
    pages = searchData?.totalPages;
  }
  if (priceMode) {
    pages = priceData?.totalPages;
  }

  const indexLimit = pages >= 3 ? 3 : pages;

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="w-full h-auto min-h-screen">
          {/* head bar  */}
          <div className="flex items-center justify-between w-full h-auto gap-8 px-8 py-8 md:px-20">
            {/* search bar */}
            <div className="flex items-center w-full max-w-sm space-x-2">
              <div className="flex items-center justify-center space-x-2">
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

          <div className="flex items-center justify-between lg:w-[25%] md:w-[50%] w-[70%] h-auto gap-1 px-8 md:px-20">
            <Input
              type="number"
              placeholder="99"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
            <Input
              type="number"
              placeholder="99"
              value={second}
              onChange={(e) => setSecond(e.target.value)}
            />
            <Button type="submit" size="sm" onClick={() => priceProducts()}>
              Filter
            </Button>
          </div>

          {/* ProductsPage */}
          <div className="flex flex-wrap items-center justify-center w-full h-auto gap-8 p-8">
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
                <h1 className="flex items-center justify-center w-full h-auto p-4 text-center">
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
