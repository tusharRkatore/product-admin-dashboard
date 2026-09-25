"use client";

import { useState } from "react";
import { deleteProduct } from "../services/productService";

interface DeleteProductButtonProps {
  productId: string;
}

export default function DeleteProductButton({
  productId,
}: DeleteProductButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");

const handleDelete = async () => {
  if (isDeleting) return;

  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) return;

setMessage("");
setErrorMessage("");
setIsDeleting(true);

  try {
  await deleteProduct(productId);
  setMessage("Product deleted successfully.");
} catch (error) {
  if (error instanceof Error) {
    setErrorMessage(error.message);
  } else {
    setErrorMessage("Unable to delete product. Please try again.");
  }
} finally {
    setIsDeleting(false);
  }
};
<div className="mb-3">
  {errorMessage && (
    <p className="text-sm font-medium text-red-600">
      {errorMessage}
    </p>
  )}

  {message && (
    <p className="text-sm font-medium text-green-600">
      {message}
    </p>
  )}
</div>
  return (
    
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting ? "Deleting..." : "Delete Product"}
    </button>
  );
}