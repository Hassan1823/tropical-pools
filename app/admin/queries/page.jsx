"use client";

import React from "react";
import {
  useGetAllQueriesQuery,
  useSendQueryReplyMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import Loader from "@/app/components/Loader";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { QueryReplySchema } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const QueriesPage = () => {
  const [toEmail, setToEmail] = React.useState("");
  const { data, isSuccess, error, isLoading } = useGetAllQueriesQuery();

  React.useEffect(() => {
    if (isSuccess) {
      console.log("Success in getting queries");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error.data.message;
        toast.error(errorMessage);
      }
    }
  });

  // * --------------------------
  const handleFormValues = (email) => {
    setToEmail(email);
    // console.log(toEmail);
  };
  // * define the form for query reply
  const form = useForm({
    resolver: zodResolver(QueryReplySchema),
    defaultValues: {
      queryReply: "",
    },
  });

  // ~ sending the query reply
  const [
    sendQueryReply,
    { isSuccess: replySuccess, error: replyError, isLoading: replyLoading },
  ] = useSendQueryReplyMutation();

  // !------ handle onsubmit of the query reply form
  const onSubmit = async (values) => {
    console.log("REply", values.queryReply);
    console.log("EMail", toEmail);
    await sendQueryReply({
      email: toEmail,
      reply: values.queryReply,
    });
  };

  React.useEffect(() => {
    if (replySuccess) {
      toast.success("Query reply sent successfully");
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = replyError.data.message;
        toast.error(errorMessage);
      }
    }
  }, [replySuccess, replyError]);

  return (
    <div className="w-full min-h-[80vh] h-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data && data.length !== 0 ? (
            <>
              <div className="w-full h-auto p-4 text-center">Data found</div>
              {/* * main body for queries */}
              <div className="flex flex-wrap items-start justify-center w-full h-auto gap-8 px-4 py-8 lg:px-12 md:px-8">
                {/* query cards */}
                {data?.allQueries.map((query, idx) => {
                  //   setToEmail(query.email);
                  return (
                    <div
                      className="flex flex-col items-start h-[30vh] gap-4 p-4 text-sm border rounded-md w-72 justify-evenly"
                      key={idx}
                    >
                      {/* query sender name */}
                      <span className="">
                        <b>Sender : </b>
                        {query.email}
                      </span>

                      {/* query message */}
                      <span className="overflow-y-auto">
                        <b>Message :</b>
                        {query.message}
                      </span>
                      <div className="flex items-center justify-between w-full h-auto flex-nowrap">
                        {/* reply button */}
                        <Dialog>
                          <DialogTrigger>
                            <Button variant="default" size="sm">
                              {" "}
                              Reply
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Send Query Reply To :</DialogTitle>
                              <DialogDescription>
                                <Form {...form}>
                                  <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-6"
                                  >
                                    <div className="space-y-4">
                                      <FormField
                                        name=""
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>{query.email}</FormLabel>

                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name="queryReply"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Reply :</FormLabel>
                                            <FormControl>
                                              <Textarea
                                                disabled={replyLoading}
                                                {...field}
                                                placeholder="Query Reply"
                                                type="text"
                                                className={`${
                                                  isLoading &&
                                                  "cursor-not-allowed"
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
                                      className={`w-full ${
                                        isLoading && "cursor-not-allowed"
                                      }`}
                                      disabled={replyLoading}
                                      onClick={() =>
                                        handleFormValues(query.email)
                                      }
                                    >
                                      Send
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
                })}
              </div>
            </>
          ) : (
            <div className="w-full h-auto p-4 text-center">No Data found</div>
          )}
        </>
      )}
    </div>
  );
};

export default QueriesPage;
