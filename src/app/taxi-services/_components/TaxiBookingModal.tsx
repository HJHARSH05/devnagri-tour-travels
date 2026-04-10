import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useBookingHook from "@/hooks/booking.hooks";
import { TaxiBookingInput, TaxiTypes } from "@/types";
import { useUserStore } from "@/store/user.store";
import BookingDialog from "@/components/shared/BookingDialog";
const TaxiBookingModal = ({
  children,
  destination,
  source,
  price,
}: {
  children: React.ReactNode;
  source: string;
  destination: string;
  price: number;
}) => {
  const [input, setinput] = useState<TaxiBookingInput>({
    date: new Date(),
    source: source,
    destination: destination,
    price: price,
    taxi: "",
    selectedSeats: [],
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showList, setShowList] = useState(false);
  const { getAllTaxis, bookTaxi, getBookedSeats } = useBookingHook();
  const { user } = useUserStore();

  const [TaxiList, setTaxiList] = useState<TaxiTypes[]>([]);
  const [bookedMap, setBookedMap] = useState<Record<string, string[]>>({});
  const [selectedSeatsMap, setSelectedSeatsMap] = useState<Record<string, number[]>>({});
  //   search taxi
  const handleSearchTaxi = async () => {
    setShowList(true);
    const response = await getAllTaxis(input.date.toISOString().split('T')[0]);
    if (!("error" in response)) {
      setTaxiList(response);
      const map: Record<string, string[]> = {};
      await Promise.all(
        response.map(async (t: TaxiTypes) => {
          try {
            const seats = await getBookedSeats(t.id as string, input.date);
            map[t.id as string] = seats || [];
          } catch (e) {
            map[t.id as string] = [];
          }
        })
      );
      setBookedMap(map);
    }
  };
  //   handle booking
  const handleBooking = async (taxi: string) => {
    const selected = selectedSeatsMap[taxi] || [];
    if (selected.length === 0) return toast.error("Please select at least one seat");
    await bookTaxi({ ...input, taxi: taxi, selectedSeats: selected });
  };

  const toggleSeat = (taxiId: string, seatNo: number) => {
    const booked = bookedMap[taxiId] || [];
    if (booked.includes(String(seatNo))) return;
    const selected = selectedSeatsMap[taxiId] || [];
    let next: number[] = [];
    if (selected.includes(seatNo)) next = selected.filter((s) => s !== seatNo);
    else next = [...selected, seatNo];
    setSelectedSeatsMap({ ...selectedSeatsMap, [taxiId]: next });
    setinput({ ...input, selectedSeats: next });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="gradient-border">
        <DialogHeader>
          <DialogTitle className="text-gradient">
            {source} - {destination}
          </DialogTitle>
          <DialogDescription>
            Fill basic details to book a taxi
          </DialogDescription>
          <div className="flex flex-col gap-2">
            <Label>Date</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start font-medium p-4 md:p-5 gradient-div",
                    !input.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {input.date ? (
                    <span>{new Date(input.date).toLocaleDateString()}</span>
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={input.date ? new Date(input.date) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      setinput({
                        ...input,
                        date: date, // The 'date' from onSelect is already a Date object
                      });
                      // 2. Explicitly close the popover after a date is selected
                      setIsCalendarOpen(false);
                    }
                  }}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  } // Disable past dates correctly
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <DialogFooter>
              <Button
                className="mt-4 primary-button"
                onClick={handleSearchTaxi}
              >
                Search
              </Button>
            </DialogFooter>
          </div>
          {showList ? (
            TaxiList.length > 0 ? (
              <div className="flex flex-col gap-2 max-h-[50%] my-5">
                <div className="flex items-center justify-center relative">
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="absolute right-0 top-0"
                    onClick={() => {
                      setShowList(false);
                      setTaxiList([]);
                    }}
                  >
                    <X />
                  </Button>
                  <h2 className="text-xl font-bold">Taxi List</h2>
                </div>
                <div className="flex flex-col gap-4  overflow-auto details-container">
                  {TaxiList.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border-2 border-gray-300 rounded-lg shadow-xl"
                    >
                      <div className="flex items-center flex-col sm:flex-row justify-between">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-1 text-sm font-medium">
                            {item.vehicleNumber}
                          </span>
                          <span className="flex items-center gap-1 text-sm font-medium">
                            {item.driverPhoneNumber}
                          </span>
                          <span className="flex items-center gap-1 text-sm font-medium">
                            {item.seats}
                          </span>
                          <span className="flex items-center gap-1 text-sm font-medium">
                            {item.model}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 items-center justify-center max-sm:mt-4">
                        <div className="flex flex-col mx-auto">
                          <h4 className="font-bold text-xl text-gradient">
                            ₹{price}
                          </h4>
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                          <div className="grid grid-cols-5 gap-2 my-2">
                            {Array.from({ length: item.seats as number }, (_, i) => i + 1).map((s) => {
                              const isBooked = (bookedMap[item.id as string] || []).includes(String(s));
                              const isSelected = (selectedSeatsMap[item.id as string] || []).includes(s);
                              return (
                                <button
                                  key={s}
                                  onClick={() => toggleSeat(item.id as string, s)}
                                  disabled={isBooked}
                                  className={`w-8 h-8 rounded ${isBooked ? 'bg-red-400 cursor-not-allowed' : isSelected ? 'bg-green-400' : 'bg-gray-200'} flex items-center justify-center text-sm`}
                                >
                                  {s}
                                </button>
                              );
                            })}
                          </div>
                          {
                            user ? (
                              <Button
                                size="sm"
                                className="primary-button sm:w-fit"
                                onClick={() => handleBooking(item.id as string)}
                              >
                                Book Selected Seats
                              </Button>

                            ) : (
                              <BookingDialog taxiBookProps={{
                                taxi: item.id as string,
                                date: input.date,
                                source: input.source,
                                destination: input.destination,
                                price: input.price,
                                selectedSeats: input.selectedSeats,
                              }} />
                            )
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 max-h-[50%] my-5">
                <div className="flex items-center justify-center relative">
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="absolute right-0 top-0"
                    onClick={() => {
                      setShowList(false);
                    }}
                  >
                    <X />
                  </Button>
                  <h2 className="text-xl font-bold">No Taxi Available</h2>
                </div>
              </div>
            )
          ) : null}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TaxiBookingModal;
