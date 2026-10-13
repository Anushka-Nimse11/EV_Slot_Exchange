import { Star } from "lucide-react";

function Stars({ rating }) {
  return (
    <span
      className="flex items-center gap-0.5 text-[hsl(var(--accent))]"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          fill={i <= Math.round(rating) ? "currentColor" : "none"}
        />
      ))}
    </span>
  );
}

export default Stars;
