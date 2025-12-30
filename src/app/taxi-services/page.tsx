"use client";
import SearchTaxi from "@/app/taxi-services/_components/SearchTaxi";
import TaxiList from "@/app/taxi-services/_components/TaxiList";
import { routesByCity } from "@/constants/taxi-tours";
import { useState } from "react";

const TaxiServices = () => {
  const [taxiList, setTaxiList] = useState(routesByCity);
  return (
    <div className="p-4">
      <div className="flex justify-center">
        <h1 className="">Book a Taxi</h1>
      </div>
      <p className="text-center lg:text-lg font-medium my-4">
        Select your preferred vehicle type and choose our popular routes. All
        fares include tolls and driver charges.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-8 gradient-border">
        {/* Left section Search Taxi Input */}
        <SearchTaxi setTaxiList={setTaxiList} />

        {/* Right Section - Image Section*/}
      </div>
      {/* Taxi List */}
      <TaxiList taxiList={taxiList} />
    </div>
  );
};

export default TaxiServices;
