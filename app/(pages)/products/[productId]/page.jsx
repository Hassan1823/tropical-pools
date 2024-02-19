"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductReviewSchema } from "@/schema";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const SingleProduct = ({ params }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isPending, startTransition] = useTransition();

  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(16);

  const handleIncrement = () => {
    if (quantity >= 1) {
      setQuantity((prevQuantity) => quantity + 1);
    }
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => quantity - 1);
    }
  };

  //   define form
  const form = useForm({
    resolver: zodResolver(ProductReviewSchema),
    defaultValues: {
      review: "",
    },
  });

  //   form submit function
  const onSubmit = (values) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      setSuccess("All Done!");
    });
  };

  return (
    <div className="w-full min-h-screen h-auto flex md:flex-row flex-col justify-center items-start md:text-start text-center lg:py-24 md:py-20 py-14 gap-8">
      {/* left div */}
      <div className="md:w-1/2 w-full h-auto flex justify-center items-center">
        <Image
          src={"/images/pump.png"}
          alt="pump"
          width={300}
          height={300}
          className="object-contain"
        />
      </div>
      {/* right div */}
      <div className="md:w-1/2 w-full h-auto flex flex-col justify-center md:items-start items-center space-y-2">
        <h1 className="w-full text-2xl font-bold text-black lg:text-3xl">
          {params.productId || "No Product"}
        </h1>
        <p className="text-xs">{`product id # ${"090078601"}`}</p>
        <h1 className="text-lg">
          {`RS/- `} <b>{9810}</b>
        </h1>
        <div className="w-auto h-auto flex text-center justify-center items-center gap-4">
          <Button size="icon" onClick={handleDecrement}>
            -
          </Button>
          <p className=""> {quantity}</p>
          <Button size="icon" onClick={handleIncrement}>
            +
          </Button>
        </div>

        {/* stock status */}
        <p className="text-sm">
          {" "}
          <b>Status :</b> {stock >= 1 ? "In Stock" : "Out of Stock"}
        </p>

        {/* desription */}
        <h1 className="text-lg">Description</h1>
        <p className="text-xs w-2/3">
          {
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Lorem ipsum dolor sit, amet consectetur adipisicing elit.Lorem ipsum dolor sit, amet consectetur adipisicing elit.Lorem ipsum dolor sit, amet consectetur adipisicing elit."
          }
        </p>
        <Dialog>
          <DialogTrigger>
            <Button variant="default" size="sm">
              Submit Review
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Your Review</DialogTitle>
              <DialogDescription>
                <Form {...form}>
                  <form
                    className="space-y-6 pt-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="review"
                        render={({ field }) => (
                          <FormItem>
                            {/* <FormLabel>Review</FormLabel> */}
                            <FormControl>
                              <Textarea
                                disabled={isPending}
                                {...field}
                                placeholder="Write Your Review"
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
                    <Button
                      type="submit"
                      className={`w-full ${isPending && "cursor-not-allowed"}`}
                      disabled={isPending}
                    >
                      Submit
                    </Button>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SingleProduct;
