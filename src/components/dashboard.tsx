"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BarChart3 } from "lucide-react";
import { useCallback } from "react";
import { SummaryCards } from "@/components/summary-cards";
import { Filters } from "@/components/filters";
import { SalesTable } from "@/components/sales-table";
import { RevenueChart } from "@/components/revenue-chart";
import { SaleDetail } from "@/components/sale-detail";
import { useState } from "react";
import type { CategoryRevenue, Sale, Summary, Pagination, SalesFilters } from "@/lib/api";

interface Props {
  categories: string[];
  summary: Summary;
  sales: Sale[];
  categoryRevenue: CategoryRevenue[];
  pagination: Pagination;
  filters: SalesFilters;
}

export function Dashboard({ categories, summary, sales, categoryRevenue, pagination, filters }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const updateParams = useCallback(
    (newFilters: SalesFilters) => {
      const params = new URLSearchParams();
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== "" && key !== "limit") {
          params.set(key, String(value));
        }
      });
      router.push(`?${params.toString()}`);
    },
    [router]
  );

  const handleFiltersChange = (newFilters: SalesFilters) => {
    updateParams({ ...newFilters, page: 1 });
  };

  const handleSearch = () => updateParams(filters);

  const handleReset = () => {
    router.push("/");
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-5 p-4 md:p-8">
      <header className="flex flex-col gap-4 rounded-xl border border-border/70 bg-card/70 p-4 shadow-sm md:flex-row md:items-center md:justify-between md:p-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            <BarChart3 className="h-3.5 w-3.5 text-primary" />
            Hijrahfood retail overview
          </div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Sales Dashboard</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Track revenue, category performance, and customer transactions from the public sales API.
          </p>
        </div>
      </header>

      <SummaryCards summary={summary} />

      <Filters
        filters={filters}
        categories={categories}
        onChange={handleFiltersChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <RevenueChart data={categoryRevenue} />

      <SalesTable
        sales={sales}
        pagination={pagination}
        page={filters.page || 1}
        onPageChange={handlePageChange}
        onSelect={setSelectedSale}
      />

      <SaleDetail
        sale={selectedSale}
        open={!!selectedSale}
        onOpenChange={(open) => { if (!open) setSelectedSale(null); }}
      />
    </main>
  );
}
