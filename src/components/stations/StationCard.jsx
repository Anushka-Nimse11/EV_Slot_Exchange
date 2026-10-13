import { ArrowRight, Heart, MapPin, Star } from "lucide-react";

import Button from "../layout/Button";

const money = (n) => `₹${n.toLocaleString("en-IN")}`;

function StationCard({ station, onSelect }) {
  return (
    <article
      className="lift overflow-hidden rounded-2xl border border-[hsl(var(--card-border))] bg-[hsl(var(--card))]"
      data-testid={`card-station-${station.id}`}
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={station.image}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-lg bg-[hsl(var(--accent))] px-2 py-1 text-xs font-bold text-[hsl(var(--secondary))]">
          {station.distance} away
        </span>
        <button
          className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-[hsl(var(--secondary))]"
          aria-label={`Save ${station.name}`}
          data-testid={`button-favorite-${station.id}`}
        >
          <Heart size={16} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-bold">{station.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
              <MapPin size={12} />
              {station.address}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1 text-xs font-bold">
            <Star
              size={13}
              fill="currentColor"
              className="text-[hsl(var(--accent))]"
            />
            {station.rating}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-[hsl(var(--border))] pt-3">
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            <b className="text-[hsl(var(--foreground))]">
              {station.chargers.filter((c) => c.status === "Available").length}
            </b>{" "}
            available · from {money(station.pricePerKwh)}/kWh
          </span>
          <Button
            variant="soft"
            className="px-3 py-2 text-xs"
            onClick={onSelect}
            data-testid={`button-view-station-${station.id}`}
          >
            View <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </article>
  );
}

export default StationCard;
