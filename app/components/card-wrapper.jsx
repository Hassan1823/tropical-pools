import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { CgGoogle } from "react-icons/cg";
import { Button } from "@/components/ui/button";

const CardWrapper = ({ children, title, titleLabel, btnLabel, btnLink }) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <CardTitle className="w-full text-xl text-center">{title}</CardTitle>
        <CardDescription className="w-full text-center">
          <b>{titleLabel}</b>
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <div className="flex items-center justify-center w-full h-auto">
          <Button size="lg" variant="outline">
            <CgGoogle className="w-6 h-6 text-blue-400" />
          </Button>
        </div>
      </CardFooter>

      <CardFooter>
        <Button variant="link" className="w-full text-center">
          <Link href={btnLink} passHref>
            {btnLabel}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
