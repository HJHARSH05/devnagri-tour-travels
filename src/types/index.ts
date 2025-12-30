export type User = {
  id: string;
  name: string;
  email: string;
};

export type SignupInput = {
  name: string;
  email: string;
  password: string;
};

export type QueryInputType = {
  message: string;
  email: string;
  name: string;
}

export type LoginInput = {
  email: string;
  password: string;
};

export type BookingType = {
  id: number | null;
  name: string | null;
  user: User | null;
  date: Date | string | null;
  startDate: Date | string | null;
  price: number | null;
  people: number | null;
  days: number | null;
  placeList: string | null;
  status: "pending" | "approved" | "rejected" | null;
};

export type TaxiBookingsTypes = {
  id: number | null;
  user: User | null;
  taxi: TaxiTypes | null;
  price: number | null;
  source: string | null;
  destination: string | null;
  date: Date | string | null;
  bookingDate: Date | string | null;
  status: "pending" | "approved" | "rejected" | null;
  bookedSeats?: string[] | null;
};

export type TaxiTypes = {
  id: string | null;
  model: string | null;
  seats: number | null;
  vehicleNumber: string | null;
  driver: string | null;
  driverPhoneNumber: string | null;
};

export type TaxiInputType = {
  id: string;
  model: string;
  seats: number;
  vehicleNumber: string;
  driver: string;
  driverPhoneNumber: string;
};

export type QueriesTypes = {
  id: number;
  name: string;
  email: string;
  message: string;
};

export type Itinerary = {
  name?: string;
  description?: string;
};

/**
 * Interface for a single day's plan within the tour itinerary.
 */
interface ItineraryDay {
  day: number;
  title: string;
  details: string[];
  inclusions?: string;
  night_stay?: string;
  distance?: string; // Optional field for distance covered
  duration?: string; // Optional field for travel duration
}

/**
 * Interface for the pricing structure, accommodating different plans.
 */
interface Price {
  standard_plan: number | string;
  deluxe_plan: number | string;
}

/**
 * Interface for the tour operator's contact information.
 */
interface TourOperator {
  name: string;
  contact_number: string;
  website: string;
  email: string;
}

/**
 * Interface for the terms and conditions, with optional fields
 * as they can vary between different tour packages.
 */
interface TermsAndConditions {
  payment?: string;
  identification?: string;
  booking?: string;
  refunds?: string;
  luggage?: string;
  punctuality?: string;
  vehicle_ac?: string;
  conduct?: string;
  liability?: string;
  itinerary_changes?: string;
}

/**
 * The main interface representing the entire tour package data structure.
 * This can be used to type the JSON object for your web application.
 */
export type TourPackage = {
  __id: string;
  name: string;
  overview: string;
  description: string; // This field contains HTML content for direct rendering.
  itinerary: ItineraryDay[];
  images: string[];
  price: Price | string; // Can be a Price object or a string like "Available on Request".
  days: number | string;
  places: string[];
  tour_operator: TourOperator;
  inclusions: string[];
  packing_list?: string[]; // Optional as not all packages might list this.
  terms_and_conditions: TermsAndConditions;
  cancellation_policy: string;
};

export type BookingInput = {
  PackageName: string;
  PackageDays: number;
  PackagePrice: number;
  people: number;
  startDate: Date;
  PlaceList?: string[];
  hotel?: string;
  AdventureList?: string[];
};

export type TaxiBookingInput = {
  taxi: string;
  source: string;
  destination: string;
  date: Date;
  price: number;
  selectedSeats?: number[];
};
