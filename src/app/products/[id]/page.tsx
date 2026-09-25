
import EditProductButton from "../../../components/EditProductButton";
import { getProductById } from "../../../services/productService";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  const product = await getProductById(id);

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