import Heading from "@/utils/Heading";
import Hero from "./components/Hero";
import AboutComp from "./components/About";
import PoolCard from "./components/pool-card";
import CustomerReview from "./components/customer-review";

export default function Hom () {
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
        <PoolCard />
        <CustomerReview />
      </div>
    </>
  );
}
