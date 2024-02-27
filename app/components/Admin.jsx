"use client";

import { useConfirmOrdersQuery } from "@/redux/features/products/productApi";
import React, { useEffect } from "react";
import { toast } from "sonner";
import Loader from "./Loader";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ComboboxDemo } from "@/utils/ComboboxDemo";

const AdminComp = ({ user }) => {
  const { data, isSuccess, error, isLoading, refetch } = useConfirmOrdersQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      console.log("Success in getting orders");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error.data.message;
        toast.error(errorMessage);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full min-h-[70vh] h-auto flex flex-col justify-start items-center space-y-8">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-auto p-4">
          {data ? (
            <>
              <h1 className="w-full text-center text-2xl font-semibold">
                Orders
              </h1>
              <h1 className="w-full text-center text-2xl font-semibold">
                {`Total revenue: RS/- ${data?.orders.reduce(
                  (total, order) => total + (order.totalPrice || 0),
                  0
                )}`}
              </h1>

              {/* all orders */}
              <div className="w-full h-auto lg:px-8 md:px-4 px-2 py-4 space-y-4">
                {/* user order card */}
                {data?.orders.map((product, idx) => {
                  return (
                    <div
                      className="w-full h-auto flex flex-col justify-start items-center space-y-4 cursor-pointer border-4 rounded-md p-4"
                      key={idx}
                    >
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-center">
                              {product.name}
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        {/* // * inner table for products */}
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-center">
                                Name
                              </TableHead>
                              <TableHead className="text-center">Id</TableHead>
                              <TableHead className="text-center">
                                Price
                              </TableHead>
                              <TableHead className="text-center">
                                Quantity
                              </TableHead>
                              <TableHead className="text-center">
                                Status
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {product?.products.map((item, index) => {
                              return (
                                <TableRow
                                  key={index}
                                  className="hover:bg-slate-200 hover:scale-101 duration-500"
                                >
                                  <TableCell className="text-center">
                                    {item.productName}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {item.product}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    RS/- {item.productPrice}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {item.quantity}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {/* {item.status} */}
                                    <ComboboxDemo
                                      currValue={item.status}
                                      orderID={item._id}
                                    />
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </Table>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <h1 className="w-full text-center ">No Orders Found</h1>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminComp;
