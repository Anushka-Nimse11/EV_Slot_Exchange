// import { useState } from "react";
// import { ArrowRight } from "lucide-react";

// import Title from "../components/layout/Title";
// import Button from "../components/layout/Button";
// import Avatar from "../components/layout/Avatar";
// import ReleaseForm from "../components/exchange/ReleaseForm";

// const money = (n) => `₹${n.toLocaleString("en-IN")}`;

// function ExchangePage({ exchange, setExchange, toast }) {
//   // const [tab, setTab] = useState("claim");
//   // const [filter, setFilter] = useState("All");
//   // const visible = exchange.filter(
//   //   (x) => filter === "All" || x.stationId.includes(filter),
//   // );

//   const [tab, setTab] = useState("claim");
//   const [filter, setFilter] = useState("All");
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   const visible = exchange.filter((x) => {
//     const matchesCity =
//       filter === "All" || x.city?.toLowerCase() === filter.toLowerCase();

//     const isAvailable = x.status !== "Claimed";

//     return matchesCity && isAvailable;
//   });

//   const availableCount = exchange.filter((x) => x.status !== "Claimed").length;

//   return (
//     <>
//       <Title
//         eyebrow="Keep it moving"
//         title="Swap a slot. Help a driver."
//         description="Plans change. Your charging time doesn't have to go to waste — release it, or claim one nearby when you need it."
//         action={
//           <Button
//             onClick={() => setTab("release")}
//             data-testid="button-release-slot"
//           >
//             <ArrowRight size={17} /> Release a slot
//           </Button>
//         }
//       />
//       <div className="mb-6 flex border-b">
//         <button
//           onClick={() => setTab("claim")}
//           className={`border-b-2 px-4 pb-3 text-sm font-bold ${tab === "claim" ? "border-[hsl(var(--primary))] text-[hsl(var(--primary))]" : "border-transparent"}`}
//           data-testid="tab-claim"
//         >
//           Claim a slot{" "}
//           <span className="ml-1 rounded-full bg-[hsl(var(--accent))] px-1.5 py-0.5 text-[10px]">
//             {availableCount}
//           </span>
//         </button>
//         <button
//           onClick={() => setTab("release")}
//           className={`border-b-2 px-4 pb-3 text-sm font-bold ${tab === "release" ? "border-[hsl(var(--primary))] text-[hsl(var(--primary))]" : "border-transparent"}`}
//           data-testid="tab-release"
//         >
//           Release a slot
//         </button>
//       </div>
//       {tab === "claim" ? (
//         <>
//           <div className="mb-6 flex gap-2">
//             {["All", "pune", "nashik"].map((x) => (
//               <button
//                 key={x}
//                 onClick={() => setFilter(x)}
//                 className={`rounded-xl px-4 py-2 text-xs font-bold capitalize ${filter === x ? "bg-[hsl(var(--secondary))] text-white" : "bg-[hsl(var(--muted))]"}`}
//                 data-testid={`button-exchange-filter-${x}`}
//               >
//                 {x === "All" ? "Everywhere" : x}
//               </button>
//             ))}
//           </div>
//           <div className="grid gap-4 lg:grid-cols-2">
//             {visible.map((x) => (
//               <div
//                 key={x.id}
//                 className="lift rounded-2xl border bg-[hsl(var(--card))] p-5"
//                 data-testid={`card-exchange-${x.id}`}
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-center gap-3">
//                     <Avatar name={x.owner} small />
//                     <div>
//                       <p className="text-sm font-bold">
//                         {x.owner}{" "}
//                         <span className="ml-1 rounded bg-[hsl(var(--primary)/.12)] px-1.5 py-0.5 text-[10px] text-[hsl(var(--primary))]">
//                           Verified
//                         </span>
//                       </p>
//                       <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
//                         {x.station}
//                       </p>
//                     </div>
//                   </div>
//                   <span className="rounded-lg bg-[hsl(var(--accent)/.25)] px-2 py-1 text-[10px] font-bold">
//                     Save {money(x.originalPrice - x.price)}
//                   </span>
//                 </div>
//                 <div className="mt-5 grid grid-cols-3 gap-3 border-y py-4 text-sm">
//                   <div>
//                     <p className="text-[10px] uppercase text-[hsl(var(--muted-foreground))]">
//                       When
//                     </p>
//                     <b>{x.date}</b>
//                     <span className="block text-xs text-[hsl(var(--muted-foreground))]">
//                       {x.time}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="text-[10px] uppercase text-[hsl(var(--muted-foreground))]">
//                       Charger
//                     </p>
//                     <b>{x.charger.split(" · ")[0]}</b>
//                     <span className="block text-xs">
//                       {x.charger.split(" · ")[1]}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="text-[10px] uppercase text-[hsl(var(--muted-foreground))]">
//                       Price
//                     </p>
//                     <b>{money(x.price)}</b>
//                     <span className="block text-xs line-through">
//                       {money(x.originalPrice)}
//                     </span>
//                   </div>
//                 </div>
//                 <Button
//                   className="mt-4 w-full"
//                   onClick={() => setSelectedSlot(x)}
//                   data-testid={`button-claim-${x.id}`}
//                 >
//                   Claim this slot <ArrowRight size={15} />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </>
//       ) : (
//         <ReleaseForm
//           toast={toast}
//           onRelease={(x) => {
//             setExchange([x, ...exchange]);
//             setTab("claim");
//             toast("Your slot is now visible to nearby drivers");
//           }}
//         />
//       )}
//     </>

//   );
// }

// export default ExchangePage;

// import { useState } from "react";
// import { ArrowRight, MapPin, X } from "lucide-react";

// import Title from "../components/layout/Title";
// import Button from "../components/layout/Button";
// import Avatar from "../components/layout/Avatar";
// import ReleaseForm from "../components/exchange/ReleaseForm";

// function ExchangePage({ exchange, setExchange, bookings, setBookings, toast }) {
//   const [tab, setTab] = useState("claim");
//   const [filter, setFilter] = useState("All");
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   // Get the city from the station ID.
//   const getCity = (stationId = "") => {
//     if (stationId.toLowerCase().startsWith("pune")) return "pune";
//     if (stationId.toLowerCase().startsWith("nashik")) return "nashik";
//     return "";
//   };

//   // Only show available listings.
//   const availableSlots = exchange.filter((slot) => slot.status === "listed");

//   // Apply city filter.
//   const visible = availableSlots.filter((slot) => {
//     return filter === "All" || getCity(slot.stationId) === filter;
//   });

//   const money = (amount) => `₹${Number(amount || 0).toLocaleString("en-IN")}`;

//   // Claim a slot and add it to My Bookings.

//   const handleClaim = () => {
//     console.log("1. Confirm Claim button clicked");
//     console.log("2. Selected slot:", selectedSlot);
//     console.log("3. Current exchange listings:", exchange);

//     if (!selectedSlot) {
//       console.log("ERROR: No slot selected");
//       return;
//     }

//     const slot = selectedSlot;

//     const exists = exchange.some(
//       (item) =>
//         String(item.id) === String(slot.id) &&
//         String(item.status || "").toLowerCase() === "listed",
//     );

//     console.log("4. Is slot available?", exists);

//     if (!exists) {
//       setSelectedSlot(null);
//       toast("This slot is no longer available.");
//       return;
//     }

//     const newBooking = {
//       id: `ES-${Date.now()}`,
//       station: slot.station,
//       stationId: slot.stationId,
//       charger: slot.charger,
//       date: slot.date,
//       time: slot.time,
//       cost: Number(slot.price),
//       status: "upcoming",
//       vehicle: "Tata Nexon EV",
//       qrCode: `EV-${Date.now()}`,
//       exchangeBooking: true,
//     };

//     setExchange((current) =>
//       current.map((item) =>
//         String(item.id) === String(slot.id)
//           ? { ...item, status: "claimed" }
//           : item,
//       ),
//     );

//     setBookings((current) => [newBooking, ...current]);

//     setSelectedSlot(null);

//     console.log("5. Booking created:", newBooking);

//     toast("Slot claimed successfully and added to My Bookings.");
//   };

//   // Publish a released slot.
//   const handleRelease = (newSlot) => {
//     if (!newSlot) return;

//     setExchange((current) => {
//       if (current.some((item) => item.id === newSlot.id)) {
//         return current;
//       }

//       return [{ ...newSlot, status: "listed" }, ...current];
//     });

//     setFilter("All");
//     setTab("claim");
//     toast("Your slot is now available in Slot Exchange.");
//   };

//   return (
//     <>
//       <Title
//         eyebrow="Keep it moving"
//         title="Swap a slot. Help a driver."
//         description="Plans change. Your charging time doesn't have to go to waste — release it, or claim one nearby when you need it."
//         action={
//           <Button
//             onClick={() => setTab("release")}
//             data-testid="button-release-slot"
//           >
//             <ArrowRight size={17} />
//             Release a slot
//           </Button>
//         }
//       />

//       {/* Tabs */}
//       <div className="mb-6 flex border-b">
//         <button
//           onClick={() => setTab("claim")}
//           className={`border-b-2 px-4 pb-3 text-sm font-bold ${
//             tab === "claim"
//               ? "border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
//               : "border-transparent"
//           }`}
//         >
//           Claim a slot
//           <span className="ml-1 rounded-full bg-[hsl(var(--accent))] px-1.5 py-0.5 text-[10px]">
//             {availableSlots.length}
//           </span>
//         </button>

//         <button
//           onClick={() => setTab("release")}
//           className={`border-b-2 px-4 pb-3 text-sm font-bold ${
//             tab === "release"
//               ? "border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
//               : "border-transparent"
//           }`}
//         >
//           Release a slot
//         </button>
//       </div>

//       {tab === "claim" ? (
//         <>
//           {/* City filters */}
//           <div className="mb-6 flex flex-wrap gap-2">
//             {["All", "pune", "nashik"].map((city) => (
//               <button
//                 key={city}
//                 onClick={() => setFilter(city)}
//                 className={`rounded-xl px-4 py-2 text-xs font-bold capitalize ${
//                   filter === city
//                     ? "bg-[hsl(var(--secondary))] text-white"
//                     : "bg-[hsl(var(--muted))]"
//                 }`}
//               >
//                 {city === "All" ? "Everywhere" : city}
//               </button>
//             ))}
//           </div>

//           {/* Available listings */}
//           {visible.length === 0 ? (
//             <div className="rounded-2xl border border-dashed p-10 text-center">
//               <MapPin
//                 size={30}
//                 className="mx-auto text-[hsl(var(--muted-foreground))]"
//               />

//               <h3 className="mt-4 font-display text-lg font-bold">
//                 No slots available
//               </h3>

//               <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
//                 Try another city or release a slot for another driver.
//               </p>

//               <Button className="mt-5" onClick={() => setTab("release")}>
//                 Release a slot
//                 <ArrowRight size={15} />
//               </Button>
//             </div>
//           ) : (
//             <div className="grid gap-4 lg:grid-cols-2">
//               {visible.map((slot) => (
//                 <div
//                   key={slot.id}
//                   className="lift rounded-2xl border bg-[hsl(var(--card))] p-5"
//                   data-testid={`card-exchange-${slot.id}`}
//                 >
//                   {/* Owner and station */}
//                   <div className="flex items-start justify-between gap-3">
//                     <div className="flex items-center gap-3">
//                       <Avatar name={slot.owner} small />

//                       <div>
//                         <p className="text-sm font-bold">
//                           {slot.owner}
//                           <span className="ml-1 rounded bg-[hsl(var(--primary)/.12)] px-1.5 py-0.5 text-[10px] text-[hsl(var(--primary))]">
//                             Verified
//                           </span>
//                         </p>

//                         <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
//                           {slot.station}
//                         </p>

//                         <p className="mt-1 text-xs capitalize text-[hsl(var(--muted-foreground))]">
//                           {getCity(slot.stationId)}
//                         </p>
//                       </div>
//                     </div>

//                     <span className="shrink-0 rounded-lg bg-[hsl(var(--accent)/.25)] px-2 py-1 text-[10px] font-bold">
//                       Save{" "}
//                       {money(
//                         Math.max(
//                           0,
//                           Number(slot.originalPrice || 0) -
//                             Number(slot.price || 0),
//                         ),
//                       )}
//                     </span>
//                   </div>

//                   {/* Slot details */}
//                   <div className="mt-5 grid grid-cols-3 gap-3 border-y py-4 text-sm">
//                     <div>
//                       <p className="text-[10px] uppercase text-[hsl(var(--muted-foreground))]">
//                         When
//                       </p>

//                       <b className="mt-1 block text-xs sm:text-sm">
//                         {slot.date}
//                       </b>

//                       <span className="mt-1 block text-xs text-[hsl(var(--muted-foreground))]">
//                         {slot.time}
//                       </span>
//                     </div>

//                     <div>
//                       <p className="text-[10px] uppercase text-[hsl(var(--muted-foreground))]">
//                         Charger
//                       </p>

//                       <b className="mt-1 block text-xs sm:text-sm">
//                         {slot.charger?.split(" · ")[0]}
//                       </b>

//                       <span className="mt-1 block text-xs text-[hsl(var(--muted-foreground))]">
//                         {slot.charger?.split(" · ")[1]}
//                       </span>
//                     </div>

//                     <div>
//                       <p className="text-[10px] uppercase text-[hsl(var(--muted-foreground))]">
//                         Price
//                       </p>

//                       <b className="mt-1 block text-xs sm:text-sm">
//                         {money(slot.price)}
//                       </b>

//                       <span className="mt-1 block text-xs text-[hsl(var(--muted-foreground))] line-through">
//                         {money(slot.originalPrice)}
//                       </span>
//                     </div>
//                   </div>

//                   <Button
//                     className="mt-4 w-full"
//                     onClick={() => setSelectedSlot(slot)}
//                     data-testid={`button-claim-${slot.id}`}
//                   >
//                     Claim this slot
//                     <ArrowRight size={15} />
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       ) : (
//         <ReleaseForm
//           toast={toast}
//           bookings={bookings}
//           onRelease={handleRelease}
//         />
//       )}

//       {/* Claim confirmation dialog */}
//       {selectedSlot && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
//           onClick={(event) => {
//             if (event.target === event.currentTarget) {
//               setSelectedSlot(null);
//             }
//           }}
//         >
//           <div
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="claim-slot-title"
//             className="w-full max-w-md rounded-2xl border bg-[hsl(var(--card))] p-6 shadow-xl"
//           >
//             <div className="flex items-start justify-between gap-3">
//               <div>
//                 <h2
//                   id="claim-slot-title"
//                   className="font-display text-xl font-bold"
//                 >
//                   Confirm your slot
//                 </h2>

//                 <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
//                   Review your charging details before claiming.
//                 </p>
//               </div>

//               <button
//                 onClick={() => setSelectedSlot(null)}
//                 aria-label="Close confirmation"
//                 className="rounded-lg p-2 hover:bg-[hsl(var(--muted))]"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="mt-5 space-y-3 rounded-xl bg-[hsl(var(--muted))] p-4">
//               <div>
//                 <p className="text-xs text-[hsl(var(--muted-foreground))]">
//                   Station
//                 </p>
//                 <p className="mt-1 font-bold">{selectedSlot.station}</p>
//               </div>

//               <div>
//                 <p className="text-xs text-[hsl(var(--muted-foreground))]">
//                   Date and time
//                 </p>
//                 <p className="mt-1 text-sm font-medium">{selectedSlot.date}</p>
//                 <p className="text-sm">{selectedSlot.time}</p>
//               </div>

//               <div>
//                 <p className="text-xs text-[hsl(var(--muted-foreground))]">
//                   Charger
//                 </p>
//                 <p className="mt-1 text-sm font-medium">
//                   {selectedSlot.charger}
//                 </p>
//               </div>

//               <div className="flex items-center justify-between border-t pt-3">
//                 <span className="text-sm">Total price</span>
//                 <span className="text-lg font-bold">
//                   {money(selectedSlot.price)}
//                 </span>
//               </div>
//             </div>

//             <p className="mt-3 text-xs text-[hsl(var(--muted-foreground))]">
//               This demo does not process an actual payment.
//             </p>

//             <div className="mt-5 flex gap-3">
//               <Button
//                 variant="ghost"
//                 className="flex-1 border"
//                 onClick={() => setSelectedSlot(null)}
//               >
//                 Cancel
//               </Button>

//               <Button className="flex-1" onClick={handleClaim}>
//                 Confirm Claim
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default ExchangePage;

import { useState } from "react";
import { ArrowRight, MapPin, Search, X } from "lucide-react";

import Title from "../components/layout/Title";
import Button from "../components/layout/Button";
import Avatar from "../components/layout/Avatar";
import ReleaseForm from "../components/exchange/ReleaseForm";

const money = (amount) => `₹${Number(amount ?? 0).toLocaleString("en-IN")}`;

const getStatus = (item) => String(item?.status ?? "listed").toLowerCase();

// Get city from the station ID or station name.
const getCity = (item) => {
  const stationId = String(item?.stationId ?? "").toLowerCase();
  const station = String(item?.station ?? "").toLowerCase();

  if (stationId.startsWith("pune") || station.includes("pune")) {
    return "pune";
  }

  if (stationId.startsWith("nashik") || station.includes("nashik")) {
    return "nashik";
  }

  return "";
};

function ExchangePage({
  exchange = [],
  setExchange,
  bookings = [],
  setBookings,
  toast,
}) {
  const [tab, setTab] = useState("claim");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Display only active marketplace listings.
  const availableSlots = exchange.filter(
    (item) => getStatus(item) === "listed" || getStatus(item) === "available",
  );

  // Apply city filter and search.
  const visible = availableSlots.filter((slot) => {
    const city = getCity(slot);
    const station = String(slot.station ?? "").toLowerCase();
    const owner = String(slot.owner ?? "").toLowerCase();
    const stationId = String(slot.stationId ?? "").toLowerCase();
    const query = search.trim().toLowerCase();

    const matchesCity = filter === "All" || city === filter;

    const matchesSearch =
      !query ||
      station.includes(query) ||
      owner.includes(query) ||
      stationId.includes(query);

    return matchesCity && matchesSearch;
  });

  // Claim a slot and add it to My Bookings.
  const handleClaim = () => {
    if (!selectedSlot) {
      return;
    }

    if (
      typeof setExchange !== "function" ||
      typeof setBookings !== "function"
    ) {
      toast?.("Unable to complete the claim. Please try again.");
      return;
    }

    const slot = selectedSlot;

    // Check that the listing is still available.
    const exists = exchange.some(
      (item) =>
        String(item.id) === String(slot.id) &&
        ["listed", "available"].includes(getStatus(item)),
    );

    if (!exists) {
      setSelectedSlot(null);
      toast?.("This slot is no longer available.");
      return;
    }

    const bookingId = `ES-${Date.now()}`;

    const newBooking = {
      id: bookingId,
      station: slot.station ?? "Charging station",
      stationName: slot.station ?? "Charging station",
      stationId: slot.stationId ?? "",
      charger: slot.charger ?? "Charger not specified",
      date: slot.date ?? "Date unavailable",
      time: slot.time ?? "Time unavailable",
      cost: Number(slot.price ?? 0),
      estimatedCost: Number(slot.price ?? 0),
      status: "upcoming",
      vehicle: "Tata Nexon EV",
      qrCode: `EV-${bookingId}`,
      exchangeBooking: true,
    };

    // Mark the claimed listing as unavailable.
    setExchange((current) =>
      current.map((item) =>
        String(item.id) === String(slot.id)
          ? { ...item, status: "claimed", claimedBookingId: bookingId }
          : item,
      ),
    );

    // Add the claimed slot to My Bookings.
    setBookings((current) => [newBooking, ...current]);

    setSelectedSlot(null);

    toast?.("Slot claimed successfully and added to My Bookings.");
  };

  // Publish a new listing without duplicates.
  const handleRelease = (newSlot) => {
    if (!newSlot) {
      return;
    }

    if (typeof setExchange !== "function") {
      toast?.("Unable to publish your slot. Please try again.");
      return;
    }

    const listing = {
      ...newSlot,
      status: "listed",
    };

    setExchange((current) => {
      const alreadyExists = current.some(
        (item) => String(item.id) === String(listing.id),
      );

      if (alreadyExists) {
        return current;
      }

      return [listing, ...current];
    });

    setFilter("All");
    setSearch("");
    setTab("claim");

    toast?.("Your slot is now available in Slot Exchange.");
  };

  return (
    <>
      <Title
        eyebrow="Keep it moving"
        title="Swap a slot. Help a driver."
        description="Plans change. Your charging time doesn't have to go to waste — release it, or claim an available slot nearby."
        action={
          <Button
            onClick={() => setTab("release")}
            data-testid="button-release-slot"
          >
            <ArrowRight size={17} />
            Release a slot
          </Button>
        }
      />

      {/* Tabs */}
      <div className="mb-6 flex border-b">
        <button
          type="button"
          onClick={() => setTab("claim")}
          className={`border-b-2 px-4 pb-3 text-sm font-bold ${
            tab === "claim"
              ? "border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
              : "border-transparent"
          }`}
          data-testid="tab-claim"
        >
          Claim a slot
          <span className="ml-1 rounded-full bg-[hsl(var(--accent))] px-1.5 py-0.5 text-[10px]">
            {availableSlots.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setTab("release")}
          className={`border-b-2 px-4 pb-3 text-sm font-bold ${
            tab === "release"
              ? "border-[hsl(var(--primary))] text-[hsl(var(--primary))]"
              : "border-transparent"
          }`}
          data-testid="tab-release"
        >
          Release a slot
        </button>
      </div>

      {tab === "claim" ? (
        <>
          {/* Search */}
          <div className="mb-4">
            <div className="flex items-center gap-3 rounded-xl border bg-[hsl(var(--card))] px-4 py-3">
              <Search
                size={18}
                className="text-[hsl(var(--muted-foreground))]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search station or owner..."
                className="w-full bg-transparent text-sm outline-none"
                aria-label="Search exchange listings"
              />
            </div>
          </div>

          {/* City filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            {["All", "pune", "nashik"].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setFilter(city)}
                className={`rounded-xl px-4 py-2 text-xs font-bold capitalize ${
                  filter === city
                    ? "bg-[hsl(var(--secondary))] text-white"
                    : "bg-[hsl(var(--muted))]"
                }`}
                data-testid={`button-exchange-filter-${city}`}
              >
                {city === "All" ? "Everywhere" : city}
              </button>
            ))}
          </div>

          {/* Available listings */}
          {visible.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-10 text-center">
              <MapPin
                size={30}
                className="mx-auto text-[hsl(var(--muted-foreground))]"
              />

              <h3 className="mt-4 font-display text-lg font-bold">
                No slots available
              </h3>

              <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                Try another city or search, or release a slot for another
                driver.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Button
                  variant="ghost"
                  className="border"
                  onClick={() => {
                    setFilter("All");
                    setSearch("");
                  }}
                >
                  Clear filters
                </Button>

                <Button onClick={() => setTab("release")}>
                  Release a slot
                  <ArrowRight size={15} />
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {visible.map((slot) => {
                const originalPrice = Number(
                  slot.originalPrice ?? slot.price ?? 0,
                );

                const price = Number(slot.price ?? 0);

                const savings = Math.max(0, originalPrice - price);

                const chargerParts = String(
                  slot.charger ?? "Charger not specified",
                ).split(" · ");

                return (
                  <div
                    key={slot.id}
                    className="lift rounded-2xl border bg-[hsl(var(--card))] p-5"
                    data-testid={`card-exchange-${slot.id}`}
                  >
                    {/* Owner and station */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={slot.owner ?? "Driver"} small />

                        <div>
                          <p className="text-sm font-bold">
                            {slot.owner ?? "Driver"}

                            <span className="ml-1 rounded bg-[hsl(var(--primary)/.12)] px-1.5 py-0.5 text-[10px] text-[hsl(var(--primary))]">
                              Listed
                            </span>
                          </p>

                          <p className="mt-1 flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                            <MapPin size={12} />
                            {slot.station ?? "Charging station"}
                          </p>

                          <p className="mt-1 text-xs capitalize text-[hsl(var(--muted-foreground))]">
                            {getCity(slot)}
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 rounded-lg bg-[hsl(var(--accent)/.25)] px-2 py-1 text-[10px] font-bold">
                        Save {money(savings)}
                      </span>
                    </div>

                    {/* Slot details */}
                    <div className="mt-5 grid grid-cols-3 gap-3 border-y py-4 text-sm">
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase text-[hsl(var(--muted-foreground))]">
                          When
                        </p>

                        <b className="mt-1 block break-words text-xs sm:text-sm">
                          {slot.date ?? "Date unavailable"}
                        </b>

                        <span className="mt-1 block break-words text-xs text-[hsl(var(--muted-foreground))]">
                          {slot.time ?? "Time unavailable"}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] uppercase text-[hsl(var(--muted-foreground))]">
                          Charger
                        </p>

                        <b className="mt-1 block break-words text-xs sm:text-sm">
                          {chargerParts[0]}
                        </b>

                        <span className="mt-1 block break-words text-xs text-[hsl(var(--muted-foreground))]">
                          {chargerParts[1] ?? ""}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] uppercase text-[hsl(var(--muted-foreground))]">
                          Price
                        </p>

                        <b className="mt-1 block text-xs sm:text-sm">
                          {money(price)}
                        </b>

                        {originalPrice > price && (
                          <span className="mt-1 block text-xs text-[hsl(var(--muted-foreground))] line-through">
                            {money(originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Claim button */}
                    <Button
                      className="mt-4 w-full"
                      onClick={() => setSelectedSlot(slot)}
                      data-testid={`button-claim-${slot.id}`}
                    >
                      Claim this slot
                      <ArrowRight size={15} />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <ReleaseForm
          toast={toast}
          bookings={bookings}
          onRelease={handleRelease}
        />
      )}

      {/* Claim confirmation dialog */}
      {selectedSlot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedSlot(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="claim-slot-title"
            className="w-full max-w-md rounded-2xl border bg-[hsl(var(--card))] p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2
                  id="claim-slot-title"
                  className="font-display text-xl font-bold"
                >
                  Confirm your slot
                </h2>

                <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                  Review your charging details before claiming.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSlot(null)}
                aria-label="Close confirmation"
                className="rounded-lg p-2 hover:bg-[hsl(var(--muted))]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-3 rounded-xl bg-[hsl(var(--muted))] p-4">
              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  Station
                </p>

                <p className="mt-1 font-bold">
                  {selectedSlot.station ?? "Charging station"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  Date and time
                </p>

                <p className="mt-1 text-sm font-medium">
                  {selectedSlot.date ?? "Date unavailable"}
                </p>

                <p className="text-sm">
                  {selectedSlot.time ?? "Time unavailable"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  Charger
                </p>

                <p className="mt-1 text-sm font-medium">
                  {selectedSlot.charger ?? "Charger not specified"}
                </p>
              </div>

              <div className="flex items-center justify-between border-t pt-3">
                <span className="text-sm">Total price</span>

                <span className="text-lg font-bold">
                  {money(selectedSlot.price)}
                </span>
              </div>
            </div>

            <p className="mt-3 text-xs text-[hsl(var(--muted-foreground))]">
              This demo does not process an actual payment.
            </p>

            <div className="mt-5 flex gap-3">
              <Button
                variant="ghost"
                className="flex-1 border"
                onClick={() => setSelectedSlot(null)}
              >
                Cancel
              </Button>

              <Button className="flex-1" onClick={handleClaim}>
                Confirm Claim
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExchangePage;
