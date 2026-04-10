import { db } from '@/config'
import { Bookings, TaxiBooking, Users } from '@/config/schema'
import bcrypt from 'bcryptjs'
import { eq, or } from 'drizzle-orm'
import { toast } from 'sonner'

type bookTaxiType = {
    name: string,
    email: string,
    phoneNumber: string,
    taxi: string,
    source: string,
    destination: string,
    date: Date,
    price: number,
    selectedSeats?: number[]
}

type bookTourType = {
    name: string,
    email: string,
    phoneNumber: string,
    packageName: string,
    packageDays: number,
    people: number,
    startDate: Date,
    placeList?: string[]
}


const createUser = async (input: { email: string, name: string, mobile: string }) => {
    try {
        const UID = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash("12345678", 10);
        const user = await db.insert(Users).values({
            name: input.name,
            email: input.email,
            mobile: input.mobile,
            password: hashedPassword,
            id: UID
        }).returning({
            name: Users.name,
            email: Users.email,
            mobile: Users.mobile,
            id: Users.id
        });
        return user[0];
    } catch (error) {
        return null
    }
}

const fetchUser = async ({ email, mobile }: { email: string, mobile: string }) => {
    try {
        const extUser = await db.select({
            name: Users.name,
            email: Users.email,
            mobile: Users.mobile,
            id: Users.id
        }).from(Users).where(or(eq(Users.email, email), eq(Users.mobile, mobile))).limit(1);
        return extUser[0];
    } catch (error) {
        return null
    }

}

const useBookWithoutLogin = () => {
    const bookTour = async (input: bookTourType) => {
        try {
            if (!(input.name && input.email && input.phoneNumber && input.packageName && input.packageDays && input.people && input.startDate))
                return toast.error("All fields are required");

            if (!input.placeList || input.placeList.length === 0)
                return toast.error("Please select at least one place.");

            if (input.phoneNumber.length !== 10 || /^\d+$/.test(input.phoneNumber) === false)
                return toast.error("Please enter a valid phone number.");

            // now the main logic start
            const existingUser = await fetchUser({ email: input.email, mobile: input.phoneNumber });

            if (existingUser) {
                await db
                    .insert(Bookings)
                    .values({
                        user: existingUser.id,
                        bookingDate: new Date(),
                        startDate: input.startDate,
                        name: input.packageName,
                        price: 0,
                        people: input.people,
                        days: input.packageDays,
                        placeList: input.placeList?.join(", ")
                    } as any)
                    .returning().then((res) => {
                        if (res) {
                            toast.success("Booking successful");
                        }
                    }).catch((error) => {
                        toast.error("Something went wrong");
                    })
            }
            else {
                await createUser({
                    email: input.email,
                    name: input.name,
                    mobile: input.phoneNumber
                }).then(async (res) => {
                    if (res) {
                        await db.insert(Bookings).values({
                            user: res.id,
                            bookingDate: new Date(),
                            startDate: input.startDate,
                            name: input.packageName,
                            price: 0,
                            people: input.people,
                            days: input.packageDays,
                            placeList: input.placeList?.join(", ")
                        } as any).returning().then((res) => {
                            if (res) {
                                toast.success("Booking successful");
                            }
                        }).catch(() => {
                            toast.error("Something went wrong");
                        })
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    // taxi
    const bookTaxi = async (input: bookTaxiType) => {
        try {
            if (!(input.name && input.email && input.phoneNumber && input.taxi && input.source && input.destination && input.date && input.price))
                return toast.error("All fields are required");

            if (input.phoneNumber.length !== 10 || /^\d+$/.test(input.phoneNumber) === false)
                return toast.error("Please enter a valid phone number.");

            // now the main logic start
            const existingUser = await fetchUser({ email: input.email, mobile: input.phoneNumber });

            if (existingUser) {
                await db.insert(TaxiBooking).values({
                    bookingDate: new Date(),
                    date: new Date(input.date as any),
                    source: input.source,
                    destination: input.destination,
                    taxi: input.taxi,
                    price: input.price,
                    user: existingUser?.id,
                    bookedSeats: input.selectedSeats?.join(",")
                } as any).returning().then((res) => {
                    if (res) {
                        toast.success("Booking successful");
                    }
                }).catch((error) => {
                    toast.error("Something went wrong");
                })
            }
            else {
                await createUser({ email: input.email, name: input.name, mobile: input.phoneNumber }).then(async (res) => {
                    if (res) {
                        await db.insert(Bookings).values({
                            user: res.id,
                            bookingDate: new Date(),
                            startDate: input.date,
                            name: input.taxi,
                            price: input.price,
                            people: 1,
                            days: 1,
                            placeList: `${input.source} to ${input.destination}`
                        } as any).returning().then((res) => {
                            if (res) {
                                toast.success("Taxi Booked successful");
                            }
                        })
                    }
                }).catch((error) => {
                    toast.error("Something went wrong");
                })
            }
        } catch (error) {
            console.log(error)
        }

    }
    return { bookTaxi, bookTour }
}

export default useBookWithoutLogin