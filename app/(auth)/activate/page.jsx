"use client";

import React, { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useActivationMutation } from "@/redux/features/auth/authApi";

import { useRouter } from "next/navigation";
import FormError from "@/app/components/form-error";

import { toast } from "sonner";

const ActivateUser = () => {
  const router = useRouter();
  const [activationCode, setActivationCode] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const { token } = useSelector((state) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("User Activated Successfully");
      router.push("/login");
    }
    if (error) {
      toast.error("Invalid Code");
    }
  }, [isSuccess, error]);

  const verifyAccount = async () => {
    await activation({
      activation_token: token,
      activation_code: activationCode,
    });
  };

  return (
    <div className="w-full min-h-screen h-auto flex flex-col gap-4 justify-center items-center text-center">
      <Label> Please Enter Your Code </Label>
      <Input
        type="number"
        className="md:w-[40%] w-[50%] text-center"
        onChange={(e) => setActivationCode(e.target.value)}
        placeholder="1234"
      />
      <FormError message={errorMessage} />
      <Button type="submit" size="sm" onClick={verifyAccount}>
        Activate
      </Button>
    </div>
  );
};

export default ActivateUser;
