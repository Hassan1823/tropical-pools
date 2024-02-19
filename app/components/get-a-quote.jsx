"use client";
import { useState, useTransition, useEffect } from "react";

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
import { useSendQueryMutation } from "@/redux/features/auth/authApi";

import { toast } from "sonner";

const GetAQuote = ({ btnLabel }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);

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
    setError("");
    setSuccess("");

    const data = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      message: values.message,
    };

    console.table(data);

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
    <Dialog>
      <DialogTrigger>
        <Button
          variant="default"
          size="lg"
          onClick={(prevShowForm) => setShowForm(true)}
        >
          {btnLabel}
        </Button>
      </DialogTrigger>
      {showForm && (
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
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default GetAQuote;
