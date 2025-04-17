import { Header } from "@/components/shared/Header";

export function AdminCustomersPage() {
  return (
    <div>
      <Header title="Customers" />
      <div className="mt-6">
        {/* Add your customers table or list component here */}
        <h2 className="text-2xl font-semibold">Customers</h2>
      </div>
    </div>
  );
}

export default AdminCustomersPage; 