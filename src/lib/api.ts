const BASE = "https://public.hijrahfood.id";

export interface Sale {
  transactionId: number;
  date: string;
  customerId: string;
  gender: string;
  age: number;
  productCategory: string;
  quantity: number;
  pricePerUnit: number;
  totalAmount: number;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface Summary {
  totalTransactions: number;
  totalRevenue: number;
  averageOrderValue: number;
  totalItemsSold: number;
}

export interface CategoryRevenue {
  category: string;
  revenue: number;
}

export interface Filters {
  search?: string;
  category?: string;
  gender?: string;
  dateFrom?: string;
  dateTo?: string;
  ageMin?: number;
  ageMax?: number;
  quantityMin?: number;
  quantityMax?: number;
  pricePerUnitMin?: number;
  pricePerUnitMax?: number;
  totalAmountMin?: number;
  totalAmountMax?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
}

const headers = { "X-API-Key": process.env.API_KEY ?? "" };

async function api(path: string, params?: Record<string, unknown>) {
  const url = new URL(path, BASE);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v != null && v !== "") url.searchParams.set(k, String(v));
    }
  }
  const res = await fetch(url.toString(), { headers, cache: "no-store" });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

export async function getCategories(): Promise<string[]> {
  const { data } = await api("/categories");
  return data;
}

export async function getSummary(f?: Record<string, unknown>): Promise<Summary> {
  return api("/summary", f);
}

export async function getSales(f: Filters = {}): Promise<{ data: Sale[]; pagination: Pagination }> {
  return api("/sales", { ...f, limit: 20 });
}

export function categoryRevenue(sales: Sale[]): CategoryRevenue[] {
  const map: Record<string, number> = {};
  for (const s of sales) map[s.productCategory] = (map[s.productCategory] || 0) + s.totalAmount;
  return Object.entries(map)
    .map(([category, revenue]) => ({ category, revenue }))
    .sort((a, b) => b.revenue - a.revenue);
}

export function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
