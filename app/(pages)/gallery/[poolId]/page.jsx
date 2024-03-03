import { Button } from "@/components/ui/button";
import {
  imagesPool,
  AriellaImages,
  BiloxiImages,
  CaesarsImages,
  CanyonImages,
  AtlanticImages,
  BroadwayImages,
  CocoaImages,
  CostaImages,
} from "@/lib/images";
import Link from "next/link";

// ! arrows import
import { FaArrowsAltH } from "react-icons/fa";
import { FaArrowsAltV } from "react-icons/fa";
import { GiCube } from "react-icons/gi";
import { CgFormatLineHeight } from "react-icons/cg";
import GetAQuote from "@/app/components/get-a-quote";
import TabsComp from "@/app/components/Tabs";
import SliderSwiper from "@/app/components/thumbnail";
import {
  TabsData,
  AriellaData,
  AtlanticData,
  BiloxiData,
  BroadwayData,
  CaesarsData,
  CanyonData,
  CocoaData,
  AriellaHeadline,
  AtlanticHeadline,
  BiloxiHeadline,
  BroadwayHeadline,
  CaesarsHeadline,
  CanyonHeadline,
  CocoaHeadline,
  OtherHeadline,
} from "@/lib/data";

const SinglePool = ({ params }) => {
  const poolName = decodeURIComponent(params.poolId);
  return (
    // ! main container
    <div className="w-full h-auto min-h-screen">
      {/* hero div */}
      <div className="flex flex-wrap items-start justify-center w-full h-auto border-b">
        {/* left div */}
        <div className="w-full h-auto md:w-1/2">
          <SliderSwiper
            data={
              poolName === "Ariella"
                ? AriellaImages
                : poolName === "Atlantic Deep"
                ? AtlanticImages
                : poolName === "Biloxi"
                ? BiloxiImages
                : poolName === "Broadway"
                ? BroadwayImages
                : poolName === "Caesars Palace Beach"
                ? CaesarsImages
                : poolName === "Canyon Lake"
                ? CanyonImages
                : poolName === "Cocoa Beach"
                ? CocoaImages
                : CostaImages
            }
          />
        </div>
        {/* right div */}
        <div className="flex flex-col items-start justify-center w-full h-auto gap-6 p-8 md:w-1/2">
          {/* links */}
          <div className="flex w-full gap-2 text-sm text-slate-500">
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
            {poolName === "Ariella"
              ? AriellaHeadline
              : poolName === "Atlantic Deep"
              ? AtlanticHeadline
              : poolName === "Biloxi"
              ? BiloxiHeadline
              : poolName === "Broadway"
              ? BroadwayHeadline
              : poolName === "Caesars Palace Beach"
              ? CaesarsHeadline
              : poolName === "Canyon Lake"
              ? CanyonHeadline
              : poolName === "Cocoa Beach"
              ? CocoaHeadline
              : OtherHeadline}
          </p>

          {/* size chart */}
          <div className="flex items-center justify-center w-full h-auto gap-1 py-4 text-center border-t border-b lg:gap-8 md:gap-4">
            {/* depth div */}
            <div className="w-[25%] h-auto flex flex-col justify-center items-center p-1 border-r gap-4">
              <span className="flex flex-wrap items-center justify-center w-full gap-2 text-base font-semibold text-center lg:text-lg">
                <FaArrowsAltV className="w-5 h-5 text-slate-500" /> Depth
              </span>
              <span className="text-sm text-slate-500 lg:text-base">{`4'11"`}</span>
            </div>
            {/* width div */}
            <div className="w-[25%] h-auto flex flex-col justify-center items-center p-1 border-r gap-4">
              <span className="flex flex-wrap items-center justify-center w-full gap-2 text-base font-semibold text-center lg:text-lg">
                <FaArrowsAltH className="w-5 h-5 text-slate-500" /> Width
              </span>
              <span className="text-sm text-slate-500 lg:text-base">{`21'0"`}</span>
            </div>
            {/* volume div */}
            <div className="w-[25%] h-auto flex flex-col justify-center items-center text-center p-1 border-r gap-4">
              <span className="flex flex-wrap items-center justify-center w-full gap-2 text-base font-semibold text-center lg:text-lg">
                <GiCube className="w-5 h-5 text-slate-500" /> Volume
              </span>
              <span className="text-sm text-slate-500 lg:text-base">{`4600 G"`}</span>
            </div>
            {/* length div */}
            <div className="w-[25%] h-auto flex flex-col justify-center items-center p-1 gap-4">
              <span className="flex flex-wrap items-center justify-center w-full gap-2 text-base font-semibold text-center lg:text-lg">
                <CgFormatLineHeight className="w-5 h-5 text-slate-500" /> Length
              </span>
              <span className="text-sm text-slate-500 lg:text-base">{`20'9"`}</span>
            </div>
          </div>
          <div className="my-1 lg:my-4 md:my-2">
            <GetAQuote btnLabel={"Get A Quote"} />
          </div>
        </div>
      </div>

      {/* specifications div */}
      <div className="flex items-center justify-center w-full h-auto py-8 border-t">
        <TabsComp
          TabsData={
            poolName === "Ariella"
              ? AriellaData
              : poolName === "Atlantic Deep"
              ? AtlanticData
              : poolName === "Biloxi"
              ? BiloxiData
              : poolName === "Broadway"
              ? BroadwayData
              : poolName === "Caesars Palace Beach"
              ? BroadwayData
              : poolName === "Canyon Lake"
              ? CanyonData
              : poolName === "Cocoa Beach"
              ? CocoaData
              : TabsData
          }
          poolName={poolName}
        />
      </div>
    </div>
  );
};

export default SinglePool;
