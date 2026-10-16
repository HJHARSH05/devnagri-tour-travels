"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { QueryInputType } from "@/types";
import useBookingHook from "@/hooks/booking.hooks";
import { useUserStore } from "@/store/user.store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export function Landing({ IMAGES }: { IMAGES: string[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const { sendQuery } = useBookingHook();
  const { user } = useUserStore();
  const [sent, setSent] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QueryInputType>({
    mode: "onTouched",
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      message: "",
    },
  });

  React.useEffect(() => {
    reset({
      name: user?.name ?? "",
      email: user?.email ?? "",
      message: "",
    });
  }, [user, reset]);

  const onSubmit = async (data: QueryInputType) => {
    try {
      await sendQuery(data);
      setSent(true);
      toast.success("Query submitted — we'll get back to you soon.");
      reset({
        name: user?.name ?? "",
        email: user?.email ?? "",
        message: "",
      });
    } catch (error) {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <div className="relative">
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
              <div className="relative w-full h-[78vh] min-h-[560px] max-h-[920px]">
                <Image
                  src={IMAGES[index]}
                  fill
                  priority={index === 0}
                  alt="devnagri"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/30" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="container mx-auto h-full px-4 py-6 md:py-10">
          <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="pointer-events-auto text-white rounded-2xl border border-white/20 bg-black/35 backdrop-blur-md p-5 md:p-8 shadow-xl">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-amber-300">
                BEST TRAVEL EXPERIENCES
              </p>
              <h2 className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight">
                Discover the hidden
                <span className="text-amber-400"> gems of Uttarakhand</span>
              </h2>
              <p className="mt-4 text-sm md:text-lg text-gray-100 max-w-xl">
                Curated itineraries, expert guides and seamless bookings.
                Share your travel goals and our team will contact you quickly
                with personalized options.
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
                  <Button className="border-white text-white bg-transparent" variant="ghost">
                    Full Contact Page
                  </Button>
                </Link>
              </div>
            </div>

            <div className="pointer-events-auto lg:justify-self-end w-full max-w-xl">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/8 p-4 md:p-6 shadow-[0_18px_55px_rgba(0,0,0,0.35)] ring-1 ring-white/15 space-y-4"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent" />
                <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-emerald-300/15 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-cyan-300/12 blur-2xl" />

                <div className="relative z-10">
                  <h4 className="text-lg md:text-xl font-bold text-slate-900">Quick Contact</h4>
                  <p className="text-sm text-slate-700">
                    Send your query directly from the home banner.
                  </p>
                </div>

                <div className="relative z-10 grid grid-cols-2 gap-3 w-full">
                  <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <Input
                      {...register("name", { required: "Name is required" })}
                      className={`mt-1 bg-white/70 border ${errors.name ? "border-red-300" : "border-white/40"
                        } placeholder:text-slate-500 text-slate-900 focus-visible:ring-2 focus-visible:ring-emerald-300 w-full`}
                      placeholder="Your full name"
                      defaultValue={user ? user.name : ""}
                      disabled={user !== null}
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <Input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email",
                        },
                      })}
                      className={`mt-1 bg-white/70 border ${errors.email ? "border-red-300" : "border-white/40"
                        } placeholder:text-slate-500 text-slate-900 focus-visible:ring-2 focus-visible:ring-emerald-300 w-full`}
                      placeholder="you@example.com"
                      defaultValue={user ? user.email : ""}
                      disabled={user !== null}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="relative z-10 w-full">
                  <Label className="text-sm font-medium">Your Query</Label>
                  <Textarea
                    {...register("message", {
                      required: "Please describe your query",
                      minLength: {
                        value: 10,
                        message: "Tell us a little more (min 10 chars)",
                      },
                    })}
                    rows={4}
                    className={`mt-1 bg-white/70 border ${errors.message ? "border-red-300" : "border-white/40"
                      } placeholder:text-slate-500 text-slate-900 focus-visible:ring-2 focus-visible:ring-emerald-300 w-full`}
                    placeholder="How can we help you?"
                    aria-invalid={errors.message ? "true" : "false"}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-600 mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:brightness-95"
                  >
                    {isSubmitting ? "Sending..." : "Send Query"}
                  </Button>
                  {sent && <p className="text-sm text-emerald-700">Thanks - message sent.</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
