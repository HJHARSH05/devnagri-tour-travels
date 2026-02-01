"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/user.store";
import { Loader, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Login = () => {
  const [input, setinput] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const { login } = useUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const res = await login(input);
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

      <div className="grid w-full max-w-5xl items-stretch gap-6 lg:grid-cols-2">
        {/* login banner */}
        <div className="relative hidden max-w-lg mx-auto overflow-hidden rounded-2xl border bg-gradient-to-br from-slate-400 via-slate-300 to-slate-500 p-8 text-white shadow-lg lg:flex md:flex-col md:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
              <Sparkles className="size-4 animate-pulse" />
              Welcome back to Devnagri
            </div>
            <h1 className="text-3xl font-semibold leading-tight">
              Access your bookings, manage trips, and stay in control
            </h1>
            <p className="text-sm text-white/70">
              Secure access to your travel dashboard with a single sign in.
            </p>
          </div>
          <div className="mt-10 space-y-4 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4" />
              Safe and encrypted sign-in
            </div>
            <div className="flex items-center gap-2">
              <Mail className="size-4" />
              Email verification for better security
            </div>
          </div>
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/10 bg-white/5" />
        </div>
        {/* login form */}
        <div className="border-2 gradient-border w-full max-w-lg rounded-2xl bg-background/80 p-6 shadow-xl backdrop-blur md:p-8 ">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Login</h2>
              <p className="text-sm text-muted-foreground">
                Continue your journey in seconds.
              </p>
            </div>
            <div className="rounded-full border p-2 shadow-sm transition-all duration-300 hover:scale-105">
              <Sparkles className="size-4 text-primary animate-pulse" />
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1 w-full">
              <Label htmlFor="email">Email</Label>
              <div className="relative w-full">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-9 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/40"
                  required
                  autoComplete="email"
                />
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
                  placeholder="Enter your password"
                  className="pl-9 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/40"
                  required
                  autoComplete="current-password"
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
                  Login
                  <Sparkles className="size-4 transition-transform duration-300 group-hover:rotate-12" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
