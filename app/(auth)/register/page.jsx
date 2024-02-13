"use client";

import React, { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schema";
import CardWrapper from "@/app/components/card-wrapper";
import FormError from "@/app/components/form-error";
import FormSuccess from "@/app/components/form-success";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isPending, startTransition] = useTransition();

  // ! define the form
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  // ~ handle form onsubmit
  const onSubmit = (values) => {
    console.log(values);
    setError("");
    setSuccess("");

    startTransition(() => {
      setSuccess("All Done !");
      console.log(`Waiting for the response ...`);
    });
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
                        disabled={isPending}
                        {...field}
                        placeholder="John"
                        type="text"
                        className={`${isPending && "cursor-not-allowed"}`}
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
                        disabled={isPending}
                        {...field}
                        placeholder="example@gmail.com"
                        type="email"
                        className={`${isPending && "cursor-not-allowed"}`}
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
                        disabled={isPending}
                        {...field}
                        placeholder="******"
                        type="password"
                        className={`${isPending && "cursor-not-allowed"}`}
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
              className={`w-full ${isPending && "cursor-not-allowed"}`}
              disabled={isPending}
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
