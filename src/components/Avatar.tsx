function initials(name: string): string {
  return (
    name
      .split(/[\s._-]+/)
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}

export function Avatar({
  name,
  className = "h-9 w-9 text-xs",
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 font-semibold text-zinc-950 ring-2 ring-white/10 ${className}`}
    >
      {initials(name)}
    </span>
  );
}
