"use client";
import useBookingHook from "@/hooks/booking.hooks";
import { TaxiBookingsTypes } from "@/types";
import React, { useEffect, useState } from "react";
import TaxiBookingCard from "./TaxiCard";

const TaxiBookings = () => {
  const { getAllTaxiBookings } = useBookingHook();
  const [bookings, setBookings] = useState<TaxiBookingsTypes[]>([]);
  useEffect(() => {
    const fetchBookingsAsync = async () => {
      const fetchedTaxiBookings = await getAllTaxiBookings();
      if ("error" in fetchedTaxiBookings) return;
      setBookings(fetchedTaxiBookings);
    };
    fetchBookingsAsync();
  }, []);
  if (bookings.length === 0)
    return <h5 className="text-center mt-10">No Bookings found</h5>;
  return (
    <div className="gradient-border">
      <div className="flex justify-center mb-5">
        <h1>Taxi Bookings</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {bookings.map((item, index) => (
          <TaxiBookingCard key={index} pack={item} />
        ))}
      </div>
    </div>
  );
};

export default TaxiBookings;
