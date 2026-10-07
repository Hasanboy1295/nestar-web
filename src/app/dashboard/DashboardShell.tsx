"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import { Logo } from "@/components/Logo";
import { Avatar } from "@/components/Avatar";

interface MemberRow {
  id: string;
  memberNick: string;
  memberEmail: string;
  memberFullName: string;
  memberType: string;
  memberStatus: string;
  createdAt: string;
}

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
  { label: "Overview", d: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z", active: true },
  { label: "Properties", d: "M3 10.5 12 3l9 7.5V21H15v-6H9v6H3z", active: false },
  { label: "Favorites", d: "M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.6 8.8-8.6a5.5 5.5 0 0 0 0-7.8z", active: false },
  { label: "Messages", d: "M4 5h16v11H8l-4 4V5z", active: false },
  { label: "Settings", d: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H1a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 2.6 9a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H7a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z", active: false },
];

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function DashboardShell() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const loggingOut = useRef(false);

  const [members, setMembers] = useState<MemberRow[] | null>(null);
  const [membersTotal, setMembersTotal] = useState(0);
  const [membersError, setMembersError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user && !loggingOut.current) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (user?.memberType !== "ADMIN") return;
    api<{ members: MemberRow[]; total: number }>("/api/members")
      .then((data) => {
        setMembers(data.members);
        setMembersTotal(data.total);
      })
      .catch((err: unknown) => {
        setMembersError(
          err instanceof ApiError ? err.message : "Failed to load members",
        );
      });
  }, [user]);

  async function handleLogout() {
    loggingOut.current = true;
    await logout();
    window.location.href = "/";
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <span className="h-9 w-9 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
      </div>
    );
  }

  const firstName =
    user.memberFullName?.trim().split(/\s+/)[0] || user.memberNick;
  const isAdmin = user.memberType === "ADMIN";
  const filledFields = [user.memberFullName, user.memberImage, user.memberDesc]
    .filter((value) => value && value.trim())
    .length;
  const profileScore = 40 + filledFields * 20;

  const stats = [
    {
      label: "Loyalty points",
      value: String(user.memberPoints),
      sub: "Earned on the platform",
      d: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z",
    },
    {
      label: "Profile",
      value: `${profileScore}%`,
      sub: "Completeness",
      d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    },
    {
      label: "Role",
      value: user.memberType,
      sub: isAdmin ? "Full access" : "Standard access",
      d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    },
    {
      label: "Status",
      value: user.memberStatus,
      sub: `Since ${formatDate(user.createdAt)}`,
      d: "M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    },
  ];

  const checklist = [
    { label: "Verify your email", done: true },
    { label: "Complete your profile", done: Boolean(user.memberFullName) },
    { label: "Add a profile image", done: Boolean(user.memberImage) },
    { label: "List your first property", done: false },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/5 bg-white/[0.02] px-5 py-6 md:flex">
        <Link href="/" className="inline-flex">
          <Logo />
        </Link>

        <nav className="mt-9 flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              title={item.active ? undefined : "Coming soon"}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                item.active
                  ? "bg-emerald-400/10 font-semibold text-emerald-300"
                  : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
              }`}
            >
              <Icon d={item.d} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="space-y-3">
          {isAdmin && (
            <div className="rounded-xl border border-violet-500/25 bg-violet-500/10 px-3.5 py-3">
              <p className="text-xs font-semibold text-violet-300">
                Administrator
              </p>
              <p className="mt-0.5 text-xs text-violet-300/60">
                {membersTotal > 0
                  ? `${membersTotal} members in database`
                  : "Full system access"}
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
              <p className="text-sm font-semibold text-zinc-100">Overview</p>
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
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 lg:flex">
              <Icon d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35" className="h-3.5 w-3.5 text-zinc-500" />
              <input
                type="search"
                placeholder="Search properties…"
                className="w-40 bg-transparent text-xs text-zinc-300 placeholder:text-zinc-600 outline-none"
              />
            </div>

            <span className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3.5">
              <Avatar name={user.memberFullName || user.memberNick} />
              <span className="hidden text-xs font-medium text-zinc-300 sm:block">
                {user.memberNick}
              </span>
            </span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 space-y-7 px-5 py-8 sm:px-8">
          {/* Greeting */}
          <div className="animate-fade-up">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Welcome back, {firstName} 👋
            </h1>
            <p className="mt-1.5 text-sm text-zinc-500">
              Here&apos;s what&apos;s happening with your account today.
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-emerald-400/30"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    {stat.label}
                  </p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                    <Icon d={stat.d} className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 text-2xl font-semibold text-zinc-100">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-zinc-600">{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left column */}
            <div className="space-y-6 lg:col-span-2">
              {isAdmin ? (
                <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                  <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                    <div>
                      <h2 className="text-sm font-semibold text-zinc-100">
                        Members
                      </h2>
                      <p className="text-xs text-zinc-600">
                        GET /api/members — ADMIN only
                      </p>
                    </div>
                    <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[11px] font-semibold text-violet-300">
                      200 OK
                    </span>
                  </div>

                  {membersError ? (
                    <p className="px-5 py-6 text-sm text-red-400">
                      {membersError}
                    </p>
                  ) : !members ? (
                    <div className="space-y-3 px-5 py-6">
                      {[0, 1, 2].map((row) => (
                        <div
                          key={row}
                          className="h-10 animate-pulse rounded-lg bg-white/5"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-white/5 text-xs uppercase tracking-wide text-zinc-600">
                            <th className="px-5 py-3 font-medium">Member</th>
                            <th className="px-5 py-3 font-medium">Role</th>
                            <th className="px-5 py-3 font-medium">Status</th>
                            <th className="px-5 py-3 font-medium">Joined</th>
                          </tr>
                        </thead>
                        <tbody>
                          {members.map((member) => (
                            <tr
                              key={member.id}
                              className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                            >
                              <td className="px-5 py-3.5">
                                <div className="flex items-center gap-3">
                                  <Avatar
                                    name={
                                      member.memberFullName || member.memberNick
                                    }
                                    className="h-8 w-8 text-[10px]"
                                  />
                                  <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-zinc-200">
                                      {member.memberNick}
                                    </p>
                                    <p className="truncate text-xs text-zinc-600">
                                      {member.memberEmail}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-3.5">
                                <span
                                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                    member.memberType === "ADMIN"
                                      ? "bg-violet-500/15 text-violet-300"
                                      : "bg-white/5 text-zinc-400"
                                  }`}
                                >
                                  {member.memberType}
                                </span>
                              </td>
                              <td className="px-5 py-3.5">
                                <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                                  <span
                                    className={`h-1.5 w-1.5 rounded-full ${
                                      member.memberStatus === "ACTIVE"
                                        ? "bg-emerald-400"
                                        : "bg-red-400"
                                    }`}
                                  />
                                  {member.memberStatus}
                                </span>
                              </td>
                              <td className="px-5 py-3.5 text-xs text-zinc-500">
                                {formatDate(member.createdAt)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ) : (
                <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                      <Icon d="M12 15v2M6 10V7a6 6 0 1 1 12 0v3M5 10h14v11H5z" className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm font-semibold text-zinc-100">
                          Members overview
                        </h2>
                        <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-red-300">
                          403 · Admin only
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
                        This endpoint requires the{" "}
                        <span className="font-mono text-zinc-400">
                          ADMIN
                        </span>{" "}
                        role. Sign up with the first account of a fresh
                        database to get full privileges — role-based
                        authorization is enforced server-side.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      { title: "Properties", desc: "Manage your listings", soon: true },
                      { title: "Favorites", desc: "Saved properties", soon: true },
                    ].map((card) => (
                      <div
                        key={card.title}
                        className="rounded-xl border border-dashed border-white/10 px-4 py-3.5"
                      >
                        <p className="text-sm font-medium text-zinc-300">
                          {card.title}
                        </p>
                        <p className="mt-0.5 flex items-center gap-2 text-xs text-zinc-600">
                          {card.desc}
                          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-zinc-500">
                            Soon
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Getting started */}
              <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-zinc-100">
                      Getting started
                    </h2>
                    <p className="text-xs text-zinc-600">
                      {checklist.filter((item) => item.done).length} of{" "}
                      {checklist.length} completed
                    </p>
                  </div>
                  <div className="relative h-2 w-32 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 transition-all"
                      style={{
                        width: `${
                          (checklist.filter((item) => item.done).length /
                            checklist.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <ul className="mt-5 space-y-3">
                  {checklist.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                          item.done
                            ? "bg-emerald-400/15 text-emerald-400"
                            : "border border-white/15 text-zinc-600"
                        }`}
                      >
                        {item.done ? "✓" : "○"}
                      </span>
                      <span
                        className={
                          item.done ? "text-zinc-500 line-through" : "text-zinc-300"
                        }
                      >
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Profile card */}
            <aside className="space-y-6">
              <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
                <div className="flex justify-center">
                  <Avatar
                    name={user.memberFullName || user.memberNick}
                    className="h-20 w-20 text-xl"
                  />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-zinc-100">
                  {user.memberFullName || user.memberNick}
                </h2>
                <p className="text-sm text-zinc-500">@{user.memberNick}</p>
                <span
                  className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    isAdmin
                      ? "bg-violet-500/15 text-violet-300"
                      : "bg-emerald-500/15 text-emerald-300"
                  }`}
                >
                  {user.memberType}
                </span>

                <dl className="mt-6 space-y-3 text-left">
                  {[
                    { term: "Email", value: user.memberEmail },
                    { term: "Auth type", value: user.memberAuthType },
                    { term: "Points", value: String(user.memberPoints) },
                    { term: "Joined", value: formatDate(user.createdAt) },
                  ].map((row) => (
                    <div
                      key={row.term}
                      className="flex items-center justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="text-xs text-zinc-600">{row.term}</dt>
                      <dd className="truncate text-xs font-medium text-zinc-300">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 p-6">
                <h2 className="text-sm font-semibold text-zinc-100">
                  Need help?
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                  Check the API documentation or contact the team — we usually
                  reply within an hour.
                </p>
                <Link
                  href="/"
                  className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-lg bg-emerald-400 text-xs font-semibold text-zinc-950 transition hover:bg-emerald-300"
                >
                  Back to home
                </Link>
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
