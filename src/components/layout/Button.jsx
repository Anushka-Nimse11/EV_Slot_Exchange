function Button({ children, variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-[hsl(var(--primary))] text-white hover:brightness-110",
    secondary: "bg-[hsl(var(--secondary))] text-white hover:brightness-125",
    ghost: "bg-transparent hover:bg-[hsl(var(--muted))]",
    soft: "bg-[hsl(var(--accent)/.24)] text-[hsl(var(--secondary))] hover:bg-[hsl(var(--accent)/.4)]",
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all active:scale-[.98] ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
