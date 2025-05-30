// // import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { useNavigate } from "react-router-dom"
// import { Header } from "@/components/shared/header"
// import { Button } from "@/components/ui/button"
// import { CustomSearch } from '@/components/shared/custom-search'
// import { Plus } from "lucide-react"

// export function ExistingWarehouse() {
//   const navigate = useNavigate()
//   const warehouse = [
//     {
//       id: "1",
//       warehouse: "Benson",
//       adress1: "benson@xyz.co",
//       adress2: "sgdsgd  sdf s",
//       city: "Administrator",
//       postCode: "3434",
//       default: "is Default",
//     },
//   ]

//   const handleAddWarehouse = () => {
//     navigate("/admin/settings/warehouse/add-warehouse")
//   }

//   const handleEditWarehouse = (warehouseId: string) => {
//     navigate(`/admin/settings/warehouse/edit-warehouse-details/${warehouseId}`)
//   }

//   return (
//     <div>
//       <Header title="Warehouse">
//         <div className="flex items-center justify-end h-16 px-6 gap-6">
//           <CustomSearch className='w-[25rem]' onClick={() => { }} placeholder="Search by name/Master SKU/Channel SKU" />
//           <div className="flex items-center gap-4">
//             <Button variant="default" size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg" onClick={handleAddWarehouse}>
//               <Plus />
//               Add New
//             </Button>
//           </div>
//         </div>
//       </Header>
//       <div className="mt-6">
//         <Card className="bg-white rounded-2xl border-none shadow-none">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-lg font-medium">
//               Existing Warehouse
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
//                   <TableHead className="p-3 rounded-l-lg">Warehouse</TableHead>
//                   <TableHead className="p-3">Address Line 1</TableHead>
//                   <TableHead className="p-3">Address Line 2</TableHead>
//                   <TableHead className="p-3">City</TableHead>
//                   <TableHead className="p-3">Post Code</TableHead>
//                   <TableHead className="p-3">Default</TableHead>
//                   <TableHead className="p-3 rounded-r-lg">Edit</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {/* Static example row; you can map through your data here */}
//                 {warehouse.map((item) => (
//                   <TableRow key={item.id} className="border-b">
//                     <TableCell className="py-3 font-medium">{item.warehouse}</TableCell>
//                     <TableCell className="py-3">{item.adress1}</TableCell>
//                     <TableCell className="py-3">{item.adress2}</TableCell>
//                     <TableCell className="py-3">{item.city}</TableCell>
//                     <TableCell className="py-3">{item.postCode}</TableCell>
//                     <TableCell className="py-3">{item.default}</TableCell>
//                     <TableCell className="py-3">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => handleEditWarehouse(item.id)}
//                         className="text-[#3D8BFF] hover:text-[#3D8BFF] hover:bg-blue-50 underline"
//                       >
//                         Edit/View
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export default ExistingWarehouse;

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/shared/header"
import { Button } from "@/components/ui/button"
import { CustomSearch } from "@/components/shared/custom-search"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { useGetWarehouses, useDeleteWarehouse } from "../core/hooks/useWarehouse"

export function ExistingWarehouse() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const { data: warehousesData, isLoading, error } = useGetWarehouses({ search: searchQuery })
  const deleteWarehouseMutation = useDeleteWarehouse()
console.log(warehousesData, "warehousesData");

  const handleAddWarehouse = () => {
    navigate("/admin/settings/warehouse/add-warehouse")
  }

  const handleEditWarehouse = (warehouseId: string) => {
    navigate(`/admin/settings/warehouse/edit-warehouse-details/${warehouseId}`)
  }

  const handleDeleteWarehouse = (warehouseId: string) => {
    if (window.confirm("Are you sure you want to delete this warehouse?")) {
      deleteWarehouseMutation.mutate(warehouseId)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error loading warehouses. Please try again.</p>
      </div>
    )
  }

  return (
    <div>
      <Header title="Warehouse">
        <div className="flex items-center justify-end h-16 px-6 gap-6">
          <CustomSearch
            className="w-[25rem]"
            onClick={handleSearch}
            placeholder="Search by name/Master SKU/Channel SKU"
          />
          <div className="flex items-center gap-4">
            <Button
              variant="default"
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              onClick={handleAddWarehouse}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </div>
        </div>
      </Header>
      <div className="mt-6">
        <Card className="bg-white rounded-2xl border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Existing Warehouse</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                  <TableHead className="p-3 rounded-l-lg">Warehouse</TableHead>
                  <TableHead className="p-3">Address Line 1</TableHead>
                  <TableHead className="p-3">Address Line 2</TableHead>
                  <TableHead className="p-3">City</TableHead>
                  <TableHead className="p-3">Post Code</TableHead>
                  <TableHead className="p-3">Default</TableHead>
                  <TableHead className="p-3 rounded-r-lg">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {warehousesData?.data?.map((warehouse) => (
                  <TableRow key={warehouse._id} className="border-b">
                    <TableCell className="py-3 font-medium">{warehouse.warehouseName}</TableCell>
                    <TableCell className="py-3">{warehouse.address}</TableCell>
                    <TableCell className="py-3">{warehouse.address2 || "-"}</TableCell>
                    <TableCell className="py-3">{warehouse.city}</TableCell>
                    <TableCell className="py-3">{warehouse.postcode}</TableCell>
                    <TableCell className="py-3">
                      {warehouse.warehouseType === "Default Warehouse" ? "Yes" : "No"}
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditWarehouse(warehouse._id)}
                          className="text-[#3D8BFF] hover:text-[#3D8BFF] hover:bg-blue-50 underline"
                        >
                          Edit/View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteWarehouse(warehouse.id)}
                          disabled={deleteWarehouseMutation.isPending}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {(!warehousesData?.data || warehousesData.data.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No warehouses found. Create your first warehouse to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ExistingWarehouse
