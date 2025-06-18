import { Header } from "@/components/shared/header";
import ProductTable from "../components/product-table";
import { Button } from "@/components/ui/button";
import { CustomSearch } from "@/components/shared/custom-search";
import { Plus } from "lucide-react";
import { useState, useCallback } from "react";
import { ProductQueryParams } from '../core/_modals';
import { debounce } from 'lodash';

export function AllProductsPage() {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [queryParams, setQueryParams] = useState<ProductQueryParams>({
    sortBy: "createdAt",
    sortOrder: "desc",
    limit: 10,
    page: 1,
  })

  const handleAddProductModalOpen = () => {
    setIsAddProductModalOpen(true)
  }

  const handleSearch = useCallback(
    debounce((query: string) => {
      setQueryParams((prev) => ({
        ...prev,
        search: query,
        page: 1,
      }))
    }, 500),
    []
  )

  return (
    <div>
      <Header title="All Products">
        <div className="flex items-center justify-end h-16 px-6 gap-6">
          <CustomSearch 
            className='w-[25rem]' 
            value={searchTerm} 
            onChange={(e) => {
              setSearchTerm(e.target.value)
              handleSearch(e.target.value)
            }}
            placeholder="Search for products name" 
          />
          <div className="flex items-center gap-4">
            <Button variant="default" size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg" onClick={handleAddProductModalOpen}>
              <Plus />
              Add Product
            </Button>
          </div>
        </div>
      </Header>
      <div className="mt-6">
        <ProductTable 
          isAddProductModalOpen={isAddProductModalOpen} 
          setIsAddProductModalOpen={setIsAddProductModalOpen} 
          queryParams={queryParams} 
          setQueryParams={setQueryParams} 
        />
      </div>
    </div>
  );
}

export default AllProductsPage; 