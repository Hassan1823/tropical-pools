"use client";
import FormError from "@/app/components/form-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useSetUserPasswordMutation } from "@/redux/features/auth/authApi";

const ConfirmPassword = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState(0);

  const { token } = useSelector((state) => state.auth);

  const [setUserPassword, { isSuccess, isLoading, error, data }] =
    useSetUserPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Passwords updated successfully");
      router.push("/login");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleResetPassword = async () => {
    if (newPassword === confirmPassword) {
      setErrorMessage("");
      await setUserPassword({
        activation_token: token,
        activation_code: code,
        newPassword: newPassword,
      });
      const data = {
        activation_token: token,
        activation_code: code,
        newPassword: newPassword,
      };
    } else if (!newPassword || !confirmPassword || !code) {
      setErrorMessage("Please Fill All Fields");
    } else {
      setErrorMessage("Password Must Be Matched");
    }
  };
  return (
    <div className="w-full min-h-screen h-auto flex flex-col justify-center items-center text-start gap-4">
      <div className="">
        <Label>New Password</Label>
        <Input
          type="password"
          placeholder="********"
          disabled={isLoading}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="">
        <Label>Confirm Password</Label>
        <Input
          type="password"
          placeholder="********"
          disabled={isLoading}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="">
        <Label>Verification Code</Label>
        <Input
          type="number"
          placeholder="1234"
          disabled={isLoading}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <FormError message={errorMessage} />

      <Button
        vairant="default"
        size="lg"
        disabled={isLoading}
        onClick={handleResetPassword}
      >
        Reset Password
      </Button>
    </div>
  );
};

export default ConfirmPassword;
