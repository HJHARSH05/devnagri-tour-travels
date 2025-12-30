import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaxiInputType } from "@/types";
import { Loader } from "lucide-react";
import { useState } from "react";
import useAdminHook from "../_hook/admin.hooks";

const AddTaxiInformation = () => {
  const [input, setinput] = useState<TaxiInputType>({
    driver: "",
    driverPhoneNumber: "",
    id: "",
    model: "",
    seats: 1,
    vehicleNumber: "",
  });
  const [loading, setloading] = useState(false);
  const [open, setopen] = useState(false);
  const { addTaxiInformation } = useAdminHook();

  const handleSubmit = async () => {
    try {
      setloading(true);
      const res = await addTaxiInformation(input);
      if (res) {
        setinput({
          driver: "",
          driverPhoneNumber: "",
          id: "",
          model: "",
          seats: 1,
          vehicleNumber: "",
        });
        setopen(false);
      }
    } catch (error) {
    } finally {
      setloading(false);
    }
  };

  return (
    <Dialog onOpenChange={setopen} open={open}>
      <DialogTrigger asChild className="mt-5">
        <Button className="primary-button w-1/3">Add Taxi</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Taxi Information?</DialogTitle>
          <DialogDescription>
            Add information of the taxi you want to add.
          </DialogDescription>
        </DialogHeader>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1 md:col-span-2">
            <Label>Vehicle Number</Label>
            <Input
              type="text"
              value={input.vehicleNumber ?? ""}
              onChange={(e) => {
                setinput({
                  ...input,
                  vehicleNumber: e.target.value,
                  id: e.target.value.replaceAll(" ", "_"),
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Taxi Model</Label>
            <Input
              value={input.model ?? ""}
              onChange={(e) => {
                setinput({ ...input, model: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Driver Name</Label>
            <Input
              value={input.driver ?? ""}
              onChange={(e) => {
                setinput({ ...input, driver: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Driver Number</Label>
            <Input
              value={input.driverPhoneNumber ?? ""}
              onChange={(e) => {
                setinput({ ...input, driverPhoneNumber: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Seats</Label>
            <Input
              type="number"
              min={1}
              value={input.seats ?? 1}
              onChange={(e) => {
                setinput({ ...input, seats: Number(e.target.value) });
              }}
            />
          </div>
        </div>
        <Button onClick={handleSubmit} className="primary-button w-full">
          {loading ? <Loader className="animate-spin text-white" /> : "Submit"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaxiInformation;
