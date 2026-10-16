import { TOURS } from "@/constants/packages";
import type { TourPackage } from "@/types";
import Image from "next/image";
import React from "react";

const GLOBAL_KEYWORDS = [
    "Uttarakhand tour package",
    "Kumaon tour",
    "Himalayan travel guide",
    "best tour operator in Uttarakhand",
    "family tour in Uttarakhand",
    "spiritual yatra package",
    "Devnagari Tour and Travels",
];

const BLOG_BLOCK_THEMES = [
    "from-rose-50/80 to-white border-rose-100",
    "from-blue-50/80 to-white border-blue-100",
    "from-emerald-50/80 to-white border-emerald-100",
    "from-amber-50/80 to-white border-amber-100",
    "from-cyan-50/80 to-white border-cyan-100",
    "from-fuchsia-50/80 to-white border-fuchsia-100",
];

const tourSlug = (name: string) => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
};

const numberToWords = (value: number) => {
    const words = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
    ];

    if (value < 0 || value >= words.length) {
        return `${value}`;
    }

    return words[value];
};

const safePrice = (tour: TourPackage) => {
    if (typeof tour.price === "string") {
        return tour.price;
    }

    return `Starting from INR ${tour.price.standard_plan}`;
};

const blogKeywords = (tour: TourPackage) => {
    const localKeywords = [
        `${tour.name} package`,
        `${tour.name} itinerary`,
        `${tour.name} booking`,
        `${tour.name} cost`,
        `${tour.name} travel guide`,
    ];

    return [...new Set([...GLOBAL_KEYWORDS, ...localKeywords])];
};

const itineraryLines = (tour: TourPackage) => {
    return tour.itinerary
        .map(
            (plan) =>
                `Day ${plan.day}: ${plan.title}. ${plan.details.join(" ")} ${plan.night_stay ? `Night stay: ${plan.night_stay}.` : ""
                }`
        )
        .join(" ");
};

const longSeoArticle = (tour: TourPackage) => {
    const placesText = tour.places.join(", ");
    const keywordText = blogKeywords(tour).join(", ");
    const daysAsWords = numberToWords(Number(tour.days));
    const operator = tour.tour_operator.name;
    const sampleItinerary = itineraryLines(tour);
    const inclusionsText = tour.inclusions.join(", ");

    return [
        `If you are searching for the best ${tour.name} package, this complete travel blog gives you a practical and SEO-friendly guide to plan your journey with confidence. The ${tour.name} route is one of the most meaningful choices for travelers who want mountain beauty, culture, spiritual depth, and a reliable tour plan in Uttarakhand. This journey is designed for families, couples, solo travelers, and groups who prefer clear planning, transparent costing, and real support on the ground. With ${operator}, you get a route that combines destination value, local guidance, and smooth logistics. Popular search terms like ${keywordText} are naturally relevant because travelers want route clarity, genuine itinerary information, and realistic travel expectations before making a booking decision.`,
        `The overall duration of this tour is ${daysAsWords} days, and the route covers important destinations such as ${placesText}. Each destination adds a different value to your travel experience, from temple visits and valley viewpoints to village interactions and scenic mountain drives. Travelers often ask whether this package is suitable for beginners, senior citizens, and children, and the answer depends on weather, terrain, and pace. Still, this package is designed in a structured way so your day plan is predictable, your stay points are practical, and your travel time is balanced for comfort and sightseeing. When users search for ${tour.name} itinerary, they usually want day-wise clarity, and this package provides exactly that in a manageable travel format.`,
        `A major advantage of this Uttarakhand tour package is the route intelligence. Instead of random hopping, each day connects naturally to the next, reducing unnecessary fatigue and maximizing destination value. The tour is curated so your mornings, transfer windows, sightseeing breaks, and night stays fit together in a smooth sequence. This helps avoid the most common travel mistakes in the Himalayas, such as overpacked schedules, unrealistic transfer assumptions, and last-minute confusion. If your goal is to enjoy a high-value Kumaon tour with clear execution, this package offers one of the most practical structures for real travelers, especially people booking from Delhi and nearby cities.`,
        `Travelers also look for cost clarity before booking any Uttarakhand holiday package. For this tour, pricing is positioned as ${safePrice(tour)}, with plan options that fit different comfort levels. Cost is not only about hotel class or transport type; it is also about route management, safety support, local expertise, and reliable coordination. A low headline number can look attractive online, but real value comes from a package where permits, transfers, key visits, and stay logistics are handled properly. That is why this tour is ideal for people searching terms like ${tour.name} cost and ${tour.name} booking, because it balances affordability with dependable execution.`,
        `Another reason this tour performs well in search and user satisfaction is destination diversity. In one itinerary, you experience spiritual landmarks, panoramic Himalayan views, cultural points, and local market life. This combination makes the package suitable for travelers who want both emotional and scenic value from one trip. Photographers appreciate changing light conditions across valleys and ridges, spiritual seekers appreciate temple and darshan experiences, and family travelers appreciate planned halts and secure stays. If you are comparing multiple Uttarakhand tour packages, this destination mix gives this route a strong advantage in terms of overall travel richness.`,
        `From an SEO content perspective, travelers frequently ask, "Is this trip safe?", "What should I carry?", "What is the best season?", and "How physically demanding is the route?" For this tour, practical readiness is important. Carry layered clothing, proper footwear, sun protection, essential medicines, and valid ID documents. In mountain regions, weather can shift quickly, so thermal planning and hydration are important even in mild seasons. Families with elders should share health details in advance so pace and support can be aligned. A well-managed tour operator does not just move you from point A to point B; it prepares you for altitude, road conditions, and realistic daily movement.`,
        `If you are reviewing this blog to decide on a final booking, the day-wise flow matters most. Here is a consolidated narrative of the itinerary in plain language for easy planning: ${sampleItinerary} This structure helps travelers understand what happens each day without guesswork. It also allows smarter decisions on luggage, wake-up time, photography planning, and meal expectations. Day-wise transparency is one of the strongest booking factors in modern travel SEO, because users want detail before they trust a package.`,
        `For travelers focused on spiritual tourism, this package has a distinct edge. The route includes sacred touchpoints and spiritually significant landscapes where devotion and mountain silence naturally meet. If your objective is not only sightseeing but inner calm and meaningful darshan moments, this itinerary is highly suitable. At the same time, adventure and nature travelers can enjoy winding roads, valley transitions, and high-altitude viewpoints that create a complete Himalayan experience. This balance between devotion, nature, and practical comfort makes the tour highly relevant for both first-time and repeat visitors.`,
        `Logistics are the backbone of any successful Himalaya trip, and this package is built around reliability. Transport planning, stay sequencing, and local support reduce uncertainty across the journey. Inclusions such as ${inclusionsText} increase predictability and make budgeting easier for travelers. The benefit is simple: you can focus on the experience rather than the friction of on-road decisions. For users searching "best tour operator in Uttarakhand" or "trusted Kumaon travel company," this consistency in operations is often the deciding factor.`,
        `This tour is also strong for content-led travelers who research deeply before booking. When comparing options, focus on route realism, inclusions transparency, destination depth, and support quality rather than headline claims. The ${tour.name} package stands out because it communicates these fundamentals clearly and executes them on ground through a tested itinerary model. Whether you are planning a devotional yatra, a family vacation, or a scenic Himalayan holiday, this package offers balanced value and strong booking confidence. For bookings and customizations, contact ${operator} at ${tour.tour_operator.contact_number} and plan your journey with complete clarity.`
    ];
};

const BlogsSection = () => {
    return (
        <section className="main-section">
            <div className="page-heading">
                <h1>Travel Blogs</h1>
                <p className="max-w-4xl text-center text-dark-200">
                    Explore SEO-friendly, long-form travel guides for every tour listed
                    on our tours page. Each blog below includes practical planning
                    details, destination insights, and curated image highlights.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full max-w-[1400px]">
                {TOURS.map((tour, index) => {
                    const keywords = blogKeywords(tour);
                    const articleParts = longSeoArticle(tour);
                    const [mainParagraph, ...detailedParagraphs] = articleParts;
                    const heroImage = tour.images?.[0] ?? "/Landing-1.jpg";
                    const galleryImages = tour.images?.slice(1, 5) ?? [];
                    const blockTheme =
                        BLOG_BLOCK_THEMES[index % BLOG_BLOCK_THEMES.length];

                    return (
                        <article
                            key={tour.__id}
                            id={`blog-${tourSlug(tour.name)}`}
                            className={`bg-gradient-to-b ${blockTheme} rounded-2xl p-4 md:p-5 border shadow-sm hover:shadow-md transition-shadow duration-200`}
                        >
                            <div className="mb-3 flex items-center justify-between gap-3">
                                <p className="text-xs md:text-sm font-semibold text-slate-600 tracking-wide uppercase">
                                    Blog Block {String(index + 1).padStart(2, "0")}
                                </p>
                                <span className="rounded-full bg-white px-3 py-1 text-xs border border-slate-200 text-slate-600">
                                    {tour.days} Days
                                </span>
                            </div>

                            <div className="relative h-56 md:h-72 w-full overflow-hidden rounded-xl">
                                <Image
                                    src={heroImage}
                                    alt={`${tour.name} travel blog featured image`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 1200px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 p-4 md:p-6 text-white">
                                    <h2 className="!text-white !bg-none !text-2xl md:!text-3xl">
                                        {tour.name}
                                    </h2>
                                </div>
                            </div>

                            <p className="mt-4 text-sm md:text-base text-slate-700 leading-7">
                                {tour.overview}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {keywords.map((keyword) => (
                                    <span
                                        key={`${tour.__id}-${keyword}`}
                                        className="rounded-full bg-white/80 px-3 py-1 text-xs md:text-sm text-slate-700 border border-slate-200"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-6 text-slate-700 leading-8 text-[15px] md:text-base">
                                <p>{mainParagraph}</p>

                                {detailedParagraphs.length > 0 && (
                                    <details className="mt-4 rounded-xl border border-slate-200 bg-white/70 p-4">
                                        <summary className="cursor-pointer font-semibold text-slate-700">
                                            Read Detailed Blog
                                        </summary>
                                        <div className="mt-3 space-y-4">
                                            {detailedParagraphs.map((part, detailIndex) => (
                                                <p key={`${tour.__id}-details-${detailIndex}`}>{part}</p>
                                            ))}
                                        </div>
                                    </details>
                                )}
                            </div>

                            {galleryImages.length > 0 && (
                                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {galleryImages.map((imagePath, index) => (
                                        <div
                                            key={`${tour.__id}-gallery-${index}`}
                                            className="relative h-28 md:h-32 rounded-lg overflow-hidden"
                                        >
                                            <Image
                                                src={imagePath}
                                                alt={`${tour.name} gallery image ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default BlogsSection;