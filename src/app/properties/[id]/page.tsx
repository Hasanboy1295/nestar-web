import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyDetail } from "./PropertyDetail";

export const metadata: Metadata = {
  title: "Property details",
  description: "Property details, features and agent contact on Nestar.",
};

function DetailSkeleton() {
  return (
    <main className="mx-auto max-w-6xl animate-pulse px-6 pb-24 pt-28">
      <div className="h-72 rounded-3xl bg-white/[0.04]" />
      <div className="mt-8 h-8 w-2/3 rounded-lg bg-white/[0.04]" />
      <div className="mt-4 h-4 w-1/3 rounded bg-white/[0.04]" />
      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="h-20 rounded-xl bg-white/[0.04]" />
        ))}
      </div>
    </main>
  );
}

async function PropertyContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PropertyDetail id={id} />;
}

export default function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-400/30">
      <Navbar />
      <Suspense fallback={<DetailSkeleton />}>
        <PropertyContent params={params} />
      </Suspense>
      <Footer />
    </div>
  );
}
