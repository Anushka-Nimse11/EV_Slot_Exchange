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
  Zap,
  Search,
  MessageCircle,
} from "lucide-react";

import Logo from "./Logo";
import Avatar from "./Avatar";

function Shell({ children, exchange = [] }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const nav = [
    ["/", "Home", Home],
    ["/stations", "Find a charger", MapPin],
    ["/exchange", "Slot exchange", ArrowRight],
    ["/bookings", "My bookings", CalendarDays],
    ["/profile", "Profile", UserRound],
  ];

  // Count exchange listings that are still available.
  const exchangeCount = Array.isArray(exchange)
    ? exchange.filter((item) =>
        ["listed", "available"].includes(
          String(item.status ?? "").toLowerCase(),
        ),
      ).length
    : 0;

  // Page titles for the header.
  const pageTitles = {
    "/": "Dashboard",
    "/stations": "Find a Charger",
    "/exchange": "Slot Exchange",
    "/bookings": "My Bookings",
    "/profile": "My Profile",
    "/login": "Login",
    "/register": "Create Account",
  };

  const pageTitle =
    pageTitles[location] ||
    (location.startsWith("/stations/")
      ? "Station Details"
      : location.startsWith("/book")
        ? "Book a Charging Slot"
        : "EV Slot Exchange");

  // Keep the parent menu active on detail pages.
  const isActive = (href) => {
    if (href === "/") return location === "/";

    if (href === "/stations") {
      return location === "/stations" || location.startsWith("/stations/");
    }

    return location === href;
  };

  const closeMenu = () => setOpen(false);

  return (
    <div className="noise min-h-[100dvh] shell-bg">
      {/* Mobile backdrop: tap outside to close */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[250px] flex-col bg-[hsl(var(--secondary))] px-5 py-6 text-white shadow-2xl transition-transform duration-300 ease-in-out md:z-40 md:translate-x-0 md:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <Logo />

          <button
            type="button"
            className="rounded-lg p-2 transition-colors hover:bg-white/10 md:hidden"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>

        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-white/40">
          Your journey
        </p>

        <nav className="space-y-1" aria-label="Main navigation">
          {nav.map(([href, label, Icon]) => {
            const active = isActive(href);

            return (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center gap-3 rounded-xl border-l-2 px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "border-[hsl(var(--accent))] bg-[hsl(var(--primary))] text-white shadow-sm"
                    : "border-transparent text-white/65 hover:bg-white/10 hover:text-white"
                }`}
                data-testid={`link-nav-${label}`}
              >
                <Icon
                  size={18}
                  className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                />

                <span>{label}</span>

                {label === "Slot exchange" && (
                  <span
                    className="ml-auto rounded-full bg-[hsl(var(--accent))] px-2 py-0.5 text-[10px] font-bold text-[hsl(var(--secondary))]"
                    title={`${exchangeCount} available exchange listings`}
                  >
                    {exchangeCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar information card */}
        <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-[hsl(var(--accent))]">
            <ShieldCheck size={17} />
            <span className="text-xs font-bold">Charge with confidence</span>
          </div>

          <p className="text-xs leading-relaxed text-white/60">
            Find charging stations, reserve your time, and exchange slots with
            confidence.
          </p>

          <Link
            href="/profile"
            onClick={closeMenu}
            className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-white transition-colors hover:text-[hsl(var(--accent))]"
          >
            Account settings <ArrowRight size={12} />
          </Link>
        </div>
      </aside>

      {/* Main page area */}
      <div className="md:pl-[250px]">
        <header className="sticky top-0 z-30 border-b border-[hsl(var(--border)/.7)] bg-[hsl(var(--background)/.90)] px-4 py-3 backdrop-blur-xl md:px-8">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3">
            {/* Mobile menu button */}
            <button
              type="button"
              className="rounded-xl p-2 transition-colors hover:bg-[hsl(var(--muted))] md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu size={21} />
            </button>

            {/* Mobile logo */}
            <div className="md:hidden">
              <Logo />
            </div>

            {/* Dynamic page title */}
            <div className="hidden min-w-0 md:block">
              <h1 className="truncate text-lg font-bold">{pageTitle}</h1>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Your smarter EV charging companion
              </p>
            </div>

            {/* Header actions */}
            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <Link
                href="/stations"
                onClick={closeMenu}
                aria-label="Find a charging station"
                title="Find a charger"
                className="rounded-xl p-2.5 transition-colors hover:bg-[hsl(var(--muted))]"
              >
                <Search size={19} />
              </Link>

              <button
                type="button"
                className="rounded-xl p-2.5 transition-colors hover:bg-[hsl(var(--muted))]"
                onClick={() => setHelpOpen(true)}
                aria-label="Help and support"
                title="Help and support"
                data-testid="button-help"
              >
                <CircleHelp size={19} />
              </button>

              <Link
                href="/profile"
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-[hsl(var(--muted))]"
                data-testid="link-header-profile"
              >
                <Avatar small />
                <span className="hidden text-sm font-bold lg:inline">
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

      {/* Help dialog */}
      {helpOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setHelpOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-dialog-title"
            className="w-full max-w-md rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[hsl(var(--muted))] p-3">
                  <CircleHelp size={23} />
                </div>

                <div>
                  <h2 id="help-dialog-title" className="text-lg font-bold">
                    Help & Support
                  </h2>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    EV Slot Exchange
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                className="rounded-lg p-2 hover:bg-[hsl(var(--muted))]"
                aria-label="Close help dialog"
              >
                <X size={19} />
              </button>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              Need help using the app? Choose a section to get started.
            </p>

            <div className="space-y-3">
              <Link
                href="/stations"
                onClick={() => setHelpOpen(false)}
                className="flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] p-3 transition-colors hover:bg-[hsl(var(--muted))]"
              >
                <MapPin size={19} />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Find a charger</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    Explore charging stations
                  </p>
                </div>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/bookings"
                onClick={() => setHelpOpen(false)}
                className="flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] p-3 transition-colors hover:bg-[hsl(var(--muted))]"
              >
                <CalendarDays size={19} />
                <div className="flex-1">
                  <p className="text-sm font-semibold">My bookings</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    View your charging reservations
                  </p>
                </div>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/exchange"
                onClick={() => setHelpOpen(false)}
                className="flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] p-3 transition-colors hover:bg-[hsl(var(--muted))]"
              >
                <Zap size={19} />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Slot exchange</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    Explore available exchanged slots
                  </p>
                </div>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/profile"
                onClick={() => setHelpOpen(false)}
                className="flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] p-3 transition-colors hover:bg-[hsl(var(--muted))]"
              >
                <MessageCircle size={19} />
                <div className="flex-1">
                  <p className="text-sm font-semibold">Account support</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    Open your profile settings
                  </p>
                </div>
                <ArrowRight size={16} />
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setHelpOpen(false)}
              className="mt-5 w-full rounded-xl bg-[hsl(var(--primary))] px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Close
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

export default Shell;
