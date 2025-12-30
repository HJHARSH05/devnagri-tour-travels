import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonGroup = () => {
  return (
    <div className="flex gap-2 animate-bounce items-center">
      <Skeleton className="rounded-full size-20" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 rounded-lg w-40" />
        <Skeleton className="h-4 rounded-lg w-40" />
        <Skeleton className="h-4 rounded-lg w-40" />
      </div>
    </div>
  );
};

export default SkeletonGroup;
