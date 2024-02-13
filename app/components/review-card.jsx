import {
      Card,
      CardContent,
      CardHeader,
      CardTitle
} from "@/components/ui/card";
import Image from "next/image";
import StarRating from "./StarRating";

const ReviewCard = ({data}) => {
  return (
    <Card className="h-auto w-80 ">
      <CardHeader className="flex flex-row items-center justify-center w-full h-auto gap-5 text-center">
        <Image
          src={data.src}
          alt="logo"
          width={50}
          height={50}
          className="object-contain duration-300 rounded-full shadow-lg cursor-pointer hover:scale-110"
        />
        <div className="flex flex-col">
          <CardTitle className="text-lg">{data.name}</CardTitle>
          <CardContent>
            <StarRating reviewCount={data.reviewCount} />
          </CardContent>
        </div>
      </CardHeader>
      {/* <CardFooter> */}
      <CardContent className="text-sm text-center">
        {data.review}
      </CardContent>
      {/* </CardFooter> */}
    </Card>
  );
};

export default ReviewCard;