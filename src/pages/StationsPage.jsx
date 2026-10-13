// import { useState } from "react";
// import { useLocation } from "wouter";
// import { Filter, Search, SlidersHorizontal } from "lucide-react";

// import Title from "../components/layout/Title";
// import Button from "../components/layout/Button";
// import StationCard from "../components/stations/StationCard";

// function StationsPage({ stations, toast }) {
//   const [, navigate] = useLocation();
//   const [query, setQuery] = useState("");
//   const [filter, setFilter] = useState("All");
//   const filtered = stations.filter(
//     (s) =>
//       (s.name + s.address).toLowerCase().includes(query.toLowerCase()) &&
//       (filter === "All" ||
//         (filter === "Fast charge" &&
//           s.chargers.some(
//             (c) => c.type.includes("DC") && c.status === "Available",
//           )) ||
//         (filter === "Open now" && s.openHours.includes("24"))),
//   );
//   return (
//     <>
//       <Title
//         eyebrow="Find your next stop"
//         title="Chargers that fit your route."
//         description="Live availability from trusted station partners, right where you need it."
//       />
//       <div className="mb-6 flex flex-col gap-3 md:flex-row">
//         <label className="relative flex-1">
//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
//             size={18}
//           />
//           <input
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search by station, area or city"
//             className="w-full rounded-xl border bg-[hsl(var(--card))] py-3.5 pl-11 pr-4 text-sm outline-none focus:border-[hsl(var(--primary))]"
//             data-testid="input-search-stations"
//           />
//         </label>
//         <div className="flex gap-2 overflow-x-auto">
//           {["All", "Fast charge", "Open now"].map((x) => (
//             <button
//               key={x}
//               onClick={() => setFilter(x)}
//               className={`whitespace-nowrap rounded-xl border px-4 py-3 text-sm font-bold ${filter === x ? "border-[hsl(var(--secondary))] bg-[hsl(var(--secondary))] text-white" : "bg-[hsl(var(--card))]"}`}
//               data-testid={`button-filter-${x}`}
//             >
//               {x === "All" ? (
//                 <Filter size={14} className="mr-1 inline" />
//               ) : null}
//               {x}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="mb-6 flex items-center justify-between">
//         <p className="text-sm text-[hsl(var(--muted-foreground))]">
//           <b className="text-[hsl(var(--foreground))]">
//             {filtered.length} stations
//           </b>{" "}
//           near your route
//         </p>
//         <button
//           className="text-sm font-bold text-[hsl(var(--primary))]"
//           onClick={() => toast("Stations sorted by shortest distance")}
//           data-testid="button-sort-stations"
//         >
//           <SlidersHorizontal size={15} className="mr-1 inline" /> Sort: nearest
//         </button>
//       </div>
//       {filtered.length ? (
//         <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
//           {filtered.map((s, i) => (
//             <div className={`rise rise-${Math.min(i + 1, 3)}`} key={s.id}>
//               <StationCard
//                 station={s}
//                 onSelect={() => navigate(`/stations/${s.id}`)}
//               />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="rounded-3xl border border-dashed py-20 text-center">
//           <Search className="mx-auto" size={30} />
//           <h3 className="mt-4 font-display text-lg font-bold">
//             No stations match that search
//           </h3>
//           <Button
//             className="mt-5"
//             onClick={() => {
//               setQuery("");
//               setFilter("All");
//             }}
//             data-testid="button-clear-stations"
//           >
//             Clear search
//           </Button>
//         </div>
//       )}
//     </>
//   );
// }

// export default StationsPage;

import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  Star,
  Zap,
  Clock,
  CalendarCheck,
  ArrowRight,
  Plug,
  RotateCcw,
} from "lucide-react";

import Title from "../components/layout/Title";
import Button from "../components/layout/Button";

// Returns how many charging slots appear available.
function getAvailableSlots(station) {
  return station.availableSlots?.length ?? station.slots?.length ?? 0;
}

// Calculates availability using available slots and charger statuses.
function getAvailability(station) {
  const slots = getAvailableSlots(station);
  const availableChargers = station.chargers.filter(
    (charger) => charger.status === "Available",
  ).length;

  if (slots === 0 || availableChargers === 0) {
    return {
      label: "Fully occupied",
      color: "bg-red-100 text-red-700",
      dot: "bg-red-500",
      rank: 0,
    };
  }

  if (slots <= 2 || availableChargers === 1) {
    return {
      label: "Limited availability",
      color: "bg-orange-100 text-orange-700",
      dot: "bg-orange-500",
      rank: 1,
    };
  }

  return {
    label: "Available",
    color: "bg-green-100 text-green-700",
    dot: "bg-green-500",
    rank: 2,
  };
}

function getCity(station) {
  const address =
    `${station.address ?? ""} ${station.city ?? ""}`.toLowerCase();

  if (address.includes("nashik")) return "Nashik";
  if (address.includes("pune")) return "Pune";

  return station.city || "Other";
}

function getConnectors(station) {
  return [
    ...new Set(
      station.chargers.map((charger) => {
        const details = `${charger.connector ?? ""} ${charger.type ?? ""}`;

        if (/CCS2/i.test(details)) return "CCS2";
        if (/Type\s*2/i.test(details)) return "Type 2";

        return charger.connector || charger.type || "Other";
      }),
    ),
  ];
}

function getPower(station) {
  if (!station.chargers.length) return 0;

  return Math.max(
    ...station.chargers.map((charger) => {
      const match = String(
        charger.power ?? charger.speed ?? charger.type ?? "",
      ).match(/(\d+(?:\.\d+)?)\s*kW/i);

      return match ? Number(match[1]) : 0;
    }),
  );
}

function money(price) {
  return `₹${Number(price ?? 0).toLocaleString("en-IN")}`;
}

function StationsPage({ stations = [], toast }) {
  const [, navigate] = useLocation();

  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All");
  const [connector, setConnector] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [sortBy, setSortBy] = useState("nearest");

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    const results = stations.filter((station) => {
      const searchText = [station.name, station.address, station.city]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchText.includes(search);
      const matchesCity = city === "All" || getCity(station) === city;
      const matchesConnector =
        connector === "All" || getConnectors(station).includes(connector);

      const status = getAvailability(station);
      const matchesAvailability =
        availability === "All" ||
        (availability === "Available" && status.label === "Available") ||
        (availability === "Limited" &&
          status.label === "Limited availability") ||
        (availability === "Occupied" && status.label === "Fully occupied");

      return (
        matchesSearch && matchesCity && matchesConnector && matchesAvailability
      );
    });

    return results.sort((a, b) => {
      if (sortBy === "price") {
        return Number(a.pricePerKwh ?? 0) - Number(b.pricePerKwh ?? 0);
      }

      if (sortBy === "rating") {
        return Number(b.rating ?? 0) - Number(a.rating ?? 0);
      }

      if (sortBy === "slots") {
        return getAvailableSlots(b) - getAvailableSlots(a);
      }

      if (sortBy === "speed") {
        return getPower(b) - getPower(a);
      }

      return Number(a.distance ?? Infinity) - Number(b.distance ?? Infinity);
    });
  }, [stations, query, city, connector, availability, sortBy]);

  function clearFilters() {
    setQuery("");
    setCity("All");
    setConnector("All");
    setAvailability("All");
    setSortBy("nearest");
  }

  return (
    <>
      <Title
        eyebrow="Find your next stop"
        title="Find a Charger ⚡"
        description="Find the right EV charging station by location, connector, availability, charging speed, and price."
      />

      {/* Search */}
      <div className="mb-5">
        <label className="relative block">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search station name, area, or city..."
            className="w-full rounded-2xl border border-[hsl(var(--card-border))] bg-[hsl(var(--card))] py-4 pl-12 pr-4 text-sm outline-none transition focus:border-[hsl(var(--primary))]"
            data-testid="input-search-stations"
          />
        </label>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-[hsl(var(--card-border))] bg-[hsl(var(--card))] p-4">
        <div className="mb-4 flex items-center gap-2 font-bold">
          <Filter size={18} />
          <span>Filters</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm">
            <span className="mb-2 block font-semibold">City</span>
            <select
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="w-full rounded-xl border bg-[hsl(var(--background))] px-3 py-3 outline-none focus:border-[hsl(var(--primary))]"
              data-testid="filter-city"
            >
              <option value="All">All cities</option>
              <option value="Nashik">Nashik</option>
              <option value="Pune">Pune</option>
            </select>
          </label>

          <label className="text-sm">
            <span className="mb-2 block font-semibold">Connector</span>
            <select
              value={connector}
              onChange={(event) => setConnector(event.target.value)}
              className="w-full rounded-xl border bg-[hsl(var(--background))] px-3 py-3 outline-none focus:border-[hsl(var(--primary))]"
              data-testid="filter-connector"
            >
              <option value="All">All connectors</option>
              <option value="CCS2">CCS2</option>
              <option value="Type 2">Type 2</option>
            </select>
          </label>

          <label className="text-sm">
            <span className="mb-2 block font-semibold">Availability</span>
            <select
              value={availability}
              onChange={(event) => setAvailability(event.target.value)}
              className="w-full rounded-xl border bg-[hsl(var(--background))] px-3 py-3 outline-none focus:border-[hsl(var(--primary))]"
              data-testid="filter-availability"
            >
              <option value="All">All stations</option>
              <option value="Available">Available</option>
              <option value="Limited">Limited availability</option>
              <option value="Occupied">Fully occupied</option>
            </select>
          </label>

          <label className="text-sm">
            <span className="mb-2 block font-semibold">Sort by</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full rounded-xl border bg-[hsl(var(--background))] px-3 py-3 outline-none focus:border-[hsl(var(--primary))]"
              data-testid="sort-stations"
            >
              <option value="nearest">Nearest first</option>
              <option value="price">Lowest price</option>
              <option value="rating">Highest rating</option>
              <option value="slots">Most available slots</option>
              <option value="speed">Fastest charging</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Showing{" "}
            <b className="text-[hsl(var(--foreground))]">{filtered.length}</b>{" "}
            of {stations.length} stations
          </p>

          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--primary))]"
            data-testid="button-clear-station-filters"
          >
            <RotateCcw size={15} />
            Clear filters
          </button>
        </div>
      </div>

      {/* Station cards */}
      {filtered.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((station, index) => {
            const status = getAvailability(station);
            const slots = getAvailableSlots(station);
            const connectors = getConnectors(station);
            const power = getPower(station);
            const availableChargers = station.chargers.filter(
              (charger) => charger.status === "Available",
            ).length;

            return (
              <article
                key={station.id}
                className={`rise rise-${Math.min(index + 1, 3)} overflow-hidden rounded-2xl border border-[hsl(var(--card-border))] bg-[hsl(var(--card))] shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}
                data-testid={`card-station-${station.id}`}
              >
                <div className="relative h-44 overflow-hidden bg-[hsl(var(--muted))]">
                  {station.image ? (
                    <img
                      src={station.image}
                      alt={station.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Zap size={42} />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <span className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-1.5 text-sm font-bold text-gray-900">
                    {station.distance ?? "—"}
                    {typeof station.distance === "number" ? " km away" : ""}
                  </span>

                  <span
                    className={`absolute right-3 top-3 rounded-full px-3 py-1.5 text-xs font-bold ${status.color}`}
                  >
                    <span
                      className={`mr-1.5 inline-block h-2 w-2 rounded-full ${status.dot}`}
                    />
                    {status.label}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold leading-tight">
                        {station.name}
                      </h3>
                      <p className="mt-2 flex items-start gap-1.5 text-sm text-[hsl(var(--muted-foreground))]">
                        <MapPin size={16} className="mt-0.5 shrink-0" />
                        <span>{station.address}</span>
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-sm font-bold text-amber-700">
                      <Star size={14} fill="currentColor" />
                      {station.rating ?? "—"}
                    </div>
                  </div>

                  <div className="my-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[hsl(var(--muted))] p-3">
                      <p className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))]">
                        <Zap size={14} />
                        Charging power
                      </p>
                      <p className="mt-1 text-lg font-bold">
                        {power > 0 ? `${power} kW` : "See chargers"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[hsl(var(--muted))] p-3">
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        Price per kWh
                      </p>
                      <p className="mt-1 text-lg font-bold">
                        {money(station.pricePerKwh)}
                        <span className="text-xs font-medium">/kWh</span>
                      </p>
                    </div>
                  </div>

                  <div className="mb-3 flex items-center justify-between gap-2 text-sm">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <CalendarCheck size={16} />
                      {slots} available slot{slots === 1 ? "" : "s"}
                    </span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">
                      {availableChargers} charger
                      {availableChargers === 1 ? "" : "s"} free
                    </span>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {connectors.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold"
                      >
                        <Plug size={12} />
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mb-4 flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                    <Clock size={14} />
                    {station.openHours || "Check opening hours"}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="soft"
                      onClick={() => navigate(`/stations/${station.id}`)}
                      data-testid={`button-details-${station.id}`}
                    >
                      Details <ArrowRight size={15} className="ml-1 inline" />
                    </Button>

                    <Button
                      onClick={() =>
                        navigate(
                          `/book?station=${encodeURIComponent(station.id)}`,
                        )
                      }
                      disabled={status.label === "Fully occupied"}
                      data-testid={`button-book-${station.id}`}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-[hsl(var(--card-border))] py-16 text-center">
          <Search
            size={34}
            className="mx-auto text-[hsl(var(--muted-foreground))]"
          />
          <h3 className="mt-4 text-lg font-bold">
            No stations match your filters
          </h3>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            Try another city, connector type, or availability option.
          </p>
          <Button className="mt-5" onClick={clearFilters}>
            <SlidersHorizontal size={15} className="mr-2 inline" />
            Reset filters
          </Button>
        </div>
      )}
    </>
  );
}

export default StationsPage;
