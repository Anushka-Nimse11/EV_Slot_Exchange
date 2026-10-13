// import { useState } from "react";
// import { Link } from "wouter";
// import {
//   ArrowRight,
//   CalendarDays,
//   Plus,
//   PlugZap,
//   QrCode,
//   Ticket,
// } from "lucide-react";
// import Title from "../components/layout/Title";

// const money = (n) => `₹${n.toLocaleString("en-IN")}`;

// function BookingsPage({ bookings = [], cancel, toast }) {
//   const [tab, setTab] = useState("upcoming");
//   const filtered = bookings.filter((b) => {
//   if (tab === "all") return true;
//   if (tab === "upcoming") return b.status === "upcoming";
//   if (tab === "completed") {
//     return b.status === "completed" || b.status === "Completed";
//   }
//   if (tab === "released") {
//     return b.status === "released" || b.status === "cancelled";
//   }
//   return b.status === tab;
// });

//   return (
//     <>
//       <Title
//         eyebrow="Your charge history"
//         title="Bookings, at a glance."
//         description="Everything scheduled, completed, or shared with another driver."
//         action={
//           <Link
//             href="/stations"
//             className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-3 text-sm font-bold text-white"
//           >
//             <Plus size={17} /> Book another
//           </Link>
//         }
//       />
//       <div className="mb-6 flex gap-1 rounded-xl bg-[hsl(var(--muted))] p-1 md:w-fit">
//         {[
//           ["upcoming", "Active"],
//           ["completed", "Completed"],
//           ["released", "Released"],
//           ["all", "All"],
//         ].map(([x, l]) => (
//           <button
//             key={x}
//             onClick={() => setTab(x)}
//             className={`rounded-lg px-4 py-2 text-xs font-bold ${tab === x ? "bg-[hsl(var(--card))] shadow-sm" : ""}`}
//             data-testid={`tab-bookings-${x}`}
//           >
//             {l}
//           </button>
//         ))}
//       </div>
//       {filtered.length ? (
//         <div className="space-y-4">
//           {filtered.map((b) => (
//             <div
//               key={b.id}
//               className="lift rounded-2xl border bg-[hsl(var(--card))] p-5"
//               data-testid={`row-booking-${b.id}`}
//             >
//               <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
//                 <div className="flex items-start gap-4">
//                   <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[hsl(var(--accent)/.3)]">
//                     <PlugZap size={20} />
//                   </div>
//                   <div>
//                     <div className="flex flex-wrap items-center gap-2">
//                       <h3 className="font-display font-bold">{b.station}</h3>
//                       <span className="rounded-full bg-[hsl(var(--muted))] px-2 py-1 text-[10px] font-bold uppercase">
//                         {b.status}
//                       </span>
//                     </div>
//                     <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
//                       {b.charger} · {b.vehicle}
//                     </p>
//                     <p className="mt-3 flex items-center gap-2 text-sm font-semibold">
//                       <CalendarDays size={14} />
//                       {b.date} · {b.time}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-5 md:text-right">
//                   <div>
//                     <p className="text-xs text-[hsl(var(--muted-foreground))]">
//                       Total
//                     </p>
//                     <p className="font-display text-lg font-bold">
//                       {money(b.cost)}
//                     </p>
//                     <p className="text-[10px]">{b.id}</p>
//                   </div>
//                   {b.status === "upcoming" && (
//                     <div className="flex gap-2">
//                       <button
//                         className="rounded-xl bg-[hsl(var(--muted))] p-2.5"
//                         onClick={() =>
//                           window.alert(`Booking QR: ${b.qrCode || b.id}`)
//                         }
//                         aria-label="Open booking QR"
//                         data-testid={`button-booking-qr-${b.id}`}
//                       >
//                         <QrCode size={17} />
//                       </button>
//                       <button
//                         className="rounded-xl bg-[hsl(var(--muted))] p-2.5"
//                         onClick={() => {
//                           setBookings(
//                             bookings.map((x) =>
//                               x.id === b.id ? { ...x, status: "released" } : x,
//                             ),
//                           );
//                           toast("Booking released into slot exchange");
//                         }}
//                         aria-label="Release booking"
//                         data-testid={`button-release-booking-${b.id}`}
//                       >
//                         <ArrowRight size={17} />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="rounded-3xl border border-dashed py-20 text-center">
//           <Ticket className="mx-auto" size={30} />
//           <h3 className="mt-4 font-display text-lg font-bold">
//             No {tab} bookings yet
//           </h3>
//           <Link
//             href="/stations"
//             className="mt-5 inline-block text-sm font-bold text-[hsl(var(--primary))]"
//           >
//             Find a station <ArrowRight className="ml-1 inline" size={14} />
//           </Link>
//         </div>
//       )}
//     </>
//   );
// }

// export default BookingsPage;

// import { useState } from "react";
// import { Link } from "wouter";
// import {
//   ArrowRight,
//   CalendarDays,
//   Plus,
//   PlugZap,
//   QrCode,
//   Ticket,
//   XCircle,
// } from "lucide-react";
// import Title from "../components/layout/Title";

// const money = (n) => `₹${Number(n ?? 0).toLocaleString("en-IN")}`;

// function BookingsPage({ bookings = [], cancel, toast }) {
//   const [tab, setTab] = useState("upcoming");

//   const filtered = bookings.filter((b) => {
//     if (tab === "all") return true;

//     if (tab === "upcoming") {
//       return b.status === "upcoming" || b.status === "Confirmed";
//     }

//     if (tab === "completed") {
//       return b.status === "completed" || b.status === "Completed";
//     }

//     if (tab === "released") {
//       return (
//         b.status === "released" ||
//         b.status === "cancelled" ||
//         b.status === "Cancelled"
//       );
//     }

//     return b.status === tab;
//   });

//   return (
//     <>
//       <Title
//         eyebrow="Your charge history"
//         title="Bookings, at a glance."
//         description="Everything scheduled, completed, or shared with another driver."
//         action={
//           <Link
//             href="/stations"
//             className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-3 text-sm font-bold text-white"
//           >
//             <Plus size={17} /> Book another
//           </Link>
//         }
//       />

//       <div className="mb-6 flex flex-wrap gap-1 rounded-xl bg-[hsl(var(--muted))] p-1 md:w-fit">
//         {[
//           ["upcoming", "Active"],
//           ["completed", "Completed"],
//           ["released", "Cancelled / Released"],
//           ["all", "All"],
//         ].map(([value, label]) => (
//           <button
//             key={value}
//             onClick={() => setTab(value)}
//             className={`rounded-lg px-4 py-2 text-xs font-bold ${
//               tab === value ? "bg-[hsl(var(--card))] shadow-sm" : ""
//             }`}
//             data-testid={`tab-bookings-${value}`}
//           >
//             {label}
//           </button>
//         ))}
//       </div>

//       {filtered.length > 0 ? (
//         <div className="space-y-4">
//           {filtered.map((b) => {
//             const isActive =
//               b.status === "upcoming" || b.status === "Confirmed";

//             const isCancelled =
//               b.status === "cancelled" || b.status === "Cancelled";

//             const isCompleted =
//               b.status === "completed" || b.status === "Completed";

//             return (
//               <div
//                 key={b.id}
//                 className="lift rounded-2xl border bg-[hsl(var(--card))] p-5"
//                 data-testid={`row-booking-${b.id}`}
//               >
//                 <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
//                   <div className="flex items-start gap-4">
//                     <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[hsl(var(--accent)/.3)]">
//                       <PlugZap size={20} />
//                     </div>

//                     <div>
//                       <div className="flex flex-wrap items-center gap-2">
//                         <h3 className="font-display font-bold">
//                           {b.stationName ??
//                             b.station ??
//                             b.stationAddress ??
//                             "Charging station"}
//                         </h3>

//                         <span
//                           className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
//                             isCancelled
//                               ? "bg-red-100 text-red-700"
//                               : isCompleted
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-[hsl(var(--muted))]"
//                           }`}
//                         >
//                           {isCancelled
//                             ? "Cancelled"
//                             : isCompleted
//                               ? "Completed"
//                               : b.status === "released"
//                                 ? "Released"
//                                 : b.status}
//                         </span>
//                       </div>

//                       <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
//                         {b.charger ?? "Charger"} ·{" "}
//                         {b.vehicle ?? "Vehicle not specified"}
//                       </p>

//                       <p className="mt-3 flex items-center gap-2 text-sm font-semibold">
//                         <CalendarDays size={14} />
//                         {b.date} · {b.time}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-5 md:text-right">
//                     <div>
//                       <p className="text-xs text-[hsl(var(--muted-foreground))]">
//                         Total
//                       </p>

//                       <p className="font-display text-lg font-bold">
//                         {money(b.cost ?? b.estimatedCost)}
//                       </p>

//                       <p className="text-[10px]">{b.id}</p>
//                     </div>

//                     {isActive && (
//                       <div className="flex gap-2">
//                         <button
//                           type="button"
//                           className="rounded-xl bg-[hsl(var(--muted))] p-2.5"
//                           onClick={() =>
//                             window.alert(`Booking QR: ${b.qrCode || b.id}`)
//                           }
//                           aria-label="Open booking QR"
//                           title="View booking QR"
//                           data-testid={`button-booking-qr-${b.id}`}
//                         >
//                           <QrCode size={17} />
//                         </button>

//                         <button
//                           type="button"
//                           className="flex items-center gap-1 rounded-xl bg-red-100 px-3 py-2.5 text-sm font-bold text-red-700 hover:bg-red-200"
//                           onClick={() => {
//                             if (
//                               window.confirm(
//                                 "Are you sure you want to cancel this booking?",
//                               )
//                             ) {
//                               if (typeof cancel === "function") {
//                                 cancel(b.id);
//                               } else {
//                                 console.error(
//                                   "Cancellation handler is missing. Check the BookingsPage route in App.jsx.",
//                                 );
//                                 return;
//                               }
//                             }
//                           }}
//                           aria-label="Cancel booking"
//                           title="Cancel booking"
//                           data-testid={`button-cancel-booking-${b.id}`}
//                         >
//                           <XCircle size={16} />
//                           Cancel
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="rounded-3xl border border-dashed py-20 text-center">
//           <Ticket className="mx-auto" size={30} />

//           <h3 className="mt-4 font-display text-lg font-bold">
//             No {tab === "upcoming" ? "active" : tab} bookings yet
//           </h3>

//           <Link
//             href="/stations"
//             className="mt-5 inline-block text-sm font-bold text-[hsl(var(--primary))]"
//           >
//             Find a station <ArrowRight className="ml-1 inline" size={14} />
//           </Link>
//         </div>
//       )}
//     </>
//   );
// }

// export default BookingsPage;

import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  CalendarDays,
  Plus,
  PlugZap,
  QrCode,
  Ticket,
  XCircle,
  Repeat2,
  CheckCircle2,
  Clock,
  X,
} from "lucide-react";
import Title from "../components/layout/Title";

const money = (n) => `₹${Number(n ?? 0).toLocaleString("en-IN")}`;

const getStatus = (booking) => String(booking.status ?? "").toLowerCase();

function BookingsPage({ bookings = [], onCancel, onRelease, cancel, toast }) {
  const [tab, setTab] = useState("upcoming");
  const [qrBooking, setQrBooking] = useState(null);
  const [releaseBooking, setReleaseBooking] = useState(null);
  const [askingPrice, setAskingPrice] = useState("");

  // Supports both the new and old App.jsx prop names.
  const cancelHandler = onCancel ?? cancel;

  const filtered = bookings.filter((booking) => {
    const status = getStatus(booking);

    if (tab === "all") return true;

    if (tab === "upcoming") {
      return status === "upcoming" || status === "confirmed";
    }

    if (tab === "completed") {
      return status === "completed";
    }

    if (tab === "cancelled") {
      return status === "cancelled";
    }

    if (tab === "released") {
      return status === "released";
    }

    return status === tab;
  });

  const handleCancel = (booking) => {
    if (!["upcoming", "confirmed"].includes(getStatus(booking))) {
      toast?.("This booking cannot be cancelled");
      return;
    }

    if (typeof cancelHandler !== "function") {
      toast?.("Cancellation handler is missing in App.jsx");
      console.error("Pass onCancel or cancel to BookingsPage.");
      return;
    }

    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelHandler(booking.id);
    }
  };

  const openReleaseModal = (booking) => {
    setReleaseBooking(booking);
    setAskingPrice(String(booking.cost ?? booking.estimatedCost ?? ""));
  };

  const handleRelease = () => {
    const price = Number(askingPrice);

    if (!Number.isFinite(price) || price <= 0) {
      toast?.("Enter a valid exchange price");
      return;
    }

    if (typeof onRelease !== "function") {
      toast?.("Exchange handler is missing in App.jsx");
      console.error("Pass onRelease to BookingsPage.");
      return;
    }

    onRelease(releaseBooking.id, price);
    setReleaseBooking(null);
    setAskingPrice("");
  };

  return (
    <>
      <Title
        eyebrow="Your charge history"
        title="Bookings, at a glance."
        description="Everything scheduled, completed, cancelled, or shared with another driver."
        action={
          <Link
            href="/stations"
            className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-3 text-sm font-bold text-white"
          >
            <Plus size={17} />
            Book another
          </Link>
        }
      />

      {/* Booking filters */}
      <div className="mb-6 flex flex-wrap gap-1 rounded-xl bg-[hsl(var(--muted))] p-1 md:w-fit">
        {[
          ["upcoming", "Active"],
          ["completed", "Completed"],
          ["cancelled", "Cancelled"],
          ["released", "Released"],
          ["all", "All"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={`rounded-lg px-4 py-2 text-xs font-bold ${
              tab === value ? "bg-[hsl(var(--card))] shadow-sm" : ""
            }`}
            data-testid={`tab-bookings-${value}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Booking list */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((booking) => {
            const status = getStatus(booking);

            const isActive = status === "upcoming" || status === "confirmed";

            const isCancelled = status === "cancelled";
            const isCompleted = status === "completed";
            const isReleased = status === "released";

            const statusLabel = isCancelled
              ? "Cancelled"
              : isCompleted
                ? "Completed"
                : isReleased
                  ? "Released"
                  : isActive
                    ? "Confirmed"
                    : (booking.status ?? "Unknown");

            return (
              <div
                key={booking.id}
                className="lift rounded-2xl border bg-[hsl(var(--card))] p-5"
                data-testid={`row-booking-${booking.id}`}
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  {/* Station and booking details */}
                  <div className="flex items-start gap-4">
                    <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[hsl(var(--accent)/.3)]">
                      <PlugZap size={20} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display font-bold">
                          {booking.stationName ??
                            booking.station ??
                            booking.stationAddress ??
                            "Charging station"}
                        </h3>

                        <span
                          className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                            isCancelled
                              ? "bg-red-100 text-red-700"
                              : isCompleted
                                ? "bg-green-100 text-green-700"
                                : isReleased
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-[hsl(var(--muted))]"
                          }`}
                        >
                          {statusLabel}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                        {booking.charger ?? "Charger"} ·{" "}
                        {booking.vehicle ?? "Vehicle not specified"}
                      </p>

                      <p className="mt-3 flex items-center gap-2 text-sm font-semibold">
                        <CalendarDays size={14} />
                        {booking.date ?? "Date not specified"} ·{" "}
                        {booking.time ?? "Time not specified"}
                      </p>

                      {booking.reference && (
                        <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                          Reference: {booking.reference}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Price and actions */}
                  <div className="flex flex-wrap items-center gap-4 md:justify-end">
                    <div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        Total
                      </p>

                      <p className="font-display text-lg font-bold">
                        {money(booking.cost ?? booking.estimatedCost)}
                      </p>

                      <p className="text-[10px]">{booking.id}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {/* QR code */}
                      {isActive && (
                        <button
                          type="button"
                          className="rounded-xl bg-[hsl(var(--muted))] p-2.5"
                          onClick={() => setQrBooking(booking)}
                          aria-label="Open booking QR"
                          title="View booking QR"
                          data-testid={`button-booking-qr-${booking.id}`}
                        >
                          <QrCode size={17} />
                        </button>
                      )}

                      {/* Release booking to Slot Exchange */}
                      {isActive && (
                        <button
                          type="button"
                          className="flex items-center gap-1 rounded-xl bg-blue-100 px-3 py-2.5 text-sm font-bold text-blue-700 hover:bg-blue-200"
                          onClick={() => openReleaseModal(booking)}
                          title="Release booking for exchange"
                          data-testid={`button-release-booking-${booking.id}`}
                        >
                          <Repeat2 size={16} />
                          Release
                        </button>
                      )}

                      {/* Cancel booking */}
                      {isActive && (
                        <button
                          type="button"
                          className="flex items-center gap-1 rounded-xl bg-red-100 px-3 py-2.5 text-sm font-bold text-red-700 hover:bg-red-200"
                          onClick={() => handleCancel(booking)}
                          aria-label="Cancel booking"
                          title="Cancel booking"
                          data-testid={`button-cancel-booking-${booking.id}`}
                        >
                          <XCircle size={16} />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed py-20 text-center">
          <Ticket className="mx-auto" size={30} />

          <h3 className="mt-4 font-display text-lg font-bold">
            {tab === "upcoming"
              ? "No active bookings yet"
              : tab === "all"
                ? "No bookings yet"
                : `No ${tab} bookings yet`}
          </h3>

          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            Your charging reservations will appear here.
          </p>

          <Link
            href="/stations"
            className="mt-5 inline-block text-sm font-bold text-[hsl(var(--primary))]"
          >
            Find a station <ArrowRight className="ml-1 inline" size={14} />
          </Link>
        </div>
      )}

      {/* QR modal */}
      {qrBooking && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          onClick={() => setQrBooking(null)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-[hsl(var(--card))] p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Booking QR code"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-bold">Booking QR</h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  {qrBooking.stationName ??
                    qrBooking.station ??
                    "Charging station"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setQrBooking(null)}
                className="rounded-lg p-2 hover:bg-[hsl(var(--muted))]"
                aria-label="Close QR modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="my-5 grid place-items-center rounded-2xl bg-white p-5">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                  qrBooking.qrCode ?? qrBooking.id,
                )}`}
                alt={`QR code for booking ${qrBooking.id}`}
                className="size-52"
              />
            </div>

            <p className="text-center text-sm font-bold">
              {qrBooking.qrCode ?? qrBooking.id}
            </p>

            <p className="mt-2 text-center text-xs text-[hsl(var(--muted-foreground))]">
              Demo QR code for this booking.
            </p>
          </div>
        </div>
      )}

      {/* Release-to-exchange modal */}
      {releaseBooking && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          onClick={() => setReleaseBooking(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-[hsl(var(--card))] p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Release booking for exchange"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
                  Slot Exchange
                </p>

                <h2 className="mt-1 font-display text-xl font-bold">
                  Release your booking
                </h2>

                <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                  List this reservation so another driver can claim it.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setReleaseBooking(null)}
                className="rounded-lg p-2 hover:bg-[hsl(var(--muted))]"
                aria-label="Close release modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="my-5 rounded-2xl bg-[hsl(var(--muted))] p-4">
              <p className="font-bold">
                {releaseBooking.stationName ??
                  releaseBooking.station ??
                  "Charging station"}
              </p>

              <p className="mt-1 flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                <Clock size={14} />
                {releaseBooking.date ?? "Date not specified"} ·{" "}
                {releaseBooking.time ?? "Time not specified"}
              </p>

              <p className="mt-2 text-sm">
                Original price:{" "}
                <strong>
                  {money(releaseBooking.cost ?? releaseBooking.estimatedCost)}
                </strong>
              </p>
            </div>

            <label
              htmlFor="exchange-price"
              className="mb-2 block text-sm font-bold"
            >
              Asking price (₹)
            </label>

            <input
              id="exchange-price"
              type="number"
              min="1"
              step="1"
              value={askingPrice}
              onChange={(event) => setAskingPrice(event.target.value)}
              placeholder="Enter your asking price"
              className="w-full rounded-xl border bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            />

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setReleaseBooking(null)}
                className="flex-1 rounded-xl bg-[hsl(var(--muted))] px-4 py-3 text-sm font-bold"
              >
                Keep booking
              </button>

              <button
                type="button"
                onClick={handleRelease}
                className="flex-1 rounded-xl bg-[hsl(var(--primary))] px-4 py-3 text-sm font-bold text-white"
              >
                Release booking
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingsPage;
