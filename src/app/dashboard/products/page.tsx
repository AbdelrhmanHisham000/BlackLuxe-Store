export const metadata = {
  title: "Product Dashboard | YourSiteName",
  description:
    "Manage your product listings here. View, add, or edit products easily from the dashboard.",
};

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Product Management</h1>
      <p className="text-white">
        Welcome to the product dashboard. Here, you can view your existing
        products, add new ones, or edit details of current listings. Use the
        buttons above to get started.
      </p>
    </div>
  );
}
