"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import { PropertyCard } from "@/components/PropertyCard";
import type { Property } from "@/lib/types";

export function FavoritesContent() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[] | null>(null);

  useEffect(() => {
    if (!user) return;
    api<{ properties: Property[] }>("/api/favorites")
      .then((data) => setProperties(data.properties))
      .catch(() => setProperties([]));
  }, [user]);

  function handleFavoriteChange(id: string, next: boolean) {
    if (!next) {
      setProperties((prev) => (prev ?? []).filter((item) => item.id !== id));
    }
  }

  return (
    <>
      <div className="animate-fade-up">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Your favorites
        </h1>
        <p className="mt-1.5 text-sm text-zinc-500">
          Properties you saved — click the heart anywhere to update this list.
        </p>
      </div>

      {properties === null ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
            />
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-zinc-500">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7"
            >
              <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.6 8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
          </span>
          <h2 className="mt-4 text-lg font-semibold text-zinc-200">
            No favorites yet
          </h2>
          <p className="mt-1.5 text-sm text-zinc-500">
            Browse the catalog and tap the heart to save properties here.
          </p>
          <Link
            href="/properties"
            className="mt-5 inline-flex h-10 items-center rounded-full bg-emerald-400 px-6 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300"
          >
            Browse properties
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              favorite
              onFavoriteChange={handleFavoriteChange}
            />
          ))}
        </div>
      )}
    </>
  );
}
