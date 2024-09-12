import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <div className="flex w-full sm:items-center">
        <Skeleton className="h-14 w-1/2" />
      </div>

      <div className="mb-12 mt-11 flex w-full">
        <Skeleton className="h-14 w-full" />
      </div>

      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton key={item} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
