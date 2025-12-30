"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export function Landing({ IMAGES }: { IMAGES: string[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      orientation="horizontal"
      plugins={[
        plugin.current,
        Autoplay({
          delay: 1500,
        }),
      ]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="w-full h-full">
        {IMAGES.slice(0, 7).map((_, index) => (
          <CarouselItem key={index} className="w-full">
            <div className="w-full relative">
              {/* image data or landing data */}
              <div className="absolute inset-0 left-0 top-0 h-full w-full z-10 pointer-events-none">
                <div className="h-full w-full flex items-center">
                  <div className="container mx-auto py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="text-white pointer-events-auto">
                        <div className="inline-block bg-gradient-to-r from-black/70 via-black/40 to-transparent p-6 lg:py-96 rounded-md ">
                          <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-amber-300">
                            BEST TRAVEL EXPERIENCES
                          </p>
                          <h2 className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight">
                            Discover the hidden
                            <span className="text-amber-400">
                              {" "}
                              gems of Uttarakhand
                            </span>
                          </h2>
                          <p className="mt-4 text-sm md:text-lg text-gray-200 max-w-xl">
                            Curated itineraries, expert guides and seamless
                            bookings — experience mountains, valleys and culture
                            like never before.
                          </p>

                          <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <Link href="/tours" className="inline-block">
                              <Button
                                className="bg-gradient-to-r from-emerald-500 to-teal-400 text-white"
                                variant="default"
                              >
                                Explore Tours
                              </Button>
                            </Link>
                            <Link href="/contact" className="inline-block">
                              <Button
                                className="border-white text-white bg-transparent"
                                variant="ghost"
                              >
                                Contact Us
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="hidden md:block pointer-events-auto bg-gradient-to-l from-black/70 via-black/40 to-transparent lg:py-96">
                        <div className="rounded-lg bg-white/5 p-4">
                          <h4 className="font-black text-xl text-white">
                            Why travel with us?
                          </h4>
                          <ul className="mt-3 text-white space-y-2 font-bold">
                            <li>
                              • Small-group departures and personalized
                              itineraries
                            </li>
                            <li>
                              • Trusted local guides & verified accommodations
                            </li>
                            <li>• Flexible booking and transparent pricing</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Card className="w-full p-0">
                <CardContent className="flex aspect-video h-full items-center justify-center mx-auto w-full p-0">
                  <div className="relative w-full h-full">
                    <Image
                      src={IMAGES[index]}
                      fill
                      priority
                      alt="devnagri"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
