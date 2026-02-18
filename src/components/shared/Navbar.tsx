"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavData } from "@/constants/navdata";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/user.store";
import { motion } from "framer-motion";
import { ChevronRight, LogOut, Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const Navbar = () => {
  const [hidden, setHidden] = useState(true);
  const path = usePathname();
  const { user } = useUserStore();

  const isActiveLink = (url: string) => {
    if (url === "/") return path === "/";
    return path.startsWith(url);
  };

  useEffect(() => {
    setHidden(true);
  }, [path]);

  return (
    <div className="sticky top-0 z-50 px-3 py-2 md:px-4 max-w-[1800px] mx-auto border-b border-white/10 backdrop-blur-sm opacity-85">
      <div className="flex justify-between items-center bg-white/70 rounded-2xl px-3 py-2 md:px-5 md:py-3 shadow-lg border border-slate-100/80">
        <Link href={"/"}>
          <Image
            src={"/devnagri.png"}
            height={1000}
            width={1000}
            alt="Devnagri Tourism Logo"
            className="cursor-pointer w-24 md:w-28"
          />
        </Link>

        {/* Mobile View */}
        <div className="flex items-center gap-2 md:hidden">
          {user && <UserDropdownIcon />}

          {/* Mobile View */}
          <div className="md:hidden flex flex-col">
            <Button
              onClick={() => setHidden(!hidden)}
              variant={"ghost"}
              size={"icon"}
              className="rounded-xl border border-slate-200 hover:bg-gradient-to-b from-light-blue-100 to-light-blue-200"
            >
              {!hidden ? (
                <X className="size-5 text-slate-700" />
              ) : (
                <Menu className="size-5 text-slate-700" />
              )}
            </Button>
          </div>
        </div>

        {/* Desktop view */}
        <div className="md:flex items-center justify-center gap-2 hidden">
          {NavData.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className={cn(
                "px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                isActiveLink(item.url)
                  ? "bg-gradient-to-r from-light-blue-100 to-light-blue-200 text-slate-900 shadow-sm"
                  : "text-dark-200 hover:bg-slate-100"
              )}
            >
              {item.title}
            </Link>
          ))}
          {user ? (
            <UserDropdownIcon />
          ) : (
            <Link href={"/login"}>
              <Button className="primary-button w-fit px-5">Login</Button>
            </Link>
          )}
        </div>
      </div>

      <motion.div
        className="md:hidden overflow-hidden"
        initial={false}
        animate={{
          height: hidden ? 0 : "auto",
          opacity: hidden ? 0 : 1,
          marginTop: hidden ? 0 : 8,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="rounded-2xl bg-white/95 shadow-lg border border-slate-100 p-2 flex flex-col gap-1">
          {NavData.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                isActiveLink(item.url)
                  ? "bg-gradient-to-r from-light-blue-100 to-light-blue-200 text-slate-900"
                  : "text-dark-200 hover:bg-slate-100"
              )}
            >
              {item.title}
              <ChevronRight className="size-4 opacity-70" />
            </Link>
          ))}

          {!user && (
            <Link href={"/login"}>
              <Button className="text-white w-full primary-button mt-1">
                Login
              </Button>
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;

const UserDropdownIcon = () => {
  const { isAdmin, logout, user } = useUserStore();

  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "DU";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-slate-200 hover:bg-slate-100"
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="size-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/bookings">My Bookings</Link>
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem>
            <Link href="/admin">Admin Panel</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => logout()}>
          Logout <LogOut className="ml-auto text-red-500" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
