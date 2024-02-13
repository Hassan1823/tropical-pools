"use client";

import { useState } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { PoolDetailsData } from "@/lib/data";

const PoolCard = () => {
  const [hoverStates, setHoverStates] = useState(
    new Array(PoolDetailsData.length).fill(false)
  );

  const handleMouseEnter = (index) => {
    setHoverStates((prevStates) =>
      prevStates.map((state, idx) => (idx === index ? true : state))
    );
  };

  const handleMouseLeave = (index) => {
    setHoverStates((prevStates) =>
      prevStates.map((state, idx) => (idx === index ? false : state))
    );
  };

  const handleClick = (index) => {
    setHoverStates((prevStates) =>
      prevStates.map((state, idx) => (idx === index ? !state : state))
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto py-8 text-center">
      <h1 className="text-3xl font-bold text-black lg:text-4xl">Pool Details</h1>
      <div className="flex flex-wrap items-center justify-center w-full h-auto gap-5 py-8 ">
        {PoolDetailsData.map((card, index) => {
          return (
            <div
              className="w-[25vw] max-sm:w-[80vw] max-lg:w-[40vw] h-auto p-2 rounded-md shadow-md shadow-blue-200"
              key={index}
            >
              {/* head content */}
              <div
                className="flex items-end justify-end w-full min-h-[40vh]"
                style={{
                  backgroundImage: `url(${card.src})`, // Set the background image using inline style
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className={`w-full h-12 text-base duration-300 text-center flex justify-center items-center text-white bg-blue-500 hover:bg-blue-500/70 p-2 ${
                    hoverStates[index] && "hover:h-[30vh]"
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  onClick={() => handleClick(index)}
                >
                  {hoverStates[index] ? (
                    <>{card.description}</>
                  ) : (
                    <>{card.title}</>
                  )}
                </div>
              </div>
              {/* bottom content */}
              <div className="flex items-center justify-center w-full h-auto p-2 text-center">
                <Link href="" passHref>
                  <Button variant="default" size="xl">
                    More Info
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <Link href={''} passHref>
      <Button variant="default" size="lg">
        More
      </Button>
      </Link>
    </div>
  );
};

export default PoolCard;
