"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Mail, Phone, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useBookWithoutLogin from "@/hooks/bookWithoutLogin.hook";

type BookingContactInput = {
    name: string;
    email: string;
    phoneNumber: string;
};

type TourBookProps = {
    packageName: string;
    packageDays: number;
    people: number;
    startDate: Date;
    placeList?: string[];
};

type TaxiBookProps = {
    taxi: string;
    source: string;
    destination: string;
    date: Date;
    price: number;
    selectedSeats?: number[];
};

interface BookingDialogProps {
    tourBookProps?: TourBookProps;
    taxiBookProps?: TaxiBookProps;
}

const initialInput: BookingContactInput = {
    name:"",
    email: "",
    phoneNumber: "",
};

const BookingDialog = ({ taxiBookProps, tourBookProps }: BookingDialogProps) => {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [input, setInput] = useState<BookingContactInput>(initialInput);
    const { bookTour, bookTaxi } = useBookWithoutLogin();

    const resetForm = () => {
        setInput(initialInput);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidPhone = (phone: string) => {
        return /^[0-9+\-\s()]{8,15}$/.test(phone.trim());
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!input.email || !input.phoneNumber || !input.name) {
            toast.error("Please enter both email and phone number.");
            return;
        }

        if (!isValidEmail(input.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (!isValidPhone(input.phoneNumber)) {
            toast.error("Please enter a valid phone number.");
            return;
        }

        try {
            setIsSubmitting(true);

            const contactDetails = {
                email: input.email.trim(),
                phoneNumber: input.phoneNumber.trim(),
                name: input.name.trim(),
            };

            if (tourBookProps) {
                await bookTour({
                    ...tourBookProps,
                    ...contactDetails
                });
            }

            if (taxiBookProps) {
                await bookTaxi({
                    ...taxiBookProps,
                    ...contactDetails,
                });
            }

            resetForm();
            setOpen(false);

        } catch {
            toast.error("Something went wrong while submitting your details.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen);
                if (!nextOpen) {
                    resetForm();
                }
            }}
        >
            <DialogTrigger asChild>
                <Button className="w-full text-white max-w-96 mx-auto bg-gradient-to-r from-green-500 via-emerald-500 to-emerald-600 cursor-pointer">
                    Book Now
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-2">
                    <DialogTitle>Book Your Package</DialogTitle>
                    <DialogDescription>
                        Enter your email and phone number. Our team will connect with you to
                        confirm the booking details.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-6 pt-2">
                    <div className="space-y-2 w-full">
                        <Label htmlFor="name">Name</Label>
                        <div className="relative">
                            <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="name"
                                name="name"
                                type="name"
                                placeholder="John Doe"
                                value={input.name}
                                onChange={handleChange}
                                className="pl-9"
                                autoComplete="name"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2 w-full">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={input.email}
                                onChange={handleChange}
                                className="pl-9"
                                autoComplete="email"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2 w-full">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <div className="relative">
                            <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                placeholder="+91 98765 43210"
                                value={input.phoneNumber}
                                onChange={handleChange}
                                className="pl-9"
                                autoComplete="tel"
                                required
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-2">
                        <Button type="submit" className="primary-button w-full sm:w-auto" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full sm:w-auto"
                            onClick={() => {
                                setOpen(false);
                                resetForm();
                            }}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BookingDialog;