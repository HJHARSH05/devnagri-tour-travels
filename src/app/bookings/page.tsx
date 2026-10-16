import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Tourbookings from "./_components/Tourbookings";
import TaxiBookings from "./_components/TaxiBookings";
const Bookings = () => {
  return (
    <Tabs defaultValue="tourBookings" className="w-full">
      <TabsList className="mx-auto my-3">
        <TabsTrigger value="tourBookings">Tour Bookings</TabsTrigger>
        <TabsTrigger value="taxiBookings">Taxi Bookings</TabsTrigger>
      </TabsList>
      <TabsContent value="tourBookings">
        <Tourbookings />
      </TabsContent>
      <TabsContent value="taxiBookings">
        <TaxiBookings />
      </TabsContent>
    </Tabs>
  );
};

export default Bookings;
