interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">
        Product ID: {id}
      </h1>
    </main>
  );
}