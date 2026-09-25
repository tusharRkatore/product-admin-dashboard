"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { removeToken } from "../../lib/auth";
import {
  getCategories,
  getProducts,
  getProductsByCategory,
  getSortedProducts,
  Product,
  searchProducts,
} from "../../services/productService";
export default function ProductsPage() {
  const router = useRouter();

const [products, setProducts] = useState<Product[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [errorMessage, setErrorMessage] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(10);
const [totalProducts, setTotalProducts] = useState(0);
const [searchQuery, setSearchQuery] = useState("");
const requestIdRef = useRef(0);

const [categories, setCategories] = useState<
  { slug: string; name: string; url: string }[]
>([]);
const [selectedCategory, setSelectedCategory] = useState("");
const [sortBy, setSortBy] = useState("");
const totalPages = Math.ceil(totalProducts / pageSize);
const startItem =
  totalProducts === 0 ? 0 : (currentPage - 1) * pageSize + 1;
const endItem = Math.min(currentPage * pageSize, totalProducts);

  const handleLogout = () => {
    removeToken();
    router.replace("/login");
  };
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  fetchCategories();
}, []);



  useEffect(() => {
  const timer = setTimeout(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
setErrorMessage("");

      try {
        const skip = (currentPage - 1) * pageSize;
        const requestId = ++requestIdRef.current;

        const data = selectedCategory
  ? await getProductsByCategory(selectedCategory, pageSize, skip)
  : searchQuery.trim()
    ? await searchProducts(searchQuery.trim(), pageSize, skip)
    : sortBy
      ? await getSortedProducts(
          sortBy as "price" | "rating" | "title",
          pageSize,
          skip
        )
      : await getProducts(pageSize, skip);
          if (requestId !== requestIdRef.current) {
  return;


}

        setProducts(data.products);
        setTotalProducts(data.total);
     } catch (error) {
  if (error instanceof Error) {
    setErrorMessage(error.message);
  } else {
    setErrorMessage("Unable to load products. Please try again.");
  }
} finally {
  setIsLoading(false);
}
    };

    fetchProducts();
  }, 500);

  return () => clearTimeout(timer);
}, [currentPage, pageSize, searchQuery, selectedCategory, sortBy]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-7xl">
          
          {/* Header */}
         <div className="mb-6 flex flex-col gap-4 rounded-lg bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
  <h1 className="text-2xl font-bold text-gray-900">
    Products
  </h1>
  <button
  type="button"
  onClick={() => router.push("/products/create")}
  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
>
  Add Product
</button>

  <div className="flex flex-col gap-3 sm:flex-row">
    {/* Category */}
    <select
      value={selectedCategory}
      onChange={(event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1);
      }}
      className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    >
      <option value="">All Categories</option>

     {categories.map((category) => (
  <option key={category.slug} value={category.slug}>
    {category.name}
  </option>
))}</select>
<select
  value={sortBy}
  onChange={(event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  }}
  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
>
  <option value="">Sort By</option>
  <option value="price">Price</option>
  <option value="rating">Rating</option>
  <option value="title">Title</option>
</select>
    {/* Search */}
    <input
      type="search"
      value={searchQuery}
      onChange={(event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
      }}
      placeholder="Search products..."
      className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    />

    {/* Logout */}
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white transition hover:bg-red-700"
    >
      Logout
    </button>
  </div>
</div>
{errorMessage && (
  <div className="mb-4 rounded-lg bg-red-50 p-4">
    <p className="text-sm font-medium text-red-600">
      {errorMessage}
    </p>
  </div>
)}
          {/* Products */}
          {isLoading ? (
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : (
            <div className="hidden overflow-x-auto rounded-lg bg-white shadow-sm md:block">
              {/* Mobile cards */}
<div className="grid gap-4 md:hidden">
  {products.map((product) => (
    <div
      key={product.id}
      className="rounded-lg bg-white p-4 shadow-sm"
    >
      <div className="flex items-center gap-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-16 w-16 rounded object-cover"
        />

        <div className="min-w-0">
          <h2 className="truncate font-semibold text-gray-900">
            <button
  type="button"
  onClick={() => router.push(`/products/${product.id}`)}
  className="text-left font-medium text-blue-600 hover:underline"
>
  {product.title}
</button>
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {product.category}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 border-t pt-4">
        <div>
          <p className="text-xs text-gray-500">Price</p>
          <p className="font-medium text-gray-900">
            ${product.price}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Rating</p>
          <p className="font-medium text-gray-900">
            {product.rating}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Stock</p>
          <p className="font-medium text-gray-900">
            {product.stock}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>

{/* Desktop table */}
<div className="hidden overflow-x-auto rounded-lg bg-white shadow-sm md:block">
  <table className="w-full min-w-[800px] text-gray-800">
    <thead className="bg-gray-100 text-gray-900">
      <tr>
        <th className="px-4 py-3 text-left font-semibold">
          Image
        </th>

        <th className="px-4 py-3 text-left font-semibold">
          Title
        </th>

        <th className="px-4 py-3 text-left font-semibold">
          Category
        </th>

        <th className="px-4 py-3 text-left font-semibold">
          Price
        </th>

        <th className="px-4 py-3 text-left font-semibold">
          Rating
        </th>

        <th className="px-4 py-3 text-left font-semibold">
          Stock
        </th>
      </tr>
    </thead>

    <tbody>
      {products.map((product) => (
        <tr key={product.id} className="border-t">
          <td className="px-4 py-3">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-12 w-12 rounded object-cover"
            />
          </td>

          <td className="px-4 py-3 font-medium text-gray-900">
            {product.title}
          </td>

          <td className="px-4 py-3 text-gray-700">
            {product.category}
          </td>

          <td className="px-4 py-3 text-gray-700">
            ${product.price}
          </td>

          <td className="px-4 py-3 text-gray-700">
            {product.rating}
          </td>

          <td className="px-4 py-3 text-gray-700">
            {product.stock}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
              <table className="w-full min-w-[800px] text-gray-800">
                <thead className="bg-gray-100 text-gray-900">
                  <tr>
<th className="px-4 py-3 text-left font-semibold">Image</th>
                    <th className="px-4 py-3 text-left font-semibold">Title</th>
                    <th className="px-4 py-3 text-left font-semibold">Category</th>
                    <th className="px-4 py-3 text-left font-semibold">Price</th>
                    <th className="px-4 py-3 text-left font-semibold">Rating</th>
                    <th className="px-4 py-3 text-left font-semibold">Stock</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-t">
                      <td className="px-4 py-3">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-12 w-12 rounded object-cover"
                        />
                      </td>

                      <td className="px-4 py-3 font-medium text-gray-900">
                        {product.title}
                      </td>

                      <td className="px-4 py-3">
                        {product.category}
                      </td>

                      <td className="px-4 py-3">
                        ${product.price}
                      </td>

                      <td className="px-4 py-3">
                        {product.rating}
                      </td>

                      <td className="px-4 py-3">
                        {product.stock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-6 flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
  <div className="text-sm text-gray-600">
    Showing {startItem}–{endItem} of {totalProducts}
  </div>

  <div className="flex flex-wrap items-center gap-2">
    <label
      htmlFor="pageSize"
      className="text-sm font-medium text-gray-700"
    >
      Per page:
    </label>

    <select
      id="pageSize"
      value={pageSize}
      onChange={(event) => {
        setPageSize(Number(event.target.value));
        setCurrentPage(1);
      }}
      className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500"
    >
      <option value={10}>10</option>
      <option value={20}>20</option>
      <option value={50}>50</option>
    </select>

    <button
      type="button"
      onClick={() => setCurrentPage((page) => page - 1)}
      disabled={currentPage === 1}
      className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
    >
      Previous
    </button>

    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
      (page) => (
        <button
          key={page}
          type="button"
          onClick={() => setCurrentPage(page)}
          className={`rounded-lg px-3 py-2 text-sm font-medium ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "border border-gray-300 text-gray-700"
          }`}
        >
          {page}
        </button>
      )
    )}

    <button
      type="button"
      onClick={() => setCurrentPage((page) => page + 1)}
      disabled={currentPage === totalPages}
      className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
    >
      Next
    </button>
  </div>
</div>
        </div>
      </main>
    </ProtectedRoute>
  );
}