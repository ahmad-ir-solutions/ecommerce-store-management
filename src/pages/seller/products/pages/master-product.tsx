import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { AddToListModal } from "../components/modal/add-to-list-modal"
import { Header } from "@/components/shared/header"
import { CustomSearch } from "@/components/shared/custom-search"
import { ReusableTable } from "@/components/shared/reusableTable"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"
import { IProductModel, ProductQueryParams } from "@/pages/admin/products/core/_modals"
import { useGetProducts } from "@/pages/admin/products/core/hooks/useProduct"
import { debounce } from 'lodash';

export function SellerProductsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<IProductModel | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [queryParams, setQueryParams] = useState<ProductQueryParams>({
    sortBy: "createdAt",
    sortOrder: "desc",
  })

  const { data: productsData, isLoading } = useGetProducts(queryParams)

  const products = productsData?.productsWithOrderCOunt || []
  
  const handleSearch = useCallback(
    debounce((query: string) => {
      setQueryParams((prev) => ({
        ...prev,
        search: query,
        // page: 1,
      }))
    }, 500),
    []
  )
  
  const handleAdd = (row: IProductModel) => {
    setSelectedProduct(row)
    setIsAddModalOpen(true)
  }

  const productColumns = [
    {
      key: "checkbox",
      title: "",
      render: (
        row: IProductModel,
        selectedRows?: string[],
        toggleSelectRow?: (id: string) => void,
        // toggleSelectAll?: () => void,
        // isAllSelected?: boolean,
      ) => (
        <Checkbox
          checked={selectedRows?.includes(row._id) || false}
          onCheckedChange={() => toggleSelectRow?.(row._id)}
        />
      ),
      width: "50px",
    },
    {
      key: "image",
      title: "Image",
      render: (row: IProductModel) => (
        <img src={row.imageUrl || "/placeholder.svg"} alt={row.productName} className="w-12 h-12 rounded object-cover" />
      ),
      width: "80px",
    },
    { key: "masterSku", 
      title: "Master SKU",
      render: (row: IProductModel) => (
        <Link to={`edit-product-info/${row._id}`} className="text-[#024AFE]">
          {row.sku}
        </Link>
      ),
       width: "140px" },
    { key: "name", title: "Name", width: "220px", render: (row: IProductModel) => row.productName },
    { key: "warehouse", title: "Warehouse", width: "120px", render: (row: IProductModel) => row.warehouse },
    { key: "cost", title: "Cost", width: "100px", render: (row: IProductModel) => `£${row.unitCostPrice}` },
    { key: "price", title: "Price", width: "100px", render: (row: IProductModel) => `£${row.price}` },
    { key: "inventory", title: "Inventory", width: "100px", render: (row: IProductModel) => row.inventory },
    // { key: "status", title: "Status", width: "100px", render: (row: Product) => row.status },
    {
      key: "action",
      title: "Action",
      render: (row: IProductModel) => (
        <Button size="sm" onClick={() => handleAdd(row)} variant="primary">
          + Add
        </Button>
      ),
      width: "100px",
    },
  ]

  return (
    <div>
      {/* Header */}
      <Header title="Products">
        <CustomSearch
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            handleSearch(e.target.value)
          }}
          className="w-full"
        />
        {/* <Button onClick={() => setIsAddModalOpen(true)} variant="primary" className="rounded-lg">
          Add to list
        </Button> */}
      </Header>
      {/* Master Inventory Section */}
      <ReusableTable
        title="Master Inventory"
        data={products}
        columns={productColumns}
        itemsPerPage={10}
        isLoading={isLoading}
      />
      <AddToListModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} product={selectedProduct} />
    </div>
          // {/* integration */}
      // <div>
      //   <Header title="Users">
      //     <div className="flex gap-2">
      //       <Button onClick={handleNewUserSignup} className="rounded-lg" size="lg" variant="outline">
      //         Simulate New User
      //       </Button>
      //       <Button onClick={handleNewIntegration} className="rounded-lg" size="lg" variant="primary">
      //         New Integration
      //       </Button>
      //     </div>
      //   </Header>
      //   <div className="mt-6">
      //     {/* <ExistingCourier />
      //   <ExistingPaymentGatways /> */}
      //   </div>

      //   <OnboardingStepper
      //     isOpen={isModalOpen}
      //     isNewUser={isNewUser}
      //     onClose={handleModalClose}
      //     onComplete={handleIntegrationComplete}
      //   />
      // </div>
  )
}

export default SellerProductsPage
