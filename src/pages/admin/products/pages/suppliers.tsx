// import { Header } from "@/components/shared/header";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"; // ✅ Correct Table import
// import { Plus } from "lucide-react"; // ✅ Only importing the icon, not the table
// import { Link } from "react-router-dom";

// export function SuppliersPage() {

// const supplierId = 12342345645; // This should be replaced with the actual supplier ID you want to use
//   return (
//     <div>
//       <Header title="Products">
//         <Link to="/admin/products/add-supplier" className="rounded-xl flex items-center bg-blue-500 px-3 py-2.5 text-white font-normal hover:bg-blue-600">
//           <Plus className="w-4 h-4 mr-2" />
//           Add Supplier
//         </Link>
//       </Header>

//       <div className="mt-6">
//         <Card className="bg-white rounded-2xl border-none shadow-none">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-lg font-medium">
//             Existing Suppliers
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
//                   <TableHead className="p-3 rounded-tl-lg rounded-bl-lg">Name</TableHead>
//                   <TableHead className="p-3">Amount of products</TableHead>
//                   <TableHead className="p-3">Supplier Carton Quantity</TableHead>
//                   <TableHead className="p-3 rounded-tr-lg rounded-br-lg"></TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {/* Static example row; you can map through your data here */}
//                 <TableRow className="text-[#11263C] text-sm">
//                   <TableCell className="p-3 text-start">Designer Collection</TableCell>
//                   <TableCell className="p-3 text-start">954</TableCell>
//                   <TableCell className="p-3 text-start">Is Default</TableCell>
//                   <TableCell className="text-start text-[#3D8BFF] p-3 underline hover:text-[#3d4aff]">
//                     <Link to={`/admin/products/supplier-details/${supplierId}`}>View/Edit Supplier</Link>
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// export default SuppliersPage;




import { Header } from "@/components/shared/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeleteSupplier, useGetSuppliers } from '../core/hooks/useSupplier'

export function SuppliersPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [supplierToDelete, setSupplierToDelete] = useState<string | null>(null)

  const { data: suppliersResponse, isLoading, error } = useGetSuppliers()
  const deleteSupplierMutation = useDeleteSupplier()

  const handleDeleteClick = (supplierId: string) => {
    setSupplierToDelete(supplierId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (supplierToDelete) {
      deleteSupplierMutation.mutate(supplierToDelete)
      setDeleteDialogOpen(false)
      setSupplierToDelete(null)
    }
  }

  if (isLoading) {
    return (
      <div>
        <Header title="Products">
          <Link
            to="/admin/products/add-supplier"
            className="rounded-xl flex items-center bg-blue-500 px-3 py-2.5 text-white font-normal hover:bg-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Supplier
          </Link>
        </Header>
        <div className="mt-6 flex justify-center">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Header title="Products">
          <Link
            to="/admin/products/add-supplier"
            className="rounded-xl flex items-center bg-blue-500 px-3 py-2.5 text-white font-normal hover:bg-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Supplier
          </Link>
        </Header>
        <div className="mt-6 flex justify-center">
          <p className="text-red-500">Error loading suppliers. Please try again.</p>
        </div>
      </div>
    )
  }

  const suppliers = suppliersResponse?.data || []

  return (
    <div>
      <Header title="Products">
        <Link
          to="/admin/products/add-supplier"
          className="rounded-xl flex items-center bg-blue-500 px-3 py-2.5 text-white font-normal hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Supplier
        </Link>
      </Header>

      <div className="mt-6">
        <Card className="bg-white rounded-2xl border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Existing Suppliers ({suppliers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {suppliers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No suppliers found. Add your first supplier to get started.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                    <TableHead className="p-3 rounded-tl-lg rounded-bl-lg">Name</TableHead>
                    <TableHead className="p-3">City</TableHead>
                    <TableHead className="p-3">Country</TableHead>
                    <TableHead className="p-3">Currency</TableHead>
                    <TableHead className="p-3 rounded-tr-lg rounded-br-lg">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.map((supplier) => (
                    <TableRow key={supplier._id} className="text-[#11263C] text-sm">
                      <TableCell className="p-3 text-start font-medium">{supplier.supplierName}</TableCell>
                      <TableCell className="p-3 text-start">{supplier.city}</TableCell>
                      <TableCell className="p-3 text-start">{supplier.country}</TableCell>
                      <TableCell className="p-3 text-start">{supplier.supplierCurrency}</TableCell>
                      <TableCell className="p-3 text-start">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/products/supplier-details/${supplier._id}`}
                            className="text-[#3D8BFF] hover:text-[#3d4aff] underline flex items-center gap-1"
                          >
                            <Edit className="w-3 h-3" />
                            Edit
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(supplier._id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the supplier and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
              disabled={deleteSupplierMutation.isPending}
            >
              {deleteSupplierMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default SuppliersPage
