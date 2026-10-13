import { QrCode } from "lucide-react";
import Button from "../layout/Button";

const money = (n) => `₹${n.toLocaleString("en-IN")}`;

function BookingPreview({ booking, toast }) {
  return (
    <div className="rounded-2xl border bg-[hsl(var(--card))] p-5">
      <div className="flex items-start justify-between">
        <div>
          <span className="rounded-full bg-[hsl(var(--accent)/.25)] px-2 py-1 text-[10px] font-bold uppercase">
            Confirmed
          </span>
          <h3 className="mt-3 font-display text-lg font-bold">
            {booking.station}
          </h3>
          <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
            {booking.charger}
          </p>
        </div>
        <div className="rounded-xl bg-[hsl(var(--muted))] p-2.5">
          <QrCode size={24} />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 border-t pt-4">
        <div>
          <p className="text-[10px] font-bold uppercase text-[hsl(var(--muted-foreground))]">
            When
          </p>
          <p className="mt-1 text-sm font-bold">{booking.date}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            {booking.time}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-[hsl(var(--muted-foreground))]">
            Booking ID
          </p>
          <p className="mt-1 text-sm font-bold">{booking.id}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            {money(booking.cost)} paid
          </p>
        </div>
      </div>
      <Button
        variant="soft"
        className="mt-4 w-full"
        onClick={() => toast("Booking QR is ready at the station")}
        data-testid="button-open-qr"
      >
        <QrCode size={16} /> Open QR pass
      </Button>
    </div>
  );
}

export default BookingPreview;
