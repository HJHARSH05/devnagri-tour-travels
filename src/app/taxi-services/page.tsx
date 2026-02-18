"use client";
import SearchTaxi from "@/app/taxi-services/_components/SearchTaxi";
import TaxiList from "@/app/taxi-services/_components/TaxiList";
import { routesByCity } from "@/constants/taxi-tours";
import { CarTaxiFront, Clock3, ShieldCheck } from "lucide-react";
import { useState } from "react";

const TaxiServices = () => {
  const [taxiList, setTaxiList] = useState(routesByCity);
  const totalRoutes = routesByCity.reduce(
    (count, city) => count + city.routes.length,
    0
  );

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8 animate-fade-in">
      <div className="gradient-border max-w-6xl mb-8 animate-fade-up">
        <div className="flex items-center justify-center">
          <h1>Book a Taxi</h1>
        </div>
        <p className="text-center lg:text-lg font-medium my-4 text-dark-200">
          Select your preferred vehicle type and choose our popular routes. All
          fares include tolls and driver charges.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <div className="gradient-div flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5">
            <CarTaxiFront className="size-5 text-primary" />
            <div>
              <p className="text-xs text-dark-200">Vehicles</p>
              <p className="font-semibold">Verified Fleet</p>
            </div>
          </div>
          <div className="gradient-div flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5">
            <Clock3 className="size-5 text-primary" />
            <div>
              <p className="text-xs text-dark-200">Coverage</p>
              <p className="font-semibold">{totalRoutes}+ popular routes</p>
            </div>
          </div>
          <div className="gradient-div flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5">
            <ShieldCheck className="size-5 text-primary" />
            <div>
              <p className="text-xs text-dark-200">Included</p>
              <p className="font-semibold">Toll + Driver charge</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:p-8 gradient-border max-w-6xl animate-fade-up-delay">
        {/* Left section Search Taxi Input */}
        <SearchTaxi setTaxiList={setTaxiList} />

        {/* Right Section - Image Section*/}
        <div className="hidden lg:flex flex-col justify-center gradient-div min-h-[230px] relative overflow-hidden">
          <div className="absolute -right-8 -top-8 size-36 rounded-full bg-primary/10 animate-float-soft" />
          <div className="absolute -left-10 -bottom-10 size-44 rounded-full bg-primary/10 animate-float-soft-delay" />
          <div className="relative z-10 px-4">
            <h5 className="!text-left">Ride smarter, travel safer</h5>
            <p className="text-sm text-dark-200 mt-2 leading-6">
              Compare route options instantly, view fare ranges, and book your
              seats in just a few clicks.
            </p>
          </div>
        </div>
      </div>

      {/* Taxi List */}
      <TaxiList taxiList={taxiList} />
    </div>
  );
};

export default TaxiServices;
