"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Sale, Pagination } from "@/lib/api";

interface Props {
  sales: Sale[];
  pagination: Pagination;
  page: number;
  onPageChange: (page: number) => void;
  onSelect: (sale: Sale) => void;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function SalesTable({ sales, pagination, page, onPageChange, onSelect }: Props) {
  return (
    <div className="rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
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
                <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              sales.map((sale) => (
                <TableRow
                  key={sale.transactionId}
                  className="cursor-pointer"
                  onClick={() => onSelect(sale)}
                >
                  <TableCell className="font-medium">{sale.transactionId}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>{sale.customerId}</TableCell>
                  <TableCell>
                    <Badge variant={sale.gender === "Male" ? "default" : "secondary"}>
                      {sale.gender}
                    </Badge>
                  </TableCell>
                  <TableCell>{sale.age}</TableCell>
                  <TableCell>{sale.productCategory}</TableCell>
                  <TableCell className="text-right">{sale.quantity}</TableCell>
                  <TableCell className="text-right">{formatCurrency(sale.pricePerUnit)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(sale.totalAmount)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1}–{Math.min(pagination.page * pagination.limit, pagination.totalItems)} of {pagination.totalItems}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm tabular-nums">{pagination.page} / {pagination.totalPages}</span>
            <Button variant="outline" size="sm" disabled={page >= pagination.totalPages} onClick={() => onPageChange(page + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
