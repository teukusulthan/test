const BASE_URL = "https://public.hijrahfood.id";

const headers = {
  "X-API-Key": "hijrahfood-jse-01-2026-36cc72bbcfa4",
};

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

export interface Metadata {
  totalRecords: number;
  availableSortFields: string[];
  availableGenders: string[];
  availableCategories: string[];
  dateRange: { start: string; end: string };
  ageRange: { min: number; max: number };
  quantityRange: { min: number; max: number };
  pricePerUnitRange: { min: number; max: number };
  totalAmountRange: { min: number; max: number };
}

export interface Health {
  status: string;
  version: string;
  datasetLoaded: boolean;
  totalRecords: number;
}

async function apiFetch<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
    });
  }
  const res = await fetch(url.toString(), { headers, next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return res.json();
}

export async function getHealth(): Promise<Health> {
  return apiFetch("/health");
}

export async function getMetadata(): Promise<Metadata> {
  return apiFetch("/metadata");
}

export async function getCategories(): Promise<string[]> {
  const data = await apiFetch<{ data: string[] }>("/categories");
  return data.data;
}

export async function getSummary(filters?: Pick<SalesFilters, "search" | "category" | "gender" | "dateFrom" | "dateTo">): Promise<Summary> {
  return apiFetch("/summary", filters as Record<string, string>);
}

export async function getSales(filters: SalesFilters = {}): Promise<{ data: Sale[]; pagination: Pagination }> {
  return apiFetch("/sales", filters as Record<string, string | number>);
}

export async function getSale(transactionId: number): Promise<Sale> {
  return apiFetch(`/sales/${transactionId}`);
}
