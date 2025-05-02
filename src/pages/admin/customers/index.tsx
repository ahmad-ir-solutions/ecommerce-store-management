import { Header } from "@/components/shared/header";
import { Customers } from "./components/customers";
import { CustomerDetails } from "./components/customer-details";

export function AdminCustomersPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <Header title="Customers" />
      <div className="mt-6">
        {/* Add your customers table or list component here */}
        <Customers/>
        <CustomerDetails customerId="cust_2" />
      </div>
    </div>
  );
}

export default AdminCustomersPage; 