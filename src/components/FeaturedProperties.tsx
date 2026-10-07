"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { PropertyCard } from "@/components/PropertyCard";
import type { Property } from "@/lib/types";

export function FeaturedProperties() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    api<{ properties: Property[] }>("/api/properties?featured=true&limit=3")
      .then((data) => setProperties(data.properties))
      .catch(() => setProperties([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && properties.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
            Live from MongoDB
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Featured properties
          </h2>
        </div>
        <Link
          href="/properties"
          className="group inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
        >
          View all
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
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? [0, 1, 2].map((index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
              />
            ))
          : properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
      </div>
    </section>
  );
}
