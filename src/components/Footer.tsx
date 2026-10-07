"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { Logo } from "@/components/Logo";
import { CurrentYear } from "@/components/CurrentYear";

const productLinks = [
  { label: "Properties", href: "/properties" },
  { label: "Features", href: "/#features" },
  { label: "Platform", href: "/#platform" },
  { label: "Dashboard", href: "/dashboard" },
];

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#stats" },
  { label: "Contact", href: "mailto:hello@nestar.uz" },
  {
    label: "API status",
    href: "https://nestar-api.vercel.app/api/health",
    external: true,
  },
];

const guestAccountLinks = [
  { label: "Sign in", href: "/login" },
  { label: "Create account", href: "/register" },
  { label: "Favorites", href: "/dashboard/favorites" },
  { label: "Settings", href: "/dashboard/settings" },
];

const memberAccountLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Favorites", href: "/dashboard/favorites" },
  { label: "Settings", href: "/dashboard/settings" },
];

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-zinc-200">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
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
  );
}

export function Footer() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  const accountLinks = user ? memberAccountLinks : guestAccountLinks;

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

          <div>
            <p className="text-sm font-semibold text-zinc-200">Account</p>
            <ul className="mt-4 space-y-2.5">
              {(loading ? guestAccountLinks : accountLinks).map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition hover:text-zinc-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {!loading && user && (
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-sm text-zinc-500 transition hover:text-red-300"
                  >
                    Sign out
                  </button>
                </li>
              )}
            </ul>
          </div>

          <LinkColumn title="Product" links={productLinks} />
          <LinkColumn title="Company" links={companyLinks} />
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
