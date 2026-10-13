import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Check, Zap } from "lucide-react";

import Logo from "../components/layout/Logo";
import Button from "../components/layout/Button";

function Auth({ mode }) {
  const [, navigate] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="noise flex min-h-[100dvh] bg-[hsl(var(--secondary))]">
      <div className="hidden w-[44%] flex-col justify-between p-10 text-white md:flex">
        <Logo />
        <div className="max-w-sm">
          <span className="mb-5 grid size-12 place-items-center rounded-2xl bg-[hsl(var(--accent))] text-[hsl(var(--secondary))]">
            <Zap size={25} strokeWidth={3} />
          </span>
          <h1 className="font-display text-5xl font-bold leading-[1.05]">
            Charging,
            <br />
            <span className="text-[hsl(var(--accent))]">in sync.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/55">
            The calmer way to keep your EV moving through Nashik and Pune.
          </p>
        </div>
        <p className="text-xs text-white/35">© 2024 ChargeMate Mobility</p>
      </div>
      <div className="flex flex-1 items-center justify-center bg-[hsl(var(--background))] p-5 md:p-10">
        <div className="w-full max-w-md">
          {submitted ? (
            <div className="text-center rise">
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-[hsl(var(--primary))] text-white">
                <Check size={30} />
              </div>
              <h1 className="mt-6 font-display text-3xl font-bold">
                {mode === "login" ? "Welcome back." : "Your account is ready."}
              </h1>
              <Button
                className="mt-7 w-full"
                onClick={() => navigate("/")}
                data-testid="button-auth-continue"
              >
                Continue to ChargeMate <ArrowRight size={16} />
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-8 md:hidden">
                <Logo />
              </div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[hsl(var(--primary))]">
                {mode === "login" ? "Welcome back" : "Get moving"}
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold">
                {mode === "login"
                  ? "Your next charge is close."
                  : "Join the better charging rhythm."}
              </h1>
              <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">
                {mode === "login"
                  ? "Sign in to see your bookings and nearby availability."
                  : "Create an account to book chargers and exchange slots."}
              </p>
              <form
                className="mt-8 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                {mode === "register" && (
                  <label className="block text-xs font-bold">
                    Full name
                    <input
                      required
                      placeholder="Aarav Mehta"
                      className="mt-2 w-full rounded-xl border bg-[hsl(var(--card))] p-3.5 text-sm"
                      data-testid="input-auth-name"
                    />
                  </label>
                )}
                <label className="block text-xs font-bold">
                  Email address
                  <input
                    required
                    type="email"
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border bg-[hsl(var(--card))] p-3.5 text-sm"
                    data-testid="input-auth-email"
                  />
                </label>
                <label className="block text-xs font-bold">
                  Password
                  <input
                    required
                    type="password"
                    minLength={6}
                    placeholder="••••••••"
                    className="mt-2 w-full rounded-xl border bg-[hsl(var(--card))] p-3.5 text-sm"
                    data-testid="input-auth-password"
                  />
                </label>
                <Button
                  type="submit"
                  className="w-full py-3.5"
                  data-testid="button-auth-submit"
                >
                  {mode === "login" ? "Sign in" : "Create account"}{" "}
                  <ArrowRight size={16} />
                </Button>
              </form>
              <p className="mt-7 text-center text-sm text-[hsl(var(--muted-foreground))]">
                {mode === "login"
                  ? "New to ChargeMate? "
                  : "Already have an account? "}
                <Link
                  href={mode === "login" ? "/register" : "/login"}
                  className="font-bold text-[hsl(var(--primary))]"
                  data-testid="link-auth-switch"
                >
                  {mode === "login" ? "Create account" : "Sign in"}
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
