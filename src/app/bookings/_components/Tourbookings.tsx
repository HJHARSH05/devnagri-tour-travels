"use client";
import useBookingHook from "@/hooks/booking.hooks";
import { BookingType } from "@/types";
import React, { useEffect, useState } from "react";
import BookedTourCard from "./TourCard";

const Tourbookings = () => {
  const { getAllTourBookings } = useBookingHook();
  const [bookings, setBookings] = useState<BookingType[]>([]);
  useEffect(() => {
    const fetchBookingsAsync = async () => {
      const fetchedBookings = await getAllTourBookings();
      if ("error" in fetchedBookings) return;
      setBookings(fetchedBookings);
    };
    fetchBookingsAsync();
  }, []);
  if (bookings.length === 0)
    return <h5 className="text-center mt-10">No Bookings found</h5>;
  return (
    <div className="gradient-border">
      <div className="flex justify-center mb-5">
        <h1>Tours</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
        {bookings.map((item, index) => (
          <BookedTourCard key={index} pack={item} />
        ))}
      </div>
    </div>
  );
};

export default Tourbookings;
