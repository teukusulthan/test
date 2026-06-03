"use client";

import { Table as UiTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fmt, type Sale, type Pagination } from "@/lib/api";

interface Props {
  sales: Sale[];
  pagination: Pagination;
  page: number;
  onPageChange: (page: number) => void;
  onSelect: (sale: Sale) => void;
}

export function Table({ sales, pagination, page, onPageChange, onSelect }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="px-5 pt-5 pb-3">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Transactions</h2>
      </div>
      <div className="overflow-x-auto">
        <UiTable>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="w-[70px] text-muted-foreground">ID</TableHead>
              <TableHead className="text-muted-foreground">Date</TableHead>
              <TableHead className="text-muted-foreground">Customer</TableHead>
              <TableHead className="text-muted-foreground">Gender</TableHead>
              <TableHead className="text-muted-foreground">Age</TableHead>
              <TableHead className="text-muted-foreground">Category</TableHead>
              <TableHead className="text-right text-muted-foreground">Qty</TableHead>
              <TableHead className="text-right text-muted-foreground">Price</TableHead>
              <TableHead className="text-right text-muted-foreground">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">No results</TableCell>
              </TableRow>
            ) : (
              sales.map((s) => (
                <TableRow key={s.transactionId} className="cursor-pointer border-border hover:bg-muted/50" onClick={() => onSelect(s)}>
                  <TableCell className="font-medium text-foreground">{s.transactionId}</TableCell>
                  <TableCell className="text-muted-foreground">{s.date}</TableCell>
                  <TableCell className="text-foreground">{s.customerId}</TableCell>
                  <TableCell>
                    <Badge variant={s.gender === "Male" ? "default" : "secondary"} className="font-normal rounded-lg">
                      {s.gender}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground">{s.age}</TableCell>
                  <TableCell className="text-foreground">{s.productCategory}</TableCell>
                  <TableCell className="text-right text-foreground">{s.quantity}</TableCell>
                  <TableCell className="text-right tabular-nums text-foreground">{fmt(s.pricePerUnit)}</TableCell>
                  <TableCell className="text-right font-medium tabular-nums text-foreground">{fmt(s.totalAmount)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </UiTable>
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border px-5 py-4">
          <p className="text-xs text-muted-foreground">
            {(pagination.page - 1) * pagination.limit + 1}–{Math.min(pagination.page * pagination.limit, pagination.totalItems)} of {pagination.totalItems}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl border-input bg-muted" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[60px] text-center text-xs tabular-nums text-muted-foreground">{page} / {pagination.totalPages}</span>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl border-input bg-muted" disabled={page >= pagination.totalPages} onClick={() => onPageChange(page + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
