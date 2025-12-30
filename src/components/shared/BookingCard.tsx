"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useBookingHook from "@/hooks/booking.hooks";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user.store";
import { BookingInput } from "@/types";
import { CalendarIcon, Loader2, MinusCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface Props {
  PackageName: string;
  PackageDays: number;
  PackagePrice: number;
  PlaceList?: string[];
}

function BookingCard({ props }: { props: Props }) {
  const { user } = useUserStore();
  const [input, setInput] = useState<BookingInput>({
    PackageName: props.PackageName,
    PackageDays: props.PackageDays,
    PackagePrice: props.PackageDays * props.PackagePrice,
    people: 2,
    startDate: new Date(),
    PlaceList: props.PlaceList,
  });
  const [loading, setloading] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const router = useRouter();

  // change package price
  useEffect(() => {
    setInput((prev) => ({
      ...prev,
      PackagePrice: prev.people * props.PackagePrice,
    }));
  }, [input.people]);
  const { bookTour } = useBookingHook();

  // handle booking controller
  const handleBooking = async () => {
    setloading(true);
    try {
      await bookTour(input);
    } catch (error) {
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div className="w-full mt-5 border rounded-lg shadow-md p-4 md:sticky md:top-10">
        <h1 className="text-lg font-bold text-center font-serif my-2">
          {props.PackageName}
        </h1>
        <h4 className="text-xl mb-5 font-bold text-center font-serif border-b-2 my-2">
          {input.PackageDays} {input.PackageDays > 1 ? "days " : "day "}
        </h4>
        <div className="flex flex-col gap-6 mt-5">
          {/* Number of people */}
          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <Label className="text-xl font-bold sm:justify-center">
              People
            </Label>
            <div className="flex items-center gap-5 justify-center">
              <Button
                disabled={input.people <= 2}
                size={"icon"}
                variant={"ghost"}
                className="cursor-pointer"
                onClick={() => {
                  if (input.people <= 2) return;
                  setInput({ ...input, people: input.people - 1 });
                }}
              >
                <MinusCircle className="size-5" strokeWidth={2} />
              </Button>
              <span className="text-lg lg:text-xl font-bold border px-3.5 py-1 rounded-lg">
                {input.people}
              </span>
              <Button
                disabled={input.people >= 10}
                size={"icon"}
                variant={"ghost"}
                className="cursor-pointer"
                onClick={() => {
                  if (input.people >= 10) return;
                  setInput({ ...input, people: input.people + 1 });
                }}
              >
                <PlusCircle className="size-5" strokeWidth={2} />
              </Button>
            </div>
          </div>
          {/* Days */}
          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <Label className="text-xl font-bold sm:justify-center ">Days</Label>
            <div className="flex items-center gap-5 justify-center">
              <span className="text-lg lg:text-xl font-bold border px-3.5 py-1 rounded-lg">
                {props.PackageDays}
              </span>
            </div>
          </div>
          {/* Date Picker */}
          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
            <Label className="text-xl font-bold sm:justify-center">
              Start Date
            </Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start font-medium p-4 md:p-5",
                    !input.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="h-3 w-3" />
                  {input.startDate ? (
                    <span className="text-xs md:text-sm lg:text-base">
                      {new Date(input.startDate).toDateString()}
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-sm md:text-base">
                      Pick a date
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={input.startDate}
                  initialFocus
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  onSelect={(date) => {
                    if (date) {
                      setInput({ ...input, startDate: new Date(date) });
                      setIsCalendarOpen(false);
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* Price */}
          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
            <Label className="text-xl font-bold sm:justify-center">
              Price Starts from
            </Label>
            <span className="text-lg lg:text-xl font-bold border px-3.5 py-1 rounded-lg">
              ₹ {input.PackagePrice}
            </span>
          </div>

          {/* Button */}
          {user ? (
            <Button
              disabled={loading || !user}
              onClick={handleBooking}
              variant={"outline"}
              className="w-full text-white max-w-96 mx-auto bg-gradient-to-r from-green-500 via-emerald-500 to-emerald-600 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <span>Book Now</span>
              )}
            </Button>
          ) : (
            <>
              <Button
                variant={"outline"}
                className="w-full max-w-96 mx-auto bg-gradient-to-r from-green-500 via-emerald-500 to-emerald-600 cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
              <p className="text-center text-red-500 -mt-4">
                Please login to book your trip
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default BookingCard;
