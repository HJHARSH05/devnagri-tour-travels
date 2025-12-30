"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { QueryInputType } from "@/types";
import useBookingHook from "@/hooks/booking.hooks";
import { Button } from "@/components/ui/button";
import { useUserStore } from "../../store/user.store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QueryInputType>({ mode: "onTouched" });

  const [sent, setSent] = useState(false);
  const { sendQuery } = useBookingHook();
  const { user } = useUserStore();

  const onSubmit = async (data: QueryInputType) => {
    try {
      // simulate network request
      await sendQuery(data)
        .then(() => {
          setSent(true);
          toast.success("Query submitted — we'll get back to you soon.");
          reset();
        })
        .catch(() => {
          toast.error("Submission failed. Please try again.");
        })
        .finally(() => {});
    } catch (err) {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <main className="p-6 md:p-10 max-w-3xl mx-auto">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-center mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold">
          Contact Devnagri Tourism
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Have questions or need a custom itinerary? Send us a message and we'll
          respond within 24 hours.
        </p>
      </motion.header>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-xl shadow-md p-6 grid gap-4"
      >
        {/* Name */}
        <div className="w-5/6 mx-auto">
          <label className="text-sm font-medium">Name</label>
          <Input
            {...register("name", { required: "Name is required" })}
            className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 ${
              errors.name ? "border-red-300" : "border-gray-200"
            }`}
            placeholder="Your full name"
            aria-invalid={errors.name ? "true" : "false"}
            defaultValue={user ? user.name : ""}
            disabled={user?.name !== null}
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="w-5/6 mx-auto">
          <Label className="text-sm font-medium">Email</Label>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
            className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 ${
              errors.email ? "border-red-300" : "border-gray-200"
            }`}
            placeholder="you@example.com"
            aria-invalid={errors.email ? "true" : "false"}
            defaultValue={user ? user.email : ""}
            disabled={user?.email !== null}
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="w-5/6 mx-auto">
          <Label className="text-sm font-medium">Your Query</Label>
          <Textarea
            {...register("message", {
              required: "Please describe your query",
              minLength: {
                value: 10,
                message: "Tell us a little more (min 10 chars)",
              },
            })}
            rows={6}
            className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 ${
              errors.message ? "border-red-300" : "border-gray-200"
            }`}
            placeholder="How can we help you?"
            aria-invalid={errors.message ? "true" : "false"}
          />
          {errors.message && (
            <p className="text-xs text-red-600 mt-1">
              {errors.message.message}
            </p>
          )}
        </div>
        {/* Submit Button */}
        <div className="flex items-center justify-between gap-4  mx-auto">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-purple-700 text-white px-4 py-2 shadow hover:brightness-95 disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Query"}
          </Button>

          {sent && (
            <div className="text-sm text-green-600">Thanks — message sent.</div>
          )}
        </div>
      </motion.form>
    </main>
  );
}