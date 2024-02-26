"use client";

import Loader from "@/app/components/Loader";
import { headerItems } from "@/lib/data";
import {
  useDeleteUserProductMutation,
  useUserCartQuery,
} from "@/redux/features/auth/authApi";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";

import { toast } from "sonner";

import Header from "@/app/components/Header";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useConfirmOrderMutation } from "@/redux/features/products/productApi";

const CartPage = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // *-------------------
  // * get user carts products stats here
  const { data, isSuccess, error, isLoading, refetch } = useUserCartQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  useEffect(() => {
    if (isSuccess) {
      console.log("success in getting cart data ");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error.data.message;
        console.log("error in getting cart data ");
      }
    }
  }, [isSuccess, error]);
  // * get user carts products ends here

  // ~--------------------
  // * delete user product starts here\
  const [
    deleteUserProduct,
    { isSuccess: deleteSuccess, error: deleteError, data: deleteData },
  ] = useDeleteUserProductMutation({});

  useEffect(() => {
    if (deleteSuccess) {
      refetch();
      toast.success("Deleted Successfully");
    }

    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError.data.message;
        toast.error(errorMessage);
      }
      // toast.error("Deleted Error");
    }
  }, [deleteSuccess, deleteError]);

  const handleDelete = async (productId) => {
    await deleteUserProduct({ productId });
  };
  // * delete user product ends here

  // ~--------------------
  // * handle total amount
  useEffect(() => {
    if (data) {
      let total = 0;
      data.cart.products.forEach((item) => {
        total += Math.ceil(item.product.price * item.quantity);
      });
      setTotalAmount(total);
    }
  }, [data]);
  // * handle total amount

  // ~--------------------

  // * confirm the order
  const [confirmOrder, { isSuccess: confirmSuccess, error: confirmError }] =
    useConfirmOrderMutation();

  const handleConfirmOrder = () => {
    confirmOrder({ status: "processing" });
  };

  useEffect(() => {
    if (confirmSuccess) {
      refetch();
      toast.success("Order Placed Successfully");
    }
    if (confirmError) {
      if ("data" in confirmError) {
        const errorMessage = confirmError.data.message;
        toast.error(errorMessage);
      }
    }
  }, [confirmError, confirmSuccess]);

  // * confirm the order

  return (
    <>
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        headerItems={headerItems}
      />
      <div className="w-full h-auto min-h-screen flex flex-col justify-start items-center">
        {isLoading ? (
          <Loader />
        ) : data ? (
          <>
            <h1 className="w-full h-auto p-4 text-2xl font-bold text-center">
              Cart Items
            </h1>

            {/* * products */}
            <div className="w-full h-auto px-12 py-8">
              <Table>
                {/* <TableCaption>A list of your cart products.</TableCaption> */}
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Index</TableHead>
                    <TableHead className="w-[7vw] text-center">Image</TableHead>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data &&
                    data?.cart.products.map((item, idx) => {
                      return (
                        <TableRow className="hover:bg-slate-200 duration-300 cursor-pointer">
                          <TableCell className="text-center">
                            {idx + 1}
                          </TableCell>
                          <TableCell className="w-[7vw] font-medium text-center mx-auto">
                            <Image
                              src={item.product.image}
                              alt="product img"
                              width={120}
                              height={120}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            {item.product.title}
                          </TableCell>
                          <TableCell className="text-center">
                            RS/- {item.product.price}
                          </TableCell>
                          <TableCell className="text-center">
                            {item.quantity}
                          </TableCell>
                          <TableCell className={`text-center`}>
                            <span
                              className={`p-1 text-center rounded-md ${
                                item.status === "processing"
                                  ? "bg-orange-500 text-white"
                                  : "bg-green-500 text-white"
                              }`}
                            >
                              {item.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="default"
                              // size="icon"
                              className="bg-destructive hover:bg-destructive/60 w-auto h-auto"
                              onClick={() => handleDelete(item._id)}
                            >
                              <MdDeleteForever className=" text-white" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>

              <div className="w-full h-auto p-4 text-center">
                Total Price : RS/- <b>{totalAmount}</b>
              </div>
              <div className="w-full h-auto p-4 text-center">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => handleConfirmOrder()}
                >
                  Proceed
                </Button>
              </div>
            </div>
          </>
        ) : (
          <h1 className="w-full h-auto p-4 text-2xl font-bold text-center">
            No Products In The Cart
          </h1>
        )}
      </div>
    </>
  );
};

export default CartPage;
