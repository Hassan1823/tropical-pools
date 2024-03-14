"use client";

// !imports
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// ! lib import
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import { IoIosCart } from "react-icons/io";

// ! local imports
// import NavItems from "@/utils/NavItems";
import { useSelector } from "react-redux";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { signOut, useSession } from "next-auth/react";
import NavItems from "@/utils/NavItems";

const Header = ({ activeItem, setOpen, headerItems }) => {
  const router = useRouter();

  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [logout, setLogout] = useState(false);
  const [userLetter, setUserLetter] = useState("");

  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      let name = user.name;
      name = name.split("")[0];
      setUserLetter(name);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user.email,
          name: data?.user.name,
          avatar: data?.user.image,
        });
      }
    }
    if (isSuccess) {
      toast.success("Logged In Successfully");
      router.push("/");
    }
  }, [data, user]);

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

  const handleLogout = async () => {
    await signOut();
    setLogout(true);
    await router.push("/login");
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
              {user?.role === "admin" && (
                <>
                  <Link
                    href={"/admin"}
                    className={`hover:text-semibold text-base mx-2 lg:mx-0 text-white`}
                  >
                    Admin
                  </Link>
                </>
              )}

              <NavItems
                activeItem={activeItem}
                isMobile={false}
                headerItems={headerItems}
              />

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
                <HoverCard className="cursor-pointer">
                  <HoverCardTrigger>
                    <Avatar>
                      {user && <AvatarImage src={user.avatar} />}
                      <AvatarFallback>{userLetter}</AvatarFallback>
                    </Avatar>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <Button
                      onClick={user ? handleLogout : router.push("/login")}
                    >
                      {user ? "Logout" : "Login"}
                    </Button>
                  </HoverCardContent>
                </HoverCard>
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
              <NavItems
                activeItem={activeItem}
                isMobile={true}
                headerItems={headerItems}
              />
              <Link href={`/cart`} passHref>
                <IoIosCart className="w-12 h-12 mx-auto my-3 text-white duration-300 cursor-pointer hover:scale-110 hover:drop-shadow-lg" />
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
