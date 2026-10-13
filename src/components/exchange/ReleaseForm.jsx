import { useState } from "react";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import Button from "../layout/Button";

function ReleaseForm({ toast, onRelease, bookings = [] }) {
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [price, setPrice] = useState("");
  const [reason, setReason] = useState("Plans changed");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  // Show only upcoming bookings that have not already been released.
  const eligibleBookings = bookings.filter((booking) => {
    const status = String(booking.status || "").toLowerCase();

    return (
      ["upcoming", "confirmed", "booked"].includes(status) &&
      !booking.exchangeListed &&
      !booking.exchangeBooking
    );
  });

  const selectedBooking = eligibleBookings.find(
    (booking) => String(booking.id) === String(selectedBookingId),
  );

  const getBookingStation = (booking) =>
    booking?.station || booking?.stationName || "";

  const getBookingDate = (booking) => booking?.date || "";

  const getBookingTime = (booking) => {
    if (booking?.time) return booking.time;

    if (booking?.startTime && booking?.endTime) {
      return `${booking.startTime} – ${booking.endTime}`;
    }

    return booking?.startTime || "";
  };

  const getBookingPrice = (booking) =>
    Number(booking?.cost ?? booking?.amount ?? booking?.price ?? 0);

  const getCity = (booking) => {
    if (booking?.city) return booking.city;

    const location = booking?.location || "";
    const normalizedLocation = location.toLowerCase();

    if (normalizedLocation.includes("nashik")) return "nashik";
    if (normalizedLocation.includes("pune")) return "pune";

    const stationId = String(booking?.stationId || "").toLowerCase();

    if (stationId.includes("nashik")) return "nashik";
    if (stationId.includes("pune")) return "pune";

    return "";
  };

  const handleBookingChange = (event) => {
    const bookingId = event.target.value;

    setSelectedBookingId(bookingId);
    setError("");
    setDone(false);

    const booking = eligibleBookings.find(
      (item) => String(item.id) === String(bookingId),
    );

    if (booking) {
      const originalPrice = getBookingPrice(booking);

      setPrice(originalPrice > 0 ? String(originalPrice) : "");
    } else {
      setPrice("");
    }
  };

  const handlePublish = () => {
    setError("");

    if (!selectedBooking) {
      setError("Please select a valid booking to release.");
      return;
    }

    const station = getBookingStation(selectedBooking);
    const date = getBookingDate(selectedBooking);
    const time = getBookingTime(selectedBooking);
    const originalPrice = getBookingPrice(selectedBooking);
    const exchangePrice = Number(price);

    if (!station || !date || !time) {
      setError(
        "The selected booking is missing station, date, or time details.",
      );
      return;
    }

    if (!Number.isFinite(exchangePrice) || exchangePrice <= 0) {
      setError("Please enter a valid price greater than ₹0.");
      return;
    }

    if (originalPrice > 0 && exchangePrice > originalPrice) {
      setError(
        `Your exchange price cannot exceed the original booking price of ₹${originalPrice}.`,
      );
      return;
    }

    const charger =
      selectedBooking.charger || selectedBooking.connector || "EV Charger";

    const stationId = selectedBooking.stationId || selectedBooking.id;

    const listing = {
      id: `EX-${Date.now()}`,
      bookingId: selectedBooking.id,
      owner: selectedBooking.owner || "EV User",
      station,
      stationId,
      city: getCity(selectedBooking),
      charger,
      date,
      time,
      price: exchangePrice,
      originalPrice: originalPrice || exchangePrice,
      reason,
      status: "listed",
    };

    // Send the new listing to the parent component.
    onRelease(listing);

    setDone(true);
    toast?.("Your slot has been published successfully.");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_.8fr]">
      <div className="rounded-3xl border bg-[hsl(var(--card))] p-6">
        <div className="mb-6 flex items-start gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-[hsl(var(--accent)/.3)]">
            <ArrowRight size={20} />
          </span>

          <div>
            <h2 className="font-display text-xl font-bold">
              Release your booking
            </h2>

            <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
              Share a charging slot you no longer need with another EV driver.
            </p>
          </div>
        </div>

        {/* Booking selection */}
        <label className="mb-2 block text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">
          Booking to release
          <select
            value={selectedBookingId}
            onChange={handleBookingChange}
            className="mt-2 w-full rounded-xl border bg-[hsl(var(--card))] p-3 text-sm font-semibold normal-case"
            data-testid="select-release-booking"
          >
            <option value="">Select a booking</option>

            {eligibleBookings.map((booking) => (
              <option key={booking.id} value={booking.id}>
                {getBookingStation(booking)} · {getBookingDate(booking)} ·{" "}
                {getBookingTime(booking)}
              </option>
            ))}
          </select>
        </label>

        {eligibleBookings.length === 0 && (
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            You don't have any eligible upcoming bookings to release.
          </p>
        )}

        {/* Selected booking details */}
        {selectedBooking && (
          <div className="mt-4 rounded-xl bg-[hsl(var(--muted))] p-4">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Original booking
            </p>

            <p className="mt-1 font-semibold">
              {getBookingStation(selectedBooking)}
            </p>

            <p className="mt-1 text-sm">
              {getBookingDate(selectedBooking)} ·{" "}
              {getBookingTime(selectedBooking)}
            </p>

            <p className="mt-2 text-sm">
              Original price: ₹
              {getBookingPrice(selectedBooking).toLocaleString("en-IN")}
            </p>
          </div>
        )}

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {/* Exchange price */}
          <label className="text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">
            Your price
            <input
              type="number"
              min="1"
              step="1"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
                setError("");
                setDone(false);
              }}
              placeholder="Enter price in ₹"
              className="mt-2 w-full rounded-xl border bg-transparent p-3 text-sm"
              data-testid="input-release-price"
            />
          </label>

          {/* Release reason */}
          <label className="text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">
            Release reason
            <select
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              className="mt-2 w-full rounded-xl border bg-[hsl(var(--card))] p-3 text-sm normal-case"
              data-testid="select-release-reason"
            >
              <option>Plans changed</option>
              <option>Found a closer station</option>
              <option>Change in travel schedule</option>
              <option>Other</option>
            </select>
          </label>
        </div>

        {/* Validation error */}
        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        {/* Publish button */}
        <Button
          className="mt-6 w-full"
          onClick={handlePublish}
          disabled={done || eligibleBookings.length === 0}
          data-testid="button-publish-slot"
        >
          {done ? (
            <>
              <Check size={16} />
              Listed for drivers
            </>
          ) : (
            <>
              Publish exchange slot
              <ArrowRight size={16} />
            </>
          )}
        </Button>

        {done && (
          <p className="mt-3 text-center text-sm text-green-600">
            Your charging slot has been added to the exchange marketplace.
          </p>
        )}
      </div>

      {/* Information panel — design preserved */}
      <div className="rounded-3xl bg-[hsl(var(--secondary))] p-6 text-white">
        <ShieldCheck className="text-[hsl(var(--accent))]" size={24} />

        <h2 className="mt-5 font-display text-2xl font-bold">
          A fair exchange,
          <br />
          by design.
        </h2>

        <ul className="mt-6 space-y-4 text-sm text-white/65">
          <li className="flex gap-3">
            <Check className="shrink-0 text-[hsl(var(--accent))]" size={17} />
            Your original booking is selected before publishing.
          </li>

          <li className="flex gap-3">
            <Check className="shrink-0 text-[hsl(var(--accent))]" size={17} />
            Set a price that feels fair.
          </li>

          <li className="flex gap-3">
            <Check className="shrink-0 text-[hsl(var(--accent))]" size={17} />
            Your listing becomes visible to other drivers.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ReleaseForm;
