"use client";

import { useRouter } from "next/navigation";

interface EditProductButtonProps {
  productId: string;
}

export default function EditProductButton({
  productId,
}: EditProductButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/products/${productId}/edit`)}
      className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
    >
      Edit Product
    </button>
  );
}