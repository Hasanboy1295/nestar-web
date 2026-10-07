export function Logo({ withText = true }: { withText?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/25">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4.5 w-4.5 text-zinc-950"
          aria-hidden="true"
        >
          <path d="M12 1.8l2.35 6.6 6.85 2.55-6.85 2.55L12 20.2l-2.35-6.7L2.8 10.95l6.85-2.55L12 1.8z" />
        </svg>
      </span>
      {withText && (
        <span className="text-lg font-semibold tracking-tight text-zinc-100">
          Nestar
        </span>
      )}
    </span>
  );
}
