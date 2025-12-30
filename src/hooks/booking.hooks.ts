import { db } from "@/config";
import { Bookings, Queries, TaxiBooking, Taxis, Users } from "@/config/schema";
import { useUserStore } from "@/store/user.store";
import { BookingInput, QueryInputType, TaxiBookingInput } from "@/types";
import { and, desc, eq, inArray, notInArray } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useBookingHook = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const bookTour = async (input: BookingInput) => {
    try {
      // checking all things are not null
      if (
        !input.PackageName ||
        !input.PackageDays ||
        !input.PackagePrice ||
        !input.people ||
        !input.startDate
      ) {
        toast.error("All fields are required");
        return;
      }
      if (!user) return toast.error("User not found");

      const response = await db
        .insert(Bookings)
        .values({
          user: user?.id,
          bookingDate: new Date(),
          startDate: input.startDate,
          name: input.PackageName,
          price: input.PackagePrice,
          people: input.people,
          days: input.PackageDays,
          placeList: input.PlaceList?.join(", ")
        } as any)
        .returning();

      if (response) {
        toast.success("Booking Successfull....");
        router.push("/bookings");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const bookTaxi = async (input: TaxiBookingInput) => {
    try {
      if (
        !input.taxi ||
        !input.source ||
        !input.destination ||
        !input.date ||
        !input.price
      ) {
        toast.error("All fields are required");
        return;
      }
      if (!user) return toast.error("User not found");

      const baseValues: any = {
        bookingDate: new Date(),
        date: new Date(input.date as any),
        source: input.source,
        destination: input.destination,
        taxi: input.taxi,
        price: input.price,
        user: user?.id,
      };

      if (input.selectedSeats && input.selectedSeats.length > 0) {
        baseValues.bookedSeats = input.selectedSeats.join(",");
      }

      try {
        const response = await db.insert(TaxiBooking).values(baseValues as any).returning();
        if (response) {
          toast.success("Taxi Booked Successfully");
          router.push("/bookings");
        }
        return;
      } catch (err: any) {
        // If DB doesn't have the BookedSeats column, retry without it and notify the developer/user
        const cause = (err as any)?.cause || (err as any);
        const msg = (err as any)?.message || String(err);
        if (cause && (cause.code === "42703" || msg.includes("BookedSeats"))) {
          try {
            const fallback = { ...baseValues };
            delete fallback.bookedSeats;
            const response2 = await db.insert(TaxiBooking).values(fallback as any).returning();
            if (response2) {
              toast.success("Taxi Booked (seat data not saved)");
              toast.warning("Database missing 'BookedSeats' column — run migration to persist seat selections.");
              router.push("/bookings");
            }
            return;
          } catch (err2) {
            console.error("Fallback insert also failed", err2);
            toast.error("Booking failed — please check server logs");
            return;
          }
        }
        console.error(err);
        toast.error(msg || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      const msg = (error as any)?.message || String(error);
      toast.error(msg || "Something went wrong");
    }
  };
  const getAllTourBookings = async () => {
    try {
      if (!user) return { error: "User not found" };
      const fetchedBookings = await db
        .select({
          id: Bookings.id,
          date: Bookings.bookingDate,
          startDate: Bookings.startDate,
          people: Bookings.people,
          days: Bookings.days,
          price: Bookings.price,
          placeList: Bookings.placeList,
          name: Bookings.name,
          status: Bookings.status,
          user: {
            name: Users.name,
            id: Users.id,
            email: Users.email,
          },
        })
        .from(Bookings)
        .fullJoin(Users, eq(Users.id, Bookings.user))
        .where(eq(Bookings.user, user.id))
        .orderBy(desc(Bookings.id));

      return fetchedBookings;
    } catch (error) {
      return { error: "Something went wrong" };
    }
  };
  const getAllTaxiBookings = async () => {
    try {
      if (!user) return { error: "User not found" };
      const response = await db
        .select({
          id: TaxiBooking.id,
          date: TaxiBooking.date,
          source: TaxiBooking.source,
          destination: TaxiBooking.destination,
          price: TaxiBooking.price,
          bookingDate: TaxiBooking.bookingDate,
          status: TaxiBooking.status,
          user: {
            name: Users.name,
            id: Users.id,
            email: Users.email,
          },
          taxi: {
            id: Taxis.id,
            seats: Taxis.seats,
            model: Taxis.model,
            vehicleNumber: Taxis.vehicleNumber,
            driver: Taxis.driver,
            driverPhoneNumber: Taxis.driverPhoneNumber,
          },
        })
        .from(TaxiBooking)
        .rightJoin(Users, eq(Users.id, TaxiBooking.user))
        .rightJoin(Taxis, eq(Taxis.id, TaxiBooking.taxi))
        .where(eq(TaxiBooking.user, user.id))
        .orderBy(desc(TaxiBooking.id));
      return response;
    } catch (error) {
      return { error: "Something went wrong" };
    }
  };
  // get all taxis available for the given Date
  const getAllTaxis = async (date: string) => {
    try {
      if (!user) return { error: "User not found" };
      // For seat-level booking we return all taxis and the UI will fetch booked seats per taxi
      const taxis = await db
        .select({
          id: Taxis.id,
          model: Taxis.model,
          seats: Taxis.seats,
          vehicleNumber: Taxis.vehicleNumber,
          driver: Taxis.driver,
          driverPhoneNumber: Taxis.driverPhoneNumber,
        })
        .from(Taxis);

      return taxis;
    } catch (error) {
      return { error: "Something went wrong" };
    }
  };
  // get booked seats for a taxi on a particular date
  const getBookedSeats = async (taxiId: string, date: string | Date) => {
    try {
      const dateObj = date instanceof Date ? date : new Date(date as any);
      const dateString = dateObj.toISOString().split('T')[0];
      const rows = await db
        .select({ bookedSeats: TaxiBooking.bookedSeats })
        .from(TaxiBooking)
        .where(and(eq(TaxiBooking.taxi, taxiId), eq(TaxiBooking.date, dateString), inArray(TaxiBooking.status, ["approved","pending","rejected"])));

      // collect bookedSeats values and flatten
      const seats: string[] = [];
      rows.forEach((r: any) => {
        if (r.bookedSeats) {
          const parts = (r.bookedSeats as string).split(",").map((s) => s.trim()).filter(Boolean);
          seats.push(...parts);
        }
      });
      // dedupe
      const unique = Array.from(new Set(seats));
      return unique;
    } catch (error) {
      console.error("getBookedSeats error", error);
      return [];
    }
  };
  // send query
  const sendQuery = async (input: QueryInputType) => {
    try {
      if (!input.message || !input.email || !input.name) {
        toast.error("All fields are required");
        return;
      }
      const response = await db
        .insert(Queries)
        .values({
          name: input.name,
          email: input.email,
          message: input.message,
        } as any)
        .returning();
      if (response) {
        toast.success("Query sent successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return {
    bookTour,
    bookTaxi,
    getAllTourBookings,
    getAllTaxiBookings,
    getAllTaxis,
    sendQuery,
  };
};

export default useBookingHook;
