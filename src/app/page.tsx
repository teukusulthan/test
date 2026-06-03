import { getCategoriesServer, getSummaryServer, getSalesServer, computeCategoryRevenue, type SalesFilters } from "@/lib/api";
import { Dashboard } from "@/components/dashboard";

interface Props {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  const filters: SalesFilters = {
    search: params.search,
    category: params.category,
    gender: params.gender,
    customerId: params.customerId,
    transactionId: params.transactionId ? Number(params.transactionId) : undefined,
    dateFrom: params.dateFrom,
    dateTo: params.dateTo,
    ageMin: params.ageMin ? Number(params.ageMin) : undefined,
    ageMax: params.ageMax ? Number(params.ageMax) : undefined,
    quantityMin: params.quantityMin ? Number(params.quantityMin) : undefined,
    quantityMax: params.quantityMax ? Number(params.quantityMax) : undefined,
    pricePerUnitMin: params.pricePerUnitMin ? Number(params.pricePerUnitMin) : undefined,
    pricePerUnitMax: params.pricePerUnitMax ? Number(params.pricePerUnitMax) : undefined,
    totalAmountMin: params.totalAmountMin ? Number(params.totalAmountMin) : undefined,
    totalAmountMax: params.totalAmountMax ? Number(params.totalAmountMax) : undefined,
    sortBy: params.sortBy || "transactionId",
    sortOrder: (params.sortOrder as "asc" | "desc") || "asc",
    page: params.page ? Number(params.page) : 1,
    limit: 20,
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
      getCategoriesServer(),
      getSummaryServer(summaryFilters),
      getSalesServer(filters),
    ]);

    const categoryRevenue = computeCategoryRevenue(sales.data);

    return (
      <Dashboard
        categories={categories}
        summary={summary}
        sales={sales.data}
        categoryRevenue={categoryRevenue}
        pagination={sales.pagination}
        filters={filters}
      />
    );
  } catch {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground">Please try again in a moment.</p>
        </div>
      </div>
    );
  }
}
