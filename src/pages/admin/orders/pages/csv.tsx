import { Header } from "@/components/shared/Header";

export function OrdersCsvPage() {
  return (
    <div>
      <Header title="Orders CSV" />
      <div className="mt-6">
        {/* Add your CSV import/export component here */}
        <h2 className="text-2xl font-semibold">Orders CSV Import/Export</h2>
      </div>
    </div>
  );
}

export default OrdersCsvPage; 