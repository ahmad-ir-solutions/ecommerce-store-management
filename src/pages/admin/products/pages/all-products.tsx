import { Header } from "@/components/shared/header";

export function AllProductsPage() { 
  return (
    <div>
      <Header title="All Products" />
      <div className="mt-6">
        {/* Add your suppliers list component here */}
        <h2 className="text-2xl font-semibold">All Products</h2>
      </div>
    </div>
  );
}

export default AllProductsPage; 