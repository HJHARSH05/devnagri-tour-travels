"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/store/user.store";
import {
  Loader,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Signup = () => {
  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [countryCode, setCountryCode] = useState("+91");
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const { signup } = useUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  // signup user
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const res = await signup({
        ...input,
        mobile: input.mobile ? `${countryCode} ${input.mobile}` : "",
      });
      if (res) {
        router.replace("/");
      }
    } catch (error) {
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-100px)] items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute -top-24 -left-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl animate-pulse" />

      <div className="grid w-full max-w-5xl items-stretch gap-6 md:grid-cols-2">
        {/* banner */}
        <div className="relative hidden overflow-hidden rounded-2xl border bg-gradient-to-tr from-slate-400 via-slate-500 to-slate-400 p-8 text-white shadow-lg md:flex md:flex-col md:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
              <Sparkles className="size-4 animate-pulse" />
              Premium travel experiences
            </div>
            <h1 className="text-3xl font-semibold leading-tight ">
              Create your account and start planning your next journey
            </h1>
            <p className="text-sm text-white/70">
              Fast bookings, secure payments, and curated itineraries tailored
              to your needs.
            </p>
          </div>
          <div className="mt-10 space-y-4 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4" />
              Secure login and verified profiles
            </div>
            <div className="flex items-center gap-2">
              <Phone className="size-4" />
              24/7 support with instant updates
            </div>
          </div>
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/10 bg-white/5" />
        </div>
        {/* form */}
        <div className="border-2 gradient-border w-full rounded-2xl bg-background/80 p-6 shadow-xl backdrop-blur md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold ">Sign up</h2>
              <p className="text-sm text-muted-foreground">
                Join the community in under a minute.
              </p>
            </div>
            <div className="rounded-full border p-2 shadow-sm transition-all duration-300 hover:scale-105">
              <Sparkles className="size-4 text-primary animate-pulse" />
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1 w-full">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="pl-9 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/40"
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="space-y-1 w-full">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="pl-9 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/40"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-1 w-full">
              <Label htmlFor="mobile">Mobile</Label>
              <div className="grid grid-cols-[140px_1fr] gap-2">
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="w-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/40">
                    <SelectValue placeholder="+91" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+91">India (+91)</SelectItem>
                    <SelectItem value="+1">USA (+1)</SelectItem>
                    <SelectItem value="+44">UK (+44)</SelectItem>
                    <SelectItem value="+61">Australia (+61)</SelectItem>
                    <SelectItem value="+971">UAE (+971)</SelectItem>
                    <SelectItem value="+65">Singapore (+65)</SelectItem>
                    <SelectItem value="+81">Japan (+81)</SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={input.mobile}
                    onChange={handleChange}
                    placeholder="98765 43210"
                    className="pl-9 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/40"
                    required
                    autoComplete="tel"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1 w-full">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={input.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                  className="pl-9 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/40"
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            <Button
              className="primary-button group w-full justify-center gap-2 transition-all duration-300 hover:translate-y-[-1px] hover:shadow-lg"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                <>
                  Create account
                  <Sparkles className="size-4 transition-transform duration-300 group-hover:rotate-12" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
