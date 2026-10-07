import type { Metadata } from "next";
import DashboardShell from "./DashboardShell";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Nestar account dashboard.",
};

export default function DashboardPage() {
  return <DashboardShell />;
}
