import { Header } from "@/components/shared/header";
import { Customers } from "./components/customers";

export function AdminCustomersPage() {
  return (
    <div>
      <Header title="Customers" />
      <div className="mt-6">
        <Customers/>
      </div>
    </div>
  );
}

export default AdminCustomersPage;