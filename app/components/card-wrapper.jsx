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
import { signIn } from "next-auth/react";

const CardWrapper = ({
  children,
  title,
  titleLabel,
  btnLabel,
  btnLink,
  forgotPassword,
}) => {
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
            <CgGoogle
              className="w-6 h-6 text-blue-400"
              onClick={() => signIn("google")}
            />
          </Button>
        </div>
      </CardFooter>

      <CardFooter className="flex flex-col items-center justify-center w-full">
        <Button variant="link" className="w-full text-center">
          <Link href={btnLink} passHref>
            {btnLabel}
          </Link>
        </Button>
        {forgotPassword && (
          <>
            <Button variant="link" className="w-full text-center">
              <Link href={"/forgot-password"} passHref>
                Forgot Password
              </Link>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
