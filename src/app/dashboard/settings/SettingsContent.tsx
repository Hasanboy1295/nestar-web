"use client";

import { useState, type FormEvent } from "react";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import { formatDate } from "@/lib/format";

const inputCls =
  "mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/15";

const labelCls = "text-xs font-medium text-zinc-500";

function Banner({
  kind,
  message,
}: {
  kind: "success" | "error";
  message: string | null;
}) {
  if (!message) return null;
  return (
    <p
      className={`rounded-xl px-4 py-3 text-sm ${
        kind === "success"
          ? "border border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
          : "border border-red-500/25 bg-red-500/10 text-red-300"
      }`}
      role="alert"
    >
      {message}
    </p>
  );
}

export function SettingsContent() {
  const { user, refresh } = useAuth();

  const [fullName, setFullName] = useState(user?.memberFullName ?? "");
  const [desc, setDesc] = useState(user?.memberDesc ?? "");
  const [profileStatus, setProfileStatus] = useState<{
    kind: "success" | "error";
    message: string | null;
  }>({ kind: "success", message: null });
  const [profileBusy, setProfileBusy] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<{
    kind: "success" | "error";
    message: string | null;
  }>({ kind: "success", message: null });
  const [passwordBusy, setPasswordBusy] = useState(false);

  if (!user) return null;

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    setProfileBusy(true);
    setProfileStatus({ kind: "success", message: null });
    try {
      await api("/api/auth/me", {
        method: "PATCH",
        body: JSON.stringify({
          memberFullName: fullName.trim(),
          memberDesc: desc.trim(),
        }),
      });
      await refresh();
      setProfileStatus({
        kind: "success",
        message: "Profile updated successfully.",
      });
    } catch (err) {
      setProfileStatus({
        kind: "error",
        message:
          err instanceof ApiError ? err.message : "Failed to update profile.",
      });
    } finally {
      setProfileBusy(false);
    }
  }

  async function savePassword(event: FormEvent) {
    event.preventDefault();
    if (newPassword !== repeatPassword) {
      setPasswordStatus({
        kind: "error",
        message: "New passwords do not match.",
      });
      return;
    }
    setPasswordBusy(true);
    setPasswordStatus({ kind: "success", message: null });
    try {
      await api("/api/auth/me", {
        method: "PATCH",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setCurrentPassword("");
      setNewPassword("");
      setRepeatPassword("");
      setPasswordStatus({
        kind: "success",
        message: "Password updated successfully.",
      });
    } catch (err) {
      setPasswordStatus({
        kind: "error",
        message:
          err instanceof ApiError ? err.message : "Failed to update password.",
      });
    } finally {
      setPasswordBusy(false);
    }
  }

  return (
    <>
      <div className="animate-fade-up">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1.5 text-sm text-zinc-500">
          Update your profile and account security.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Profile */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-sm font-semibold text-zinc-100">Profile</h2>
            <p className="mt-1 text-xs text-zinc-600">
              PATCH /api/auth/me — visible everywhere on Nestar
            </p>

            <form onSubmit={saveProfile} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={labelCls}>Full name</span>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Your full name"
                    maxLength={80}
                    className={inputCls}
                  />
                </label>
                <label className="block">
                  <span className={labelCls}>Username</span>
                  <input
                    type="text"
                    value={user.memberNick}
                    disabled
                    className={`${inputCls} cursor-not-allowed opacity-60`}
                  />
                </label>
              </div>

              <label className="block">
                <span className={labelCls}>About you</span>
                <textarea
                  value={desc}
                  onChange={(event) => setDesc(event.target.value)}
                  placeholder="A short bio — what you are looking for on Nestar."
                  rows={4}
                  maxLength={500}
                  className={`${inputCls} resize-none`}
                />
                <span className="mt-1 block text-right text-[11px] text-zinc-600">
                  {desc.length}/500
                </span>
              </label>

              <Banner kind={profileStatus.kind} message={profileStatus.message} />

              <button
                type="submit"
                disabled={profileBusy}
                className="inline-flex h-11 items-center rounded-full bg-emerald-400 px-7 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {profileBusy ? "Saving…" : "Save changes"}
              </button>
            </form>
          </section>

          {/* Security */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-sm font-semibold text-zinc-100">Security</h2>
            <p className="mt-1 text-xs text-zinc-600">
              Change your password — bcrypt-hashed server-side
            </p>

            <form onSubmit={savePassword} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={labelCls}>Current password</span>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    placeholder="••••••••"
                    required
                    className={inputCls}
                  />
                </label>
                <label className="block">
                  <span className={labelCls}>New password</span>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="At least 6 characters"
                    required
                    minLength={6}
                    className={inputCls}
                  />
                </label>
              </div>

              <label className="block">
                <span className={labelCls}>Repeat new password</span>
                <input
                  type="password"
                  value={repeatPassword}
                  onChange={(event) => setRepeatPassword(event.target.value)}
                  placeholder="Repeat the new password"
                  required
                  minLength={6}
                  className={inputCls}
                />
              </label>

              <Banner
                kind={passwordStatus.kind}
                message={passwordStatus.message}
              />

              <button
                type="submit"
                disabled={passwordBusy}
                className="inline-flex h-11 items-center rounded-full border border-white/15 px-7 text-sm font-medium text-zinc-200 transition hover:border-emerald-400/50 hover:bg-emerald-400/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {passwordBusy ? "Updating…" : "Update password"}
              </button>
            </form>
          </section>
        </div>

        {/* Account summary */}
        <aside>
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-sm font-semibold text-zinc-100">Account</h2>
            <dl className="mt-4 space-y-3">
              {[
                { term: "Email", value: user.memberEmail },
                { term: "Username", value: `@${user.memberNick}` },
                { term: "Role", value: user.memberType },
                { term: "Status", value: user.memberStatus },
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
        </aside>
      </div>
    </>
  );
}
