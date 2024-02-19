import { Button } from "@/components/ui/button";
import bgImage from "@/public/images/water_bg.png";
import { cn } from "@/lib/utils";
import WhyTropicalCard from "./why-card";
import { WhyTropicalCardData } from "@/lib/data";

import { Permanent_Marker } from "next/font/google";
const h1Font = Permanent_Marker({
  weight: ["400"],
  subsets: ["latin"],
});

import { images } from "@/lib/images";
import SliderSwiper from "./thumbnail";

const AboutComp = () => {
  return (
    <div className="flex flex-col w-full h-auto pt-8 text-center">
      <h1 className="text-3xl font-bold text-black lg:text-4xl">About Us</h1>

      <div className="flex items-start justify-center w-full h-auto max-xl:flex-col">
        <div className="w-full h-auto duration-300 xl:w-1/2">
          <SliderSwiper data={images} />
        </div>
        <div className="w-full min-h-[40vh] h-auto duration-300 xl:w-1/2 xl:py-24 py-0 space-y-6 mb-6">
          <p className="w-full px-8 text-sm xl:text-base">
            {`Welcome to Tropical Pools, your premier destination for all things related to pools! At Tropical Pools, we take pride in offering a comprehensive range of services dedicated to the construction, maintenance, and enhancement of your aquatic oasis. With a team of skilled professionals committed to excellence, we bring your dream pool to life with meticulous construction services. Our commitment doesn't end there; we ensure the longevity and beauty of your investment through top-notch maintenance services. Additionally, explore our curated selection of high-quality pool products, from cutting-edge technology to stylish accessories, designed to elevate your pool experience. Dive into a world of unparalleled expertise and customer satisfaction with Tropical Pools, where we transform your vision into a reality, creating a refreshing haven for you to enjoy for years to come.`}
          </p>
          <Button variant="link" size="lg">
            <b>More Info</b>
          </Button>
        </div>
      </div>

      {/* WHy tropicals */}
      <div
        className="w-full h-auto py-4"
        style={{
          backgroundImage: `url(${bgImage.src})`, // Set the background image using inline style
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1
          className={cn(
            "text-2xl font-bold text-white lg:text-5xl md:text-4xl space-x-2 my-4",
            h1Font.className
          )}
        >
          Why Tropical Pools <span className="text-blue-300"> ?</span>
        </h1>
        <div className="flex flex-wrap items-center justify-center w-full h-auto gap-8 p-4">
          {WhyTropicalCardData.map((card, index) => (
            <WhyTropicalCard
              key={index}
              title={card.title}
              image={card.image}
              description={card.description}
            />
          ))}

          {/* carousel */}
        </div>
      </div>
    </div>
  );
};

export default AboutComp;
