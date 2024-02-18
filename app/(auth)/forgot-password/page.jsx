"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormError from "@/app/components/form-error";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [forgotPassword, { isSuccess, error, data }] =
    useForgotPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      router.push("/confirm-password");
      console.log("data");
      console.log(data);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleSubmitEmail = async () => {
    if (email) {
      console.log("Email is :", email);
      await forgotPassword({ email });
      setMessage("");
    } else {
      setMessage("Invalid email address");
    }
  };

  return (
    <div className="w-full min-h-screen h-auto flex flex-col justify-center items-center gap-4">
      <Label>Please Enter Your Email</Label>
      <Input
        type="email"
        className="md:w-[40%] w-[50%] text-center"
        placeholder="example@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormError message={message} />
      <Button type="submit" size="sm" onClick={handleSubmitEmail}>
        Submit
      </Button>
    </div>
  );
};

export default ForgotPassword;
