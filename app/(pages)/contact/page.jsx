"use client";

import { useState, useTransition, useEffect } from "react";

import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { MdEmail } from "react-icons/md";

import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { QueriesSchema } from "@/schema";

import { useSendQueryMutation } from "@/redux/features/auth/authApi";

import { toast } from "sonner";

const ContactPage = () => {
  const [isPending, startTransition] = useTransition();

  const [sendQuery, { isSuccess, error: queryError, isLoading, data }] =
    useSendQueryMutation();

  // ! define the form
  const form = useForm({
    resolver: zodResolver(QueriesSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  // ~ handle form onsubmit
  const onSubmit = async (values) => {
    // setError("");
    // setSuccess("");

    await sendQuery({
      name: values.name,
      email: values.email,
      phone: values.phone,
      message: values.message,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Query Submitted Successfully");
      (prevShowForm) => setShowForm(false);
    }
    if (queryError) {
      if ("data" in queryError) {
        const errorMessage = queryError;
        toast.error(errorMessage.data.message);
      }
    }
  }, [queryError, isSuccess]);

  return (
    <div className="w-full h-auto min-h-screen">
      <div className="w-full h-auto">
        <Image
          src={"/images/contactus.png"}
          alt="contact us "
          width={300}
          height={300}
          className="object-contain w-full"
        />
      </div>

      <div className="w-full h-auto py-8">
        <h1 className="w-full my-8 text-3xl font-bold text-center text-black lg:text-4xl">
          Contact Us
        </h1>
        <div className="flex flex-wrap items-start justify-center w-full h-auto">
          {/* left div  */}
          <div className="w-full h-auto space-y-4 md:w-1/2 text-start p-14">
            <h1 className="w-full mb-4 text-xl font-bold text-center text-blue-500 lg:text-2xl">
              Contact Us
            </h1>
            <p className="text-sm">
              {
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unk. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unk.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unk"
              }
            </p>
            <div className="flex justify-start w-full h-auto gap-4 text-start">
              <FaLocationDot className="w-5 h-5 text-blue-500" />
              <p className="w-full text-xs">
                {"2195 Alamosa Drive Washington, UT 84780"}
              </p>
            </div>
            <div className="flex justify-start w-full h-auto gap-4 text-start">
              <FaPhone className="w-5 h-5 text-blue-500" />
              <p className="w-full text-xs">{"435-817-0782"}</p>
            </div>
            <div className="flex justify-start w-full h-auto gap-4 text-start">
              <MdEmail className="w-5 h-5 text-blue-500" />
              <p className="w-full text-xs">{"Contact@tropicalpools.com"}</p>
            </div>
            <div className="flex justify-start w-full h-auto gap-4 text-start">
              <IoIosTime className="w-5 h-5 text-blue-500" />
              <p className="w-full text-xs">
                {"Monday - Saturday 10:00 a.m. to 6:00 p.m."}
              </p>
            </div>
          </div>
          {/* right div  */}
          <div className="w-full h-auto p-8 md:w-1/2">
            <h1 className="w-full mb-4 text-xl font-bold text-center text-blue-500 lg:text-2xl">
              Get in Touch
            </h1>
            <h1 className="w-full mb-4 text-lg font-bold text-center text-black lg:text-xl">
              Write A Message
            </h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 text-start"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name :</FormLabel>
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone no :</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            {...field}
                            placeholder="+090078601"
                            type="number"
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
                        <FormLabel>Email :</FormLabel>
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
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message :</FormLabel>
                        <FormControl>
                          <Textarea
                            disabled={isLoading}
                            {...field}
                            placeholder="Your Query ..."
                            type="text"
                            className={`${isLoading && "cursor-not-allowed"}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* error message  */}
                {/* <FormError message={error} />
                      <FormSuccess message={success} /> */}

                <Button
                  type="submit"
                  className={`w-full ${isLoading && "cursor-not-allowed"}`}
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
