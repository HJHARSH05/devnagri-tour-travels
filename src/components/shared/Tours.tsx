import { TOURS } from "@/constants/packages";
import Link from "next/link";
import React from "react";
import { TourCard } from "./ToursCard";
import { Button } from "../ui/button";

const Tours = ({ isHome = false }: { isHome?: boolean }) => {
  const featuredTour = TOURS[0];
  const homeGridTours = TOURS.slice(1, 7);

  if (isHome) {
    return (
      <section className="main-section">
        <div className="w-full max-w-[1400px] rounded-3xl border border-slate-100 bg-gradient-to-b from-[#f4f7ff] via-white to-[#eef3ff] p-4 md:p-7 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="!text-3xl md:!text-4xl">Trending Tours</h2>
              <p className="mt-2 text-sm md:text-base text-slate-600 leading-7">
                Handpicked Uttarakhand journeys with spiritual destinations,
                mountain landscapes, and comfortable travel planning for
                families, couples, and groups.
              </p>
            </div>
            <Link href="/tours">
              <Button className="primary-button w-fit px-5">View All Tours</Button>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {featuredTour && (
              <div className="lg:col-span-2">
                <TourCard tour={featuredTour} />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              {homeGridTours.slice(0, 2).map((tour, index) => (
                <TourCard key={tour.__id ?? index} tour={tour} shrink />
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {homeGridTours.slice(2).map((tour, index) => (
              <TourCard key={tour.__id ?? index} tour={tour} shrink />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="gradient-border max-w-[1100px] w-full">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-bold">Tours</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {TOURS.map((tour, index) => (
          <TourCard key={tour.__id ?? index} tour={tour} shrink />
        ))}
      </div>
    </div>
  );
};

export default Tours;
