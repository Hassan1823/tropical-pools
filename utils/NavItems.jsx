import React from "react";
import Link from "next/link";
import { headerItems } from "@/lib/data";

const NavItems = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden w-auto gap-8 text-black md:flex">
        <div className="flex w-auto gap-2">
          {headerItems &&
            headerItems.map((item, index) => (
              <Link
                href={item.url}
                key={index}
                className={`hover:text-semibold text-base mx-2 lg:mx-0 ${
                  activeItem ? "text-blue-500" : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
        </div>
      </div>

      {isMobile && (
        <div className="flex flex-col w-auto gap-8 text-black md:hidden">
          <div className="flex flex-col w-full gap-2 mobile-menu">
            
            {headerItems &&
              headerItems.map((item, index) => (
                <Link
                  href={item.url}
                  key={index}
                  className={`hover:text-blue-500 text-lg ${
                    activeItem ? "text-blue-500" : "text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
