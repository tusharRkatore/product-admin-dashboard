"use client";

interface ProductErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductError({
  reset,
}: ProductErrorProps) {
  return (
    <main className="p-6">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">
          Unable to load product
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Something went wrong while loading this product.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    </main>
  );
}