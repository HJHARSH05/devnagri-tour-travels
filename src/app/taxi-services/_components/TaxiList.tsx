import { routesByCity } from "@/constants/taxi-tours";
import { ArrowRight, CheckCircle, Clock, MapPin } from "lucide-react";
import { Button } from "../../../components/ui/button";
import TaxiBookingModal from "./TaxiBookingModal";

const TaxiList = ({ taxiList }: { taxiList: typeof routesByCity }) => {
  return (
    <div className="my-8 animate-fade-in">
      <div className="flex items-center justify-center">
        <h2 className="text-2xl font-bold">Available Taxi Routes</h2>
      </div>
      <div className="flex flex-col gap-6 mt-6">
        {taxiList.length > 0 ? (
          taxiList.map((item, index) => (
            <div
              className="flex flex-col gap-4 w-[95%] md:max-w-[90%] xl:max-w-[76%] mx-auto animate-fade-up"
              style={{ animationDelay: `${index * 120}ms` }}
              key={index}
            >
              <div className="mt-2 border-b-2 border-black/25 pb-2">
                <h4 className="text-xl font-medium">
                  From
                  <span className="text-gradient text-2xl font-bold">
                    {` ${item.cityName}`}
                  </span>
                </h4>
              </div>
              <div className="flex flex-col gap-3">
                {item.routes.map((route, idx) => (
                  <div
                    className="flex items-center flex-col sm:flex-row justify-between p-4 border border-slate-200 rounded-2xl bg-white/80 backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                    key={idx}
                  >
                    <div className="flex flex-col gap-2">
                      <span className="flex items-center gap-1 text-sm font-semibold">
                        <MapPin className="size-4" />
                        {item.cityName} <ArrowRight className="size-3" /> {route.to}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-slate-100 px-2 py-1 rounded-full w-fit">
                        <Clock className="size-4" />
                        {route.time}hrs - {route.distance}kms
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                        <CheckCircle className="size-4" />
                        {route.distance}kms included | {route.extraPrice}/km
                        after that
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 items-center justify-center max-sm:mt-4">
                      <div className="flex flex-col mx-auto items-center md:items-start">
                        <h6 className="text-xs font-semibold uppercase tracking-wide text-dark-200">
                          Fare Range
                        </h6>
                        <h4 className="font-bold text-xl text-gradient">
                          ₹{route.price}
                        </h4>
                      </div>
                      <TaxiBookingModal
                        source={item.cityName}
                        destination={route.to}
                        price={route.price}
                      >
                        <Button
                          size="sm"
                          className="primary-button sm:w-fit transition-all duration-300 hover:scale-[1.02]"
                        >
                          Book Now
                        </Button>
                      </TaxiBookingModal>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center mt-5 gradient-div py-8 max-w-xl mx-auto animate-fade-up">
            <h3 className="!text-dark-200 !hover:text-dark-200">No Taxi Found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxiList;
