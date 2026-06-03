"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { CategoryRevenue } from "@/lib/api";

interface Props {
  data: CategoryRevenue[];
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function RevenueChart({ data }: Props) {
  return (
    <Card className="border-border/70 bg-card/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Revenue by Category</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center rounded-lg border border-dashed border-border/80 bg-muted/20 text-sm text-muted-foreground">
            No category revenue found for the current filters.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} margin={{ top: 8, right: 12, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="category" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${Number(value) / 1000}k`} />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.28 }}
                contentStyle={{
                  background: "hsl(var(--popover))",
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--popover-foreground))",
                }}
              />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
