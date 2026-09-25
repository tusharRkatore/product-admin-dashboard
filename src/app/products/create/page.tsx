"use client";

import { useState } from "react";
import { createProduct } from "../../../services/productService";

export default function CreateProductPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleCreate = async () => {
  if (isSaving) return;

  setSuccessMessage("");
  setErrorMessage("");

  if (!title.trim()) {
    setErrorMessage("Product title is required.");
    return;
  }

  if (!price || Number(price) <= 0) {
    setErrorMessage("Price must be greater than 0.");
    return;
  }

  if (!description.trim()) {
    setErrorMessage("Description is required.");
    return;
  }

  setIsSaving(true);

  try {
    await createProduct({
      title: title.trim(),
      price: Number(price),
      description: description.trim(),
    });

    setSuccessMessage("Product created successfully.");
  } catch (error) {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("Unable to create product. Please try again.");
    }
  } finally {
    setIsSaving(false);
  }
};

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">
        Create Product
      </h1>
      <div className="mt-6">
  <label
    htmlFor="title"
    className="mb-2 block text-sm font-medium text-gray-700"
  >
    Product Title
  </label>

  <input
    id="title"
    type="text"
    value={title}
    onChange={(event) => setTitle(event.target.value)}
    placeholder="Enter product title"
    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  />
</div>
<div className="mt-4">
  <label
    htmlFor="price"
    className="mb-2 block text-sm font-medium text-gray-700"
  >
    Price
  </label>

  <input
    id="price"
    type="number"
    min="0"
    step="0.01"
    value={price}
    onChange={(event) => setPrice(event.target.value)}
    placeholder="Enter price"
    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  />
</div>
<div className="mt-4">
  <label
    htmlFor="description"
    className="mb-2 block text-sm font-medium text-gray-700"
  >
    Description
  </label>

  <textarea
    id="description"
    value={description}
    onChange={(event) => setDescription(event.target.value)}
    placeholder="Enter product description"
    rows={5}
    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
  />
</div>
<div className="mt-6">
  {errorMessage && (
    <p className="mb-4 text-sm font-medium text-red-600">
      {errorMessage}
    </p>
  )}

  {successMessage && (
    <p className="mb-4 text-sm font-medium text-green-600">
      {successMessage}
    </p>
  )}

  <button
    type="button"
    onClick={handleCreate}
    disabled={isSaving}
    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {isSaving ? "Creating..." : "Create Product"}
  </button>
</div>

    </main>
  );
}