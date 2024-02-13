"use client";

import { useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import { images } from "@/lib/images";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function SliderSwiper() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section className="min-h-screen py-12 bg-white">
      <div className="container">
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="w-full rounded-lg h-96"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  className="block object-cover w-full h-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail */}
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={12}
          slidesPerView={8}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="w-full h-16 mt-3 rounded-lg thumbs"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <button className="flex items-center justify-center w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  className="block object-cover w-full h-full"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
