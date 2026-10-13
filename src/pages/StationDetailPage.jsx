import { useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowRight,
  ChevronLeft,
  Clock3,
  MapPin,
  MessageCircle,
  PlugZap,
  Star,
  Zap,
} from "lucide-react";

import Button from "../components/layout/Button";
import Stars from "../components/stations/Stars";

const money = (n) => `₹${n.toLocaleString("en-IN")}`;

function StationDetail({ station, toast }) {
  const [, navigate] = useLocation();
  const [selected, setSelected] = useState(0);
  return (
    <>
      <button
        onClick={() => navigate("/stations")}
        className="mb-6 flex items-center gap-2 text-sm font-bold text-[hsl(var(--muted-foreground))]"
        data-testid="button-back-stations"
      >
        <ChevronLeft size={17} /> All stations
      </button>
      <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
        <div>
          <div className="relative h-64 overflow-hidden rounded-3xl md:h-80">
            <img
              src={station.image}
              alt={station.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent" />
            <div className="absolute bottom-5 left-5 text-white md:left-7">
              <p className="mb-2 text-sm font-bold">
                <span className="rounded-full bg-[hsl(var(--accent))] px-2 py-1 text-xs text-[hsl(var(--secondary))]">
                  Verified
                </span>{" "}
                {station.distance} away
              </p>
              <h1 className="font-display text-3xl font-bold">
                {station.name}
              </h1>
              <p className="mt-1 flex items-center gap-1 text-sm text-white/75">
                <MapPin size={14} />
                {station.address}
              </p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 rounded-2xl border bg-[hsl(var(--card))] p-4">
            <div className="border-r text-center">
              <p className="flex justify-center gap-1 text-lg font-bold">
                <Star
                  size={17}
                  fill="currentColor"
                  className="mt-1 text-[hsl(var(--accent))]"
                />
                {station.rating}
              </p>
              <p className="mt-1 text-[10px] uppercase text-[hsl(var(--muted-foreground))]">
                {station.reviewCount} reviews
              </p>
            </div>
            <div className="border-r text-center">
              <p className="text-lg font-bold">{money(station.pricePerKwh)}</p>
              <p className="mt-1 text-[10px] uppercase text-[hsl(var(--muted-foreground))]">
                per kWh
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">
                {
                  station.chargers.filter((c) => c.status === "Available")
                    .length
                }
                /{station.chargers.length}
              </p>
              <p className="mt-1 text-[10px] uppercase text-[hsl(var(--muted-foreground))]">
                available
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="font-display text-xl font-bold">What you’ll find</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {station.amenities.map((x) => (
                <span
                  key={x}
                  className="rounded-full bg-[hsl(var(--muted))] px-3 py-2 text-xs font-semibold"
                >
                  {x}
                </span>
              ))}
              <span className="rounded-full bg-[hsl(var(--muted))] px-3 py-2 text-xs font-semibold">
                {station.openHours}
              </span>
            </div>
          </div>
        </div>
        <div className="h-fit rounded-3xl border bg-[hsl(var(--card))] p-5 md:p-6">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]">
                Reserve a charger
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold">
                Pick your power.
              </h2>
            </div>
            <PlugZap size={20} />
          </div>
          <div className="space-y-2">
            {station.chargers.map((c, i) => (
              <button
                key={i}
                onClick={() => c.status === "Available" && setSelected(i)}
                disabled={c.status !== "Available"}
                className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${selected === i ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/.08)]" : ""} ${c.status !== "Available" ? "cursor-not-allowed opacity-50" : ""}`}
                data-testid={`button-charger-${i}`}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-[hsl(var(--muted))]">
                    <Zap size={17} />
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{c.type}</span>
                    <span className="block text-xs text-[hsl(var(--muted-foreground))]">
                      {c.speed} · {c.connector}
                    </span>
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase text-[hsl(var(--primary))]">
                  {c.status}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-xl bg-[hsl(var(--muted)/.7)] p-3 text-xs text-[hsl(var(--muted-foreground))]">
            <Clock3 size={14} className="mr-1 inline" /> Typical session: 35–50
            minutes
          </div>
          <Button
            className="mt-5 w-full py-3.5"
            onClick={() => {
              const charger = station.chargers[selected];

              if (!charger || charger.status !== "Available") {
                toast("Please select an available charger");
                return;
              }

              toast("Charger selected — choose a time next");

              navigate(
                `/book?station=${encodeURIComponent(station.id)}&charger=${selected}`,
              );
            }}
            data-testid="button-reserve-charger"
          >
            Choose date & time <ArrowRight size={16} />
          </Button>
        </div>
      </div>
      <section className="mt-8 max-w-3xl">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]">
              Driver notes
            </p>
            <h2 className="mt-1 font-display text-xl font-bold">
              Good to know
            </h2>
          </div>
          <button
            className="text-sm font-bold text-[hsl(var(--primary))]"
            onClick={() => toast("Review form coming after your next session")}
            data-testid="button-write-review"
          >
            Write a review
          </button>
        </div>
        {station.reviews.map((r, i) => (
          <div
            key={i}
            className="mb-3 rounded-2xl border bg-[hsl(var(--card))] p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold">{r.author}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Stars rating={r.rating} />
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">
                    {r.date}
                  </span>
                </div>
              </div>
              <MessageCircle size={17} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              {r.comment}
            </p>
          </div>
        ))}
      </section>
    </>
  );
}

export default StationDetail;
