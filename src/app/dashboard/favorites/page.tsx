import type { Metadata } from "next";
import { FavoritesContent } from "./FavoritesContent";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Properties you saved on Nestar.",
};

export default function FavoritesPage() {
  return <FavoritesContent />;
}
