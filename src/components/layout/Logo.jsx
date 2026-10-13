import { Link } from "wouter";
import { Zap } from "lucide-react";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      data-testid="link-logo"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-[hsl(var(--accent))] text-[hsl(var(--secondary))]">
        <Zap size={19} strokeWidth={3} />
      </span>

      <span className="font-display text-[1.16rem] font-bold tracking-tight">
        charge<span className="text-[hsl(var(--accent))]">mate</span>
      </span>
    </Link>
  );
}

export default Logo;
