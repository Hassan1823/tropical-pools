"use client";

import React, { useEffect, useState } from "react";
import { ReviewData } from "@/lib/data";
import ReviewCard from "./review-card";
import { useAllProductReviewsQuery } from "@/redux/features/products/productApi";
import Loader from "./Loader";

const CustomerReview = () => {
  const [reviewData, setReviewData] = useState([]);

  const { data, isSuccess, error, isLoading } = useAllProductReviewsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isSuccess) {
      console.log("Success in getting reviews");
      setReviewData(data?.allReviews);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error.data.message;
        console.log(errorMessage);
      }
    }
  }, [isSuccess, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !data ? (
        <div className="w-full h-auto p-4 flex justify-center items-center text-center">
          No Reviews Available
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

          {/* <Link href={""} passHref>
        <Button variant="default" size="lg">
        More Reviews
        </Button>
      </Link> */}
        </div>
      )}
    </>
  );
};

export default CustomerReview;
