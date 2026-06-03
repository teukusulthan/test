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
    <div className="rounded-xl border bg-card">
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-sm font-medium text-muted-foreground">Transactions</h2>
      </div>
      <div className="overflow-x-auto">
        <UiTable>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[70px]">ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">No results</TableCell>
              </TableRow>
            ) : (
              sales.map((s) => (
                <TableRow key={s.transactionId} className="cursor-pointer" onClick={() => onSelect(s)}>
                  <TableCell className="font-medium">{s.transactionId}</TableCell>
                  <TableCell className="text-muted-foreground">{s.date}</TableCell>
                  <TableCell>{s.customerId}</TableCell>
                  <TableCell>
                    <Badge variant={s.gender === "Male" ? "default" : "secondary"} className="font-normal">
                      {s.gender}
                    </Badge>
                  </TableCell>
                  <TableCell>{s.age}</TableCell>
                  <TableCell>{s.productCategory}</TableCell>
                  <TableCell className="text-right">{s.quantity}</TableCell>
                  <TableCell className="text-right tabular-nums">{fmt(s.pricePerUnit)}</TableCell>
                  <TableCell className="text-right font-medium tabular-nums">{fmt(s.totalAmount)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </UiTable>
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t px-4 py-3">
          <p className="text-xs text-muted-foreground">
            {(pagination.page - 1) * pagination.limit + 1}–{Math.min(pagination.page * pagination.limit, pagination.totalItems)} of {pagination.totalItems}
          </p>
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="icon" className="h-7 w-7" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <span className="min-w-[60px] text-center text-xs tabular-nums text-muted-foreground">{page} / {pagination.totalPages}</span>
            <Button variant="outline" size="icon" className="h-7 w-7" disabled={page >= pagination.totalPages} onClick={() => onPageChange(page + 1)}>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
