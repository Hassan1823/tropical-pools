import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";

const WhyTropicalCard = ({ title, image, description }) => {
  return (
    <div className="flex flex-col items-center justify-center h-auto gap-2 p-8 w-96">
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
