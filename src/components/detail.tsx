"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { fmt, type Sale } from "@/lib/api";

interface Props {
  sale: Sale | null;
  onClose: () => void;
}

const fields = [
  { label: "Transaction ID", key: "transactionId" as const, format: (v: number) => `#${v}` },
  { label: "Date", key: "date" as const },
  { label: "Customer", key: "customerId" as const },
  { label: "Age", key: "age" as const },
  { label: "Category", key: "productCategory" as const },
  { label: "Quantity", key: "quantity" as const },
  { label: "Price / Unit", key: "pricePerUnit" as const, format: fmt },
  { label: "Total", key: "totalAmount" as const, format: fmt },
];

export function Detail({ sale, onClose }: Props) {
  return (
    <Dialog open={!!sale} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            Sale #{sale?.transactionId}
            {sale && (
              <Badge variant={sale.gender === "Male" ? "default" : "secondary"} className="font-normal">
                {sale.gender}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        {sale && (
          <dl className="mt-2 space-y-2.5">
            {fields.map(({ label, key, format }) => (
              <div key={key} className="flex items-center justify-between">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="text-sm font-medium">{format ? format(sale[key] as number) : String(sale[key])}</dd>
              </div>
            ))}
          </dl>
        )}
      </DialogContent>
    </Dialog>
  );
}
