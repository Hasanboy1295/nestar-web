import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertiesExplorer } from "./PropertiesExplorer";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse apartments, villas, houses, land and commercial properties across Uzbekistan.",
};

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-400/30">
      <Navbar />
      <PropertiesExplorer />
      <Footer />
    </div>
  );
}
