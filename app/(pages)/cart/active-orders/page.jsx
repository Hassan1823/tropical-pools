"use client";

import Loader from "@/app/components/Loader";
import { headerItems } from "@/lib/data";
import {
  useDeleteUserProductMutation,
  useUserActiveOrdersQuery,
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

const ActiveOrdersPage = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // *-------------------
  // * get user carts products starts here
  const { data, isSuccess, error, isLoading, refetch } =
    useUserActiveOrdersQuery({}, { refetchOnMountOrArgChange: true });
  useEffect(() => {
    if (isSuccess) {
      console.log("success in getting cart data ");
      console.log(data);
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

  return (
    <>
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        headerItems={headerItems}
      />
      <div className="flex flex-col items-center justify-start w-full h-auto min-h-screen">
        {isLoading ? (
          <Loader />
        ) : data && data.cart?.products.length !== 0 ? (
          <>
            <h1 className="w-full h-auto p-4 text-2xl font-bold text-center">
              Active Orders
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
                        <TableRow className="duration-300 cursor-pointer hover:bg-slate-200">
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
                              className="w-auto h-auto bg-destructive hover:bg-destructive/60"
                              onClick={() => handleDelete(item._id)}
                            >
                              <MdDeleteForever className="text-white " />
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

export default ActiveOrdersPage;
