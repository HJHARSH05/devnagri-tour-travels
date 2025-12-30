"use client"; // This directive is necessary for client-side components in Next.js App Router

import { Card, CardContent } from "@/components/ui/card";
import { TourPackage } from "@/types"; // Use the TourPackage shape for package cards
import { motion } from "framer-motion";
import { Clock, IndianRupee } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export function TourCard({
  tour,
  shrink,
}: {
  tour: TourPackage;
  shrink?: boolean;
}) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // detect small screens / touch devices to show overlay by default
    const check = () =>
      setIsMobile(typeof window !== "undefined" && window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  // derive a presentable price label
  const priceLabel = (() => {
    if (!tour.price) return "Price available on request";
    if (typeof tour.price === "string") return tour.price;
    const p = tour.price;
    const std =
      typeof p.standard_plan === "number"
        ? `₹ ${p.standard_plan}`
        : p.standard_plan;
    const del =
      typeof p.deluxe_plan === "number" ? `₹ ${p.deluxe_plan}` : p.deluxe_plan;
    return `${std}${del ? ` / ${del}` : ""}`;
  })();

  return (
    <Card
      className={`${
        shrink ? "aspect-[1/1]" : "aspect-[4/5]  max-sm:aspect-[4/3]"
      } relative max-sm:w-[90%] w-full mx-auto overflow-hidden rounded-lg shadow-lg group`}
    >
      <CardContent className="rounded-lg">
        {/* Background Image Container */}
        <Image
          src={tour.images[1]}
          alt={tour.name}
          fill
          className="object-cover group-hover:scale-105 group rounded-lg"
        />

        {/* Overlay for Name and Days - Animated with Framer Motion */}
        <motion.div
          // Use 'hidden' and 'visible' variants for more control and clearer state management
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={isMobile ? "visible" : "hidden"}
          whileHover={!isMobile ? "visible" : undefined} // only use hover on non-mobile
          transition={{ duration: 0.36, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-4 text-white"
        >
          <h4 className="text-lg font-medium mb-1 group-hover:text-red-500">
            {tour.name}
          </h4>
          <div className="flex flex-col gap-1">
            <div className="flex items-end gap-1">
              <Clock className="size-3.5 text-red-500" />
              <span className="text-xs text-gray-100 font-medium">
                {typeof tour.days === "number"
                  ? `${tour.days} days - ${Math.max(0, tour.days - 1)} nights`
                  : tour.days}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <IndianRupee className="size-3.5 text-red-500" />
              <span className="text-xs text-gray-100 font-medium">
                {priceLabel}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Button
                variant={"outline"}
                size={"sm"}
                className="bg-gradient-to-r from-red-300 to-red-600 hover:from-red-600 hover:to-red-300 hover:text-white"
              >
                Enquire Now
              </Button>
              <Button
                variant={"outline"}
                size={"sm"}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 hover:text-white"
                onClick={() => {
                  router.push(`/package/${tour.__id}`);
                }}
              >
                View Details
              </Button>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
