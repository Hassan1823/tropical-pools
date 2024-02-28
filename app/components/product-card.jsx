"use client";

import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

import { usePathname } from "next/navigation";

import Image from "next/image";
import StarRating from "./StarRating";
import { useDeleteProductMutation } from "@/redux/features/products/productApi";
import { toast } from "sonner";

const ProductCard = ({ product, deleteBtn }) => {
  const pathName = usePathname();

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
            size="lg"
            className="bg-red-500 hover:bg-red-600"
            onClick={() => handleDeleteProduct(product._id)}
          >
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
