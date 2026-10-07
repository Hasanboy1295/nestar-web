export function formatPrice(price: number, purpose: string): string {
  const value = price.toLocaleString("en-US");
  return purpose === "RENT" ? `$${value}/mo` : `$${value}`;
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
