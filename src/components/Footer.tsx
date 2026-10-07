"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CurrentYear } from "@/components/CurrentYear";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Properties", href: "/properties" },
      { label: "Features", href: "/#features" },
      { label: "Platform", href: "/#platform" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Create account", href: "/register" },
      { label: "Favorites", href: "/dashboard/favorites" },
      { label: "Settings", href: "/dashboard/settings" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/#stats" },
      { label: "Contact", href: "mailto:hello@nestar.uz" },
      {
        label: "API status",
        href: "https://nestar-api.vercel.app/api/health",
        external: true,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
              The modern real estate platform for buyers, sellers and agents —
              built for speed and trust.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-zinc-200">
                {column.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-zinc-500 transition hover:text-zinc-200"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-500 transition hover:text-zinc-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-zinc-600 sm:flex-row">
          <p>
            © <CurrentYear /> Nestar. All rights reserved.
          </p>
          <p className="font-mono">Next.js · TypeScript · MongoDB · Vercel</p>
        </div>
      </div>
    </footer>
  );
}
