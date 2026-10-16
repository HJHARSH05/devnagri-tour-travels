import { UserAvatar } from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaxiBookingsTypes } from "@/types";
import React, { useEffect, useState } from "react";
import useAdminHook from "../_hook/admin.hooks";
import StatusPopOver from "./StatusPopOver";
import TaxiInformation from "@/components/shared/TaxiInformation";

const TaxiBookingTable = () => {
  const [taxiBookings, settaxiBookings] = useState<TaxiBookingsTypes[]>([]);
  const { fetchTaxiBookings } = useAdminHook();
  const [offset, setoffset] = useState(1);

  const fetchTaxiBookingsAsync = async (offset: number) => {
    const taxiBookings = await fetchTaxiBookings(offset);
    settaxiBookings(taxiBookings);
  };
  useEffect(() => {
    fetchTaxiBookingsAsync(offset);
  }, [offset]);

  if (taxiBookings.length === 0)
    return <h5 className="text-center mt-10">No Bookings found</h5>;
  return (
    <div className="min-h-[calc(100vh-10rem)] w-full bg-gray-300/50  mb-5">
      <Table className="h-full">
        <TableHeader className="bg-gray-300 border-2 border-gray-400">
          <TableRow>
            <TableHead className="w-[30px] border-r-2 border-gray-400">
              Sr.no
            </TableHead>
            <TableHead className="border-r-2 border-gray-400">
              Booking Date
            </TableHead>
            <TableHead className="border-r-2 border-gray-400">
              Source - Destination
            </TableHead>
            <TableHead className="border-r-2 border-gray-400">Amount</TableHead>
            <TableHead className="text-center border-r-2 border-gray-400">
              User
            </TableHead>
            <TableHead className="text-center border-r-2 border-gray-400">
              Taxi
            </TableHead>
            <TableHead className="text-right">Verification</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="min-h-[calc(100vh-12rem)] border-2 border-gray-400">
          {taxiBookings.map((booking, index) => (
            <TableRow key={index} className="border-2 border-gray-400">
              <TableCell className="font-medium border-r-2 border-gray-400">
                {index + 1}
              </TableCell>
              <TableCell className="border-r-2 border-gray-400">
                {booking.bookingDate as string}
              </TableCell>
              <TableCell className="border-r-2 border-gray-400">
                {booking.source} - {booking.destination}
              </TableCell>
              <TableCell className="border-r-2 border-gray-400">
                {booking.price}
              </TableCell>
              <TableCell className="border-r-2 border-gray-400">
                <UserAvatar User={booking.user} />
              </TableCell>
              <TableCell className="border-r-2 border-gray-400">
                <TaxiInformation Taxi={booking.taxi} />
              </TableCell>
              <TableCell className="text-right border-r-2 border-gray-400">
                <StatusPopOver
                  fetchTaxiBookings={() => fetchTaxiBookingsAsync(offset)}
                  booking={booking}
                  db="taxi_bookings"
                  offset={offset}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption className="text-center mb-0 py-5">
          <div className="mt-5 flex items-center justify-between w-2/3 mx-auto">
            <Button
              className="cursor-pointer"
              variant={"outline"}
              disabled={offset == 1}
              onClick={() => {
                if (offset > 10) setoffset(offset - 10);
                else setoffset(1);
              }}
            >
              Previous
            </Button>
            A list of all the Bookings.
            <Button
              className="cursor-pointer"
              disabled={taxiBookings.length < 10}
              onClick={() => setoffset(offset + 10)}
            >
              Next
            </Button>
          </div>
        </TableCaption>
      </Table>
    </div>
  );
};

export default TaxiBookingTable;
