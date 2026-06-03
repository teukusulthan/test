"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Sale } from "@/lib/api";

interface Props {
  sale: Sale | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function SaleDetail({ sale, open, onOpenChange }: Props) {
  if (!sale) return null;

  const rows = [
    { label: "Transaction ID", value: `#${sale.transactionId}` },
    { label: "Date", value: sale.date },
    { label: "Customer", value: sale.customerId },
    { label: "Gender", value: sale.gender },
    { label: "Age", value: sale.age },
    { label: "Category", value: sale.productCategory },
    { label: "Quantity", value: sale.quantity },
    { label: "Price per Unit", value: formatCurrency(sale.pricePerUnit) },
    { label: "Total Amount", value: formatCurrency(sale.totalAmount) },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Sale #{sale.transactionId}
            <Badge variant={sale.gender === "Male" ? "default" : "secondary"}>
              {sale.gender}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <dl className="space-y-3">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex justify-between">
              <dt className="text-sm text-muted-foreground">{label}</dt>
              <dd className="text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </DialogContent>
    </Dialog>
  );
}
