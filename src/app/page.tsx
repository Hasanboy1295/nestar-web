import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LiveStats } from "@/components/LiveStats";
import { FeaturedProperties } from "@/components/FeaturedProperties";

const features = [
  {
    title: "Smart search",
    description:
      "Filter by city, price, layout and lifestyle — results update instantly as you type.",
    icon: (
      <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm10 2-4.35-4.35" />
    ),
  },
  {
    title: "AI valuations",
    description:
      "Instant, data-driven price estimates for every property, backed by market trends.",
    icon: (
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3zM19 14l.9 2.4 2.1 1.1-2.1.9L19 21l-.9-2.6-2.1-.9 2.1-1.1L19 14z" />
    ),
  },
  {
    title: "Trusted agents",
    description:
      "Work with verified agents — ratings, deal history and response times are public.",
    icon: (
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    ),
  },
  {
    title: "Secure deals",
    description:
      "Encrypted documents, escrow-ready payments and audit trails on every transaction.",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    title: "Live analytics",
    description:
      "Views, leads and conversion rates visualised in real time for your listings.",
    icon: <path d="M3 3v18h18M7 15l3-4 3 3 5-7" />,
  },
  {
    title: "Favorites & alerts",
    description:
      "Save properties you love and get notified the moment the price drops.",
    icon: (
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
    ),
  },
];

const platformPoints = [
  "Role-based access — members, agents and admins see exactly what they need",
  "Session security with httpOnly JWT cookies and rate-limited authentication",
  "Everything syncs in real time — web, tablet and mobile stay identical",
];

const chartBars = [42, 64, 48, 78, 58, 92, 74, 86];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-400/30">
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-1/2 top-[-14rem] h-[38rem] w-[52rem] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[130px] animate-glow" />
            <div className="absolute right-[-10rem] top-32 h-[26rem] w-[26rem] rounded-full bg-cyan-500/10 blur-[110px] animate-glow" />
            <div className="absolute left-[-8rem] top-64 h-[22rem] w-[22rem] rounded-full bg-teal-600/10 blur-[100px] animate-glow" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]" />
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-24 lg:grid-cols-[1.1fr_1fr] lg:pb-32 lg:pt-32">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Nestar 1.0 — now live
              </span>

              <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.2rem]">
                Find. Invest.{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                  Belong.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
                Nestar brings buyers, sellers and agents together on one
                platform — verified listings, AI-powered valuations and a
                dashboard that keeps every deal moving.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/register"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-emerald-400 px-7 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-300"
                >
                  Create free account
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                <Link
                  href="/login"
                  className="inline-flex h-12 items-center rounded-full border border-white/15 px-7 text-sm font-medium text-zinc-200 transition hover:border-white/30 hover:bg-white/5"
                >
                  Sign in
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {["AK", "DM", "SR", "NL"].map((initials, index) => (
                    <span
                      key={initials}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-[11px] font-bold text-zinc-950 ring-2 ring-zinc-950"
                      style={{ zIndex: 4 - index }}
                    >
                      {initials}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-zinc-500">
                  Joined by{" "}
                  <span className="font-semibold text-zinc-300">12k+</span>{" "}
                  members this month
                </p>
              </div>
            </div>

            {/* Floating preview cards */}
            <div className="relative hidden h-[440px] lg:block">
              <Link
                href="/properties"
                className="group absolute right-2 top-2 block w-72 animate-float rounded-3xl border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-black/50 backdrop-blur-xl transition hover:border-emerald-400/40"
              >
                <div className="relative h-36 rounded-2xl bg-gradient-to-br from-emerald-500/50 via-teal-500/30 to-cyan-500/40">
                  <span className="absolute left-3 top-3 rounded-full bg-zinc-950/70 px-2.5 py-1 text-[10px] font-bold tracking-wide text-emerald-300">
                    FOR SALE
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-lg bg-zinc-950/70 px-2 py-1 text-[10px] font-medium text-zinc-300">
                    4.9 ★
                  </span>
                </div>
                <p className="mt-3.5 text-sm font-semibold text-zinc-100 transition group-hover:text-emerald-300">
                  Skyline Villa · Chilonzor
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  5 beds · 4 baths · 420 m²
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-emerald-300">
                    $480,000
                  </span>
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium text-zinc-400 transition group-hover:bg-emerald-400/15 group-hover:text-emerald-300">
                    View all →
                  </span>
                </div>
              </Link>

              <div
                aria-hidden="true"
                className="absolute left-0 top-48 w-60 animate-float-delayed rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-black/50 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-sm font-bold text-zinc-950">
                    DK
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">
                      Dilnoza Karimova
                    </p>
                    <p className="text-xs text-zinc-500">
                      Top agent · 128 deals
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5 text-xs">
                  <span className="text-zinc-500">Response time</span>
                  <span className="font-semibold text-emerald-300">
                    &lt; 5 min
                  </span>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="absolute bottom-6 right-16 w-56 animate-float rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 backdrop-blur-xl"
              >
                <p className="text-xs text-emerald-300/80">This week</p>
                <p className="mt-0.5 text-sm font-semibold text-zinc-100">
                  ↑ 18% deals closed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats (live) ─────────────────────────────────── */}
        <LiveStats />

        {/* ── Featured properties (live) ───────────────────── */}
        <FeaturedProperties />

        {/* ── Features ─────────────────────────────────────── */}
        <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
              Features
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Everything in one place
            </h2>
            <p className="mt-4 text-lg text-zinc-500">
              From the first search to the signed contract — Nestar covers the
              entire journey without switching tools.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-white/[0.05]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/15 to-cyan-500/15 text-emerald-300 transition group-hover:from-emerald-400/25 group-hover:to-cyan-500/25">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    {feature.icon}
                  </svg>
                </span>
                <h3 className="mt-5 text-base font-semibold text-zinc-100">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Platform showcase ────────────────────────────── */}
        <section
          id="platform"
          className="border-t border-white/5 bg-white/[0.02]"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:py-32">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
                Platform
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                Your entire pipeline,
                <br />
                one dashboard
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-zinc-500">
                Track listings, leads and performance at a glance. Nestar keeps
                members, agents and admins in sync with role-based access and
                real-time data.
              </p>

              <ul className="mt-8 space-y-4">
                {platformPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
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
                    <span className="text-sm leading-relaxed text-zinc-300">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className="mt-9 inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-7 text-sm font-medium text-zinc-100 transition hover:border-emerald-400/50 hover:bg-emerald-400/10"
              >
                Explore the platform
              </Link>
            </div>

            {/* Dashboard mock */}
            <div
              className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 shadow-2xl shadow-black/60 animate-fade-in"
              aria-hidden="true"
            >
              <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-3 rounded-md bg-white/5 px-2.5 py-1 font-mono text-[10px] text-zinc-500">
                  app.nestar.uz/dashboard
                </span>
              </div>

              <div className="flex">
                <div className="hidden w-14 shrink-0 flex-col items-center gap-3 border-r border-white/5 py-5 sm:flex">
                  {["◆", "▦", "♡", "✉"].map((glyph, index) => (
                    <span
                      key={glyph}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                        index === 0
                          ? "bg-emerald-400/15 text-emerald-300"
                          : "text-zinc-600"
                      }`}
                    >
                      {glyph}
                    </span>
                  ))}
                </div>

                <div className="flex-1 p-5">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Views", value: "24.1k" },
                      { label: "Leads", value: "318" },
                      { label: "Deals", value: "42" },
                    ].map((tile) => (
                      <div
                        key={tile.label}
                        className="rounded-xl border border-white/5 bg-white/[0.03] p-3"
                      >
                        <p className="text-[10px] uppercase tracking-wide text-zinc-600">
                          {tile.label}
                        </p>
                        <p className="mt-1 text-lg font-semibold text-zinc-100">
                          {tile.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-zinc-400">
                        Weekly activity
                      </p>
                      <p className="text-[10px] font-semibold text-emerald-400">
                        +18.2%
                      </p>
                    </div>
                    <div className="mt-4 flex h-32 items-end gap-2.5">
                      {chartBars.map((bar, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-emerald-500/30 to-emerald-400"
                          style={{ height: `${bar}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 pb-28 pt-24">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-zinc-900/80 to-cyan-500/10 px-8 py-16 text-center sm:px-16">
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[100px]"
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to make your move?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-zinc-400">
                Create your free account in under a minute — the first account
                even gets admin access to explore everything.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="inline-flex h-12 items-center rounded-full bg-emerald-400 px-8 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-300"
                >
                  Get started free
                </Link>
                <Link
                  href="/login"
                  className="inline-flex h-12 items-center rounded-full border border-white/15 px-8 text-sm font-medium text-zinc-200 transition hover:border-white/30 hover:bg-white/5"
                >
                  I already have an account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
