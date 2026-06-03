"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
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

  const hasFilters = Object.values(filters).some((v) => v !== undefined && v !== "" && v !== 1);

  return (
    <div className="rounded-lg border bg-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Filters</h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="mr-1 h-3 w-3" /> Clear all
          </Button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customer..."
            className="pl-8"
            value={filters.search || ""}
            onChange={(e) => set("search", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
        </div>

        <Select value={filters.category || "__all__"} onValueChange={(v) => set("category", v === "__all__" ? "" : v)}>
          <SelectTrigger><SelectValue placeholder="All Categories" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All Categories</SelectItem>
            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={filters.gender || "__all__"} onValueChange={(v) => set("gender", v === "__all__" ? "" : v)}>
          <SelectTrigger><SelectValue placeholder="All Genders" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All Genders</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Transaction ID"
          value={filters.transactionId || ""}
          onChange={(e) => set("transactionId", e.target.value ? Number(e.target.value) : undefined)}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          type="date"
          placeholder="Date from"
          value={filters.dateFrom || ""}
          onChange={(e) => set("dateFrom", e.target.value)}
        />
        <Input
          type="date"
          placeholder="Date to"
          value={filters.dateTo || ""}
          onChange={(e) => set("dateTo", e.target.value)}
        />
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Age min"
            value={filters.ageMin || ""}
            onChange={(e) => set("ageMin", e.target.value ? Number(e.target.value) : undefined)}
          />
          <Input
            type="number"
            placeholder="Age max"
            value={filters.ageMax || ""}
            onChange={(e) => set("ageMax", e.target.value ? Number(e.target.value) : undefined)}
          />
        </div>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Qty min"
            value={filters.quantityMin || ""}
            onChange={(e) => set("quantityMin", e.target.value ? Number(e.target.value) : undefined)}
          />
          <Input
            type="number"
            placeholder="Qty max"
            value={filters.quantityMax || ""}
            onChange={(e) => set("quantityMax", e.target.value ? Number(e.target.value) : undefined)}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Price min"
            value={filters.pricePerUnitMin || ""}
            onChange={(e) => set("pricePerUnitMin", e.target.value ? Number(e.target.value) : undefined)}
          />
          <Input
            type="number"
            placeholder="Price max"
            value={filters.pricePerUnitMax || ""}
            onChange={(e) => set("pricePerUnitMax", e.target.value ? Number(e.target.value) : undefined)}
          />
        </div>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Total min"
            value={filters.totalAmountMin || ""}
            onChange={(e) => set("totalAmountMin", e.target.value ? Number(e.target.value) : undefined)}
          />
          <Input
            type="number"
            placeholder="Total max"
            value={filters.totalAmountMax || ""}
            onChange={(e) => set("totalAmountMax", e.target.value ? Number(e.target.value) : undefined)}
          />
        </div>
        <Select value={filters.sortBy || "transactionId"} onValueChange={(v) => set("sortBy", v)}>
          <SelectTrigger><SelectValue placeholder="Sort by" /></SelectTrigger>
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
          <SelectTrigger><SelectValue placeholder="Order" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={onSearch} className="w-full sm:w-auto">Apply Filters</Button>
    </div>
  );
}
