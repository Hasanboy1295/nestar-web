"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { PropertyCard } from "@/components/PropertyCard";
import type { Property } from "@/lib/types";

const purposes = [
  { value: "ALL", label: "All" },
  { value: "SALE", label: "For sale" },
  { value: "RENT", label: "For rent" },
];

const types = [
  { value: "ALL", label: "Any type" },
  { value: "APARTMENT", label: "Apartment" },
  { value: "VILLA", label: "Villa" },
  { value: "HOUSE", label: "House" },
  { value: "LAND", label: "Land" },
  { value: "COMMERCIAL", label: "Commercial" },
];

const sorts = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low → high" },
  { value: "price-desc", label: "Price: high → low" },
  { value: "popular", label: "Most viewed" },
];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
        active
          ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-300"
          : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-zinc-200"
      }`}
    >
      {children}
    </button>
  );
}

export function PropertiesExplorer() {
  const [all, setAll] = useState<Property[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [purpose, setPurpose] = useState("ALL");
  const [type, setType] = useState("ALL");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    api<{ properties: Property[] }>("/api/properties?limit=100")
      .then((data) => {
        setAll(data.properties);
        const initial = new URLSearchParams(window.location.search).get("q");
        if (initial) setQ(initial);
      })
      .catch(() => setError("Could not load properties. Please try again."));
  }, []);

  const filtered = useMemo(() => {
    let items = all ?? [];
    const query = q.trim().toLowerCase();
    if (query) {
      items = items.filter((p) =>
        `${p.title} ${p.city} ${p.district} ${p.address} ${p.type}`
          .toLowerCase()
          .includes(query),
      );
    }
    if (purpose !== "ALL") items = items.filter((p) => p.purpose === purpose);
    if (type !== "ALL") items = items.filter((p) => p.type === type);

    const sorted = [...items];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "popular") sorted.sort((a, b) => b.views - a.views);
    else
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    return sorted;
  }, [all, q, purpose, type, sort]);

  const hasFilters = q.trim() !== "" || purpose !== "ALL" || type !== "ALL";

  function clearFilters() {
    setQ("");
    setPurpose("ALL");
    setType("ALL");
    setSort("newest");
    if (window.location.search) {
      window.history.replaceState(null, "", "/properties");
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-24 lg:pt-28">
      <nav className="flex items-center gap-2 text-xs text-zinc-500">
        <Link href="/" className="transition hover:text-emerald-300">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-zinc-300">Properties</span>
      </nav>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Explore properties
          </h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-500">
            Live listings from the Nestar database — search, filter and save
            your favorites.
          </p>
        </div>
        {all && (
          <p className="text-sm text-zinc-500">
            <span className="font-semibold text-zinc-200">
              {filtered.length}
            </span>{" "}
            of {all.length} properties
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-zinc-950/60 px-4 py-2.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            className="h-4 w-4 shrink-0 text-zinc-500"
            aria-hidden="true"
          >
            <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm10 2-4.35-4.35" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Search by title, city, district…"
            className="w-full bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 outline-none"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              aria-label="Clear search"
              className="text-zinc-500 transition hover:text-zinc-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                className="h-4 w-4"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {purposes.map((item) => (
            <Chip
              key={item.value}
              active={purpose === item.value}
              onClick={() => setPurpose(item.value)}
            >
              {item.label}
            </Chip>
          ))}
          <span className="mx-1 hidden h-4 w-px bg-white/10 sm:block" />
          {types.map((item) => (
            <Chip
              key={item.value}
              active={type === item.value}
              onClick={() => setType(item.value)}
            >
              {item.label}
            </Chip>
          ))}
          <span className="ml-auto flex items-center gap-2">
            <label
              htmlFor="sort"
              className="hidden text-xs text-zinc-600 sm:block"
            >
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-zinc-300 outline-none transition hover:border-white/25"
            >
              {sorts.map((item) => (
                <option key={item.value} value={item.value} className="bg-zinc-900">
                  {item.label}
                </option>
              ))}
            </select>
          </span>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 transition hover:text-emerald-300"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="h-3.5 w-3.5"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
            Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {all === null && !error
          ? [0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
              />
            ))
          : error
            ? null
            : filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
      </div>

      {error && (
        <div className="mt-8 rounded-2xl border border-red-500/25 bg-red-500/10 p-8 text-center">
          <p className="text-sm text-red-300">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex h-9 items-center rounded-lg bg-red-400 px-4 text-xs font-semibold text-zinc-950 transition hover:bg-red-300"
          >
            Retry
          </button>
        </div>
      )}

      {!error && all !== null && filtered.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-white/15 p-12 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-zinc-500">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              className="h-7 w-7"
            >
              <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm10 2-4.35-4.35" />
            </svg>
          </span>
          <h2 className="mt-4 text-lg font-semibold text-zinc-200">
            No properties match
          </h2>
          <p className="mt-1.5 text-sm text-zinc-500">
            Try a different search or remove some filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 inline-flex h-10 items-center rounded-full bg-emerald-400 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
          >
            Clear filters
          </button>
        </div>
      )}
    </main>
  );
}
