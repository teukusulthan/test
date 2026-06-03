"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Stats } from "@/components/stats";
import { Filters } from "@/components/filters";
import { Chart } from "@/components/chart";
import { Table } from "@/components/table";
import { Detail } from "@/components/detail";
import type { Sale, Summary, Pagination, CategoryRevenue, Filters as FiltersType } from "@/lib/api";

interface Props {
  categories: string[];
  summary: Summary;
  sales: Sale[];
  revenue: CategoryRevenue[];
  pagination: Pagination;
  filters: FiltersType;
}

export function Dashboard({ categories, summary, sales, revenue, pagination, filters }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const [selected, setSelected] = useState<Sale | null>(null);

  const push = useCallback(
    (f: FiltersType) => {
      const p = new URLSearchParams();
      for (const [k, v] of Object.entries(f)) {
        if (v != null && v !== "" && k !== "limit") p.set(k, String(v));
      }
      router.push(`?${p.toString()}`);
    },
    [router]
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">Hijrahfood</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">Sales Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Retail performance overview from the public API.</p>
      </header>

      <Stats summary={summary} />

      <section className="mt-6">
        <Filters
          filters={filters}
          categories={categories}
          onChange={(f) => push({ ...f, page: 1 })}
          onReset={() => router.push("/")}
        />
      </section>

      <section className="mt-6">
        <Chart data={revenue} />
      </section>

      <section className="mt-6">
        <Table
          sales={sales}
          pagination={pagination}
          page={filters.page || 1}
          onPageChange={(page) => {
            const p = new URLSearchParams(sp.toString());
            p.set("page", String(page));
            router.push(`?${p.toString()}`);
          }}
          onSelect={setSelected}
        />
      </section>

      <Detail sale={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
