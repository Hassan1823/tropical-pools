"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useDeleteProductMutation } from "@/redux/features/products/productApi";
import { toast } from "sonner";
import StarRating from "./StarRating";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

// ! lib imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { AddProductSchema, EditProductSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useSelector } from "react-redux";

const ProductCard = ({ product, deleteBtn, editBtn }) => {
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleReload = () => {
    router.reload();
  };

  const [deleteProduct, { data, error, isSuccess }] =
    useDeleteProductMutation();

  const handleDeleteProduct = async (productId) => {
    await deleteProduct({ productId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error.data.message;
        toast.error(errorMessage);
      }
    }
  }, [isSuccess, error]);

  // * ------------------

  // ! image handling

  // Define a variable to store the base64 string
  const [image, setImage] = useState("");
  let base64ImageString = "";

  const imageHandler = async (e) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;

        setImage(avatar);
        base64ImageString = avatar; // Save the base64 string to the variable
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Define an async function to handle image conversion
  const handleImageConversion = async () => {
    const imagePath = "path_to_your_image.jpg"; // Update with actual image path
    const imageFile = new File([imagePath], "image.jpg", {
      type: "image/jpeg",
    });
    const base64String = await convertImageToBase64(imageFile);
    base64ImageString = base64String; // Save the base64 string to the variable
  };

  // Call the async function to handle image conversion
  handleImageConversion();

  // ! define the form

  const form = useForm({
    resolver: zodResolver(EditProductSchema),
    defaultValues: {
      image: null,
      title: product.title ? product.title : "",
      description: product.description ? product.description : "",
      price: product.price ? product.price : 0,
      quantity: product.quantity ? product.quantity : 0,
    },
  });

  const onSubmit = async (values) => {
    try {
      if (user?.role === "admin") {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:8000/api/update-product/${product._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: image ? image : product.image,
              title: values.title,
              description: values.description,
              price: parseInt(values.price),
              quantity: parseInt(values.quantity),
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update product");
        }
        toast.success("Product Edited Successfully");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.success(error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-72 h-[65vh] flex flex-col justify-between items-center text-center">
      <CardHeader>
        <Image
          src={product.image}
          alt="product image"
          width={200}
          height={200}
          className="object-contain"
        />
      </CardHeader>
      <CardTitle className="font-semibold text-xl">{product.title}</CardTitle>
      <CardContent>
        <CardDescription>{product.description}</CardDescription>
      </CardContent>
      <CardContent>
        Rs <b>{product.price}</b>
        <CardDescription>
          <StarRating reviewCount={product.rating} />
        </CardDescription>
      </CardContent>
      <CardFooter className="space-x-2">
        <Link href={`/products/${product._id}`} passHref>
          <Button variant="default" size="lg">
            Explore
          </Button>
        </Link>
        {deleteBtn && (
          <Button
            variant="default"
            size="icon"
            className="bg-red-500 hover:bg-red-600"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <MdDeleteOutline className="text-white w-5 h-5 " />
          </Button>
        )}
        {editBtn && (
          <>
            <Dialog>
              <DialogTrigger>
                <Button
                  variant="default"
                  size="icon"
                  className="bg-green-500 hover:bg-green-600"
                  // onClick={() => handleEditProduct(product._id)}
                >
                  <FaRegEdit className="text-white w-5 h-5 " />
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
                          Edit Product
                        </Button>
                      </form>
                    </Form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
