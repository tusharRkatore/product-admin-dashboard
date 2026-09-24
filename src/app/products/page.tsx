import ProtectedRoute from "../../components/ProtectedRoute";

export default function ProductsPage() {
  return (
    <ProtectedRoute>
      <main>
        <h1>Products Page</h1>
      </main>
    </ProtectedRoute>
  );
}