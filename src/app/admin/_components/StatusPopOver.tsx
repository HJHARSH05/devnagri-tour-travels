import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookingType, TaxiBookingsTypes } from "@/types";
import { CheckCircle, ChevronDown, Info, XCircle } from "lucide-react";
import useAdminHook from "../_hook/admin.hooks";
import { useState } from "react";

function StatusPopOver({
  booking,
  db,
  fetchBookings,
  fetchTaxiBookings,
  offset,
}: {
  booking: BookingType | TaxiBookingsTypes;
  db: "bookings" | "taxi_bookings";
  fetchBookings?: (offset: number) => Promise<void>;
  fetchTaxiBookings?: (offset: number) => Promise<void>;
  offset: number;
}) {
  const { verifyBooking } = useAdminHook();

  const handleStatusChange = async (
    newStatus: "approved" | "rejected" | "pending"
  ) => {
    const response = await verifyBooking(booking.id || 0, newStatus, db);
    if (response?.database === "bookings") fetchBookings?.(offset || 0);
    if (response?.database === "taxi_bookings") fetchTaxiBookings?.(offset);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          className={`cursor-pointer ${
            booking.status?.toLowerCase() === "pending"
              ? "bg-yellow-500 animate-bounce"
              : booking.status?.toLowerCase() === "approved"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {booking.status?.toUpperCase()}
          <ChevronDown />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2 bg-green-500 text-white font-medium"
          onClick={() => handleStatusChange("approved")}
        >
          <CheckCircle className="text-white" />
          Approve
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2 bg-yellow-500 text-white font-medium"
          onClick={() => handleStatusChange("pending")}
        >
          <Info className="text-white" />
          Pending
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 bg-red-500 text-white font-medium cursor-pointer"
          onClick={() => handleStatusChange("rejected")}
        >
          <XCircle className="text-white" />
          Reject
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default StatusPopOver;
