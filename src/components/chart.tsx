"use client";

import { fmt, type CategoryRevenue } from "@/lib/api";

export function Chart({ data }: { data: CategoryRevenue[] }) {
  if (!data.length) return null;
  const max = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h2 className="mb-5 text-sm font-medium uppercase tracking-wider text-muted-foreground">Revenue by Category</h2>
      <div className="space-y-4">
        {data.map((d) => (
          <div key={d.category} className="flex items-center gap-4">
            <span className="w-24 shrink-0 text-sm text-muted-foreground">{d.category}</span>
            <div className="relative h-8 flex-1 overflow-hidden rounded-xl bg-muted">
              <div
                className="absolute inset-y-0 left-0 rounded-xl bg-primary"
                style={{ width: `${(d.revenue / max) * 100}%` }}
              />
              <span className="relative z-10 flex h-full items-center px-3 text-xs font-semibold text-primary-foreground">
                {fmt(d.revenue)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
