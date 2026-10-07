import type { Metadata } from "next";
import { OverviewContent } from "./OverviewContent";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Nestar account dashboard.",
};

export default function DashboardPage() {
  return <OverviewContent />;
}
