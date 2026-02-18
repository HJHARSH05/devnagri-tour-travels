import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { routesByCity } from "@/constants/taxi-tours";
import { ArrowRightLeft, Search } from "lucide-react";
import { useState } from "react";
const SearchTaxi = ({
  setTaxiList,
}: {
  setTaxiList?: React.Dispatch<React.SetStateAction<typeof routesByCity>>;
}) => {
  const [input, setinput] = useState({
    from: "",
    to: "",
  });

  // Search Taxi
  const searchTaxi = () => {
    if (!input.from || !input.to) return;
    const filteredCity = routesByCity.filter((city) => {
      return city.cityName === input.from;
    });
    const filteredRoutes = filteredCity[0].routes.filter((route) => {
      return route.to === input.to;
    });
    const filteredData = [
      {
        cityName: filteredCity[0].cityName,
        routes: filteredRoutes,
      },
    ];
    setTaxiList?.(filteredData);
  };
  return (
    <div className="gradient-div h-full border border-white/50 shadow-lg animate-fade-up">
      <div className="flex items-center justify-center gap-2 my-3">
        <Search className="size-4 text-primary" />
        <h5 className="text-center">Search for a Taxi</h5>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
        <div className="flex flex-col gap-2">
          <Label className="text-dark-200">From</Label>
          <Select
            onValueChange={(value) => setinput({ ...input, from: value })}
          >
            <SelectTrigger className="w-full bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:border-primary/40">
              <SelectValue placeholder="Select Pickup Location" />
            </SelectTrigger>
            <SelectContent className="gradient-border shadow-xl border border-white/70">
              {routesByCity.map((city, index) => (
                <SelectItem key={index} value={city.cityName}>
                  {city.cityName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>{" "}
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-dark-200">To</Label>
          <Select
            defaultValue=""
            onValueChange={(value) => setinput({ ...input, to: value })}
          >
            <SelectTrigger className="w-full bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:border-primary/40">
              <SelectValue
                placeholder="Select Dropoff Location"
                className="placeholder:text-white text-white"
              />
            </SelectTrigger>
            <SelectContent className="gradient-border shadow-xl border border-white/70">
              {input.from &&
                routesByCity
                  .filter((city) => city.cityName === input.from)[0]
                  .routes.map((route, index) => (
                    <SelectItem key={index} value={route.to}>
                      {route.to}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>{" "}
        </div>
        <div className="flex flex-col gap-2 max-sm:col-span-2">
          <Button
            className="w-full primary-button mt-auto flex items-center gap-2 transition-all duration-300 hover:scale-[1.01]"
            onClick={searchTaxi}
          >
            Find Rides <ArrowRightLeft className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchTaxi;
