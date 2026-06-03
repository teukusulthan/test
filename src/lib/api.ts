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

async function apiFetch<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
  const url = new URL(path, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
    });
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

export async function getCategories(): Promise<string[]> {
  const data = await apiFetch<{ data: string[] }>("/api/categories");
  return data.data;
}

export async function getSummary(filters?: Pick<SalesFilters, "search" | "category" | "gender" | "dateFrom" | "dateTo">): Promise<Summary> {
  return apiFetch("/api/summary", filters as Record<string, string>);
}

export async function getSales(filters: SalesFilters = {}): Promise<{ data: Sale[]; pagination: Pagination }> {
  return apiFetch("/api/sales", filters as Record<string, string | number>);
}

export async function getCategoriesServer(): Promise<string[]> {
  const res = await fetch("https://public.hijrahfood.id/categories", {
    headers: { "X-API-Key": process.env.API_KEY ?? "" },
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data.data;
}
