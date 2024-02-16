"use client";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { QueriesSchema } from "@/schema";

const GetAQuote = ({ btnLabel }) => {
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
    <Dialog>
      <DialogTrigger>
        <Button variant="default" size="lg">
          {btnLabel}
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
                            className={`${isPending && "cursor-not-allowed"}`}
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
                        <FormLabel>Email :</FormLabel>
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
                            className={`${isPending && "cursor-not-allowed"}`}
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
  );
};

export default GetAQuote;
