import Heading from "@/utils/Heading";
import Hero from "./components/Hero";
import AboutComp from "./components/About";

export default function Home() {
  return (
    <>
      <div className="w-full h-auto ">
        <Heading
          title={"Tropical Pools"}
          description={"The Project By Abdullah"}
          keywords={"tropical pools"}
        />
        <Hero />
        <AboutComp />
      </div>
    </>
  );
}
