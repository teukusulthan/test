"use client";

import { fmt, type CategoryRevenue } from "@/lib/api";

export function Chart({ data }: { data: CategoryRevenue[] }) {
  if (!data.length) return null;
  const max = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="rounded-xl border bg-card p-4">
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">Revenue by Category</h2>
      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.category} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-sm text-muted-foreground">{d.category}</span>
            <div className="relative h-7 flex-1 overflow-hidden rounded bg-muted">
              <div
                className="absolute inset-y-0 left-0 rounded bg-primary transition-all duration-500"
                style={{ width: `${(d.revenue / max) * 100}%` }}
              />
              <span className="relative z-10 flex h-full items-center px-2 text-xs font-medium text-primary-foreground">
                {fmt(d.revenue)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
