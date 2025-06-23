// // import { useState, useCallback } from "react";
// // import { Header } from "@/components/shared/header";
// // import { Button } from "@/components/ui/button";
// // import { CustomSearch } from "@/components/shared/custom-search";
// // import { Plus } from "lucide-react";
// // import { PaginationControls } from "@/components/shared/PaginationControls";
// // import AddToListModal from "../components/modal/add-to-list-modal";
// // import OnboardingStepper from "../../accounts-integration/components/onboarding-stepper";

// // // Dummy data for demonstration
// // const totalItems = 27;
// // const itemsPerPage = 10;
// // const totalPages = Math.ceil(totalItems / itemsPerPage);
// // const dummyProducts = Array.from({ length: itemsPerPage }).map((_, i) => ({
// //   id: `SKU${i + 1}234567890`,
// //   image: "https://via.placeholder.com/40",
// //   name: "Xyziff Awesome EXP-9 100ml",
// //   warehouse: "Default",
// //   cost: "£19.95",
// //   price: "£24.95",
// //   inventory: 48,
// //   status: "-",
// // }));

// // export function SellerProductsPage() {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [isAddToListOpen, setIsAddToListOpen] = useState(false);
// //   const [selectedSKU, setSelectedSKU] = useState("");

// //   const handleAddProductModalOpen = () => setIsAddProductModalOpen(true);

// //   // Debounced search handler (optional)
// //   const handleSearch = useCallback((query: string) => {
// //     console.log(query);

// //     // Implement search logic here
// //   }, []);

// //   // Dummy page data (simulate pagination)
// //   const paginatedProducts = dummyProducts;

// //   const handleOpenAddToList = (sku: string) => {
// //     setSelectedSKU(sku);
// //     setIsAddToListOpen(true);
// //   };

// //   const handleAddToList = (data: { masterSKU: string; shopSKU: string; channel: string }) => {
// //     // TODO: handle the add-to-list logic here
// //     console.log(data);

// //     setIsAddToListOpen(false);
// //   };

// //   const [isModalOpen, setIsModalOpen] = useState(false)
// //   const [isNewUser, setIsNewUser] = useState(false)

// //   const handleNewIntegration = () => {
// //     setIsNewUser(false)
// //     setIsModalOpen(true)
// //   }

// //   const handleNewUserSignup = () => {
// //     setIsNewUser(true)
// //     setIsModalOpen(true)
// //   }

// //   const handleModalClose = () => {
// //     setIsModalOpen(false)
// //   }

// //   const handleIntegrationComplete = (data: any) => {
// //     console.log("Integration completed with data:", data)
// //     // Handle the completed integration data here
// //     // You can save to your backend, update UI, etc.
// //   }


// //   return (
// //     <div>
// //       <Header title="Products">
// //         <div className="flex items-center justify-end h-16 px-6 gap-6">
// //           <CustomSearch
// //             className="w-[25rem]"
// //             value={searchTerm}
// //             onChange={(e) => {
// //               setSearchTerm(e.target.value);
// //               handleSearch(e.target.value);
// //             }}
// //             placeholder="Search for product name, SKU, etc."
// //           />
// //           <Button
// //             variant="default"
// //             size="lg"
// //             className="bg-[#024AFE] hover:bg-[#0228fe] text-white rounded-lg"
// //             onClick={handleAddProductModalOpen}
// //           >
// //             <Plus />
// //             Add Product
// //           </Button>
// //         </div>
// //       </Header>
// //       <div className="mt-6 bg-white rounded-2xl shadow p-6">
// //         <div className="font-semibold text-lg mb-4">Master Inventory</div>
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full text-sm">
// //             <thead>
// //               <tr className="bg-[#F6F8FA] text-gray-500">
// //                 <th className="px-4 py-3"></th>
// //                 <th className="px-4 py-3">Image</th>
// //                 <th className="px-4 py-3">Master SKU</th>
// //                 <th className="px-4 py-3">Name</th>
// //                 <th className="px-4 py-3">Warehouse</th>
// //                 <th className="px-4 py-3">Cost</th>
// //                 <th className="px-4 py-3">Price</th>
// //                 <th className="px-4 py-3">Inventory</th>
// //                 <th className="px-4 py-3">Status</th>
// //                 <th className="px-4 py-3">Action</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {paginatedProducts.map((product) => (
// //                 <tr key={product.id} className="border-b last:border-b-0 hover:bg-gray-50">
// //                   <td className="px-4 py-2 text-center">
// //                     <input type="checkbox" />
// //                   </td>
// //                   <td className="px-4 py-2 text-center">
// //                     <img
// //                       src={product.image}
// //                       alt={product.name}
// //                       className="w-10 h-10 rounded object-cover mx-auto"
// //                     />
// //                   </td>
// //                   <td className="px-4 py-2">{product.id}</td>
// //                   <td className="px-4 py-2">{product.name}</td>
// //                   <td className="px-4 py-2">{product.warehouse}</td>
// //                   <td className="px-4 py-2">{product.cost}</td>
// //                   <td className="px-4 py-2">{product.price}</td>
// //                   <td className="px-4 py-2">{product.inventory}</td>
// //                   <td className="px-4 py-2">{product.status}</td>
// //                   <td className="px-4 py-2">
// //                     <Button
// //                       className="bg-blue-500 text-white px-4 py-1 rounded-md text-xs hover:bg-blue-600"
// //                       onClick={() => handleOpenAddToList(product.id)}
// //                     >
// //                       Add
// //                     </Button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //         <div className="mt-6 flex justify-between items-center">
// //           {/* Left: First, Previous, Page Input, Next, Last */}
// //           <div className="flex items-center gap-2">
// //             <Button
// //               className="rounded-md"
// //               size="sm"
// //               variant="primary"
// //               disabled={currentPage === 1}
// //               onClick={() => setCurrentPage(1)}
// //             >
// //               First
// //             </Button>
// //             <Button
// //               className="rounded-md"
// //               size="sm"
// //               variant="primary"
// //               disabled={currentPage === 1}
// //               onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
// //             >
// //               Previous
// //             </Button>
// //             <input
// //               type="number"
// //               min={1}
// //               max={totalPages}
// //               value={currentPage}
// //               onChange={e => {
// //                 const val = Number(e.target.value);
// //                 if (val >= 1 && val <= totalPages) setCurrentPage(val);
// //               }}
// //               className="w-12 h-[32px] border rounded-md text-center"
// //             />
// //             <Button
// //               className="rounded-md"
// //               size="sm"
// //               variant="primary"
// //               disabled={currentPage === totalPages}
// //               onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
// //             >
// //               Next
// //             </Button>
// //             <Button
// //               className="rounded-md"
// //               size="sm"
// //               variant="primary"
// //               disabled={currentPage === totalPages}
// //               onClick={() => setCurrentPage(totalPages)}
// //             >
// //               Last
// //             </Button>
// //           </div>

// //           {/* Center: PaginationControls */}
// //           <div>
// //             <PaginationControls
// //               currentPage={currentPage}
// //               totalPages={totalPages}
// //               onPageChange={setCurrentPage}
// //             />
// //           </div>

// //           {/* Right: Page info */}
// //           <div className="text-xs text-gray-500">
// //             Page {currentPage} of {totalPages} - Items {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
// //           </div>
// //         </div>
// //       </div>
// //       <AddToListModal
// //         open={isAddToListOpen}
// //         onClose={() => setIsAddToListOpen(false)}
// //         onSubmit={handleAddToList}
// //         defaultSKU={selectedSKU}
// //       />

// //       {/* integration */}
// //       <div>
// //         <Header title="Users">
// //           <div className="flex gap-2">
// //             <Button onClick={handleNewUserSignup} className="rounded-lg" size="lg" variant="outline">
// //               Simulate New User
// //             </Button>
// //             <Button onClick={handleNewIntegration} className="rounded-lg" size="lg" variant="primary">
// //               New Integration
// //             </Button>
// //           </div>
// //         </Header>
// //         <div className="mt-6">
// //           {/* <ExistingCourier />
// //         <ExistingPaymentGatways /> */}
// //         </div>

// //         <OnboardingStepper
// //           isOpen={isModalOpen}
// //           isNewUser={isNewUser}
// //           onClose={handleModalClose}
// //           onComplete={handleIntegrationComplete}
// //         />
// //       </div>

// //     </div>
// //   );
// // }


// // export default SellerProductsPage; 

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AddToListModal } from "../components/modal/add-to-list-modal"
import { Header } from "@/components/shared/header"
import { CustomSearch } from "@/components/shared/custom-search"
import { ReusableTable } from "@/components/shared/reusableTable"
import { Checkbox } from "@/components/ui/checkbox"

interface Product {
  _id: string
  image: string
  masterSku: string
  name: string
  warehouse: string
  cost: string
  price: string
  inventory: number
  status: string
}

export function SellerProductsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleAdd = (row: Product) => {
    console.log("Add clicked for", row)
    setIsAddModalOpen(true)
  }

  const productColumns = [
    {
      key: "checkbox",
      title: "",
      render: (
        row: Product,
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
      render: (row: Product) => (
        <img src={row.image || "/placeholder.svg"} alt={row.name} className="w-12 h-12 rounded object-cover" />
      ),
      width: "80px",
    },
    { key: "masterSku", title: "Master SKU", width: "140px" },
    { key: "name", title: "Name", width: "220px" },
    { key: "warehouse", title: "Warehouse", width: "120px" },
    { key: "cost", title: "Cost", width: "100px" },
    { key: "price", title: "Price", width: "100px" },
    { key: "inventory", title: "Inventory", width: "100px" },
    { key: "status", title: "Status", width: "100px" },
    {
      key: "action",
      title: "Action",
      render: (row: Product) => (
        <Button size="sm" onClick={() => handleAdd(row)} variant="primary">
          + Add
        </Button>
      ),
      width: "100px",
    },
  ]

  const mockProducts: Product[] = [
    {
      _id: "1",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop",
      masterSku: "805432000253",
      name: "Xerjoff Accento EDdfgdf",
      warehouse: "Default",
      cost: "£112.95",
      price: "£143.95",
      inventory: 546,
      status: "pending",
    },
    {
      _id: "2",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
      masterSku: "805432000254",
      name: "sdfsdfsdf",
      warehouse: "Default",
      cost: "£112.95",
      price: "£143.95",
      inventory: 546,
      status: "-",
    },
    {
      _id: "3",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
      masterSku: "805432000255",
      name: "Xerjoff Accento EDP-l",
      warehouse: "Default",
      cost: "£112.95",
      price: "£143.95",
      inventory: 546,
      status: "-",
    },
    {
      _id: "4",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
      masterSku: "805432000256",
      name: "Xerjoff Accento EDP-S 100ml",
      warehouse: "Default",
      cost: "£112.95",
      price: "£143.95",
      inventory: 546,
      status: "-",
    },
  ]

  return (
    <div>
      {/* Header */}
      <Header title="Products">
        <CustomSearch
          placeholder="Search by name/Master SKU/Channel SKU"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => setIsAddModalOpen(true)} variant="primary" className="rounded-lg">
          Add to list
        </Button>
      </Header>
      {/* Master Inventory Section */}
      <ReusableTable
        title="Master Inventory"
        data={mockProducts}
        columns={productColumns}
        searchTerm={searchTerm}
        itemsPerPage={10}
        isLoading={false}
      />

      <AddToListModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}

export default SellerProductsPage
