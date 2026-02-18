import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

const SkeletonGroup = () => {
  return (
    <div className="w-full max-w-3xl px-4 animate-fade-up">
      <div className="gradient-border relative overflow-hidden shadow-xl">
        <div className="absolute -top-12 -right-12 size-36 rounded-full bg-primary/10 animate-float-soft" />
        <div className="absolute -bottom-14 -left-10 size-40 rounded-full bg-primary/10 animate-float-soft-delay" />

        <div className="relative z-10 gradient-div flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src="/devnagri.png"
              width={72}
              height={72}
              alt="DEVNAGRI-TOURISM Logo"
              className="rounded-full shadow-md animate-float-soft"
              priority
            />
            <h4 className="text-base sm:text-lg font-bold text-gradient text-center tracking-wide">
              DEVNAGRI-TOURISM
            </h4>
            <p className="text-sm text-dark-200 font-medium animate-pulse text-center">
              Welcome to DEVNAGRI-TOURISM, where we bring you the best of Uttarakhand.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Skeleton className="rounded-full size-14 shrink-0" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-5 rounded-lg w-40" />
              <Skeleton className="h-3 rounded-lg w-64 max-w-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Skeleton className="h-16 rounded-xl" />
            <Skeleton className="h-16 rounded-xl" />
            <Skeleton className="h-16 rounded-xl" />
          </div>

          <div className="bg-white/70 rounded-2xl p-4 border border-white/60">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 rounded-lg w-[85%]" />
              <Skeleton className="h-4 rounded-lg w-[95%]" />
              <Skeleton className="h-4 rounded-lg w-[72%]" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <Skeleton className="h-11 rounded-xl" />
                <Skeleton className="h-11 rounded-xl" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Skeleton className="h-3 rounded-lg w-52" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonGroup;
