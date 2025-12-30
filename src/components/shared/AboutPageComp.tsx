// ...existing code...
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Star,
  MapPin,
  Users,
  Compass,
  Sparkles,
  Heart,
  Trees,
} from "lucide-react";

/**
 * Interactive About page for Devnagri Tourism
 * - Tailwind based layout
 * - Framer Motion animations
 * - shadcn-ui Collapsible used for FAQ section
 *
 * Colors & style references are taken from the package detail page:
 * - gradients: from-light-blue-100 to-light-blue-200
 * - purple accents for icons / highlights
 *
 * Keep this file "client" so motion and collapsibles animate correctly.
 */

const features = [
  {
    title: "Local Guides",
    desc: "Experienced local guides who know the temples, trails and hidden gems.",
    icon: Users,
  },
  {
    title: "Tailored Itineraries",
    desc: "Packages for pilgrims, trekkers, families and photography enthusiasts.",
    icon: Compass,
  },
  {
    title: "Safe & Trusted",
    desc: "Well-maintained vehicles, vetted partners and transparent pricing.",
    icon: MapPin,
  },
  {
    title: "Meaningful Journeys",
    desc: "We craft trips that connect you to the spirituality and soul of the Himalayas.",
    icon: Sparkles,
  },
];

const stats = [
  { label: "Years in Service", value: "12+" },
  { label: "Pilgrims Guided", value: "10k+" },
  { label: "Handpicked Routes", value: "85+" },
];

const categories = [
  {
    title: "Honeymoon",
    icon: Heart,
    desc: "Romantic escapes and couple-friendly itineraries.",
  },
  {
    title: "Adventure",
    icon: Compass,
    desc: "Trekking, rafting, and adrenaline-filled routes.",
  },
  {
    title: "Nature",
    icon: Trees,
    desc: "Scenic escapes—valleys, forests and pristine landscapes.",
  },
  {
    title: "Spiritual",
    icon: Sparkles,
    desc: "Pilgrimages, temple tours and soulful journeys.",
  },
];

const faqs = [
  {
    q: "How can I customize a Devnagri package?",
    a: "Contact our team via the booking form or phone. We will tailor itinerary, duration and accommodations to your needs.",
  },
  {
    q: "Are guides and permits arranged?",
    a: "Yes. For guided treks & pilgrimages we arrange licensed local guides and any required permits wherever applicable.",
  },
  {
    q: "What safety measures do you follow?",
    a: "We depend on local expertise, regular vehicle checks, verified accommodations and COVID-aware protocols as needed.",
  },
];

export default function AboutPageComp() {
  return (
    <main className="p-6 md:p-10">
      {/* Hero */}
      <section className="relative rounded-lg overflow-hidden bg-gradient-to-r from-light-blue-100 to-light-blue-200 p-8 md:p-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl md:text-4xl font-extrabold"
            >
              Welcome to Devnagri Tourism
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.35 }}
              className="mt-3 text-gray-700 max-w-2xl"
            >
              Where Spirituality Meets the Himalayas. Curated journeys across
              Uttarakhand — from Adi Kailash to Char Dham — crafted by locals.
            </motion.p>

            <div className="mt-6 flex gap-3">
              <motion.a
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 rounded-lg bg-purple-700 text-white px-4 py-2 shadow-md"
                href="/tours"
              >
                Explore Packages
                <Star className="size-4" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 bg-white text-gray-700"
                href="/contact"
              >
                Contact Us
              </motion.a>
            </div>
          </div>

          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
          >
            {/* Decorative info card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-semibold text-lg">
                Devnagri — The Land of Gods
              </h4>
              <p className="mt-2 text-sm text-gray-600">
                Locally-owned travel specialists in Uttarakhand. We design safe,
                meaningful and flexible journeys — for pilgrims, trekkers and
                explorers.
              </p>

              <div className="mt-4 flex gap-4">
                {stats.map((s, idx) => (
                  <div key={idx} className="flex-1">
                    <div className="text-2xl font-bold text-purple-700">
                      {s.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto mt-8 grid gap-6 md:grid-cols-4">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i }}
              className="rounded-lg border border-gray-200 p-4 bg-white shadow-sm flex flex-col gap-3"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-r from-light-blue-100 to-light-blue-200 text-purple-700">
                <Icon className="size-5" />
              </div>
              <h5 className="font-semibold">{f.title}</h5>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </motion.article>
          );
        })}
      </section>

      {/* Categories (new): Honeymoon, Adventure, Nature, Spiritual */}
      <section className="max-w-6xl mx-auto mt-6">
        <h4 className="text-lg font-semibold mb-4">Explore by Category</h4>
        <div className="flex flex-wrap gap-3">
          {categories.map((c, idx) => {
            const Icon = c.icon;
            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-light-blue-100 to-light-blue-200 text-purple-700">
                  <Icon className="size-4" />
                </span>
                <div className="text-left">
                  <div className="text-sm font-medium">{c.title}</div>
                  <div className="text-xs text-gray-500">{c.desc}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>
      {/* How we work - timeline */}
      <section className="max-w-6xl mx-auto mt-10 grid md:grid-cols-2 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-lg p-6 shadow-sm"
        >
          <h3 className="text-xl font-bold">How We Work</h3>
          <ol className="mt-4 space-y-4 text-sm text-gray-600">
            <li className="flex gap-3 items-start">
              <span className="mt-1 inline-flex w-6 h-6 items-center justify-center rounded-full bg-purple-700 text-white text-xs">
                1
              </span>
              <div>
                <div className="font-medium">Plan & Customize</div>
                <div>
                  We listen to your needs and craft a personalized route.
                </div>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="mt-1 inline-flex w-6 h-6 items-center justify-center rounded-full bg-purple-700 text-white text-xs">
                2
              </span>
              <div>
                <div className="font-medium">Local Execution</div>
                <div>Local guides, reliable transport and safe stays.</div>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="mt-1 inline-flex w-6 h-6 items-center justify-center rounded-full bg-purple-700 text-white text-xs">
                3
              </span>
              <div>
                <div className="font-medium">On-Trip Support</div>
                <div>24/7 assistance and a responsive operations team.</div>
              </div>
            </li>
          </ol>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-lg p-6 shadow-sm"
        >
          <h3 className="text-xl font-bold">Our Promise</h3>
          <p className="mt-3 text-gray-600 text-sm">
            We focus on authenticity, safety and meaningful travel moments that
            connect you to Uttarakhand&apos;s culture and nature.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-md p-3 border border-gray-100 bg-gradient-to-r from-light-blue-100 to-light-blue-200">
              <div className="flex items-center gap-2">
                <Star className="text-purple-700 size-4" />
                <div>
                  <div className="text-sm font-semibold">Custom Support</div>
                  <div className="text-xs text-gray-600">Flexible plans</div>
                </div>
              </div>
            </div>

            <div className="rounded-md p-3 border border-gray-100">
              <div className="flex items-center gap-2">
                <MapPin className="text-purple-700 size-4" />
                <div>
                  <div className="text-sm font-semibold">Local Experts</div>
                  <div className="text-xs text-gray-600">Trusted partners</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Team & FAQs */}
      <section className="max-w-6xl mx-auto mt-10 grid md:grid-cols-3 gap-6">
        <motion.div
          className="md:col-span-2 bg-white rounded-lg p-6 shadow-sm"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h3 className="text-xl font-bold">Meet The Team</h3>
          <p className="mt-2 text-sm text-gray-600">
            Our team is local, experienced and passionate about the Himalayas.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-md border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                A
              </div>
              <div>
                <div className="font-semibold">Priyanshu Verma</div>
                <div className="text-xs text-gray-500">Founder & Guide</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-md border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                S
              </div>
              <div>
                <div className="font-semibold">Sonia Verma</div>
                <div className="text-xs text-gray-500">Operations</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-md border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                R
              </div>
              <div>
                <div className="font-semibold">Harshwardhan Joshi</div>
                <div className="text-xs text-gray-500">Logistics</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-md border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                P
              </div>
              <div>
                <div className="font-semibold">Priya Chauhan</div>
                <div className="text-xs text-gray-500">Customer Care</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.aside
          className="bg-white rounded-lg p-6 shadow-sm"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <h4 className="text-lg font-semibold">FAQs</h4>

          <div className="mt-4 space-y-3">
            {faqs.map((f, i) => (
              <Collapsible key={i} defaultOpen={i === 0}>
                <div className="rounded-md border border-gray-100 overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <button className="w-full text-left px-4 py-3 flex items-center justify-between">
                      <span className="font-medium text-sm">{f.q}</span>
                      <span className="text-xs text-muted-foreground bg-gradient-to-r from-light-blue-100 to-light-blue-200 px-2 rounded-lg p-1">
                        {i === 0 ? "Open" : "Show"}
                      </span>
                    </button>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-4 text-sm text-gray-600"
                    >
                      {f.a}
                    </motion.div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
        </motion.aside>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto mt-10 mb-10">
        <motion.div
          className="rounded-lg p-6 bg-gradient-to-r from-light-blue-100 to-light-blue-200 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div>
            <h4 className="text-lg font-bold">
              Ready to explore the Land of Gods?
            </h4>
            <p className="text-sm text-gray-700 mt-1">
              Reach out and we will build a soulful Himalayan experience for
              you.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-purple-700 text-white px-4 py-2"
            >
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
// ...existing code...
