"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, TrendingUp, Package } from "lucide-react";
import type { Summary } from "@/lib/api";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

const cards = [
  { key: "totalRevenue" as const, label: "Total Revenue", icon: DollarSign, format: formatCurrency, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { key: "totalTransactions" as const, label: "Transactions", icon: ShoppingCart, format: (n: number) => n.toLocaleString(), color: "text-sky-400", bg: "bg-sky-400/10" },
  { key: "averageOrderValue" as const, label: "Avg Order Value", icon: TrendingUp, format: formatCurrency, color: "text-violet-400", bg: "bg-violet-400/10" },
  { key: "totalItemsSold" as const, label: "Items Sold", icon: Package, format: (n: number) => n.toLocaleString(), color: "text-amber-400", bg: "bg-amber-400/10" },
];

export function SummaryCards({ summary }: { summary: Summary }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ key, label, icon: Icon, format, color, bg }) => (
        <Card key={key} className="border-border/70 bg-card/70 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
            <span className={`rounded-lg p-2 ${bg}`}>
              <Icon className={`h-4 w-4 ${color}`} />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight">{format(summary[key])}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
