import { cn } from "@/lib/utils";
import { AboutPointsData } from "@/lib/data";
import { Permanent_Marker } from "next/font/google";
const h1Font = Permanent_Marker({
  weight: ["400"],
  subsets: ["latin"],
});
const AboutPage = () => {
  return (
    <div className="w-full h-auto min-h-screen text-white">
      <div className="w-full min-h-[70vh] h-auto bg-about-bg bg-cover space-y-6 flex flex-col justify-center items-center text-center">
        <h1
          className={cn(
            "flex flex-wrap gap-2 text-4xl font-semibold lg:text-6xl md:text-5xl font-marker",
            h1Font.className
          )}
        >
          Topical
          <span className="text-blue-300">Pools</span>
        </h1>

        <p className="w-full px-8 text-lg md:text-2xl lg:text-3xl">
          With over <b className="text-blue-300">10 years</b>
          {
            " of experience, quality, and integrity is the difference that sets us apart from others."
          }
        </p>
      </div>

      <h1 className="w-full my-8 text-3xl font-bold text-center text-black lg:text-4xl">
        About Us
      </h1>

      <div className="w-full min-h-[70vh] py-8 h-auto bg-about-bg bg-cover flex flex-wrap justify-evenly items-center text-center">
        {/* left div */}
        <div className="w-full md:w-[45%] h-auto flex flex-col justify-evenly items-center gap-8">
          <h1
            className={cn(
              " text-4xl font-semibold lg:text-6xl md:text-5xl font-marker",
              h1Font.className
            )}
          >
            Topical <span className="text-blue-300">Pools</span>
          </h1>
          <p className="w-full px-8 text-xl md:text-2xl lg:text-3xl ">
            {
              "Tropical Pools is one of such company that can satisfy all of the above criteria and more. Come in now and see what we can do for you."
            }
          </p>
        </div>
        {/* right div */}
        <div className="flex items-center justify-center w-full h-auto p-4 md:w-1/2">
          <div className="w-auto h-auto p-4 border border-blue-300 rounded-md bg-slate-400/30">
            {AboutPointsData.map((item, index) => (
              <>
                <p
                  key={index}
                  className="flex w-full gap-4 text-lg md:text-xl lg:text-2xl"
                >
                  <b className="text-blue-400">{item.number}</b> {item.headline}
                </p>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
