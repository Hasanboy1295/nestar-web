"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { Logo } from "@/components/Logo";
import { Avatar } from "@/components/Avatar";

const navLinks = [
  { label: "Properties", href: "/properties" },
  { label: "Features", href: "/#features" },
  { label: "Platform", href: "/#platform" },
  { label: "Company", href: "/#stats" },
];

export function Navbar() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    setOpen(false);
    await logout();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <div className="hidden items-center gap-7 text-sm text-zinc-400 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="whitespace-nowrap transition hover:text-zinc-100"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {loading ? (
            <span className="h-9 w-24 animate-pulse rounded-full bg-white/5" />
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className="hidden rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white sm:inline-flex"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-4 transition hover:border-emerald-400/40"
              >
                <Avatar name={user.memberFullName || user.memberNick} />
                <span className="max-w-28 truncate text-sm font-medium text-zinc-200">
                  {user.memberNick}
                </span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-400 transition hover:border-red-500/30 hover:text-red-300 sm:inline-flex"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300"
              >
                Get started
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:text-zinc-200 md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              className="h-4.5 w-4.5"
            >
              {open ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="absolute left-4 right-4 top-full rounded-2xl border border-white/10 bg-zinc-950/95 p-3 shadow-2xl shadow-black/60 backdrop-blur-xl md:hidden">
            <nav className="space-y-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3.5 py-2.5 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-zinc-100"
                >
                  {link.label}
                </Link>
              ))}
              {!loading && user && (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3.5 py-2.5 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-zinc-100"
                >
                  Dashboard
                </Link>
              )}
            </nav>
            {!loading && user && (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-1.5 w-full rounded-xl px-3.5 py-2.5 text-left text-sm text-zinc-400 transition hover:bg-red-500/10 hover:text-red-300"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
