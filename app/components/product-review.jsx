"use client";

import { useSingleProductReviewMutation } from "@/redux/features/products/productApi";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import ReviewCard from "./review-card";

const ProductReview = ({ productId }) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [reviewData, setReviewData] = useState([]);

  const [singleProductReview, { data, isSuccess, error, isLoading }] =
    useSingleProductReviewMutation();

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      singleProductReview({ productId: productId });
    }
  }, [firstLoad]);
  useEffect(() => {
    if (isSuccess) {
      console.log("Success in getting reviews");
      setReviewData(data?.productsReviews);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error.data.message;
        console.log(errorMessage);
      }
    }
  }, [isSuccess, error]);

  // const getReviewsData = async () => {
  // };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !data ? (
        <div className="flex items-center justify-center w-full h-auto p-4 text-center">
          <h1 className="text-3xl font-bold text-black lg:text-4xl">
            No Reviews Available
          </h1>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-auto p-8 text-center">
          <h1 className="text-3xl font-bold text-black lg:text-4xl">
            {"Customer's Review"}
          </h1>
          <div className="flex flex-wrap items-center justify-center w-full h-auto gap-4 p-4 text-center lg:p-8">
            {reviewData.map((card, index) => (
              <ReviewCard key={index} data={card} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductReview;
