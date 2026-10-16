import React from "react";

type Testimonial = {
    id: number;
    name: string;
    city: string;
    tour: string;
    rating: number;
    text: string;
};

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: "Amit Sharma",
        city: "Delhi",
        tour: "Adi Kailash Om Parvat Yatra",
        rating: 5,
        text: "The complete yatra was very well organized. Pickup was on time, hotels were clean, and the team handled permits smoothly. Our driver was experienced in mountain roads and made us feel safe throughout the journey. Darshan at Om Parvat was a truly unforgettable experience for my family.",
    },
    {
        id: 2,
        name: "Sneha Verma",
        city: "Lucknow",
        tour: "Kainchi Dham Tour",
        rating: 5,
        text: "I booked this short trip for my parents and everything was managed perfectly. The schedule was relaxed, food stops were decent, and the stay was comfortable. We got enough time for darshan and prayer. Highly recommended for anyone looking for a peaceful spiritual weekend.",
    },
    {
        id: 3,
        name: "Rohit Joshi",
        city: "Pune",
        tour: "Bike Tour to Adi Kailash and Munsyari",
        rating: 4,
        text: "One of the best riding experiences I have had in Uttarakhand. The route selection was excellent and support staff helped quickly during a minor bike issue. Homestay in the valley was authentic and food was fresh. I suggest this tour for riders who want both adventure and natural beauty.",
    },
    {
        id: 4,
        name: "Priya Nair",
        city: "Bengaluru",
        tour: "Kumaun Darshan Tour",
        rating: 5,
        text: "Our 8-day family trip was very smooth and value for money. We covered temples, waterfalls, mountain viewpoints, and local markets without feeling rushed. The team was responsive before and during the trip. This is a reliable option for families traveling with children and elders.",
    },
    {
        id: 5,
        name: "Manoj Tiwari",
        city: "Kanpur",
        tour: "Char Dham Yatra",
        rating: 5,
        text: "I appreciate how professionally the Char Dham route was planned. Stays were near key points, the vehicle was comfortable, and daily guidance was clear. They also supported senior members in our group very patiently. The journey felt safe, devotional, and properly managed from start to finish.",
    },
    {
        id: 6,
        name: "Neha Kulkarni",
        city: "Mumbai",
        tour: "Darma Valley and Munsyari Tour",
        rating: 4,
        text: "This was my first offbeat Himalayan tour and I loved it. Darma Valley is beautiful and less crowded, exactly what we wanted. The itinerary had good scenic breaks and enough rest time. I would definitely book again with Devnagri for another Uttarakhand circuit.",
    },
    {
        id: 7,
        name: "Suresh Reddy",
        city: "Hyderabad",
        tour: "Helicopter Tour to Munsyari",
        rating: 5,
        text: "A premium experience with great coordination. The helicopter schedule, hotel transfer, and local sightseeing were all handled without confusion. The mountain views were spectacular and the team was transparent about weather updates. Perfect for travelers who want comfort with limited travel time.",
    },
    {
        id: 8,
        name: "Kavita Singh",
        city: "Jaipur",
        tour: "Winter Munsyari Tour",
        rating: 4,
        text: "We traveled in winter and the team gave practical guidance on packing and road conditions in advance. The driver was careful on snow patches and timings were managed well. Khaliya Top views were amazing. Overall, a memorable and trustworthy travel experience.",
    },
];

const starString = (rating: number) => "★".repeat(rating) + "☆".repeat(5 - rating);

const TestimonialSection = () => {
    return (
        <section className="main-section">
            <div className="page-heading">
                <h1>Traveler Testimonials</h1>
                <p className="max-w-4xl text-center text-dark-200">
                    Real feedback from travelers who explored Uttarakhand with Devnagri
                    Tour and Travels.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-[1400px]">
                {TESTIMONIALS.map((item) => (
                    <article
                        key={item.id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                        <p className="text-amber-500 text-sm tracking-wide" aria-label={`${item.rating} star rating`}>
                            {starString(item.rating)}
                        </p>

                        <p className="mt-3 text-sm leading-7 text-slate-700">"{item.text}"</p>

                        <div className="mt-4 border-t border-slate-100 pt-3">
                            <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                            <p className="text-xs text-slate-500">{item.city}</p>
                            <p className="mt-1 text-xs font-medium text-slate-600">Tour: {item.tour}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default TestimonialSection;
