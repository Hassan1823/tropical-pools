import { ReviewData } from "@/lib/data";
import ReviewCard from "./review-card";


const CustomerReview = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto p-8 text-center">
      <h1 className="text-3xl font-bold text-black lg:text-4xl">
        {"Customer's Review"}
      </h1>
      <div className="flex flex-wrap items-center justify-center w-full h-auto gap-4 p-4 text-center lg:p-8">
        {ReviewData.slice(0, 6).map((card, index) => (
          <ReviewCard key={index} data={card} />
        ))}
      </div>

      {/* <Link href={""} passHref>
        <Button variant="default" size="lg">
          More Reviews
        </Button>
      </Link> */}
    </div>
  );
};

export default CustomerReview;
