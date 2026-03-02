import { TOURS } from "@/constants/packages";
import { IndianRupee, MapPin, Mountain } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const getPriceLabel = (price: (typeof TOURS)[number]["price"]) => {
    if (!price) return "On request";
    if (typeof price === "string") return price;

    const standard =
        typeof price.standard_plan === "number"
            ? `₹ ${price.standard_plan}`
            : price.standard_plan;

    const deluxe =
        typeof price.deluxe_plan === "number"
            ? `₹ ${price.deluxe_plan}`
            : price.deluxe_plan;

    return deluxe ? `${standard} / ${deluxe}` : String(standard);
};

const imagePattern = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
];

const AdiKailashPage = () => {
    const adiKailashTours = TOURS.filter((tour) =>
        tour.name.toLowerCase().includes("adi kailash")
    ).slice(0, 3);

    return (
        <main className="main-section">
            <section className="page-heading">
                <p className="score-badge bg-blue-50 text-blue-700 text-sm">
                    Sacred Himalayan Journeys
                </p>
                <h1>Adi Kailash Tour Packages</h1>
                <p className="max-w-3xl text-sm md:text-base text-gray-600 text-center">
                    Explore our top Adi Kailash packages with immersive visuals, spiritual
                    highlights, and route coverage. Click any package to view full
                    details, itinerary, and booking options.
                </p>
            </section>

            <section className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-3 gap-6">
                {adiKailashTours.map((tour) => {
                    const slug = tour.name.replaceAll(" ", "-");
                    return (
                        <Link
                            key={tour.__id}
                            href={`/package/${slug}`}
                            className="group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <div className="relative h-[250px] p-2 bg-gradient-to-br from-slate-100 via-slate-50 to-white">
                                <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">
                                    {tour.images.slice(0, 5).map((image, index) => (
                                        <div
                                            key={`${tour.__id}-${index}`}
                                            className={`relative overflow-hidden rounded-xl ${imagePattern[index] ?? "col-span-1 row-span-1"
                                                }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${tour.name} image ${index + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 space-y-3">
                                <h3 className="text-base md:text-lg text-left font-semibold text-slate-800 group-hover:text-red-500 transition-colors">
                                    {tour.name}
                                </h3>

                                <p className="text-sm text-gray-600 line-clamp-3">{tour.overview}</p>

                                <div className="grid grid-cols-2 gap-2 text-xs md:text-sm text-slate-700">
                                    <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5">
                                        <Mountain className="size-3.5 text-red-500" />
                                        <span>
                                            {typeof tour.days === "number" ? `${tour.days} days` : tour.days}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5">
                                        <MapPin className="size-3.5 text-red-500" />
                                        <span>{tour.places.length} places</span>
                                    </div>
                                    <div className="col-span-2 flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5">
                                        <IndianRupee className="size-3.5 text-red-500" />
                                        <span>{getPriceLabel(tour.price)}</span>
                                    </div>
                                </div>

                                <div className="pt-1">
                                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-red-500 to-rose-500 px-3 py-1 text-xs font-medium text-white">
                                        View Package Details
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </section>
        </main>
    );
};

export default AdiKailashPage;