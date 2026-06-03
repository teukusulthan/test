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
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <header className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Hijrahfood</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Sales Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">Retail performance overview from the public API</p>
      </header>

      <Stats summary={summary} />

      <section className="mt-8">
        <Filters
          filters={filters}
          categories={categories}
          onChange={(f) => push({ ...f, page: 1 })}
          onReset={() => router.push("/")}
        />
      </section>

      <section className="mt-8">
        <Chart data={revenue} />
      </section>

      <section className="mt-8">
        <Table
          sales={sales}
          pagination={pagination}
          page={filters.page || 1}
          onPageChange={(p) => push({ ...filters, page: p })}
          onSelect={setSelected}
        />
      </section>

      <Detail sale={selected} onClose={() => setSelected(null)} />

      <footer className="mt-12 text-center text-xs text-muted-foreground/60">
        Built for Hijrahfood Technical Assessment
      </footer>
    </main>
  );
}
