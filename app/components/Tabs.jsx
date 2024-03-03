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

// *---------------
// * data
// import { TabsData } from "@/lib/data";

const TabsComp = ({ TabsData, poolName }) => {
  return (
    <Tabs defaultValue="account" className="w-[90%] md:w-[80%] lg:w-[70%]">
      <TabsList className="flex flex-wrap items-center w-full h-auto text-center justify-evenly">
        <TabsTrigger value="specs">Pool Specification</TabsTrigger>
        <TabsTrigger value="3dimages">3D Images</TabsTrigger>
        {/* <TabsTrigger value="address">Address</TabsTrigger> */}
        <TabsTrigger value="others">Other Details</TabsTrigger>
        <TabsTrigger value="contact">Contact Us</TabsTrigger>
      </TabsList>
      <TabsContent value="specs">
        <Card className="py-6">
          <CardHeader>
            {TabsData.map((item, idx) => {
              return item.specs.map((spec, index) => {
                return (
                  <>
                    <CardTitle key={index} className="text-lg">
                      {spec.head}
                    </CardTitle>
                    {spec.description.map((description, index) => (
                      <>
                        <CardContent key={index} className="space-y-2">
                          <CardDescription>{description}</CardDescription>
                        </CardContent>
                      </>
                    ))}
                  </>
                );
              });
            })}
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="3dimages">
        <Card>
          <CanvasComp poolName={poolName} />
        </Card>
      </TabsContent>
      {/* <TabsContent value="address">
        <Card>
          <Map address="1600 Amphitheatre Parkway, Mountain View, CA" />
        </Card>
      </TabsContent> */}
      <TabsContent value="others">
        <Card className="py-6">
          <CardHeader>
            {TabsData.map((item, idx) => {
              return item.others.map((spec, index) => {
                return (
                  <>
                    <CardTitle key={index} className="text-lg">
                      {spec.head}
                    </CardTitle>
                    {spec.description.map((description, index) => (
                      <>
                        <CardContent key={index} className="space-y-2">
                          <CardDescription>{description}</CardDescription>
                        </CardContent>
                      </>
                    ))}
                  </>
                );
              });
            })}
          </CardHeader>
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
