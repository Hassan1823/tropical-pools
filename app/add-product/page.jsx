"use client";

import React from "react";
import Image from "next/image";

const AddProductPage = () => {
  const [image, setImage] = React.useState();
  const imageHandler = async (e) => {
    //     const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        console.log("avatar");
        console.log(avatar);
        setImage(fileReader.result);
        console.log("image");
        console.log(image);
        // updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="w-full min-h-screen h-auto">
      <div className="relative">
        <Image
          // key={} // Add a unique key when the image source changes
          src={"/images/hero-BoxGeometry.png"}
          alt="user dp"
          width={120}
          height={120}
          className="w-[120px] h-[120px] cursor-pointer border-[3px] border-yellow-500 rounded-full"
        />
        <input
          type="file"
          name=""
          id="avatar"
          className="hidden"
          onChange={imageHandler}
          accept="image/png,image/jpg,image/jpeg,image/webp"
        />
        <label htmlFor="avatar">
          <div className="w-[30px] h-[30px] bg-slate-950 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
            {/* <AiOutlineCamera size={20} className="z-1" /> */}
          </div>
        </label>
      </div>
    </div>
  );
};

export default AddProductPage;
