"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import { formatPrice } from "@/lib/format";
import type { Property } from "@/lib/types";

const gradients: Record<string, string> = {
  APARTMENT: "from-sky-500 via-indigo-500 to-blue-400",
  VILLA: "from-emerald-500 via-teal-500 to-lime-400",
  HOUSE: "from-amber-500 via-orange-500 to-rose-400",
  LAND: "from-fuchsia-500 via-purple-500 to-violet-500",
  COMMERCIAL: "from-rose-500 via-pink-500 to-red-400",
};

const typePaths: Record<string, string> = {
  APARTMENT:
    "M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 21V9h4a1 1 0 0 1 1 1v11M8 8h3M8 12h3M8 16h3M17 13h1M17 17h1",
  VILLA: "M3 10.5 12 3l9 7.5V21H15v-6H9v6H3z",
  HOUSE: "M3 10.5 12 3l9 7.5V21H3zM9 21v-6h6v6",
  LAND: "M9 20l-6 3V6l6-3 6 3 6-3v17l-6-3M9 3v17M15 6v17",
  COMMERCIAL: "M4 7h16v14H4zM8 7V4h8v3M8 12h8M8 16h5",
};

export function gradientFor(type: string): string {
  return gradients[type] ?? gradients.APARTMENT;
}

function Meta({
  d,
  value,
}: {
  d: string;
  value: string;
}) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-zinc-500">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
      >
        <path d={d} />
      </svg>
      {value}
    </span>
  );
}

export function PropertyCard({
  property,
  favorite = false,
  onFavoriteChange,
}: {
  property: Property;
  favorite?: boolean;
  onFavoriteChange?: (propertyId: string, next: boolean) => void;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [busy, setBusy] = useState(false);

  async function toggleFavorite() {
    if (busy) return;
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    setBusy(true);
    const next = !isFavorite;
    setIsFavorite(next);
    try {
      const data = await api<{ favorite: boolean }>(
        `/api/favorites/${property.id}`,
        { method: "POST" },
      );
      setIsFavorite(data.favorite);
      onFavoriteChange?.(property.id, data.favorite);
    } catch {
      setIsFavorite(!next);
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-emerald-400/40">
      <Link href={`/properties/${property.id}`} className="block">
        <div
          className={`relative h-44 overflow-hidden bg-gradient-to-br ${gradientFor(property.type)}`}
        >
          {property.image ? (
            <Image
              src={property.image}
              alt={property.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <>
              <div
                className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[size:26px_26px]"
                aria-hidden="true"
              />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute -right-4 -bottom-4 h-36 w-36 text-white/25 transition duration-500 group-hover:scale-105"
                aria-hidden="true"
              >
                <path d={typePaths[property.type] ?? typePaths.APARTMENT} />
              </svg>
            </>
          )}

          <span className="absolute left-3 top-3 rounded-full bg-zinc-950/70 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white backdrop-blur">
            {property.purpose === "RENT" ? "FOR RENT" : "FOR SALE"}
          </span>
          {property.isFeatured && (
            <span className="absolute left-3 top-10 rounded-full bg-amber-400/90 px-2.5 py-1 text-[10px] font-bold tracking-wide text-zinc-950">
              ★ FEATURED
            </span>
          )}

          <span className="absolute bottom-3 left-3 rounded-xl bg-zinc-950/75 px-3 py-1.5 text-sm font-bold text-white backdrop-blur">
            {formatPrice(property.price, property.purpose)}
          </span>
        </div>

        <div className="p-5">
          <h3 className="truncate text-sm font-semibold text-zinc-100 transition group-hover:text-emerald-300">
            {property.title}
          </h3>
          <p className="mt-1 truncate text-xs text-zinc-500">
            {property.district ? `${property.district} · ` : ""}
            {property.city}
          </p>

          <div className="mt-3.5 flex flex-wrap items-center gap-3">
            {property.beds > 0 && (
              <Meta d="M3 7v11h18V7M3 11h18M7 7V4h4v3" value={`${property.beds} bd`} />
            )}
            {property.baths > 0 && (
              <Meta
                d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3zM7 12V5a2 2 0 0 1 4 0"
                value={`${property.baths} ba`}
              />
            )}
            {property.area > 0 && (
              <Meta d="M4 4h16v16H4zM4 9h5V4M20 15h-5v5" value={`${property.area} m²`} />
            )}
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={toggleFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
        className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950/70 text-zinc-300 backdrop-blur transition hover:bg-zinc-950/90 hover:text-white"
      >
        <svg
          viewBox="0 0 24 24"
          fill={isFavorite ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 ${isFavorite ? "text-red-400" : ""}`}
        >
          <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.6 8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
      </button>
    </article>
  );
}
