"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getProductById,
  updateProduct,
} from "../../../../services/productService";
export default function EditProductPage() {
   const [title, setTitle] = useState("");
   const [price, setPrice] = useState("");
   const [description, setDescription] = useState("");
   const [isSaving, setIsSaving] = useState(false);
   const [successMessage, setSuccessMessage] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
   const params = useParams<{ id: string }>();

useEffect(() => {
  const loadProduct = async () => {
    const product = await getProductById(params.id);

    setTitle(product.title);
    setPrice(String(product.price));
    setDescription(product.description);
  };

  loadProduct();
}, [params.id]);
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">
        Edit Product
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
<div className="mt-6">
  <label
    htmlFor="price"
    className="mb-2 block text-sm font-medium text-gray-700"
  >
    Product Price
  </label>

  <input
    id="price"
    type="number"
    value={price}
    onChange={(event) => setPrice(event.target.value)}
    placeholder="Enter product price"
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
    disabled={isSaving}
    onClick={async () => {
  if (isSaving) return;

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
  setSuccessMessage("");
  setErrorMessage("");
  setIsSaving(true);

  try {
    await updateProduct(params.id, {
      title: title.trim(),
      price: Number(price),
      description: description.trim(),
    });

    setSuccessMessage("Product updated successfully.");
  } catch (error) {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("Unable to update product. Please try again.");
    }
  } finally {
    setIsSaving(false);
  }
}}
    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {isSaving ? "Saving..." : "Save Changes"}
  </button>
  
</div>
    </main>
  );
}