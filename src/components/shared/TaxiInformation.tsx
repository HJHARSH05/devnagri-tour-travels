import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TaxiTypes } from "@/types";

const TaxiInformation = ({ Taxi }: { Taxi: TaxiTypes | null }) => {
  return (
    Taxi && (
      <HoverCard>
        <HoverCardTrigger className="flex justify-center" asChild>
          <Button variant="link" size={"sm"} className="cursor-pointer mx-auto">
            {Taxi.vehicleNumber}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-fit">
          <div className="flex justify-between items-center gap-1">
            <Avatar className="border-2 border-gray-500">
              <AvatarImage src="/devnagri.png" />
              <AvatarFallback>
                {(Taxi.driver ?? "")[0] +
                  (Taxi.driver ?? "").split(" ")[1]?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{Taxi.vehicleNumber}</h4>
              <p className="text-sm font-medium">{Taxi.model}</p>
              <p className="text-sm font-medium">{Taxi.seats}</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    )
  );
};

export default TaxiInformation;
