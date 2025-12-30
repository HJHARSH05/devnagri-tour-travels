import React, { useEffect, useState } from "react";
import useAdminHook from "../_hook/admin.hooks";

const Details = () => {
  const { fetchDetails } = useAdminHook();
  const [details, setDetails] = useState({
    users: 0,
    taxiBookings: 0,
    queries: 0,
    taxis: 0,
    bookings: 0,
  });

  useEffect(() => {
    const fetchDetailsAsync = async () => {
      const details = await fetchDetails();
      setDetails(details);
    };
    fetchDetailsAsync();
  }, [fetchDetails]);
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-red-400 font-mono">
          Details
        </h1>
      </div>
      <div className="flex px-5 md:justify-center overflow-x-auto w-[100%] gap-4  items-center py-2 details-container">
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl px-4 py-3 border-2 shadow-xl">
          <h5 className="text-lg md:text-xl font-bold text-center text-dark-200 font-mono">
            Users
          </h5>
          <h4 className="text-2xl md:text-3xl font-bold text-center text-red-400 font-mono">
            {details.users}
          </h4>
        </div>
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl px-4 py-3 border-2 shadow-xl ">
          <h5 className="text-lg md:text-xl font-bold text-center text-dark-200 font-mono">
            Bookings
          </h5>
          <h4 className="text-2xl md:text-3xl font-bold text-center text-red-400 font-mono">
            {details.bookings}
          </h4>
        </div>
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl px-4 py-3 border-2 shadow-xl ">
          <h5 className="text-lg md:text-xl font-bold text-center text-dark-200 font-mono">
            Queries
          </h5>
          <h4 className="text-2xl md:text-3xl font-bold text-center text-red-400 font-mono">
            {details.queries}
          </h4>
        </div>
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl px-4 py-3 border-2 shadow-xl ">
          <h5 className="text-lg md:text-xl font-bold text-center text-dark-200 font-mono text-nowrap">
            Taxi Bookings
          </h5>
          <h4 className="text-2xl md:text-3xl font-bold text-center text-red-400 font-mono">
            {details.taxiBookings}
          </h4>
        </div>
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl px-4 py-3 border-2 shadow-xl ">
          <h5 className="text-lg md:text-xl font-bold text-center text-dark-200 font-mono">
            Taxis
          </h5>
          <h4 className="text-2xl md:text-3xl font-bold text-center text-red-400 font-mono">
            {details.taxis}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Details;
