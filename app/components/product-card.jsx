import React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import StarRating from "./StarRating";

const ProductCard = ({ product }) => {
  return (
    <Card className="w-72 h-auto flex flex-col justify-center items-center text-center">
      <CardHeader>
        <Image
          src={product.src}
          alt=""
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
      <CardFooter>
        <Button variant="default" size="lg">
          Explore
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
