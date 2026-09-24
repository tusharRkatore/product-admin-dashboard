"use client";

import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";
import { removeToken } from "../../lib/auth";

export default function ProductsPage() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.replace("/login");
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between rounded-lg bg-white p-5 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">
              Products Page
            </h1>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}