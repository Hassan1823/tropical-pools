import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loader = () => {
  return (
    <div className="w-full min-h-screen h-auto flex flex-col gap-6 justify-center items-center bg-slate-200/40">
      <Skeleton className="h-[50vh] w-[50vw] rounded-xl" />
      <div className="space-y-6">
        <Skeleton className="h-[5vh] w-[50vw]" />
        <Skeleton className="h-[5vh] w-[50vw]" />
      </div>
    </div>
  );
};

export default Loader;
