"use client";

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
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { RegisterSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const [register, { isError, isLoading, data, isSuccess }] =
    useRegisterMutation();

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }

    if (isSuccess) {
      const message = data?.message || "Registration Done";
      router.push("/activate");
      toast.success(message);
    }
  }, [isSuccess, isError]);

  // ! define the form
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  // ~ handle form onsubmit
  const onSubmit = async (values) => {
    setError("");
    setSuccess("");

    const { email, password, name } = values;
    if (values.password === values.confirmPassword) {
      // setSuccess("All Done !");
      await register({ email, password, name });
    } else {
      setError("Password Must Be Matched");
    }
    // startTransition(async () => {
    // });
  };

  return (
    <div className="flex items-center justify-center w-full h-auto min-h-screen">
      <CardWrapper
        // children={children}
        title={"Register"}
        titleLabel={"Welcome"}
        btnLabel={"Already Registered!"}
        btnLink={"/login"}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        placeholder="John"
                        type="text"
                        className={`${isLoading && "cursor-not-allowed"}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
              Register
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default RegisterPage;
