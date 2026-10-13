import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  CalendarDays,
  CircleHelp,
  Home,
  MapPin,
  Menu,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

import Logo from "./Logo";
import Avatar from "./Avatar";

function Shell({ children }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const nav = [
    ["/", "Home", Home],
    ["/stations", "Find a charger", MapPin],
    ["/exchange", "Slot exchange", ArrowRight],
    ["/bookings", "My bookings", CalendarDays],
    ["/profile", "Profile", UserRound],
  ];
  return (
    <div className="noise min-h-[100dvh] shell-bg">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[250px] flex-col bg-[hsl(var(--secondary))] px-5 py-6 text-white transition-transform md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-10 flex items-center justify-between">
          <Logo />
          <button
            className="mobile-only rounded-lg p-1 hover:bg-white/10"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-white/40">
          Your journey
        </p>
        <nav className="space-y-1">
          {nav.map(([href, label, Icon]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${location === href ? "bg-[hsl(var(--primary))]" : "text-white/65 hover:bg-white/10 hover:text-white"}`}
              data-testid={`link-nav-${label}`}
            >
              <Icon size={18} />
              {label}
              {label === "Slot exchange" && (
                <span className="ml-auto rounded-full bg-[hsl(var(--accent))] px-1.5 py-0.5 text-[10px] font-bold text-[hsl(var(--secondary))]">
                  3
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-[hsl(var(--accent))]">
            <ShieldCheck size={17} />
            <span className="text-xs font-bold">Charge with confidence</span>
          </div>
          <p className="text-xs leading-relaxed text-white/50">
            Every booking is protected, with clear prices and verified stations.
          </p>
          <Link
            href="/profile"
            className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-white"
          >
            Account settings <ArrowRight size={12} />
          </Link>
        </div>
      </aside>
      <div className="md:pl-[250px]">
        <header className="sticky top-0 z-30 border-b border-[hsl(var(--border)/.7)] bg-[hsl(var(--background)/.88)] px-4 py-3 backdrop-blur-xl md:px-8">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between">
            <button
              className="mobile-only rounded-xl p-2"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={21} />
            </button>
            <div className="mobile-only">
              <Logo />
            </div>
            <span className="desktop-only text-sm font-semibold text-[hsl(var(--muted-foreground))]">
              {location === "/"
                ? "Tuesday, 18 June 2024"
                : location.slice(1).replace("-", " ")}
            </span>
            <div className="flex items-center gap-3">
              <button
                className="rounded-xl p-2.5 hover:bg-[hsl(var(--muted))]"
                aria-label="Help and support"
                data-testid="button-help"
              >
                <CircleHelp size={19} />
              </button>
              <Link
                href="/profile"
                className="flex items-center gap-2"
                data-testid="link-header-profile"
              >
                <Avatar small />
                <span className="desktop-only text-sm font-bold">
                  Aarav Mehta
                </span>
              </Link>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 md:py-9">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Shell;
