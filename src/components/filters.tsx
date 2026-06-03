"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Filters as FiltersType } from "@/lib/api";

interface Props {
  filters: FiltersType;
  categories: string[];
  onChange: (f: FiltersType) => void;
  onReset: () => void;
}

export function Filters({ filters, categories, onChange, onReset }: Props) {
  const [open, setOpen] = useState(false);
  const set = (k: keyof FiltersType, v: unknown) => onChange({ ...filters, [k]: v || undefined });

  return (
    <div className="rounded-xl border bg-card">
      <div className="flex flex-wrap items-center gap-2 p-3">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customer..."
            className="h-9 pl-8"
            value={filters.search || ""}
            onChange={(e) => set("search", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onChange({ ...filters, page: 1 })}
          />
        </div>

        <Select value={filters.category || "_"} onValueChange={(v) => set("category", v === "_" ? "" : v)}>
          <SelectTrigger className="h-9 w-[140px]"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="_">All Categories</SelectItem>
            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={filters.gender || "_"} onValueChange={(v) => set("gender", v === "_" ? "" : v)}>
          <SelectTrigger className="h-9 w-[110px]"><SelectValue placeholder="Gender" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="_">All</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" className="h-9" onClick={() => setOpen(!open)}>
          <SlidersHorizontal className="mr-1.5 h-3.5 w-3.5" />
          {open ? "Less" : "More"}
        </Button>

        <Button size="sm" className="h-9" onClick={() => onChange({ ...filters, page: 1 })}>
          Search
        </Button>

        <Button variant="ghost" size="sm" className="h-9 text-muted-foreground" onClick={onReset}>
          <X className="mr-1 h-3 w-3" />
          Reset
        </Button>
      </div>

      {open && (
        <div className="grid gap-2 border-t px-3 py-3 sm:grid-cols-2 lg:grid-cols-4">
          <Input type="date" className="h-9" value={filters.dateFrom || ""} onChange={(e) => set("dateFrom", e.target.value)} />
          <Input type="date" className="h-9" value={filters.dateTo || ""} onChange={(e) => set("dateTo", e.target.value)} />
          <div className="flex gap-2">
            <Input type="number" className="h-9" placeholder="Age min" value={filters.ageMin ?? ""} onChange={(e) => set("ageMin", e.target.value ? +e.target.value : undefined)} />
            <Input type="number" className="h-9" placeholder="Age max" value={filters.ageMax ?? ""} onChange={(e) => set("ageMax", e.target.value ? +e.target.value : undefined)} />
          </div>
          <div className="flex gap-2">
            <Input type="number" className="h-9" placeholder="Qty min" value={filters.quantityMin ?? ""} onChange={(e) => set("quantityMin", e.target.value ? +e.target.value : undefined)} />
            <Input type="number" className="h-9" placeholder="Qty max" value={filters.quantityMax ?? ""} onChange={(e) => set("quantityMax", e.target.value ? +e.target.value : undefined)} />
          </div>
          <div className="flex gap-2">
            <Input type="number" className="h-9" placeholder="Price min" value={filters.pricePerUnitMin ?? ""} onChange={(e) => set("pricePerUnitMin", e.target.value ? +e.target.value : undefined)} />
            <Input type="number" className="h-9" placeholder="Price max" value={filters.pricePerUnitMax ?? ""} onChange={(e) => set("pricePerUnitMax", e.target.value ? +e.target.value : undefined)} />
          </div>
          <div className="flex gap-2">
            <Input type="number" className="h-9" placeholder="Total min" value={filters.totalAmountMin ?? ""} onChange={(e) => set("totalAmountMin", e.target.value ? +e.target.value : undefined)} />
            <Input type="number" className="h-9" placeholder="Total max" value={filters.totalAmountMax ?? ""} onChange={(e) => set("totalAmountMax", e.target.value ? +e.target.value : undefined)} />
          </div>
          <Select value={filters.sortBy || "transactionId"} onValueChange={(v) => set("sortBy", v)}>
            <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="transactionId">ID</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="age">Age</SelectItem>
              <SelectItem value="pricePerUnit">Price</SelectItem>
              <SelectItem value="quantity">Qty</SelectItem>
              <SelectItem value="totalAmount">Total</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.sortOrder || "asc"} onValueChange={(v) => set("sortOrder", v as "asc" | "desc")}>
            <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
