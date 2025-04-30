import { Header } from "@/components/shared/header";
import ProductTable from "../components/product-table";
import { Button } from "@/components/ui/button";
import { CustomSearch } from "@/components/shared/custom-search";
import { Plus } from "lucide-react";

export function AllProductsPage() { 
  return (
    <div>
      <Header title="All Products">
      <div className="flex items-center justify-end h-16 px-6 gap-6">
        <CustomSearch className='w-[25rem]' onClick={() => {}} placeholder="Search for orders, Channels order reference, name, postcode (min.3 characters)" />
        <div className="flex items-center gap-4">
          <Button  variant="default" size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
          <Plus />
            Add Product
          </Button>
        </div>
      </div>
      </Header>
      <div className="mt-6">
        <ProductTable />
      </div>
    </div>
  );
}

export default AllProductsPage; 