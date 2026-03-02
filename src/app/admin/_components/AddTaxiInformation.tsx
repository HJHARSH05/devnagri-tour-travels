import { Button } from "@/components/ui/button";
import {
  DialogClose,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
      <DialogContent className="max-w-2xl overflow-hidden p-0">
        <DialogHeader className="border-b bg-gradient-to-r from-slate-50 via-blue-50 to-slate-100 px-6 py-5">
          <DialogTitle className="text-xl font-semibold text-slate-800">
            Add Taxi Information
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Fill in taxi and driver details to add a new vehicle.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 px-6 py-5">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Vehicle Details
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1 sm:col-span-2">
                <Label className="text-slate-700">Vehicle Number</Label>
                <Input
                  type="text"
                  placeholder="e.g. MP09AB1234"
                  className="h-10 bg-white"
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
                <Label className="text-slate-700">Taxi Model</Label>
                <Input
                  placeholder="e.g. Innova Crysta"
                  className="h-10 bg-white"
                  value={input.model ?? ""}
                  onChange={(e) => {
                    setinput({ ...input, model: e.target.value });
                  }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-slate-700">Seats</Label>
                <Input
                  type="number"
                  min={1}
                  className="h-10 bg-white"
                  value={input.seats ?? 1}
                  onChange={(e) => {
                    setinput({ ...input, seats: Number(e.target.value) });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Driver Details
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <Label className="text-slate-700">Driver Name</Label>
                <Input
                  placeholder="e.g. Rakesh Sharma"
                  className="h-10 bg-white"
                  value={input.driver ?? ""}
                  onChange={(e) => {
                    setinput({ ...input, driver: e.target.value });
                  }}
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-slate-700">Driver Number</Label>
                <Input
                  placeholder="e.g. 9876543210"
                  className="h-10 bg-white"
                  value={input.driverPhoneNumber ?? ""}
                  onChange={(e) => {
                    setinput({ ...input, driverPhoneNumber: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t bg-slate-50 px-6 py-4 sm:justify-between">
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            className="primary-button h-10 w-full sm:w-auto sm:px-8"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin text-white" /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaxiInformation;
