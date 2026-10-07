"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { Logo } from "@/components/Logo";
import { Avatar } from "@/components/Avatar";

function Icon({ d, className = "h-4.5 w-4.5" }: { d: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const navItems = [
  {
    label: "Overview",
    href: "/dashboard",
    d: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  },
  {
    label: "Properties",
    href: "/properties",
    d: "M3 10.5 12 3l9 7.5V21H15v-6H9v6H3z",
  },
  {
    label: "Favorites",
    href: "/dashboard/favorites",
    d: "M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.6 8.8-8.6a5.5 5.5 0 0 0 0-7.8z",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    d: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H1a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 2.6 9a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H7a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
  },
];

const titles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/favorites": "Favorites",
  "/dashboard/settings": "Settings",
};

function isActive(pathname: string, href: string): boolean {
  if (href === "/properties") return pathname.startsWith("/properties");
  return pathname === href;
}

export default function DashboardChrome({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const loggingOut = useRef(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!loading && !user && !loggingOut.current) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  async function handleLogout() {
    loggingOut.current = true;
    await logout();
    router.push("/");
  }

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/properties?q=${encodeURIComponent(trimmed)}` : "/properties");
    setMenuOpen(false);
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <span className="h-9 w-9 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
      </div>
    );
  }

  const isAdmin = user.memberType === "ADMIN";
  const title = titles[pathname] ?? "Dashboard";

  const nav = (
    <>
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={() => setMenuOpen(false)}
          className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
            isActive(pathname, item.href)
              ? "bg-emerald-400/10 font-semibold text-emerald-300"
              : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
          }`}
        >
          <Icon d={item.d} />
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/5 bg-white/[0.02] px-5 py-6 md:flex">
        <Link href="/" className="inline-flex">
          <Logo />
        </Link>

        <nav className="mt-9 flex-1 space-y-1">{nav}</nav>

        <div className="space-y-3">
          {isAdmin && (
            <div className="rounded-xl border border-violet-500/25 bg-violet-500/10 px-3.5 py-3">
              <p className="text-xs font-semibold text-violet-300">
                Administrator
              </p>
              <p className="mt-0.5 text-xs text-violet-300/60">
                Full system access
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl border border-white/10 px-3.5 py-2.5 text-sm text-zinc-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
          >
            <Icon d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-white/5 bg-zinc-950/80 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="md:hidden">
              <Logo withText={false} />
            </Link>
            <div>
              <p className="text-sm font-semibold text-zinc-100">{title}</p>
              <p className="hidden text-xs text-zinc-600 sm:block">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <form
              onSubmit={handleSearch}
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 lg:flex"
            >
              <Icon
                d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35"
                className="h-3.5 w-3.5 text-zinc-500"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search properties…"
                className="w-40 bg-transparent text-xs text-zinc-300 placeholder:text-zinc-600 outline-none"
              />
            </form>

            <span className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3.5">
              <Avatar name={user.memberFullName || user.memberNick} />
              <span className="hidden text-xs font-medium text-zinc-300 sm:block">
                {user.memberNick}
              </span>
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition hover:text-zinc-200 md:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                className="h-4.5 w-4.5"
              >
                {menuOpen ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </header>

        {menuOpen && (
          <div className="absolute right-4 top-16 z-50 w-56 rounded-2xl border border-white/10 bg-zinc-900 p-2 shadow-2xl shadow-black/60 md:hidden">
            <nav className="space-y-0.5">{nav}</nav>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-1.5 flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-zinc-400 transition hover:bg-red-500/10 hover:text-red-300"
            >
              <Icon d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              Log out
            </button>
          </div>
        )}

        <main className="mx-auto w-full max-w-6xl flex-1 space-y-7 px-5 py-8 sm:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
