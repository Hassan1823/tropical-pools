"use client";
import React, { useEffect, useState, useTransition } from "react";
import CardWrapper from "@/app/components/card-wrapper";
import FormError from "@/app/components/form-error";
import FormSuccess from "@/app/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isPending, startTransition] = useTransition();

  const [login, { isSuccess, isLoading, error: loginError, data }] =
    useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Logged In Successfully";
      console.log("message is :");
      console.log(message);
      toast.success(message);

      router.push("/");
    }
    if (loginError) {
      if ("data" in loginError) {
        const errorData = loginError;
        console.log("error is:");
        console.log(errorData.data.message);
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, loginError]);

  // ! define the form
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ~ handle form onsubmit
  const onSubmit = async (values) => {
    console.log(values);
    setError("");
    setSuccess("");

    // startTransition(() => {
    //   // setSuccess("All Done !");
    //   console.log(`Waiting for the response ...`);
    // });
    const { email, password } = values;
    await login({ email, password });
  };

  return (
    <div className="flex items-center justify-center w-full h-auto min-h-screen">
      <CardWrapper
        // children={children}
        title={"Login"}
        titleLabel={"Welcome Back"}
        btnLabel={"Register Yourself!"}
        btnLink={"/register"}
        forgotPassword={true}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        placeholder="example@gmail.com"
                        type="email"
                        className={`${isLoading && "cursor-not-allowed"}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        placeholder="******"
                        type="password"
                        className={`${isLoading && "cursor-not-allowed"}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* error message  */}
            <FormError message={error} />
            <FormSuccess message={success} />

            <Button
              type="submit"
              className={`w-full ${isLoading && "cursor-not-allowed"}`}
              disabled={isLoading}
            >
              Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default LoginPage;
