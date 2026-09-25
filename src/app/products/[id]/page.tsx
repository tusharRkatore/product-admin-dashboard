import Link from "next/link";
import DeleteProductButton from "../../../components/DeleteProductButton";
import EditProductButton from "../../../components/EditProductButton";
import { getProductById } from "../../../services/productService";
``
interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;

  
}
export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

if (!/^\d+$/.test(id)) {
  return (
    <main className="p-6">
      
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">
          Invalid product ID
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Please provide a valid numeric product ID.
        </p>
      </div>
    </main>
  );
}

const product = await getProductById(id);
  if (!product) {
  return (
    <main className="p-6">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 text-center shadow-sm">
        <Link
          href="/products"
          className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Products
        </Link>
        <h2 className="text-xl font-semibold text-gray-900">
          Product not found
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          The product you are looking for does not exist.
        </p>
      </div>
    </main>
  );
}

  return (
    <main className="p-6"><img
  src={product.thumbnail}
  alt={product.title}
  className="h-64 w-full rounded-lg object-contain bg-gray-100"
 />
      <h1 className="text-2xl font-bold">
        {product.title}
      </h1>

      <p className="mt-2 text-gray-600">
        {product.description}
      </p><p className="mt-3 text-sm text-gray-500">
  Category:{" "}
  <span className="font-medium text-gray-700">
    {product.category}
  </span>
</p>
<div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="mt-6">
 <EditProductButton productId={id} />
 <DeleteProductButton productId={id} />
</div>

  <div className="rounded-lg bg-gray-100 p-4">
    <p className="text-sm text-gray-500">Price</p>
    <p className="mt-1 text-xl font-semibold text-gray-900">
      ${product.price}
    </p>
  </div>

  <div className="rounded-lg bg-gray-100 p-4">
    <p className="text-sm text-gray-500">Rating</p>
    <p className="mt-1 text-xl font-semibold text-gray-900">
      {product.rating}
    </p>
  </div>

  <div className="rounded-lg bg-gray-100 p-4">
    <p className="text-sm text-gray-500">Stock</p>
    <p className="mt-1 text-xl font-semibold text-gray-900">
      {product.stock}
    </p>
  </div>
</div>
    </main>
  );
}