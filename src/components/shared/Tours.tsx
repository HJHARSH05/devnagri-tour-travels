import { TOURS } from "@/constants/packages";
import React from "react";
import { TourCard } from "./ToursCard";

const Tours = () => {
  return (
    <div className="gradient-border max-w-[1000px]">
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Tours</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {TOURS.map((tour, index) => (
          <TourCard key={tour.__id ?? index} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default Tours;
