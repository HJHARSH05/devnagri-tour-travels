"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
// carousel removed - using animated grid instead
import BookingCard from "@/components/shared/BookingCard";
import { TourCard } from "@/components/shared/ToursCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TOURS } from "@/constants/packages";
import { TourPackage } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";

function PackageDetail() {
  const { packageId } = useParams();
  const [Package, setPackage] = useState<TourPackage | null>(null);
  // Control open state for collapsible sections
  const [openOverview, setOpenOverview] = useState(true);
  const [openHighlights, setOpenHighlights] = useState(true);
  const [openItinerary, setOpenItinerary] = useState(true);
  const [openInclusion, setOpenInclusion] = useState(false);
  const [openExclusion, setOpenExclusion] = useState(false);
  const [openFaqs, setOpenFaqs] = useState(false);

  useEffect(() => {
    // use find for clarity
    const id =
      typeof packageId === "string" ? packageId : String(packageId || "");
    const found = TOURS.find((p) => p.__id === id) ?? null;
    // Only update if the package ID has actually changed
    if (found?.__id !== Package?.__id) {
      setPackage(found as TourPackage);
    }
  }, [packageId, Package?.__id]);

  // Memoize computed values to prevent infinite renders
  const computedDays = useMemo(() => {
    if (!Package) return 0;
    return typeof Package.days === "number"
      ? Package.days
      : parseInt(String(Package.days).replace(/[^0-9]/g, "")) || 0;
  }, [Package]);

  const computedPrice = useMemo(() => {
    if (!Package) return 0;
    const p = Package.price;
    if (typeof p === "object" && p !== null && "standard_plan" in p) {
      const standard = (p as { standard_plan?: number | string }).standard_plan;
      return Number(String(standard ?? 0).replace(/[^0-9]/g, "")) || 0;
    }
    return Number(String(p).replace(/[^0-9]/g, "")) || 0;
  }, [Package]);

  const bookingProps = useMemo(
    () => ({
      PackageName: Package?.name || "",
      PackageDays: computedDays,
      PackagePrice: computedPrice,
      PlaceList: Package?.places
    }),
    [Package, computedDays, computedPrice]
  );

  return (
    Package && (
      <div className="p-6 md:p-10">
        <div className="flex flex-col gap-6 ">
          <div className="w-full relative max-h-[650px] overflow-hidden">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="p-0">
                {(Package.images && Package.images.length > 0
                  ? Package.images
                  : [""]
                ).map((src, idx) => (
                  <CarouselItem key={idx} className="relative">
                    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
                      <Image
                        src={src ?? ""}
                        alt={`${Package.name} ${idx + 1}`}
                        fill
                        sizes="(min-width: 1024px) 1500px, 00px"
                        className="object-cover"
                      />
                      {/* subtle gradient for text legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      <h2 className="absolute left-4 bottom-4 text-white text-lg md:text-2xl font-bold bg-black/40 px-3 py-1 rounded">
                        {Package.name}
                      </h2>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full flex flex-col justify-center px-2 md:w-3/5">
              {/* Overview (short) */}
              {Package.overview && (
                <Collapsible open={openOverview} onOpenChange={setOpenOverview}>
                  <div className="mt-5">
                    <CollapsibleTrigger asChild>
                      <button className="w-full text-left flex items-center justify-between">
                        <h1 className="text-xl font-bold">Overview</h1>
                        <span className="text-sm text-muted-foreground bg-gradient-to-r from-light-blue-100 to-light-blue-200 px-2 rounded-lg p-1">
                          {openOverview ? "Hide" : "Show"}
                        </span>
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <AnimatePresence>
                        {openOverview && (
                          <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.25 }}
                            className="flex flex-col gap-3 mt-4"
                          >
                            <p className="text-justify camelCase font-medium text-sm text-gray-500">
                              {Package.overview}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              )}

              {/* Places covered */}
              {Package.places && Package.places.length > 0 && (
                <Collapsible
                  open={openHighlights}
                  onOpenChange={setOpenHighlights}
                >
                  <div className="mt-5">
                    <CollapsibleTrigger asChild>
                      <button className="w-full text-left flex items-center justify-between">
                        <h1 className="text-xl font-bold">Places Covered</h1>
                        <span className="text-sm text-muted-foreground bg-gradient-to-r from-light-blue-100 to-light-blue-200 px-2 rounded-lg p-1">
                          {openHighlights ? "Hide" : "Show"}
                        </span>
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <AnimatePresence>
                        {openHighlights && (
                          <motion.div
                            key="places"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="grid grid-cols-4 gap-3 mt-4 flex-wrap"
                          >
                            {Package.places.map((item, idx) => (
                              <div
                                className="flex items-center gap-2 rounded-lg border border-gray-300 p-2 shadow-lg bg-gradient-to-r from-light-blue-100 to-light-blue-200"
                                key={idx}
                              >
                                <p className=" list-decimal list-inside text-sm font-medium text-gray-500">
                                  {item}
                                </p>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              )}

              {/* Itinerary Section */}
              {Package.itinerary && Package.itinerary.length > 0 && (
                <Collapsible
                  open={openItinerary}
                  onOpenChange={setOpenItinerary}
                >
                  <div className="mt-5">
                    <CollapsibleTrigger asChild>
                      <button className="w-full text-left flex items-center justify-between">
                        <h1 className="text-xl font-bold">Itinerary</h1>
                        <span className="text-sm text-muted-foreground bg-gradient-to-r from-light-blue-100 to-light-blue-200 px-2 rounded-lg p-1">
                          {openItinerary ? "Hide" : "Show"}
                        </span>
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <AnimatePresence>
                        {openItinerary && (
                          <motion.div
                            key="itinerary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex flex-col gap-3 mt-4"
                          >
                            {Package.itinerary.map((item, idx) => (
                              <div
                                key={idx}
                                className="mb-3 border rounded-md p-3"
                              >
                                <div className="flex items-center gap-2">
                                  <Star className="ml-2 size-4 text-purple-700 fill-purple-600" />
                                  <h2 className="text-lg font-bold">{`Day ${item.day}: ${item.title}`}</h2>
                                </div>
                                <ul className="list-disc ml-6 mt-2 text-sm text-gray-600">
                                  {item.details.map((d, i) => (
                                    <li key={i} className="mb-1">
                                      {d}
                                    </li>
                                  ))}
                                </ul>
                                {item.inclusions && (
                                  <p className="mt-2 text-sm text-gray-500">
                                    <strong>Includes:</strong> {item.inclusions}
                                  </p>
                                )}
                                {item.night_stay && (
                                  <p className="mt-1 text-sm text-gray-500">
                                    <strong>Night Stay:</strong>{" "}
                                    {item.night_stay}
                                  </p>
                                )}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              )}

              {/* Inclusions Section */}
              {Package.inclusions && Package.inclusions.length > 0 && (
                <Collapsible
                  open={openInclusion}
                  onOpenChange={setOpenInclusion}
                >
                  <div className="mt-5">
                    <CollapsibleTrigger asChild>
                      <button className="w-full text-left flex items-center justify-between">
                        <h1 className="text-xl font-bold">Inclusions</h1>
                        <span className="text-sm text-muted-foreground bg-gradient-to-r from-light-blue-100 to-light-blue-200 px-2 rounded-lg p-1">
                          {openInclusion ? "Hide" : "Show"}
                        </span>
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <AnimatePresence>
                        {openInclusion && (
                          <motion.div
                            key="inclusions"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-3 mt-4 px-2"
                          >
                            {Package.inclusions.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2"
                              >
                                <Star className="size-4 fill-purple-600 text-purple-700" />
                                <p className="max-md:text-justify camelCase w-4/5 font-medium text-sm text-gray-500">
                                  {item}
                                </p>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              )}

              {/* Packing list (if present) */}
              {Package.packing_list && Package.packing_list.length > 0 && (
                <Collapsible
                  open={openExclusion}
                  onOpenChange={setOpenExclusion}
                >
                  <div className="mt-5">
                    <CollapsibleTrigger asChild>
                      <button className="w-full text-left flex items-center justify-between">
                        <h1 className="text-xl font-bold">Packing List</h1>
                        <span className="text-sm text-muted-foreground bg-gradient-to-r from-light-blue-100 to-light-blue-200 px-2 rounded-lg p-1">
                          {openExclusion ? "Hide" : "Show"}
                        </span>
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <AnimatePresence>
                        {openExclusion && (
                          <motion.div
                            key="packing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-3 mt-4 px-2"
                          >
                            {Package.packing_list.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2"
                              >
                                <Star className="size-4 fill-purple-600 text-purple-700" />
                                <p className="text-justify camelCase w-4/5 font-medium text-sm text-gray-500">
                                  {item}
                                </p>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              )}

              {/* Terms and cancellation */}
              {(Package.terms_and_conditions ||
                Package.cancellation_policy) && (
                <Collapsible open={openFaqs} onOpenChange={setOpenFaqs}>
                  <div className="mt-5">
                    <CollapsibleTrigger asChild>
                      <button className="w-full text-left flex items-center justify-between">
                        <h1 className="text-xl font-bold">
                          Terms & Cancellation
                        </h1>
                        <span className="text-sm text-muted-foreground bg-gradient-to-r from-light-blue-100 to-light-blue-200 px-2 rounded-lg p-1">
                          {openFaqs ? "Hide" : "Show"}
                        </span>
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <AnimatePresence>
                        {openFaqs && (
                          <motion.div
                            key="terms"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-3 mt-4"
                          >
                            {Package.terms_and_conditions &&
                              Object.entries(Package.terms_and_conditions).map(
                                ([k, v]) =>
                                  v && (
                                    <div key={k} className="px-2">
                                      <h4 className="font-semibold text-sm capitalize">
                                        {k.replace(/_/g, " ")}
                                      </h4>
                                      <p className="text-sm text-gray-600">
                                        {v}
                                      </p>
                                    </div>
                                  )
                              )}
                            {Package.cancellation_policy && (
                              <div className="px-2">
                                <h4 className="font-semibold text-sm">
                                  Cancellation Policy
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {Package.cancellation_policy}
                                </p>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              )}

              {/* Booking Section */}
            </div>
            <div className="md:w-2/5 md:mt-10">
              {/* Booking card with memoized props */}
              <BookingCard props={bookingProps} />
            </div>
          </div>

          {/* Related packages - animated grid */}
          <div className="w-full">
            <h3 className="text-xl font-bold my-4">Related Packages</h3>
            <Carousel
              plugins={[
                Autoplay({
                  delay: 1500,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="p-7">
                {TOURS.map((t, index) => (
                  <CarouselItem
                    key={t.__id ?? index}
                    className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="hover:scale-[1.01] transition-transform duration-200">
                      <TourCard
                        tour={t as unknown as TourPackage}
                        shrink={true}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    )
  );
}

export default PackageDetail;
