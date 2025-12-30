import { routesByCity } from "@/constants/taxi-tours";
import { CheckCircle, Clock, MapPin } from "lucide-react";
import { Button } from "../../../components/ui/button";
import TaxiBookingModal from "./TaxiBookingModal";

const TaxiList = ({ taxiList }: { taxiList: typeof routesByCity }) => {
  return (
    <div className="my-4">
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Taxi List</h1>
      </div>
      <div className="flex flex-col gap-4">
        {taxiList.length > 0 ? (
          taxiList.map((item, index) => (
            <div
              className="flex flex-col gap-4 w-[90%] md:max-w-[85%] xl:max-w-[75%] mx-auto"
              key={index}
            >
              <div className="mt-5 border-b-4 border-black/50">
                <h4 className="text-xl font-medium">
                  From{" "}
                  <span className="text-gradient text-2xl font-bold">
                    {" "}
                    {item.cityName}
                  </span>
                </h4>
              </div>
              <div className="flex flex-col gap-3">
                {item.routes.map((route, idx) => (
                  <div
                    className="flex items-center flex-col sm:flex-row justify-between p-3 border-2 border-gray-300 rounded-lg shadow-xl"
                    key={idx}
                  >
                    <div className="flex flex-col gap-2">
                      <span className="flex items-center gap-1 text-sm font-medium">
                        <MapPin className="size-4" />
                        {item.cityName} - {route.to}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
                        <Clock className="size-4" />
                        {route.time}hrs - {route.distance}kms
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-green-500">
                        <CheckCircle className="size-4" />
                        {route.distance}kms included | {route.extraPrice}/km
                        after that
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 items-center justify-center max-sm:mt-4">
                      <div className="flex flex-col mx-auto">
                        <h6 className="text-sm font-medium">Fare Range</h6>
                        <h4 className="font-bold text-xl text-gradient">
                          ₹{route.price}
                        </h4>
                      </div>
                      <TaxiBookingModal
                        source={item.cityName}
                        destination={route.to}
                        price={route.price}
                      >
                        <Button size="sm" className="primary-button sm:w-fit">
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
          <div className="flex items-center justify-center mt-5">
            <h2 className="text-2xl font-bold">No Taxi Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxiList;
