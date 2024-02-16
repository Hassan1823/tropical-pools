import SliderSwiper from "@/app/components/thumbnails/page";
import { Button } from "@/components/ui/button";
import { imagesPool } from "@/lib/images";
import Link from "next/link";

// ! arrows import
import { FaArrowsAltH } from "react-icons/fa";
import { FaArrowsAltV } from "react-icons/fa";
import { GiCube } from "react-icons/gi";
import { CgFormatLineHeight } from "react-icons/cg";
import GetAQuote from "@/app/components/get-a-quote";
import TabsComp from "@/app/components/Tabs";

const SinglePool = ({ params }) => {
  const poolName = decodeURIComponent(params.poolId);
  return (
    // ! main container
    <div className="w-full min-h-screen h-auto">
      {/* hero div */}
      <div className="w-full flex flex-wrap justify-center items-start border-b h-auto">
        {/* left div */}
        <div className="md:w-1/2 w-full h-auto">
          <SliderSwiper data={imagesPool} />
        </div>
        {/* right div */}
        <div className="md:w-1/2 w-full h-auto flex flex-col p-8 justify-center items-start gap-6">
          {/* links */}
          <div className="w-full flex text-sm gap-2 text-slate-500">
            <Link href={"/"} passHref>
              <Button variant="link" className="text-slate-500" size="small">
                Home
              </Button>
            </Link>
            /
            <Link href={"/gallery"} passHref>
              <Button variant="link" size="small" className="text-slate-500">
                Gallery
              </Button>
            </Link>
            /
            <Link href={""} passHref>
              <Button variant="link" size="small ">
                {poolName}
              </Button>
            </Link>
          </div>

          {/* titile */}
          <h1 className="text-3xl font-bold text-black lg:text-4xl">
            {poolName ? poolName : "No Product Name Available"}
          </h1>

          {/* description */}
          <p className="text-slate-500 text-base w-[80%]">
            {
              "The Ariella is a petite, free-form fiberglass swimming pool. We recommend this pool for homeowners who live in urban environments with small backyards. It’s also a great choice for swimmers who want to enjoy a shallow swimming pool."
            }
          </p>

          {/* size chart */}
          <div className="w-full h-auto flex justify-center items-center text-center lg:gap-8 md:gap-4 gap-1 border-t border-b py-4">
            {/* depth div */}
            <div className="w-[25%] h-auto flex flex-col justify-center items-center p-1 border-r gap-4">
              <span className="w-full flex flex-wrap justify-center items-center text-center gap-2 font-semibold lg:text-lg text-base">
                <FaArrowsAltV className="w-5 h-5 text-slate-500" /> Depth
              </span>
              <span className="text-slate-500 lg:text-base text-sm">{`4'11"`}</span>
            </div>
            {/* width div */}
            <div className="w-[25%] h-auto flex flex-col justify-center items-center p-1 border-r gap-4">
              <span className="w-full flex flex-wrap justify-center items-center text-center gap-2 font-semibold lg:text-lg text-base">
                <FaArrowsAltH className="w-5 h-5 text-slate-500" /> Width
              </span>
              <span className="text-slate-500 lg:text-base text-sm">{`21'0"`}</span>
            </div>
            {/* volume div */}
            <div className="w-[25%] h-auto flex flex-col justify-center items-center text-center p-1 border-r gap-4">
              <span className="w-full flex flex-wrap justify-center items-center text-center gap-2 font-semibold lg:text-lg text-base">
                <GiCube className="w-5 h-5 text-slate-500" /> Volume
              </span>
              <span className="text-slate-500 lg:text-base text-sm">{`4600 G"`}</span>
            </div>
            {/* length div */}
            <div className="w-[25%] h-auto flex flex-col justify-center items-center p-1 gap-4">
              <span className="w-full flex flex-wrap justify-center items-center text-center gap-2 font-semibold lg:text-lg text-base">
                <CgFormatLineHeight className="w-5 h-5 text-slate-500" /> Length
              </span>
              <span className="text-slate-500 lg:text-base text-sm">{`20'9"`}</span>
            </div>
          </div>
          <div className="lg:my-4 md:my-2 my-1">
            <GetAQuote btnLabel={"Get A Quote"} />
          </div>
        </div>
      </div>

      {/* specifications div */}
      <div className="w-full h-auto py-8 border-t flex justify-center items-center">
        <TabsComp />
      </div>
    </div>
  );
};

export default SinglePool;
