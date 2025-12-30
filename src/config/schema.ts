import {
  date,
  integer,
  pgTable,
  serial,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";

export const bookignStatusEnum = pgEnum("booking_status", ["pending", "approved", "rejected"]);
export const Users = pgTable("users", {
  id: varchar("Id", { length: 50 }).primaryKey(),
  name: varchar("Name", { length: 50 }).notNull(),
  email: varchar("Email", { length: 50 }).notNull(),
  password: varchar("Password", { length: 150 }).notNull(),
});

export const Bookings = pgTable("bookings", {
  id: serial("Id").primaryKey(),
  name: varchar("Name", { length: 50 }).notNull(),
  user: varchar().notNull().references(() => Users.id),
  bookingDate: date("Date").notNull(),
  startDate: date("StartDate").notNull(),
  price: integer("Price").notNull(),
  people: integer("People").notNull(),
  days: integer("Days").notNull(),
  placeList: varchar("PlaceList", { length: 500 }),
  status: bookignStatusEnum("Status").default("pending"),
});

export const Taxis = pgTable("taxis", {
  id: varchar("Id", { length: 50 }).primaryKey(),
  model: varchar("Model", { length: 50 }).notNull(),
  seats: integer("Seats").notNull(),
  vehicleNumber: varchar("VehicleNumber", { length: 50 }).notNull(),
  driver: varchar("Driver", { length: 50 }).notNull(),
  driverPhoneNumber: varchar("DriverPhoneNumber", { length: 50 }).notNull(),
});

export const TaxiBooking = pgTable("taxi_bookings", {
  id: serial("Id").primaryKey(),
  user: varchar().notNull().references(() => Users.id),
  taxi: varchar().notNull().references(() => Taxis.id),
  price: integer("Price").notNull(),
  source: varchar("Source", { length: 50 }).notNull(),
  destination: varchar("Destination", { length: 50 }).notNull(),
  date: date("Date").notNull(),
  bookingDate: date("BookingDate").notNull(),
  bookedSeats: varchar("BookedSeats", { length: 500 }),
  status: bookignStatusEnum("Status").default("pending"),
});

export const Queries = pgTable("queries", {
  id: serial("Id").primaryKey(),
  name: varchar("Name", { length: 50 }).notNull(),
  email: varchar("Email", { length: 50 }).notNull(),
  message: varchar("Message", { length: 50 }).notNull(),
});
