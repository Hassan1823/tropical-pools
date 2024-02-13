"use client";

import { AboutPointsData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Permanent_Marker } from "next/font/google";
const h1Font = Permanent_Marker({
  weight: ["400"],
  subsets: ["latin"],
});

import { Button } from "@/components/ui/button";
import { IoRefreshCircle } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { QueriesSchema } from "@/schema";
import { useState, useTransition } from "react";
import FormError from "@/app/components/form-error";
import FormSuccess from "@/app/components/form-success";

const AboutPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isPending, startTransition] = useTransition();

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
    <div className="w-full h-auto min-h-screen text-white">
      <div className="w-full min-h-[70vh] h-auto bg-about-bg bg-cover space-y-6 flex flex-col justify-center items-center text-center">
        <h1
          className={cn(
            "flex flex-wrap gap-2 text-4xl font-semibold lg:text-6xl md:text-5xl font-marker",
            h1Font.className
          )}
        >
          Topical
          <span className="text-blue-300">Pools</span>
        </h1>

        <p className="w-full px-8 text-lg md:text-2xl lg:text-3xl">
          With over <b className="text-blue-300">10 years</b>
          {
            " of experience, quality, and integrity is the difference that sets us apart from others."
          }
        </p>
      </div>

      <h1 className="w-full my-8 text-3xl font-bold text-center text-black lg:text-4xl">
        About Us
      </h1>

      <div className="w-full min-h-[70vh] py-8 h-auto bg-about-bg bg-cover flex flex-wrap justify-evenly items-center text-center">
        {/* left div */}
        <div className="w-full md:w-[45%] h-auto flex flex-col justify-evenly items-center gap-8">
          <h1
            className={cn(
              " text-4xl font-semibold lg:text-6xl md:text-5xl font-marker",
              h1Font.className
            )}
          >
            Topical <span className="text-blue-300">Pools</span>
          </h1>
          <p className="w-full px-8 text-xl md:text-2xl lg:text-3xl ">
            {
              "Tropical Pools is one of such company that can satisfy all of the above criteria and more. Come in now and see what we can do for you."
            }
          </p>
        </div>
        {/* right div */}
        <div className="flex items-center justify-center w-full h-auto p-4 md:w-1/2">
          <div className="w-auto h-auto p-4 border border-blue-300 rounded-md bg-slate-400/30">
            {AboutPointsData.map((item, index) => (
              <p
                key={index}
                className="flex w-full gap-4 text-lg md:text-xl lg:text-2xl"
              >
                <b className="text-blue-400">{item.number}</b> {item.headline}
              </p>
            ))}
          </div>
        </div>
      </div>

      <h1 className="w-full my-8 text-3xl font-bold text-center text-black lg:text-4xl">
        Our Services
      </h1>

      <div className="flex flex-wrap items-center justify-center w-full h-auto gap-12 text-center py-14">
        <div className="flex flex-col items-center justify-center h-auto p-2 w-60">
          <TbTruckDelivery className="w-16 h-16 text-blue-500" />
          <p className="font-semibold text-black">Fast Delivery</p>
          <p className="text-sm text-black">
            {"Lorem ipsum dolor sit, amet consectetur adipisicing elit."}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-auto p-2 w-60">
          <IoRefreshCircle className="w-16 h-16 text-blue-500" />
          <p className="font-semibold text-black">Replacement Warranty</p>
          <p className="text-sm text-black">
            {"Lorem ipsum dolor sit, amet consectetur adipisicing elit."}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center h-auto p-2 w-60">
          <MdSupportAgent className="w-16 h-16 text-blue-500" />
          <p className="font-semibold text-black">24 x 7 Support</p>
          <p className="text-sm text-black">
            {"Lorem ipsum dolor sit, amet consectetur adipisicing elit."}
          </p>
        </div>
      </div>

      <div className="w-full min-h-[50vh] h-auto bg-blue-500/60 py-14">
        <p className="w-full p-12 text-2xl font-medium text-center text-black lg:text-4xl md:text-3xl">
          {
            "If you would like to schedule an appointment for more information or a bid contact us at"
          }
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 text-black">
          <span>{"+92300-5188080"}</span>
          {/* <Link href={""} passHref>

            <Button variant="default" size="lg">
              Drop Email
            </Button>
          </Link> */}

          <Dialog>
            <DialogTrigger>
              <Button variant="default" size="lg">
                Drop Email
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Drop Your Quires!</DialogTitle>
                <DialogDescription>
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
                                  disabled={isPending}
                                  {...field}
                                  placeholder="John"
                                  type="text"
                                  className={`${
                                    isPending && "cursor-not-allowed"
                                  }`}
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
                                  disabled={isPending}
                                  {...field}
                                  placeholder="+090078601"
                                  type="number"
                                  className={`${
                                    isPending && "cursor-not-allowed"
                                  }`}
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
                                  disabled={isPending}
                                  {...field}
                                  placeholder="example@gmail.com"
                                  type="email"
                                  className={`${
                                    isPending && "cursor-not-allowed"
                                  }`}
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
                                  disabled={isPending}
                                  {...field}
                                  placeholder="Your Query ..."
                                  type="text"
                                  className={`${
                                    isPending && "cursor-not-allowed"
                                  }`}
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
                        className={`w-full ${
                          isPending && "cursor-not-allowed"
                        }`}
                        disabled={isPending}
                      >
                        Login
                      </Button>
                    </form>
                  </Form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
