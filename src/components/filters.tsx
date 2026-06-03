"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Search, X } from "lucide-react";
import type { SalesFilters } from "@/lib/api";

interface Props {
  filters: SalesFilters;
  categories: string[];
  onChange: (filters: SalesFilters) => void;
  onSearch: () => void;
  onReset: () => void;
}

export function Filters({ filters, categories, onChange, onSearch, onReset }: Props) {
  const set = (key: keyof SalesFilters, value: string | number | undefined | null) =>
    onChange({ ...filters, [key]: value || undefined, page: 1 });

  const hasFilters = Object.entries(filters).some(([key, value]) => {
    if (["page", "limit"].includes(key)) return false;
    if (key === "sortBy" && value === "transactionId") return false;
    if (key === "sortOrder" && value === "asc") return false;
    return value !== undefined && value !== "";
  });

  return (
    <div className="space-y-4 rounded-xl border border-border/70 bg-card/70 p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">Find transactions</h3>
          <p className="text-xs text-muted-foreground">Start with search, category, or gender. Advanced filters are optional.</p>
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="mr-1 h-3 w-3" /> Clear all
          </Button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customer..."
            className="h-10 pl-9"
            value={filters.search || ""}
            onChange={(e) => set("search", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
        </div>

        <Select value={filters.category || "__all__"} onValueChange={(v) => set("category", v === "__all__" ? "" : v)}>
          <SelectTrigger className="h-10 w-full"><SelectValue placeholder="All Categories" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All Categories</SelectItem>
            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={filters.gender || "__all__"} onValueChange={(v) => set("gender", v === "__all__" ? "" : v)}>
          <SelectTrigger className="h-10 w-full"><SelectValue placeholder="All Genders" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All Genders</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={onSearch} className="h-10 w-full">Apply Filters</Button>
      </div>

      <details className="group rounded-lg border border-border/70 bg-muted/20">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          Advanced filters
          <span className="ml-auto text-xs group-open:hidden">Show</span>
          <span className="ml-auto hidden text-xs group-open:inline">Hide</span>
        </summary>

        <div className="grid gap-3 border-t border-border/70 p-3 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            className="h-10"
            type="number"
            placeholder="Transaction ID"
            value={filters.transactionId || ""}
            onChange={(e) => set("transactionId", e.target.value ? Number(e.target.value) : undefined)}
          />
          <Input
            className="h-10"
            type="date"
            placeholder="Date from"
            value={filters.dateFrom || ""}
            onChange={(e) => set("dateFrom", e.target.value)}
          />
          <Input
            className="h-10"
            type="date"
            placeholder="Date to"
            value={filters.dateTo || ""}
            onChange={(e) => set("dateTo", e.target.value)}
          />
          <div className="flex gap-2">
            <Input
              className="h-10"
              type="number"
              placeholder="Age min"
              value={filters.ageMin || ""}
              onChange={(e) => set("ageMin", e.target.value ? Number(e.target.value) : undefined)}
            />
            <Input
              className="h-10"
              type="number"
              placeholder="Age max"
              value={filters.ageMax || ""}
              onChange={(e) => set("ageMax", e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
          <div className="flex gap-2">
            <Input
              className="h-10"
              type="number"
              placeholder="Qty min"
              value={filters.quantityMin || ""}
              onChange={(e) => set("quantityMin", e.target.value ? Number(e.target.value) : undefined)}
            />
            <Input
              className="h-10"
              type="number"
              placeholder="Qty max"
              value={filters.quantityMax || ""}
              onChange={(e) => set("quantityMax", e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
          <div className="flex gap-2">
            <Input
              className="h-10"
              type="number"
              placeholder="Price min"
              value={filters.pricePerUnitMin || ""}
              onChange={(e) => set("pricePerUnitMin", e.target.value ? Number(e.target.value) : undefined)}
            />
            <Input
              className="h-10"
              type="number"
              placeholder="Price max"
              value={filters.pricePerUnitMax || ""}
              onChange={(e) => set("pricePerUnitMax", e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
          <div className="flex gap-2">
            <Input
              className="h-10"
              type="number"
              placeholder="Total min"
              value={filters.totalAmountMin || ""}
              onChange={(e) => set("totalAmountMin", e.target.value ? Number(e.target.value) : undefined)}
            />
            <Input
              className="h-10"
              type="number"
              placeholder="Total max"
              value={filters.totalAmountMax || ""}
              onChange={(e) => set("totalAmountMax", e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
          <Select value={filters.sortBy || "transactionId"} onValueChange={(v) => set("sortBy", v)}>
            <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Sort by" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="transactionId">Transaction ID</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="age">Age</SelectItem>
              <SelectItem value="pricePerUnit">Price</SelectItem>
              <SelectItem value="quantity">Quantity</SelectItem>
              <SelectItem value="totalAmount">Total Amount</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.sortOrder || "asc"} onValueChange={(v) => set("sortOrder", v as "asc" | "desc")}>
            <SelectTrigger className="h-10 w-full"><SelectValue placeholder="Order" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </details>
    </div>
  );
}
