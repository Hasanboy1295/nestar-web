export interface Property {
  id: string;
  title: string;
  type: string;
  purpose: string;
  price: number;
  currency: string;
  city: string;
  district: string;
  address: string;
  beds: number;
  baths: number;
  area: number;
  description: string;
  image: string;
  features: string[];
  isFeatured: boolean;
  views: number;
  agentName: string;
  agentNick: string;
  agentPhone: string;
  status: string;
  createdAt: string;
}
