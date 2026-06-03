const BASE_URL = "https://public.hijrahfood.id";
const API_KEY = "hijrahfood-jse-01-2026-36cc72bbcfa4";

const headers = {
  "X-API-Key": API_KEY,
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

export interface Summary {
  totalTransactions: number;
  totalRevenue: number;
  averageOrderValue: number;
  totalItemsSold: number;
}

export interface SalesFilters {
  search?: string;
  category?: string;
  gender?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
}

export async function fetchSummary(): Promise<Summary> {
  const res = await fetch(`${BASE_URL}/summary`, { headers });
  return res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/categories`, { headers });
  const data = await res.json();
  return data.data;
}

export async function fetchSales(filters: SalesFilters = {}): Promise<{
  data: Sale[];
  pagination: Pagination;
}> {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.gender) params.set("gender", filters.gender);
  if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.set("dateTo", filters.dateTo);
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));

  const res = await fetch(`${BASE_URL}/sales?${params.toString()}`, { headers });
  return res.json();
}

export async function fetchSummaryFiltered(filters: SalesFilters = {}): Promise<Summary> {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.gender) params.set("gender", filters.gender);
  if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.set("dateTo", filters.dateTo);

  const res = await fetch(`${BASE_URL}/summary?${params.toString()}`, { headers });
  return res.json();
}
