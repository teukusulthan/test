"use client";

import { DollarSign, ShoppingCart, TrendingUp, Package } from "lucide-react";
import { fmt, type Summary } from "@/lib/api";

const items = [
  { key: "totalRevenue" as const, label: "Revenue", icon: DollarSign, format: fmt },
  { key: "totalTransactions" as const, label: "Transactions", icon: ShoppingCart, format: (n: number) => n.toLocaleString() },
  { key: "averageOrderValue" as const, label: "Avg Order", icon: TrendingUp, format: fmt },
  { key: "totalItemsSold" as const, label: "Items Sold", icon: Package, format: (n: number) => n.toLocaleString() },
];

export function Stats({ summary }: { summary: Summary }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map(({ key, label, icon: Icon, format }) => (
        <div
          key={key}
          className="group relative overflow-hidden rounded-xl border bg-card p-4 transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
            <Icon className="h-4 w-4 text-muted-foreground/50 transition-colors group-hover:text-primary" />
          </div>
          <p className="mt-2 text-xl font-semibold tracking-tight">{format(summary[key])}</p>
        </div>
      ))}
    </div>
  );
}
