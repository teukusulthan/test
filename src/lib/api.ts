const BASE_URL = "https://public.hijrahfood.id";

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

export interface SalesFilters {
  search?: string;
  category?: string;
  gender?: string;
  customerId?: string;
  transactionId?: number;
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
  limit?: number;
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

const headers = { "X-API-Key": process.env.API_KEY ?? "" };

async function fetchWithRetry(url: string, options: RequestInit, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, options);
    if (res.status === 429 && i < retries - 1) {
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
      continue;
    }
    return res;
  }
  return fetch(url, options);
}

export async function getCategoriesServer(): Promise<string[]> {
  const res = await fetchWithRetry(`${BASE_URL}/categories`, { headers, next: { revalidate: 3600 } });
  const data = await res.json();
  return data.data ?? [];
}

export async function getSummaryServer(filters?: Record<string, string | undefined>): Promise<Summary> {
  const url = new URL(`${BASE_URL}/summary`);
  if (filters) {
    Object.entries(filters).forEach(([k, v]) => { if (v) url.searchParams.set(k, v); });
  }
  const res = await fetchWithRetry(url.toString(), { headers, next: { revalidate: 60 } });
  return res.json();
}

export async function getSalesServer(filters: SalesFilters = {}): Promise<{ data: Sale[]; pagination: Pagination }> {
  const url = new URL(`${BASE_URL}/sales`);
  Object.entries(filters).forEach(([k, v]) => { if (v !== undefined && v !== "") url.searchParams.set(k, String(v)); });
  const res = await fetchWithRetry(url.toString(), { headers, cache: "no-store" });
  return res.json();
}

export function computeCategoryRevenue(sales: Sale[]): CategoryRevenue[] {
  const grouped: Record<string, number> = {};
  for (const sale of sales) {
    grouped[sale.productCategory] = (grouped[sale.productCategory] || 0) + sale.totalAmount;
  }
  return Object.entries(grouped)
    .map(([category, revenue]) => ({ category, revenue }))
    .sort((a, b) => b.revenue - a.revenue);
}
