"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserStore } from "@/store/user.store";
import {
  BookImage,
  CarTaxiFront,
  MessageCircleQuestionIcon,
} from "lucide-react";
import Image from "next/image";
import AddTaxiInformation from "./_components/AddTaxiInformation";
import BookingTable from "./_components/BookingTable";
import Details from "./_components/Details";
import QueriesTable from "./_components/QueriesTable";
import TaxiBookingTable from "./_components/TaxiBookingTable";
const AdminPanel = () => {
  const { isAdmin } = useUserStore();

  if (!isAdmin)
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
        <Image
          src={"/devnagri.png"}
          width={200}
          height={200}
          alt={"logo"}
          className="mb-5 animate-bounce"
        />
        <h1 className="text-xl md:text-2xl mb-5 font-bold text-center text-red-400 font-mono">
          Unauthorized
        </h1>
      </div>
    );
  return (
    <div className="px-3 mx-auto flex flex-col items-center min-h-[calc(100vh-4rem)] w-full">
      <Details />
      <AddTaxiInformation />
      <Tabs defaultValue="Bookings" className="w-full mt-5">
        <TabsList className="mx-auto">
          <TabsTrigger value={"Bookings"}>
            <BookImage />
            Bookings
          </TabsTrigger>
          <TabsTrigger value={"Queries"}>
            <MessageCircleQuestionIcon />
            Queries
          </TabsTrigger>
          <TabsTrigger value={"Taxi Bookings"}>
            <CarTaxiFront />
            Taxi Bookings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Bookings" className="h-[calc(100vh-10rem)] w-full">
          <BookingTable />
        </TabsContent>
        <TabsContent value="Queries" className="h-[calc(100vh-10rem)] w-full">
          <QueriesTable />
        </TabsContent>
        <TabsContent
          value="Taxi Bookings"
          className="h-[calc(100vh-10rem)] w-full"
        >
          <TaxiBookingTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
