import React from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import ProductImage from "@/public/images/products.png";

import Image from "next/image";

const WhyTropicalCard = ({ title, image, description }) => {
  return (
    <div className="w-[25%] h-auto flex flex-col justify-center items-center mx-auto">
      <Card className="text-white border border-blue-400 bg-blue-300/20">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={image}
            alt="product"
            width={250}
            height={200}
            className="object-contain mx-auto"
          />
        </CardContent>
        <CardFooter>
          <CardDescription className="text-white">
            {description}
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WhyTropicalCard;
