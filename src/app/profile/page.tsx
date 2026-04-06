"use client";

import ChangePasswordDialog from "@/components/shared/ChangePasswordDialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/store/user.store";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPinned,
  Phone,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProfilePage = () => {
  const { user, isAdmin, logout, isCheckingUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isCheckingUser && !user) {
      router.replace("/login");
    }
  }, [isCheckingUser, user, router]);

  if (isCheckingUser) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading profile...</p>
      </div>
    );
  }

  if (!user) return null;

  const initials = user.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-[calc(100vh-100px)] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <Card className="gradient-border border-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-semibold">My Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="size-14 border-2 border-slate-200">
                  <AvatarFallback className="text-base font-semibold">
                    {initials || "DU"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Badge className="w-fit bg-slate-800 text-white">
                {isAdmin ? "Admin Account" : "Traveler Account"}
              </Badge>
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border p-4">
                <p className="mb-2 text-sm text-muted-foreground">Name</p>
                <div className="flex items-center gap-2 font-medium">
                  <User className="size-4 text-slate-600" />
                  <span>{user.name}</span>
                </div>
              </div>
              <div className="rounded-xl border p-4">
                <p className="mb-2 text-sm text-muted-foreground">Email</p>
                <div className="flex items-center gap-2 font-medium break-all">
                  <Mail className="size-4 text-slate-600" />
                  <span>{user.email}</span>
                </div>
              </div>
              <div className="rounded-xl border p-4">
                <p className="mb-2 text-sm text-muted-foreground">Mobile</p>
                <div className="flex items-center gap-2 font-medium">
                  <Phone className="size-4 text-slate-600" />
                  <span>{user.mobile || "Not provided"}</span>
                </div>
              </div>
              <div className="rounded-xl border p-4">
                <p className="mb-2 text-sm text-muted-foreground">Security</p>
                <div className="flex items-center gap-2 font-medium">
                  <Shield className="size-4 text-slate-600" />
                  <span>Password protected account</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <ChangePasswordDialog />
              <Button
                variant="outline"
                onClick={() => {
                  logout();
                  router.replace("/login");
                }}
              >
                <LogOut className="size-4 text-red-500" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold">Quick Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/bookings" className="rounded-xl border p-4 transition-colors hover:bg-slate-50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="size-4" />
                  Manage
                </div>
                <p className="mt-1 font-semibold">My Bookings</p>
              </Link>

              <Link href="/tours" className="rounded-xl border p-4 transition-colors hover:bg-slate-50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPinned className="size-4" />
                  Explore
                </div>
                <p className="mt-1 font-semibold">Tour Packages</p>
              </Link>

              <Link href="/taxi-services" className="rounded-xl border p-4 transition-colors hover:bg-slate-50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPinned className="size-4" />
                  Travel
                </div>
                <p className="mt-1 font-semibold">Taxi Services</p>
              </Link>

              {isAdmin && (
                <Link href="/admin" className="rounded-xl border p-4 transition-colors hover:bg-slate-50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <LayoutDashboard className="size-4" />
                    Manage
                  </div>
                  <p className="mt-1 font-semibold">Admin Panel</p>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;