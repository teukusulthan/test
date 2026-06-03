import { getCategories, getSummary, getSales, categoryRevenue, type Filters } from "@/lib/api";
import { Dashboard } from "@/components/dashboard";

interface Props {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function Page({ searchParams }: Props) {
  const p = await searchParams;

  const filters: Filters = {
    search: p.search,
    category: p.category,
    gender: p.gender,
    dateFrom: p.dateFrom,
    dateTo: p.dateTo,
    ageMin: p.ageMin ? Number(p.ageMin) : undefined,
    ageMax: p.ageMax ? Number(p.ageMax) : undefined,
    quantityMin: p.quantityMin ? Number(p.quantityMin) : undefined,
    quantityMax: p.quantityMax ? Number(p.quantityMax) : undefined,
    pricePerUnitMin: p.pricePerUnitMin ? Number(p.pricePerUnitMin) : undefined,
    pricePerUnitMax: p.pricePerUnitMax ? Number(p.pricePerUnitMax) : undefined,
    totalAmountMin: p.totalAmountMin ? Number(p.totalAmountMin) : undefined,
    totalAmountMax: p.totalAmountMax ? Number(p.totalAmountMax) : undefined,
    sortBy: p.sortBy || "transactionId",
    sortOrder: (p.sortOrder as "asc" | "desc") || "asc",
    page: p.page ? Number(p.page) : 1,
  };

  const summaryFilters = {
    search: filters.search,
    category: filters.category,
    gender: filters.gender,
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
  };

  try {
    const [categories, summary, sales] = await Promise.all([
      getCategories(),
      getSummary(summaryFilters),
      getSales(filters),
    ]);

    return (
      <Dashboard
        categories={categories}
        summary={summary}
        sales={sales.data}
        revenue={categoryRevenue(sales.data)}
        pagination={sales.pagination}
        filters={filters}
      />
    );
  } catch {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Something went wrong. Please try again.</p>
      </div>
    );
  }
}
