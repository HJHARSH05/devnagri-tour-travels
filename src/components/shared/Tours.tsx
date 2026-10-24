"use client";

import { TOURS } from "@/constants/packages";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { TourCard } from "./ToursCard";
import { Button } from "../ui/button";

const Tours = ({ isHome = false }: { isHome?: boolean }) => {
  const [activeGroupId, setActiveGroupId] = useState("adi-kailash");
  const adiKailashTours = TOURS.filter((tour) =>
    tour.name.toLowerCase().includes("adi kailash")
  );
  const darmaValleyTours = TOURS.filter((tour) =>
    tour.name.toLowerCase().includes("darma valley")
  );
  const munsiyariTours = TOURS.filter((tour) =>
    tour.name.toLowerCase().includes("munsiyari")
  ).filter((tour) => !adiKailashTours.includes(tour));
  const kumaunDarshanTours = TOURS.filter((tour) =>
    tour.name.toLowerCase().includes("kumaun darshan")
  );
  const groupedTourIds = new Set([
    ...adiKailashTours,
    ...darmaValleyTours,
    ...munsiyariTours,
    ...kumaunDarshanTours,
  ].map((tour) => tour.__id));
  const otherTours = TOURS.filter((tour) => !groupedTourIds.has(tour.__id));

  if (isHome) {
    const availableTours = TOURS.slice(0, 8);
    const tourGroups = [
      { id: "adi-kailash", title: "Adi Kailash Tours", tours: adiKailashTours },
      { id: "darma-valley", title: "Darma Valley Tours", tours: darmaValleyTours },
      { id: "munsiyari", title: "Munsiyari Tours", tours: munsiyariTours },
      { id: "kumaun-darshan", title: "Kumaun Darshan", tours: kumaunDarshanTours },
      { id: "other", title: "Other Tours", tours: otherTours },
    ];
    const activeGroup =
      tourGroups.find((group) => group.id === activeGroupId) ?? tourGroups[0];

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

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {tourGroups.map((group) => {
              const isActive = group.id === activeGroupId;
              const image = group.tours[0]?.images?.[0] ?? "/Landing-1.jpg";

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveGroupId(group.id)}
                  aria-pressed={isActive}
                  className={`flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border p-4 text-center transition ${isActive
                    ? "border-slate-900 bg-slate-900 text-white shadow-md"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:shadow-sm"
                    }`}
                >
                  <span className="relative size-28 shrink-0 overflow-hidden rounded-full border-2 border-white bg-slate-100 shadow-sm">
                    <Image
                      src={image}
                      alt={`${group.title} destination`}
                      fill
                      sizes="112px"
                      className="object-cover object-center"
                    />
                  </span>
                  <span className="text-sm font-semibold leading-tight">
                    {group.title.replace(" Tours", "")}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activeGroup.tours.map((tour) => (
              <TourCard key={tour.__id} tour={tour} shrink />
            ))}
          </div>
        </div>

        <section className="mt-10 w-full max-w-[1400px]">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="!text-3xl md:!text-4xl">Available Tours</h2>
              <p className="mt-2 text-sm text-slate-600 md:text-base">
                Explore 8 popular tour packages available on our platform.
              </p>
            </div>
            <Link href="/tours">
              <Button variant="outline" className="w-fit">
                Browse All Tours
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {availableTours.map((tour) => (
              <TourCard key={tour.__id} tour={tour} shrink />
            ))}
          </div>
        </section>
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
