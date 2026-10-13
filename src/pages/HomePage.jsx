// import { Link } from "wouter";
// import {
//   ArrowRight,
//   BatteryCharging,
//   CalendarDays,
//   Plus,
//   Sparkles,
//   UsersRound,
// } from "lucide-react";

// import Title from "../components/layout/Title";
// import StationCard from "../components/stations/StationCard";
// import BookingPreview from "../components/bookings/BookingPreview";

// function HomePage({ stations, bookings, exchange, toast }) {
//   const upcoming = bookings.find((b) => b.status === "upcoming");
//   return (
//     <>
//       <Title
//         eyebrow="Good morning, Aarav"
//         title="Ready when you are."
//         description="Find a charger, keep your plans moving, and help another driver do the same."
//         action={
//           <Link
//             href="/stations"
//             className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--primary))] px-4 py-3 text-sm font-bold text-white"
//             data-testid="link-find-charger"
//           >
//             <Plus size={17} /> Find a charger
//           </Link>
//         }
//       />
//       <section className="mb-8 grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
//         <div className="relative overflow-hidden rounded-3xl bg-[hsl(var(--secondary))] p-6 text-white md:p-8 rise">
//           <div className="relative z-10 max-w-lg">
//             <div className="mb-4 flex items-center gap-2 text-[hsl(var(--accent))]">
//               <Sparkles size={16} />
//               <span className="text-xs font-bold uppercase tracking-[.15em]">
//                 Your charging rhythm
//               </span>
//             </div>
//             <h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">
//               The next stop is
//               <br />
//               <span className="text-[hsl(var(--accent))]">already sorted.</span>
//             </h2>
//             <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
//               Browse 12 trusted connectors around Nashik and Pune. Reserve your
//               quiet minute before the rush.
//             </p>
//             <Link
//               href="/stations"
//               className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--accent))] px-4 py-3 text-sm font-bold text-[hsl(var(--secondary))]"
//               data-testid="link-explore-nearby"
//             >
//               Explore nearby <ArrowRight size={16} />
//             </Link>
//           </div>
//           <div className="absolute -right-8 -top-12 size-64 rounded-full border-[30px] border-[hsl(var(--primary)/.28)]" />
//         </div>
//         <div className="rounded-3xl bg-[hsl(var(--primary))] p-6 text-white rise rise-1">
//           <div className="flex items-center justify-between">
//             <span className="text-xs font-bold uppercase tracking-[.15em] text-white/60">
//               This month
//             </span>
//             <BatteryCharging size={21} className="text-[hsl(var(--accent))]" />
//           </div>
//           <p className="mt-8 font-display text-5xl font-bold">
//             84<span className="ml-1 text-2xl">kWh</span>
//           </p>
//           <p className="mt-2 text-sm text-white/70">
//             charged through ChargeMate
//           </p>
//           <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-[hsl(var(--accent))]">
//             <ArrowRight size={14} /> 18% less than public tariff
//           </div>
//         </div>
//       </section>
//       <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
//         <section>
//           <div className="mb-4 flex items-center justify-between">
//             <div>
//               <p className="text-xs font-bold uppercase tracking-[.16em] text-[hsl(var(--primary))]">
//                 On your radar
//               </p>
//               <h2 className="mt-1 font-display text-xl font-bold">
//                 Nearby stations
//               </h2>
//             </div>
//             <Link
//               href="/stations"
//               className="text-sm font-bold text-[hsl(var(--primary))]"
//               data-testid="link-see-all-stations"
//             >
//               See all <ArrowRight className="ml-1 inline" size={14} />
//             </Link>
//           </div>
//           <div className="grid gap-4 sm:grid-cols-2">
//             <StationCard station={stations[0]} />
//             <StationCard station={stations[1]} />
//           </div>
//         </section>
//         <section>
//           <div className="mb-4 flex items-center justify-between">
//             <div>
//               <p className="text-xs font-bold uppercase tracking-[.16em] text-[hsl(var(--primary))]">
//                 Next up
//               </p>
//               <h2 className="mt-1 font-display text-xl font-bold">
//                 Your booking
//               </h2>
//             </div>
//             <Link
//               href="/bookings"
//               className="text-sm font-bold text-[hsl(var(--primary))]"
//             >
//               All bookings
//             </Link>
//           </div>
//           {upcoming ? (
//             <BookingPreview booking={upcoming} toast={toast} />
//           ) : (
//             <div className="rounded-2xl border border-dashed p-8 text-center">
//               <CalendarDays className="mx-auto" />
//               <p className="mt-3 text-sm font-bold">No upcoming bookings</p>
//             </div>
//           )}
//           <div className="mt-4 rounded-2xl border bg-[hsl(var(--card))] p-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <UsersRound size={17} className="text-[hsl(var(--primary))]" />
//                 <span className="text-sm font-bold">Slot exchange</span>
//               </div>
//               <Link
//                 href="/exchange"
//                 className="text-xs font-bold text-[hsl(var(--primary))]"
//               >
//                 Browse <ArrowRight className="ml-1 inline" size={12} />
//               </Link>
//             </div>
//             <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
//               {exchange.length} drivers nearby are sharing a slot today.
//             </p>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }
// export default HomePage;

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import {
  BatteryCharging,
  Zap,
  ArrowRightLeft,
  IndianRupee,
  CalendarDays,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Activity,
  X,
  QrCode,
  PlugZap,
  Leaf,
} from "lucide-react";

// -----------------------------------------
// SAMPLE DATA
// Later, replace this data with API results.
// -----------------------------------------

const dashboardStats = [
  {
    title: "Charging Sessions",
    value: 12,
    description: "Total completed sessions",
    icon: BatteryCharging,
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Energy Consumed",
    value: "84 kWh",
    description: "Total charging energy",
    icon: Zap,
    color: "bg-amber-50 text-amber-700",
  },
  {
    title: "Successful Exchanges",
    value: 4,
    description: "Slots exchanged successfully",
    icon: ArrowRightLeft,
    color: "bg-blue-50 text-blue-700",
  },
  {
    title: "Estimated Savings",
    value: "₹320",
    description: "Estimated money saved",
    icon: IndianRupee,
    color: "bg-purple-50 text-purple-700",
  },
];

// Generate a future sample booking date.
// This avoids displaying a permanently outdated date.

function getTomorrow() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
}

const sampleBooking = {
  id: "ES-48291",
  station: "Courtyard by EV",
  location: "College Road, Nashik",
  charger: "DC Fast",
  connector: "CCS2",
  vehicle: "Tata Nexon EV",
  startTime: "10:30 AM",
  endTime: "11:15 AM",
  date: getTomorrow(),
  status: "Confirmed",
  estimatedCost: 420,
};

const recentActivities = [
  {
    id: 1,
    title: "Booking confirmed",
    description: "Courtyard by EV",
    time: "Today, 9:30 AM",
    status: "Confirmed",
    icon: CalendarDays,
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    id: 2,
    title: "Slot exchange completed",
    description: "Riverfront Charge Hub",
    time: "Yesterday, 5:45 PM",
    status: "Completed",
    icon: ArrowRightLeft,
    color: "bg-blue-50 text-blue-700",
  },
  {
    id: 3,
    title: "Charging session completed",
    description: "Kalyani Nagar Greenpoint",
    time: "Yesterday, 2:15 PM",
    status: "Completed",
    icon: BatteryCharging,
    color: "bg-amber-50 text-amber-700",
  },
  {
    id: 4,
    title: "Slot released for exchange",
    description: "Courtyard by EV",
    time: "12 Oct, 11:00 AM",
    status: "Released",
    icon: ArrowRightLeft,
    color: "bg-purple-50 text-purple-700",
  },
];

const nearbyStations = [
  {
    id: 1,
    name: "Courtyard by EV",
    location: "College Road, Nashik",
    distance: "1.4 km",
    available: 2,
    price: 18,
    rating: 4.8,
    charger: "DC Fast",
  },
  {
    id: 2,
    name: "Riverfront Charge Hub",
    location: "Bund Garden Road, Pune",
    distance: "3.8 km",
    available: 3,
    price: 21,
    rating: 4.6,
    charger: "DC Ultra",
  },
];

// -----------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------

function formatDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

// -----------------------------------------
// STATISTICS CARD
// -----------------------------------------

function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{stat.title}</p>

          <h3 className="mt-3 text-3xl font-bold text-slate-900">
            {stat.value}
          </h3>
        </div>

        <div className={`rounded-xl p-3 ${stat.color}`}>
          <Icon size={23} />
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500">{stat.description}</p>
    </div>
  );
}

// -----------------------------------------
// UPCOMING BOOKING CARD
// -----------------------------------------

function UpcomingBooking({ booking, onViewDetails }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
            {booking.status}
          </span>

          <span className="text-sm text-slate-500">
            Booking ID: {booking.id}
          </span>
        </div>

        <div className="flex items-center gap-2 text-emerald-700">
          <CheckCircle2 size={18} />
          <span className="text-sm font-medium">Reservation confirmed</span>
        </div>
      </div>

      <div className="grid gap-6 p-5 md:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-amber-100 p-3 text-amber-800">
              <PlugZap size={26} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {booking.station}
              </h3>

              <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                <MapPin size={15} />
                {booking.location}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Date
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-800">
                {formatDate(booking.date)}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Charging time
              </p>

              <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-slate-800">
                <Clock size={15} />
                {booking.startTime} – {booking.endTime}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Charger
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-800">
                {booking.charger} · {booking.connector}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Vehicle
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-800">
                {booking.vehicle}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Estimated cost
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                ₹{booking.estimatedCost}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-4">
          <QRCodeSVG
            value={booking.id}
            size={112}
            level="M"
            title={`Booking ${booking.id}`}
          />

          <p className="mt-3 text-sm font-semibold text-slate-800">
            Booking QR
          </p>

          <p className="mt-1 text-center text-xs text-slate-500">
            Sample booking reference
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4">
        <p className="text-sm text-slate-500">
          Please arrive a few minutes before your booking.
        </p>

        <button
          onClick={onViewDetails}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          View booking
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

// -----------------------------------------
// RECENT ACTIVITY
// -----------------------------------------

function RecentActivity({ activities }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest charging activities
          </p>
        </div>

        <Activity size={22} className="text-emerald-600" />
      </div>

      <div className="space-y-5">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div key={activity.id} className="flex gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.color}`}
              >
                <Icon size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {activity.title}
                  </h3>

                  <span className="text-xs text-slate-400">
                    {activity.time}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {activity.description}
                </p>

                <span className="mt-2 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                  {activity.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// -----------------------------------------
// MAIN HOME PAGE
// -----------------------------------------

export default function Home() {
  const [showBookingDetails, setShowBookingDetails] = useState(false);

  const [showAllActivities, setShowAllActivities] = useState(false);

  const visibleActivities = showAllActivities
    ? recentActivities
    : recentActivities.slice(0, 3);

  function handleFindCharger() {
    // Change this navigation if your app uses another router.
    window.location.href = "/stations";
  }

  function handleViewBooking() {
    setShowBookingDetails(true);
  }

  return (
    <div className="min-h-screen bg-[#f8f7f3] px-5 py-6 md:px-8">
      {/* HEADER */}

      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Your charging dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Ready when you are.
          </h1>

          <p className="mt-2 text-slate-500">
            Find a charger, manage your bookings, and help another driver.
          </p>
        </div>

        <button
          onClick={handleFindCharger}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          <Zap size={19} />
          Find a charger
        </button>
      </header>

      {/* WELCOME BANNER */}

      <section className="mb-8 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl bg-[#243544] p-7 text-white md:p-9">
          <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border-[30px] border-emerald-500/20" />

          <div className="relative z-10">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-amber-400">
              <Zap size={17} />
              Your charging rhythm
            </p>

            <h2 className="mt-6 max-w-lg text-3xl font-bold leading-tight md:text-4xl">
              The next stop is
              <span className="block text-amber-400">already sorted.</span>
            </h2>

            <p className="mt-4 max-w-lg leading-7 text-slate-300">
              Discover nearby charging stations, reserve a slot, or exchange an
              unused booking with another EV driver.
            </p>

            <button
              onClick={handleFindCharger}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 font-semibold text-slate-900 transition hover:bg-amber-300"
            >
              Explore nearby
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* MONTHLY SUMMARY */}

        <div className="rounded-3xl bg-emerald-600 p-7 text-white md:p-8">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-100">
            Your charging summary
          </p>

          <div className="mt-8 flex items-center gap-3">
            <BatteryCharging size={36} />

            <div>
              <h2 className="text-4xl font-bold">
                84 <span className="text-xl">kWh</span>
              </h2>

              <p className="mt-1 text-sm text-emerald-100">Energy consumed</p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 rounded-xl bg-white/10 p-4">
            <Leaf size={20} className="shrink-0 text-amber-300" />

            <p className="text-sm">
              Keep track of your charging activity in one place.
            </p>
          </div>
        </div>
      </section>

      {/* STATISTICS */}

      <section className="mb-10">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Your charging statistics
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            A summary of your charging journey.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat) => (
            <StatCard key={stat.title} stat={stat} />
          ))}
        </div>
      </section>

      {/* UPCOMING BOOKING */}

      <section className="mb-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Your upcoming booking
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Keep your next charging session within reach.
            </p>
          </div>

          <button
            onClick={() => {
              window.location.href = "/bookings";
            }}
            className="inline-flex items-center gap-2 font-semibold text-emerald-700 hover:text-emerald-800"
          >
            All bookings
            <ArrowUpRight size={18} />
          </button>
        </div>

        <UpcomingBooking
          booking={sampleBooking}
          onViewDetails={handleViewBooking}
        />
      </section>

      {/* RECENT ACTIVITY + NEARBY STATIONS */}

      <section className="grid items-start gap-6 xl:grid-cols-2">
        <RecentActivity activities={visibleActivities} />

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Nearby stations
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Explore charging options.
              </p>
            </div>

            <button
              onClick={handleFindCharger}
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              See all →
            </button>
          </div>

          <div className="space-y-4">
            {nearbyStations.map((station) => (
              <div
                key={station.id}
                className="rounded-2xl border border-slate-200 p-4 transition hover:border-emerald-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900">{station.name}</h3>

                    <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                      <MapPin size={15} />
                      {station.location}
                    </p>
                  </div>

                  <span className="rounded-lg bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-800">
                    ★ {station.rating}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-sm font-semibold text-emerald-700">
                      {station.available} slots available
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {station.distance} · ₹{station.price}/kWh
                    </p>
                  </div>

                  <button
                    onClick={handleFindCharger}
                    className="rounded-xl bg-amber-100 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-amber-200"
                  >
                    View station →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIEW BOOKING MODAL */}

      {showBookingDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onClick={() => setShowBookingDetails(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Booking details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {sampleBooking.id}
                </p>
              </div>

              <button
                onClick={() => setShowBookingDetails(false)}
                className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
                aria-label="Close booking details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <h3 className="text-lg font-bold text-slate-900">
                {sampleBooking.station}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {sampleBooking.location}
              </p>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Date</span>

                  <span className="text-right font-medium text-slate-900">
                    {formatDate(sampleBooking.date)}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Time</span>

                  <span className="font-medium text-slate-900">
                    {sampleBooking.startTime} – {sampleBooking.endTime}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Charger</span>

                  <span className="font-medium text-slate-900">
                    {sampleBooking.charger} · {sampleBooking.connector}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-slate-500">Estimated cost</span>

                  <span className="font-bold text-slate-900">
                    ₹{sampleBooking.estimatedCost}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center rounded-2xl border border-slate-200 p-5">
              <QRCodeSVG value={sampleBooking.id} size={160} level="M" />

              <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
                <QrCode size={18} />
                Booking QR code
              </div>

              <p className="mt-2 text-center text-xs leading-5 text-slate-500">
                This QR code contains a sample booking reference. Actual
                check-in verification will be implemented later.
              </p>
            </div>

            <button
              onClick={() => setShowBookingDetails(false)}
              className="mt-5 w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
