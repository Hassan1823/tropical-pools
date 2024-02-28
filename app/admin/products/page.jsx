"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import ProductCard from "@/app/components/product-card";

import { ProductsData } from "@/lib/data";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useAddProductMutation,
  useGetProductsMutation,
  useProductsByNameMutation,
} from "@/redux/features/products/productApi";

import Loader from "@/app/components/Loader";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddProductSchema } from "@/schema";

// import { convertImageToBase64 } from "path_to_convertImageToBase64_file"; // Update the path accordingly
const range = 8;

const AdminProductPage = () => {
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

  // * add product starts here

  // Define a variable to store the base64 string
  const [image, setImage] = useState("");
  let base64ImageString = "";

  const imageHandler = async (e) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        console.log("avatar");
        console.log(avatar);
        setImage(avatar);
        base64ImageString = avatar; // Save the base64 string to the variable
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  // Define an async function to handle image conversion
  const handleImageConversion = async () => {
    const imagePath = "path_to_your_image.jpg"; // Update with actual image path
    const base64String = await convertImageToBase64(imagePath); // Ensure convertImageToBase64 is defined
    base64ImageString = base64String; // Save the base64 string to the variable
  };

  // Call the async function to handle image conversion
  handleImageConversion();

  console.log("base64ImageString");
  console.log(base64ImageString);

  // ! define the form
  const form = useForm({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      image: null,
      title: "",
      description: "",
      price: "",
      quantity: "",
    },
  });

  const [
    addProduct,
    { data: addData, isSuccess: addSuccess, error: addError },
  ] = useAddProductMutation();
  // ~ handle form onsubmit
  const onSubmit = async (values) => {
    console.log(values);
    console.log("image");
    console.log(image);

    await addProduct({
      image: image,
      title: values.title,
      description: values.description,
      price: parseInt(values.price),
      quantity: parseInt(values.quantity),
    });
  };

  useEffect(() => {
    if (addSuccess) {
      toast.success("Product Added Successfully");
    }
    if (addError) {
      if ("data" in addError) {
        const errorMessage = addError.data.message;
        toast.error(errorMessage);
      }
    }
  }, [addSuccess, addError]);
  // * add product ends here

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

            {/* add product */}
            <Dialog>
              <DialogTrigger>
                <Button vairant="default" size="lg">
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Please Add Product Details !</DialogTitle>
                  <DialogDescription>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 text-start"
                      >
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Image :</FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isLoading}
                                    {...field}
                                    type="file"
                                    onChange={imageHandler}
                                    accept="image/png,image/jpg,image/jpeg,image/webp"
                                    className={`${
                                      isLoading && "cursor-not-allowed"
                                    }`}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Title :</FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isLoading}
                                    {...field}
                                    placeholder="Product Title"
                                    type="text"
                                    className={`${
                                      isLoading && "cursor-not-allowed"
                                    }`}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Price :</FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isLoading}
                                    {...field}
                                    placeholder="999"
                                    type="number"
                                    className={`${
                                      isLoading && "cursor-not-allowed"
                                    }`}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Quantity :</FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isLoading}
                                    {...field}
                                    placeholder="20"
                                    type="number"
                                    className={`${
                                      isLoading && "cursor-not-allowed"
                                    }`}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description :</FormLabel>
                                <FormControl>
                                  <Textarea
                                    disabled={isLoading}
                                    {...field}
                                    placeholder="Product Description ..."
                                    type="text"
                                    className={`${
                                      isLoading && "cursor-not-allowed"
                                    }`}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        {/* error message  */}
                        {/* <FormError message={error} />
                      <FormSuccess message={success} /> */}

                        <Button
                          type="submit"
                          className={`w-full ${
                            isLoading && "cursor-not-allowed"
                          }`}
                          disabled={isLoading}
                        >
                          Add Product
                        </Button>
                      </form>
                    </Form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          {/* AdminProductPage */}
          <div className="w-full h-auto p-8 flex flex-wrap justify-center items-center gap-8">
            {products ? (
              <>
                {products.map((product, index) => (
                  <ProductCard product={product} key={index} deleteBtn={true} />
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

export default AdminProductPage;
