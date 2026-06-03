"use client";

import { useState, useEffect, useCallback } from "react";
import { SummaryCards } from "@/components/summary-cards";
import { Filters } from "@/components/filters";
import { SalesTable } from "@/components/sales-table";
import { RevenueChart } from "@/components/revenue-chart";
import { SaleDetail } from "@/components/sale-detail";
import { getSummary, getSales, type Sale, type Summary, type SalesFilters, type Pagination } from "@/lib/api";

const defaultFilters: SalesFilters = { sortBy: "transactionId", sortOrder: "asc", page: 1, limit: 20 };

interface Props {
  categories: string[];
}

export function Dashboard({ categories }: Props) {
  const [filters, setFilters] = useState<SalesFilters>(defaultFilters);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const summaryFilters = {
        search: filters.search,
        category: filters.category,
        gender: filters.gender,
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
      };
      const [summaryData, salesData] = await Promise.all([
        getSummary(summaryFilters),
        getSales(filters),
      ]);
      setSummary(summaryData);
      setSales(salesData.data);
      setPagination(salesData.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = () => fetchData();

  const handleReset = () => setFilters(defaultFilters);

  const handlePageChange = (page: number) => setFilters((prev) => ({ ...prev, page }));

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Retail Sales Dashboard</h1>
        <p className="text-sm text-muted-foreground">Hijrahfood Public API</p>
      </div>

      <SummaryCards summary={summary} loading={loading} />

      <Filters
        filters={filters}
        categories={categories}
        onChange={setFilters}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <RevenueChart sales={sales} />

      <SalesTable
        sales={sales}
        pagination={pagination}
        loading={loading}
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
