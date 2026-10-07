"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import { formatPrice } from "@/lib/format";
import { gradientFor } from "@/components/PropertyCard";
import type { Property } from "@/lib/types";

function Meta({ d, label, value }: { d: string; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-zinc-600">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <path d={d} />
        </svg>
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-zinc-100">{value}</p>
    </div>
  );
}

export function PropertyDetail({ id }: { id: string }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [error, setError] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<{ property: Property }>(`/api/properties/${id}`)
      .then((data) => setProperty(data.property))
      .catch(() => setError(true));

    api<{ properties: Property[] }>("/api/favorites")
      .then((data) =>
        setFavorite(data.properties.some((item) => item.id === id)),
      )
      .catch(() => {});
  }, [id]);

  async function toggleFavorite() {
    if (busy) return;
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    setBusy(true);
    const next = !favorite;
    setFavorite(next);
    try {
      const data = await api<{ favorite: boolean }>(`/api/favorites/${id}`, {
        method: "POST",
      });
      setFavorite(data.favorite);
    } catch {
      setFavorite(!next);
    } finally {
      setBusy(false);
    }
  }

  if (error) {
    return (
      <main className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-24 pt-32 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            className="h-8 w-8"
          >
            <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
          </svg>
        </span>
        <h1 className="mt-6 text-2xl font-semibold">Property not found</h1>
        <p className="mt-2 text-sm text-zinc-500">
          This listing may have been removed or the link is incorrect.
        </p>
        <Link
          href="/properties"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-emerald-400 px-7 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
        >
          Back to properties
        </Link>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="mx-auto max-w-6xl animate-pulse px-6 pb-24 pt-28">
        <div className="h-72 rounded-3xl bg-white/[0.04]" />
        <div className="mt-8 h-8 w-2/3 rounded-lg bg-white/[0.04]" />
        <div className="mt-4 h-4 w-1/3 rounded bg-white/[0.04]" />
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="h-20 rounded-xl bg-white/[0.04]" />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-24 lg:pt-28">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="flex items-center gap-2 text-xs text-zinc-500">
          <Link href="/" className="transition hover:text-emerald-300">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/properties" className="transition hover:text-emerald-300">
            Properties
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-zinc-300">{property.title}</span>
        </nav>
        <button
          type="button"
          onClick={toggleFavorite}
          className={`inline-flex h-10 items-center gap-2 rounded-full border px-5 text-sm font-medium transition ${
            favorite
              ? "border-red-500/40 bg-red-500/10 text-red-300"
              : "border-white/15 text-zinc-300 hover:border-white/30 hover:bg-white/5"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill={favorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.6 8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
          {favorite ? "Saved" : "Save"}
        </button>
      </div>

      {/* Hero */}
      <div
        className={`relative mt-6 h-64 overflow-hidden rounded-3xl bg-gradient-to-br ${gradientFor(property.type)} sm:h-80`}
      >
        <div
          className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[size:32px_32px]"
          aria-hidden="true"
        />
        <span className="absolute left-5 top-5 rounded-full bg-zinc-950/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
          {property.purpose === "RENT" ? "FOR RENT" : "FOR SALE"}
        </span>
        {property.isFeatured && (
          <span className="absolute left-5 top-14 rounded-full bg-amber-400/90 px-3 py-1.5 text-xs font-bold text-zinc-950">
            ★ FEATURED
          </span>
        )}
        <span className="absolute bottom-5 left-5 rounded-2xl bg-zinc-950/75 px-5 py-2.5 text-xl font-bold text-white backdrop-blur sm:text-2xl">
          {formatPrice(property.price, property.purpose)}
        </span>
        <span className="absolute bottom-5 right-5 hidden items-center gap-1.5 rounded-full bg-zinc-950/70 px-3 py-1.5 text-xs text-zinc-300 backdrop-blur sm:flex">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
          {property.views} views
        </span>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left */}
        <div className="space-y-6 lg:col-span-2">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
                {property.type}
              </span>
              <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium text-zinc-400">
                {property.city}
                {property.district ? ` · ${property.district}` : ""}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {property.title}
            </h1>
            {property.address && (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-zinc-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>
                {property.address}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Meta
              d="M3 7v11h18V7M3 11h18M7 7V4h4v3"
              label="Bedrooms"
              value={property.beds > 0 ? String(property.beds) : "—"}
            />
            <Meta
              d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3zM7 12V5a2 2 0 0 1 4 0"
              label="Bathrooms"
              value={property.baths > 0 ? String(property.baths) : "—"}
            />
            <Meta
              d="M4 4h16v16H4zM4 9h5V4M20 15h-5v5"
              label="Area"
              value={property.area > 0 ? `${property.area} m²` : "—"}
            />
            <Meta
              d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"
              label="Listed"
              value={
                new Date(property.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                }) || "—"
              }
            />
          </div>

          {property.description && (
            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-sm font-semibold text-zinc-100">
                About this property
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {property.description}
              </p>
            </section>
          )}

          {property.features.length > 0 && (
            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-sm font-semibold text-zinc-100">Features</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-sm text-zinc-300"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
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
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Agent card */}
        <aside className="space-y-5">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
              Listed by
            </p>
            <div className="mt-4 flex items-center gap-3.5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-lg font-bold text-zinc-950">
                {(property.agentName || property.agentNick)
                  .split(/\s+/)
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-zinc-100">
                  {property.agentName || property.agentNick}
                </p>
                <p className="truncate text-xs text-zinc-500">
                  @{property.agentNick}
                </p>
              </div>
            </div>

            <a
              href={`tel:${property.agentPhone.replace(/\s+/g, "")}`}
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
              </svg>
              {property.agentPhone}
            </a>

            <button
              type="button"
              onClick={toggleFavorite}
              className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/15 text-sm font-medium text-zinc-300 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill={favorite ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-4 w-4 ${favorite ? "text-red-400" : ""}`}
              >
                <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.6 8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
              {favorite ? "Remove from favorites" : "Save to favorites"}
            </button>

            <Link
              href="/properties"
              className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 text-sm font-medium text-zinc-400 transition hover:border-white/25 hover:text-zinc-200"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              Back to list
            </Link>
          </section>

          <section className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-6">
            <h2 className="text-sm font-semibold text-zinc-100">
              Interested in this property?
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
              Create a free account to save favorites and get alerts when the
              price changes.
            </p>
            <Link
              href="/register"
              className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-lg bg-emerald-400 text-xs font-semibold text-zinc-950 transition hover:bg-emerald-300"
            >
              Create account
            </Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
