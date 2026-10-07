"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getYear = () => String(new Date().getFullYear());
const getServerYear = () => "2026";

export function CurrentYear() {
  const year = useSyncExternalStore(subscribe, getYear, getServerYear);
  return <>{year}</>;
}
