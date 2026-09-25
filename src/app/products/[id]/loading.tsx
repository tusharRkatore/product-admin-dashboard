export default function Loading() {
  return (
    <main className="p-6">
      <div className="mx-auto max-w-4xl">
        <div className="animate-pulse rounded-lg bg-white p-6 shadow-sm">
          <div className="h-64 rounded-lg bg-gray-200" />

          <div className="mt-6 h-8 w-2/3 rounded bg-gray-200" />

          <div className="mt-4 h-4 w-full rounded bg-gray-200" />
          <div className="mt-2 h-4 w-5/6 rounded bg-gray-200" />

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="h-24 rounded-lg bg-gray-200" />
            <div className="h-24 rounded-lg bg-gray-200" />
            <div className="h-24 rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </main>
  );
}