"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import { Logo } from "@/components/Logo";
import { CurrentYear } from "@/components/CurrentYear";

const inputCls =
  "mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/15";

const perks = [
  "Free forever — no credit card required",
  "The first account becomes ADMIN",
  "Set up in less than a minute",
];

export default function RegisterForm() {
  const router = useRouter();
  const { refresh } = useAuth();

  const [form, setForm] = useState({
    memberFullName: "",
    memberNick: "",
    memberEmail: "",
    memberPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update(field: keyof typeof form) {
    return (event: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (form.memberPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (form.memberNick.trim().length < 3) {
      setError("Nickname must be at least 3 characters long");
      return;
    }

    setLoading(true);
    try {
      await api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          memberFullName: form.memberFullName.trim(),
          memberNick: form.memberNick.trim(),
          memberEmail: form.memberEmail.trim(),
          memberPassword: form.memberPassword,
        }),
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
            Start owning
            <br />
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              your market.
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
              Create your account
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Free forever — takes less than a minute
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
                Full name
                <input
                  type="text"
                  name="memberFullName"
                  autoComplete="name"
                  placeholder="Albert Aliyev"
                  value={form.memberFullName}
                  onChange={update("memberFullName")}
                  className={inputCls}
                />
              </label>

              <label className="block text-sm font-medium text-zinc-300">
                Nickname
                <input
                  type="text"
                  name="memberNick"
                  autoComplete="username"
                  required
                  placeholder="albert"
                  value={form.memberNick}
                  onChange={update("memberNick")}
                  className={inputCls}
                />
              </label>

              <label className="block text-sm font-medium text-zinc-300">
                Email
                <input
                  type="email"
                  name="memberEmail"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                  value={form.memberEmail}
                  onChange={update("memberEmail")}
                  className={inputCls}
                />
              </label>

              <label className="block text-sm font-medium text-zinc-300">
                Password
                <input
                  type="password"
                  name="memberPassword"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  value={form.memberPassword}
                  onChange={update("memberPassword")}
                  className={inputCls}
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-emerald-400 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account…" : "Create account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-emerald-400 transition hover:text-emerald-300"
              >
                Sign in
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
