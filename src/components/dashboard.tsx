"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { SummaryCards } from "@/components/summary-cards";
import { Filters } from "@/components/filters";
import { SalesTable } from "@/components/sales-table";
import { RevenueChart } from "@/components/revenue-chart";
import { SaleDetail } from "@/components/sale-detail";
import { useState } from "react";
import type { Sale, Summary, Pagination, SalesFilters } from "@/lib/api";

interface Props {
  categories: string[];
  summary: Summary;
  sales: Sale[];
  pagination: Pagination;
  filters: SalesFilters;
}

export function Dashboard({ categories, summary, sales, pagination, filters }: Props) {
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
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Retail Sales Dashboard</h1>
        <p className="text-sm text-muted-foreground">Hijrahfood Public API</p>
      </div>

      <SummaryCards summary={summary} />

      <Filters
        filters={filters}
        categories={categories}
        onChange={handleFiltersChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <RevenueChart sales={sales} />

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
    </div>
  );
}
