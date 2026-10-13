function Avatar({ name = "Aarav Mehta", small = false }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-[hsl(var(--primary))] font-display font-bold text-[hsl(var(--primary-foreground))] ${
        small ? "size-8 text-xs" : "size-11 text-sm"
      }`}
      data-testid="img-avatar"
    >
      {name
        .split(" ")
        .map((x) => x[0])
        .join("")
        .slice(0, 2)}
    </span>
  );
}

export default Avatar;
