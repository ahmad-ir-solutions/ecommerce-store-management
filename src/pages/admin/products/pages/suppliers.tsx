import { Header } from "@/components/shared/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import {
  // useDeleteSupplier, 
  useGetSuppliers
} from '../core/hooks/useSupplier'
import { useState } from 'react'
import { ProductQueryParams } from '../core/_modals'
import { PaginationControls } from '@/components/shared/PaginationControls'
import { Button } from '@/components/ui/button'

export function SuppliersPage() {
  // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  // const [supplierToDelete, setSupplierToDelete] = useState<string | null>(null)
  const [queryParams, setQueryParams] = useState<ProductQueryParams>({
    sortBy: "createdAt",
    sortOrder: "desc",
    limit: 10,
    page: 1,
  })
  const { data: suppliersResponse, isLoading, error } = useGetSuppliers(queryParams)
  // const deleteSupplierMutation = useDeleteSupplier()

  // const handleDeleteClick = (supplierId: string) => {
  //   setSupplierToDelete(supplierId)
  //   setDeleteDialogOpen(true)
  // }

  // const handleDeleteConfirm = () => {
  //   if (supplierToDelete) {
  //     deleteSupplierMutation.mutate(supplierToDelete)
  //     setDeleteDialogOpen(false)
  //     setSupplierToDelete(null)
  //   }
  // }

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

  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page,
    }))
  }

  const totalPages = suppliersResponse?.total ? Math.ceil(suppliersResponse.total / (queryParams.limit || 10)) : 0
  const currentPage = queryParams.page || 1

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
            <CardTitle className="text-lg font-medium">Existing Suppliers</CardTitle>
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
                    {/* <TableHead className="p-3">Ammount of products</TableHead>
                    <TableHead className="p-3">Supplier Carton Quantity</TableHead> */}
                    <TableHead className="p-3 rounded-tr-lg rounded-br-lg">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.map((supplier) => (
                    <TableRow key={supplier._id} className="text-[#11263C] text-sm border-none">
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
                            View/Edit Supplier
                          </Link>
                          {/* <Button
                            variant="ghost"
                            size="lg"
                            onClick={() => handleDeleteClick(supplier._id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button> */}
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
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="max-w-24"
          >
            First
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="max-w-24"
          >
            Previous
          </Button>
          <span className="text-sm border border-[#BBC2CB] rounded-md p-1 px-5 max-w-24">{currentPage}</span>
          <Button
            variant="primary"
            className="max-w-24"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage >= totalPages}
            className="max-w-24"
          >
            Last
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages} - Items {(currentPage - 1) * (queryParams.limit || 10) + 1} to{" "}
          {Math.min(currentPage * (queryParams.limit || 10), suppliersResponse?.total ?? 0)} of {suppliersResponse?.total ?? 0}
        </div>
      </div>

      {/* <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
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
      </AlertDialog> */}
    </div>
  )
}

export default SuppliersPage
