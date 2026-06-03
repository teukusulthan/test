"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { fmt, type CategoryRevenue } from "@/lib/api";

export function Chart({ data }: { data: CategoryRevenue[] }) {
  if (!data.length) return null;

  return (
    <div className="rounded-xl border bg-card p-4">
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">Revenue by Category</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
          <XAxis dataKey="category" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip
            formatter={(v) => fmt(Number(v))}
            contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", fontSize: "13px" }}
          />
          <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
