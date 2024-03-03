"use client";

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
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";

import Loader from "@/app/components/Loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddToCartMutation,
  useReviewProductMutation,
  useSingleProductMutation,
} from "@/redux/features/products/productApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import ProductReview from "@/app/components/product-review";

const SingleProduct = ({ params }) => {
  let productId = params.productId || "";

  // console.log("ProductIDDDD");
  // console.log(productId);
  const [pending, setPending] = useState(false);
  const [productData, setProductData] = useState([]);

  const [isPending, startTransition] = useTransition();

  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);
  const [allowReview, setAllowReview] = useState(false);

  // ! get product starts here
  const [singleProduct, { data, isLoading, isSuccess, error }] =
    useSingleProductMutation();

  useEffect(() => {
    singleProduct({ productId });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log("success");
      console.log(data?.product);
      setProductData(data?.product);
      setStock(data?.product.quantity);
      setPending(false);
    }
    if (isLoading) {
      setPending(true);
    }

    if (error) {
      console.log("errors");
      toast.error("Something went wrong");
    }
  }, [isSuccess, error]);
  // ! get product ends here

  // ~----------------------------------

  // ! add to cart starts here
  const [addToCart, { isSuccess: cartSuccess, error: cartError }] =
    useAddToCartMutation();

  const productAddToCart = async ({ productId, quantity }) => {
    console.log("product id");
    console.log(productId);
    console.log("quantity");
    console.log(quantity);
    await addToCart({ product: productId, quantity });
  };

  useEffect(() => {
    if (cartSuccess) {
      toast.success("Product added to cart");
    }
    if (cartError) {
      if ("data" in cartError) {
        const errorMessage = cartError.data.message;
        toast.error(errorMessage);
      }
    }
  }, [cartSuccess, cartError]);
  // ! add to cart ends here

  const handleIncrement = () => {
    if (quantity >= 1 && stock >= 1) {
      setQuantity((prevQuantity) => quantity + 1);
    }
  };
  const handleDecrement = () => {
    if (quantity > 1 && stock >= 1) {
      setQuantity((prevQuantity) => quantity - 1);
    }
  };

  //   define form
  const form = useForm({
    resolver: zodResolver(ProductReviewSchema),
    defaultValues: {
      review: "",
      rating: "",
    },
  });

  // * -------------------------------
  // * add review to product starts here

  const [
    reviewProduct,
    { isSuccess: reviewSuccess, error: reviewError, data: reviewData },
  ] = useReviewProductMutation();

  //   form submit function
  const onSubmit = (values) => {
    reviewProduct({
      rating: parseInt(values.rating),
      review: values.review,
      product: productId,
    });
  };

  useEffect(() => {
    if (reviewSuccess) {
      toast.success(reviewData.message);
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError.data.message;
        toast.error(errorMessage);
      }
    }
  }, [reviewSuccess, reviewError]);

  // * add review to product ends here
  // ~----------------------------

  return (
    <>
      {pending ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="flex flex-col items-start justify-center w-full h-auto gap-8 text-center md:flex-row md:text-start lg:py-24 md:py-20 py-14">
            {/* left div */}
            <div className="flex items-center justify-center w-full h-auto md:w-1/2">
              <Image
                src={productData.image}
                alt="pump"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
            {/* right div */}
            <div className="flex flex-col items-center justify-center w-full h-auto space-y-2 md:w-1/2 md:items-start">
              <h1 className="w-full text-2xl font-bold text-black lg:text-3xl">
                {productData.title || "No Product"}
              </h1>
              <p className="text-xs">{`product id # ${productData._id}`}</p>
              <h1 className="text-lg">
                {`RS/- `} <b>{productData.price}</b>
              </h1>
              <div
                className={`w-auto h-auto flex text-center justify-center items-center gap-4`}
              >
                <Button
                  size="icon"
                  onClick={handleDecrement}
                  className={!stock >= 1 && "cursor-not-allowed"}
                >
                  -
                </Button>
                <p className=""> {quantity}</p>
                <Button
                  size="icon"
                  onClick={handleIncrement}
                  className={!stock >= 1 && "cursor-not-allowed"}
                >
                  +
                </Button>
              </div>

              {/* stock status */}
              <p className="text-sm">
                {" "}
                <b>Status :</b>{" "}
                {stock >= 1
                  ? `${productData.quantity} in Stock`
                  : "Out of Stock"}
              </p>

              {/* desription */}
              <h1 className="text-lg">Description</h1>
              <p className="w-2/3 text-xs">{productData.description}</p>
              <Button
                variant="default"
                size="sm"
                onClick={() => productAddToCart({ productId, quantity })}
              >
                Add to Cart
              </Button>
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
                          className="pt-4 space-y-6"
                          onSubmit={form.handleSubmit(onSubmit)}
                        >
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="review"
                              render={({ field }) => (
                                <FormItem>
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
                            <FormField
                              control={form.control}
                              name="rating"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      disabled={isPending}
                                      {...field}
                                      placeholder="rating"
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
                          </div>
                          <Button
                            type="submit"
                            className={`w-full ${
                              isPending && "cursor-not-allowed"
                            }`}
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

          <ProductReview productId={productId} />
        </>
      )}
    </>
  );
};

export default SingleProduct;
