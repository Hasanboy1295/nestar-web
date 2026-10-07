import type { Metadata } from "next";
import { SettingsContent } from "./SettingsContent";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your Nestar profile and security.",
};

export default function SettingsPage() {
  return <SettingsContent />;
}
