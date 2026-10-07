"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Property } from "@/lib/types";

const fallback = [
  { value: "12,400+", label: "Premium listings" },
  { value: "48", label: "Cities covered" },
  { value: "3,200+", label: "Trusted agents" },
  { value: "260+", label: "Featured homes" },
];

export function LiveStats() {
  const [stats, setStats] = useState(fallback);

  useEffect(() => {
    api<{ properties: Property[]; total: number }>("/api/properties?limit=100")
      .then((data) => {
        const properties = data.properties;
        if (!properties.length) return;
        setStats([
          { value: String(data.total), label: "Active listings" },
          {
            value: String(new Set(properties.map((p) => p.city)).size),
            label: "Cities covered",
          },
          {
            value: String(
              new Set(properties.map((p) => p.agentNick).filter(Boolean)).size,
            ),
            label: "Trusted agents",
          },
          {
            value: String(properties.filter((p) => p.isFeatured).length),
            label: "Featured homes",
          },
        ]);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="stats" className="border-y border-white/5 bg-white/[0.02]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 py-12 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="px-4 text-center">
            <p className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-sm text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
