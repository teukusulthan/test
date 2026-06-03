"use client";

import { useEffect, useState, useCallback } from "react";
import {
  fetchSummary,
  fetchCategories,
  fetchSales,
  fetchSummaryFiltered,
  Sale,
  Pagination,
  Summary,
} from "@/lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(1);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const filters = { search, category, gender, page, limit: 20 };
      const [summaryData, salesData] = await Promise.all([
        fetchSummaryFiltered({ search, category, gender }),
        fetchSales(filters),
      ]);
      setSummary(summaryData);
      setSales(salesData.data);
      setPagination(salesData.pagination);
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  }, [search, category, gender, page]);

  useEffect(() => {
    fetchCategories().then(setCategories);
    fetchSummary().then(setSummary);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadData();
  };

  // Chart data: revenue by category from current sales page
  const chartData = categories.map((cat) => {
    const catSales = sales.filter((s) => s.productCategory === cat);
    const revenue = catSales.reduce((sum, s) => sum + s.totalAmount, 0);
    return { category: cat, revenue };
  });

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Retail Sales Dashboard
          </h1>
          <p className="text-gray-500">
            Hijrahfood Public API &mdash; Technical Assessment
          </p>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Card
              label="Total Revenue"
              value={formatCurrency(summary.totalRevenue)}
              color="bg-green-500"
            />
            <Card
              label="Transactions"
              value={summary.totalTransactions.toLocaleString()}
              color="bg-blue-500"
            />
            <Card
              label="Avg Order Value"
              value={formatCurrency(summary.averageOrderValue)}
              color="bg-purple-500"
            />
            <Card
              label="Items Sold"
              value={summary.totalItemsSold.toLocaleString()}
              color="bg-orange-500"
            />
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow">
          <form onSubmit={handleSearch} className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Search
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by customer ID..."
                className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  setPage(1);
                }}
                className="rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>

        {/* Chart */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Revenue by Category
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
              />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Table */}
        <div className="rounded-lg bg-white shadow">
          <div className="border-b px-4 py-3">
            <h2 className="text-lg font-semibold text-gray-800">
              Sales Records
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Gender</th>
                  <th className="px-4 py-3">Age</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-right">Qty</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ) : sales.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-gray-400">
                      No results found
                    </td>
                  </tr>
                ) : (
                  sales.map((sale) => (
                    <tr
                      key={sale.transactionId}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 font-medium">
                        {sale.transactionId}
                      </td>
                      <td className="px-4 py-3">{sale.date}</td>
                      <td className="px-4 py-3">{sale.customerId}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${
                            sale.gender === "Male"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-pink-100 text-pink-700"
                          }`}
                        >
                          {sale.gender}
                        </span>
                      </td>
                      <td className="px-4 py-3">{sale.age}</td>
                      <td className="px-4 py-3">{sale.productCategory}</td>
                      <td className="px-4 py-3 text-right">{sale.quantity}</td>
                      <td className="px-4 py-3 text-right">
                        {formatCurrency(sale.pricePerUnit)}
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        {formatCurrency(sale.totalAmount)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && (
            <div className="flex items-center justify-between border-t px-4 py-3">
              <p className="text-sm text-gray-500">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                {Math.min(
                  pagination.page * pagination.limit,
                  pagination.totalItems
                )}{" "}
                of {pagination.totalItems} records
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="flex items-center px-3 text-sm text-gray-600">
                  {pagination.page} / {pagination.totalPages}
                </span>
                <button
                  onClick={() =>
                    setPage((p) =>
                      Math.min(pagination.totalPages, p + 1)
                    )
                  }
                  disabled={page === pagination.totalPages}
                  className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <div className={`mb-2 h-1 w-10 rounded ${color}`} />
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
