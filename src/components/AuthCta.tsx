"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

const fillCls =
  "inline-flex h-12 items-center gap-2 rounded-full bg-emerald-400 px-7 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-300";
const borderCls =
  "inline-flex h-12 items-center rounded-full border border-white/15 px-7 text-sm font-medium text-zinc-200 transition hover:border-white/30 hover:bg-white/5";
const outlineCls =
  "mt-9 inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-7 text-sm font-medium text-zinc-100 transition hover:border-emerald-400/50 hover:bg-emerald-400/10";

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 transition group-hover:translate-x-0.5"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function AuthCta({ outline = false }: { outline?: boolean }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        <span className="h-12 w-52 animate-pulse rounded-full bg-white/10" />
        <span className="h-12 w-36 animate-pulse rounded-full bg-white/5" />
      </div>
    );
  }

  if (outline) {
    return user ? (
      <Link href="/dashboard" className={outlineCls}>
        Go to dashboard
        <Arrow />
      </Link>
    ) : (
      <Link href="/register" className={outlineCls}>
        Explore the platform
        <Arrow />
      </Link>
    );
  }

  if (user) {
    return (
      <>
        <Link href="/dashboard" className={`group ${fillCls}`}>
          Go to dashboard
          <Arrow />
        </Link>
        <Link href="/properties" className={borderCls}>
          Browse properties
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href="/register" className={`group ${fillCls}`}>
        Create free account
        <Arrow />
      </Link>
      <Link href="/login" className={borderCls}>
        Sign in
      </Link>
    </>
  );
}

export function CtaSection() {
  const { user, loading } = useAuth();

  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 pt-24">
      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-zinc-900/80 to-cyan-500/10 px-8 py-16 text-center sm:px-16">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[100px]"
          aria-hidden="true"
        />
        <div className="relative">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {user ? "Welcome back" : "Ready to make your move?"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            {user
              ? "Your dashboard is waiting — track listings, favorites and deals in one place."
              : "Create your free account in under a minute — the first account even gets admin access to explore everything."}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {loading ? (
              <>
                <span className="h-12 w-52 animate-pulse rounded-full bg-white/10" />
                <span className="h-12 w-44 animate-pulse rounded-full bg-white/5" />
              </>
            ) : user ? (
              <>
                <Link href="/dashboard" className={fillCls}>
                  Go to dashboard
                </Link>
                <Link href="/properties" className={borderCls}>
                  Browse properties
                </Link>
              </>
            ) : (
              <>
                <Link href="/register" className={fillCls}>
                  Get started free
                </Link>
                <Link href="/login" className={borderCls}>
                  I already have an account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
