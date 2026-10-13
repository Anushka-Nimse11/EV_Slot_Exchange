import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Check,
  ChevronLeft,
  CreditCard,
  PlugZap,
  QrCode,
} from "lucide-react";

import Button from "../components/layout/Button";

const money = (n) => `₹${Number(n ?? 0).toLocaleString("en-IN")}`;

function BookPage({ stations = [], add, toast }) {
  const [, navigate] = useLocation();

  // const stationId = new URLSearchParams(window.location.search).get("station");

  // const station =
  //   stations.find((s) => s.id === stationId) ?? stations[0] ?? null;

  // // All hooks must run before conditional returns.
  // const [step, setStep] = useState(1);
  // const [date, setDate] = useState("Tue, 18 Jun");
  // const [slot, setSlot] = useState("");
  // const [paid, setPaid] = useState(false);
  // const [bookingId, setBookingId] = useState("");

  // // Select a valid time slot whenever the station changes.

  // useEffect(() => {
  //   setSlot(station?.availableSlots?.[1] ?? station?.availableSlots?.[0] ?? "");
  // }, [station?.id, station?.availableSlots]);

  // const dates = ["Tue, 18 Jun", "Wed, 19 Jun", "Thu, 20 Jun"];

  // const total = (Number(station?.pricePerKwh) || 0) * 22 + 35;
  // const charger = station?.chargers?.[0];
  // const slots = station?.availableSlots ?? [];

  const searchParams = new URLSearchParams(window.location.search);

  const stationId = searchParams.get("station");
  const requestedChargerIndex = Number(searchParams.get("charger") ?? 0);

  const station =
    stations.find((s) => String(s.id) === stationId) ?? stations[0] ?? null;

  // Generate the next three dates dynamically.
  const getDateOptions = () => {
    return Array.from({ length: 3 }, (_, index) => {
      const currentDate = new Date();

      currentDate.setHours(0, 0, 0, 0);
      currentDate.setDate(currentDate.getDate() + index);

      const value = [
        currentDate.getFullYear(),
        String(currentDate.getMonth() + 1).padStart(2, "0"),
        String(currentDate.getDate()).padStart(2, "0"),
      ].join("-");

      const label = currentDate.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });

      const dayLabel =
        index === 0 ? "Today" : index === 1 ? "Tomorrow" : "Day after";

      return {
        value,
        label,
        dayLabel,
      };
    });
  };

  const dates = getDateOptions();

  // All hooks must run before conditional returns.
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(() => getDateOptions()[0].value);
  const [slot, setSlot] = useState("");
  const [paid, setPaid] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // Use the selected charger, falling back to the first available charger.
  const charger =
    station?.chargers?.[requestedChargerIndex]?.status === "Available"
      ? station.chargers[requestedChargerIndex]
      : (station?.chargers?.find((item) => item.status === "Available") ??
        station?.chargers?.[0]);

  const slots = station?.availableSlots ?? [];

  const total = (Number(station?.pricePerKwh) || 0) * 22 + 35;

  // Select a valid time slot whenever the station changes.
  useEffect(() => {
    setSlot(station?.availableSlots?.[1] ?? station?.availableSlots?.[0] ?? "");
  }, [station?.id, station?.availableSlots]);

  // Safe conditional returns: all hooks have already run.
  if (!station) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">No charging stations available.</h1>
        <Button className="mt-4" onClick={() => navigate("/stations")}>
          Browse stations
        </Button>
      </div>
    );
  }

  if (!charger) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">No charger information available.</h1>
        <Button
          className="mt-4"
          onClick={() => navigate(`/stations/${station.id}`)}
        >
          Back to station
        </Button>
      </div>
    );
  }

  // Payment confirmation screen.
  if (paid) {
    return (
      <div className="mx-auto max-w-xl py-10 text-center rise">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-[hsl(var(--primary))] text-white">
          <Check size={39} />
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-[hsl(var(--primary))]">
          You’re all set
        </p>

        <h1 className="mt-2 font-display text-4xl font-bold">
          Charge time secured.
        </h1>

        <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">
          Your charger is waiting at {station.name}.
        </p>

        <div className="mt-8 rounded-3xl border bg-[hsl(var(--card))] p-6 text-left">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-[hsl(var(--muted-foreground))]">
                Booking ID
              </p>
              <p className="mt-1 font-display text-xl font-bold">{bookingId}</p>
            </div>

            <div className="grid size-20 place-items-center rounded-xl bg-[hsl(var(--secondary))] text-white">
              <QrCode size={48} />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 border-t pt-4 text-sm">
            <span>
              <b className="block text-xs text-[hsl(var(--muted-foreground))]">
                Station
              </b>
              {station.name}
            </span>

            <span>
              <b className="block text-xs text-[hsl(var(--muted-foreground))]">
                Date & time
              </b>
              {dates.find((day) => day.value === date)?.label ?? date}
              <br />
              {slot}
            </span>
          </div>

          <div className="mt-4 border-t pt-4 text-sm">
            <b>Total paid</b>
            <p className="mt-1 font-bold">{money(total)}</p>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <Button
            variant="soft"
            className="flex-1"
            onClick={() => navigate("/bookings")}
            data-testid="button-view-confirmed-booking"
          >
            View booking
          </Button>

          <Button
            className="flex-1"
            onClick={() => navigate("/")}
            data-testid="button-back-home"
          >
            Back home
          </Button>
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    if (!slot) {
      toast("Please select an available time slot");
      return;
    }

    const newBookingId = `ES-${Date.now()}`;

    const booking = {
      id: newBookingId,
      station: station.name,
      stationId: station.id,
      charger: `${charger.type} · ${charger.connector ?? "Standard connector"}`,
      chargerIndex: station.chargers.indexOf(charger),
      date,
      time: slot,
      cost: total,
      status: "upcoming",
      vehicle: "Tata Nexon EV",
      qrCode: `EV${Date.now()}`,
    };

    add(booking);
    setBookingId(newBookingId);
    setPaid(true);
    toast("Booking confirmed");
  };

  return (
    <>
      <button
        onClick={() =>
          step === 1
            ? navigate(`/stations/${station.id}`)
            : setStep((current) => current - 1)
        }
        className="mb-5 flex items-center gap-2 text-sm font-bold text-[hsl(var(--muted-foreground))]"
        data-testid="button-back-booking"
      >
        <ChevronLeft size={17} />
        Back
      </button>

      <div className="mx-auto max-w-4xl">
        {/* Booking progress */}
        <div className="mb-8 flex items-center justify-center gap-2 md:gap-5">
          {["Time", "Vehicle", "Payment"].map((label, index) => (
            <div key={label} className="flex items-center gap-2 md:gap-5">
              <div
                className={`flex items-center gap-2 text-xs font-bold ${
                  step >= index + 1
                    ? "text-[hsl(var(--primary))]"
                    : "text-[hsl(var(--muted-foreground))]"
                }`}
              >
                <span
                  className={`grid size-7 place-items-center rounded-full text-xs ${
                    step > index + 1
                      ? "bg-[hsl(var(--primary))] text-white"
                      : step === index + 1
                        ? "bg-[hsl(var(--accent))]"
                        : "bg-[hsl(var(--muted))]"
                  }`}
                >
                  {step > index + 1 ? <Check size={14} /> : index + 1}
                </span>
                {label}
              </div>

              {index < 2 && (
                <div className="h-px w-8 bg-[hsl(var(--border))] md:w-20" />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Main booking form */}
          <div className="rounded-3xl border bg-[hsl(var(--card))] p-5 md:p-7">
            {/* Step 1: Select date and time */}
            {step === 1 && (
              <>
                <p className="text-xs font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]">
                  Step 1 of 3
                </p>

                <h1 className="mt-2 font-display text-2xl font-bold">
                  When are you charging?
                </h1>

                <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                  {station.name}
                </p>

                <p className="mb-3 mt-7 text-sm font-bold">Select a day</p>

                <div className="grid grid-cols-3 gap-2">
                  {/* /* {dates.map((day, index) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setDate(day)}
                      className={`rounded-xl border p-3 text-left ${
                        date === day
                          ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/.08)]"
                          : ""
                      }`}
                      data-testid={`button-date-${index}`}
                    >
                      <span className="block text-xs text-[hsl(var(--muted-foreground))]">
                        {index === 0
                          ? "Today"
                          : index === 1
                            ? "Tomorrow"
                            : "Thursday"}
                      </span>

                      <b className="mt-1 block text-sm">{day.split(", ")[1]}</b>
                    </button>
                  ))} */}

                  {dates.map((day, index) => (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() => setDate(day.value)}
                      className={`rounded-xl border p-3 text-left ${
                        date === day.value
                          ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/.08)]"
                          : ""
                      }`}
                      data-testid={`button-date-${index}`}
                    >
                      <span className="block text-xs text-[hsl(var(--muted-foreground))]">
                        {day.dayLabel}
                      </span>

                      <b className="mt-1 block text-sm">{day.label}</b>
                    </button>
                  ))}
                </div>

                <p className="mb-3 mt-7 text-sm font-bold">
                  Available time slots
                </p>

                {slots.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {slots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSlot(time)}
                        className={`rounded-xl border p-3 text-sm font-bold ${
                          slot === time
                            ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/.08)] text-[hsl(var(--primary))]"
                            : ""
                        }`}
                        data-testid={`button-slot-${time}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-xl border p-4 text-sm text-[hsl(var(--muted-foreground))]">
                    No available time slots for this station.
                  </p>
                )}

                <Button
                  className="mt-8 w-full"
                  disabled={!slot || slots.length === 0}
                  onClick={() => setStep(2)}
                  data-testid="button-continue-time"
                >
                  Continue <ArrowRight size={16} />
                </Button>
              </>
            )}

            {/* Step 2: Select vehicle */}
            {step === 2 && (
              <>
                <p className="text-xs font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]">
                  Step 2 of 3
                </p>

                <h1 className="mt-2 font-display text-2xl font-bold">
                  Which vehicle is coming?
                </h1>

                <div className="mt-7 rounded-2xl border-2 border-[hsl(var(--primary))] bg-[hsl(var(--primary)/.06)] p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-[hsl(var(--primary))] text-white">
                      <CarFront size={21} />
                    </span>

                    <div>
                      <p className="font-bold">Tata Nexon EV</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        MH 15 EV 2846 · CCS2 · 30 kWh
                      </p>
                    </div>

                    <Check className="ml-auto text-[hsl(var(--primary))]" />
                  </div>
                </div>

                <Button
                  className="mt-8 w-full"
                  onClick={() => setStep(3)}
                  data-testid="button-continue-vehicle"
                >
                  Continue to payment <ArrowRight size={16} />
                </Button>
              </>
            )}

            {/* Step 3: Review and payment */}
            {step === 3 && (
              <>
                <p className="text-xs font-bold uppercase tracking-[.15em] text-[hsl(var(--primary))]">
                  Step 3 of 3
                </p>

                <h1 className="mt-2 font-display text-2xl font-bold">
                  Review & pay.
                </h1>

                <div className="mt-6 space-y-3 rounded-2xl bg-[hsl(var(--muted)/.7)] p-4 text-sm">
                  <div className="flex justify-between gap-3">
                    <span>Energy estimate · 22 kWh</span>
                    <b>{money((Number(station.pricePerKwh) || 0) * 22)}</b>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span>Platform protection</span>
                    <b>{money(35)}</b>
                  </div>

                  <div className="flex justify-between border-t pt-3 text-base">
                    <b>Total</b>
                    <b>{money(total)}</b>
                  </div>
                </div>

                {/* <div className="mt-6 flex items-center gap-3 rounded-xl border p-4">
                  <CreditCard size={19} />

                  <div className="text-sm">
                    <b>HDFC Visa ending 2846</b>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      Protected payment
                    </p>
                  </div>
                </div> */}

                <div className="mt-6 flex items-center gap-3 rounded-xl border p-4">
                  <CreditCard size={19} />

                  <div className="text-sm">
                    <b>Demo payment</b>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      No real payment will be processed. Payment gateway
                      integration will be added later.
                    </p>
                  </div>
                </div>

                <Button
                  className="mt-8 w-full"
                  onClick={handlePayment}
                  data-testid="button-confirm-payment"
                >
                  Pay {money(total)} <ArrowRight size={16} />
                </Button>
              </>
            )}
          </div>

          {/* Reservation summary */}
          <aside className="h-fit rounded-3xl bg-[hsl(var(--secondary))] p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-[.15em] text-[hsl(var(--accent))]">
              Your reservation
            </p>

            <h2 className="mt-3 font-display text-xl font-bold">
              {station.name}
            </h2>

            <p className="mt-1 text-sm text-white/60">{station.address}</p>

            <div className="mt-7 space-y-4 border-t border-white/10 pt-5 text-sm">
              <div className="flex gap-3">
                <CalendarDays
                  size={17}
                  className="shrink-0 text-[hsl(var(--accent))]"
                />

                <span>
                  {dates.find((day) => day.value === date)?.label ?? date}
                  <br />
                  {slot || "Select a time slot"}
                </span>
              </div>

              <div className="flex gap-3">
                <PlugZap
                  size={17}
                  className="shrink-0 text-[hsl(var(--accent))]"
                />

                <span>
                  {charger.type}
                  <br />
                  {charger.speed}
                </span>
              </div>

              <div className="flex justify-between border-t border-white/10 pt-4">
                <span className="text-white/70">Estimated total</span>
                <b>{money(total)}</b>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default BookPage;
