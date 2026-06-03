"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, TrendingUp, Package } from "lucide-react";
import type { Summary } from "@/lib/api";

interface Props {
  summary: Summary | null;
  loading?: boolean;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

const cards = [
  { key: "totalRevenue" as const, label: "Total Revenue", icon: DollarSign, format: formatCurrency, color: "text-emerald-600" },
  { key: "totalTransactions" as const, label: "Transactions", icon: ShoppingCart, format: (n: number) => n.toLocaleString(), color: "text-blue-600" },
  { key: "averageOrderValue" as const, label: "Avg Order Value", icon: TrendingUp, format: formatCurrency, color: "text-violet-600" },
  { key: "totalItemsSold" as const, label: "Items Sold", icon: Package, format: (n: number) => n.toLocaleString(), color: "text-orange-600" },
];

export function SummaryCards({ summary, loading }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ key, label, icon: Icon, format, color }) => (
        <Card key={key}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
            <Icon className={`h-4 w-4 ${color}`} />
          </CardHeader>
          <CardContent>
            {loading || !summary ? (
              <div className="h-8 w-24 animate-pulse rounded bg-muted" />
            ) : (
              <div className="text-2xl font-bold">{format(summary[key])}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
