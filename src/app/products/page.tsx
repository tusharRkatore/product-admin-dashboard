"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { removeToken } from "../../lib/auth";
import { getProducts, Product } from "../../services/productService";

export default function ProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    removeToken();
    router.replace("/login");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-5 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">
              Products
            </h1>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          {/* Products */}
          {isLoading ? (
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
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
        </div>
      </main>
    </ProtectedRoute>
  );
}