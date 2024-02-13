"use client";

// !imports
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ! lib import
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import { IoIosCart } from "react-icons/io";

// ! local imports
import NavItems from "@/utils/NavItems";

const Header = ({ activeItem, setOpen, open }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [logout, setLogout] = useState(false);
  const [user, setUser] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e) => {
    if (e.target.id === "screen") {
      {
        setOpenSidebar(false);
      }
    }
  };

  return (
    <div className="relative w-full">
      <div
        className={`${
          active
            ? "bg-blue-950 fixed top-0 left-0 w-full h-[80px] z-[80] border-b border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full bg-blue-950/90 border-b border-[#ffffff1c] h-[80px] z-[80] shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-1">
            <div className="">
              <Link
                href={"/"}
                className="md:text-4xl text-xl text-white font-[500] hover:shadow-sm"
              >
                <Image
                  src={"/weblogo.png"}
                  alt=""
                  width={170}
                  height={100}
                  className="object-contain"
                />
              </Link>
            </div>

            <div className="flex items-center gap-2 ">
              <NavItems activeItem={activeItem} isMobile={false} />

              {/* only for desktop */}
              <div className="hidden md:flex">
                <Link href={"/cart"} passHref>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle"
                    >
                      <div className="indicator">
                        <IoIosCart
                          size={25}
                          className="mx-2 text-white cursor-pointer "
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/*  for desktop */}
              {user ? (
                <Link href={"/"} className="ml-4">
                  <Image
                    src={user.avatar ? user.avatar?.url : avatar}
                    alt="user profile picture"
                    className="w-[30px] h-[30px] rounded-full cursor-pointer"
                    width={30}
                    height={30}
                    style={{
                      border: activeItem === 5 ? "2px solid #ffc107" : "none",
                    }}
                  />
                </Link>
              ) : (
                <div className="flex ">
                  <Link href={"/login"} passHref>
                    <HiOutlineUserCircle
                      size={25}
                      className="text-white cursor-pointer"
                      onClick={() => setOpen(true)}
                    />
                  </Link>
                </div>
              )}

              <div className="ml-4 md:hidden ">
                <HiOutlineMenuAlt3
                  size={25}
                  className="text-white cursor-pointer"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* mobile side bar */}
        {openSidebar && (
          <div
            className="md:hidden fixed w-full h-screen top-0 left-0 z-[99999] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[99999999999] h-screen bg-blue-900 bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <Link href={`/cart`} passHref>
                <IoIosCart
                  size={25}
                  className="w-full mx-auto my-3 text-white cursor-pointer "
                />
              </Link>

              <br />
              <br />
              <p className="w-full mx-auto my-3 text-sm text-center text-white">
                Copyright &copy; 2024 Tropical Pools
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
