import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import CanvasComp from "./Canvas";
import Map from "./Map";

const TabsComp = () => {
  return (
    <Tabs defaultValue="account" className="w-[90%] md:w-[80%] lg:w-[70%]">
      <TabsList className="flex flex-wrap w-full h-auto justify-evenly items-center text-center">
        <TabsTrigger value="specs">Pool Specification</TabsTrigger>
        <TabsTrigger value="3dimages">3D Images</TabsTrigger>
        <TabsTrigger value="address">Address</TabsTrigger>
        <TabsTrigger value="others">Other Details</TabsTrigger>
        <TabsTrigger value="contact">Contact Us</TabsTrigger>
      </TabsList>
      <TabsContent value="specs">
        <Card className="py-6">
          <CardHeader>
            <CardTitle className="text-lg">
              {`The Ariella – A Petite Free Form Fiberglass Swimming Pool`}
            </CardTitle>
            <CardDescription>
              {`The Ariella is a petite, free-form swimming pool that fits snugly into any backyard with limited square footage. We love this fiberglass swimming pool because of its relaxed features and basic layout. San Juan Pools designed it to contain all of the standard elements that homeowners enjoy. From a shallow end bench, tanning ledge, standard hopper (deep end) & free form layout – it includes our popular features compacted into a small frame.`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <CardDescription>
              {`The Ariella works exceptionally well for those who live in urban environments with limited yard space. Why? Mainly it’s a petite size. Amazingly, this pool only takes up 179 SQFT with outside dimensions of 11′ width & 19′ 10″ length. Therefore, you could situate this design into small backyard spaces or place it strategically in a specific location of a larger backyard. However you situate this free form pool, you’ll enjoy its narrow footprint and ease of maintenance!`}
            </CardDescription>
          </CardContent>
          <CardContent className="space-y-2">
            <CardTitle className="text-lg">
              {`Wide Tanning Ledge & Shallow End Entry Steps`}
            </CardTitle>
            <CardDescription>
              {`Upon entering into the Ariella, you’re immediately greeted by a beautifully curved set of shallow end steps. These steps give way to a wide shallow end bench; this can also serve as a tanning ledge.`}
            </CardDescription>
          </CardContent>
          <CardContent className="space-y-2">
            <CardDescription>
              {`We decided to implement a curved set of shallow end steps. The main reason – it provides a lagoon-style layout that is both relaxing and aesthetically pleasing. You are free to pair this set of entry steps with a handrail if you’d like to boost the safety and accessibility of these steps.`}
            </CardDescription>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="3dimages">
        <Card>
          <CanvasComp />
          {/* <D3Images /> */}
        </Card>
      </TabsContent>
      <TabsContent value="address">
        <Card>
          <Map address="1600 Amphitheatre Parkway, Mountain View, CA" />
        </Card>
      </TabsContent>
      <TabsContent value="others">
        <Card className="py-6">
          <CardHeader>
            <CardTitle className="text-lg">
              {`4′ 11 Deep End and Deep End Bench`}
            </CardTitle>
            <CardDescription>
              {`Casting out into the deep end, the Ariella provides the user with a “shallow” deep end. Coming in at only 4′ 11″, it’s hard to even classify the hopper as a true deep end. However, the benefit of such a shallow space is the safety provided to the user. This fiberglass pool is a great option for homeowners who invite guests, have a guest house, renters, etc. In essence, this model provides a great swim space without the added liability of a deep end.`}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <CardTitle className="text-lg">
              {`The Features of The Ariella`}
            </CardTitle>
            <CardDescription>
              {`In conclusion, the Ariella is a very special member of our San Juan Pools family. We are very grateful for our small fiberglass pool category because of the wide breadth of consumers that fit this category. From urban homes to large backyards that want a smaller swimming pool; we can cater to a wide range of clientele.`}
            </CardDescription>
          </CardContent>
          <CardContent className="space-y-2">
            <CardDescription>
              {`This design includes a gorgeous curved set of entry steps and a tanning ledge. We kept the design of this fiberglass pool pretty simple and added a standard hopper with a maximum depth of 4′ 11″. Therefore, if you’re into entertaining, have grandchildren, or want some peace of mind; the “shallow” deep end may be a perfect choice for you. All in all, this is a wonderful pool model that has a lot to offer in its compact design. Contact us for a free estimate today!`}
            </CardDescription>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="contact">
        <Card className="py-6">
          <CardHeader>
            <CardTitle className="text-lg">{`Contact Us`}</CardTitle>
            <CardDescription>
              {`Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unk. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unk.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unk`}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="flex justify-start w-full h-auto gap-4 text-start">
              <FaLocationDot className="w-5 h-5 text-blue-500" />
              <p className="w-full text-xs">
                {"2195 Alamosa Drive Washington, UT 84780"}
              </p>
            </div>
            <div className="flex justify-start w-full h-auto gap-4 text-start">
              <FaPhone className="w-5 h-5 text-blue-500" />
              <p className="w-full text-xs">{"435-817-0782"}</p>
            </div>
            <div className="flex justify-start w-full h-auto gap-4 text-start">
              <MdEmail className="w-5 h-5 text-blue-500" />
              <p className="w-full text-xs">{"Contact@tropicalpools.com"}</p>
            </div>
            <div className="flex justify-start w-full h-auto gap-4 text-start">
              <IoIosTime className="w-5 h-5 text-blue-500" />
              <p className="w-full text-xs">
                {"Monday - Saturday 10:00 a.m. to 6:00 p.m."}
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabsComp;
