"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import { Logo } from "@/components/Logo";
import { CurrentYear } from "@/components/CurrentYear";

const inputCls =
  "mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/15";

const perks = [
  "Verified listings from trusted agents",
  "AI valuations updated daily",
  "One dashboard for every deal",
];

export default function LoginForm() {
  const router = useRouter();
  const { refresh, user, loading: authLoading } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [memberPassword, setMemberPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [authLoading, user, router]);

  if (!authLoading && user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <span className="h-9 w-9 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
      </div>
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ identifier, memberPassword }),
      });
      await refresh();
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Network error — please try again.",
      );
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen">
      {/* Brand panel */}
      <aside className="relative hidden w-[44%] shrink-0 flex-col justify-between overflow-hidden border-r border-white/5 p-12 lg:flex">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute -left-24 top-[-6rem] h-[30rem] w-[30rem] rounded-full bg-emerald-500/20 blur-[120px] animate-glow" />
          <div className="absolute bottom-[-8rem] right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-cyan-500/15 blur-[110px] animate-glow" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        </div>

        <div className="relative">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="relative animate-fade-up">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight">
            Every deal.
            <br />
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              One platform.
            </span>
          </h2>
          <ul className="mt-8 space-y-3.5">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-3 text-sm text-zinc-400"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-zinc-600">
          © <CurrentYear /> Nestar · Built with Next.js
        </p>
      </aside>

      {/* Form */}
      <main className="relative flex flex-1 items-center justify-center px-6 py-14">
        <div
          className="pointer-events-none absolute inset-0 lg:hidden"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-[-8rem] h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[110px]" />
        </div>

        <div className="relative w-full max-w-md animate-fade-up">
          <div className="mb-8 lg:hidden">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-10">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Sign in to your Nestar account
            </p>

            {error && (
              <div
                role="alert"
                className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-6 space-y-5">
              <label className="block text-sm font-medium text-zinc-300">
                Email or nickname
                <input
                  type="text"
                  name="identifier"
                  autoComplete="username"
                  required
                  autoFocus
                  placeholder="you@company.com"
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  className={inputCls}
                />
              </label>

              <label className="block text-sm font-medium text-zinc-300">
                Password
                <input
                  type="password"
                  name="memberPassword"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={memberPassword}
                  onChange={(event) => setMemberPassword(event.target.value)}
                  className={inputCls}
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-emerald-400 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-500">
              No account yet?{" "}
              <Link
                href="/register"
                className="font-medium text-emerald-400 transition hover:text-emerald-300"
              >
                Create one free
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-zinc-600">
            Protected by httpOnly JWT sessions
          </p>
        </div>
      </main>
    </div>
  );
}
