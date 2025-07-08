import { Header } from "@/components/shared/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Loader2, Trash2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import {
  useDeleteSupplier, 
  useGetSuppliers
} from '../core/hooks/useSupplier'
import { useCallback, useState } from 'react'
import { ProductQueryParams } from '../core/_modals'
import { Button } from '@/components/ui/button'
import { CustomPagination } from "@/components/shared/custom-pagination"
import { CustomSearch } from "@/components/shared/custom-search"
import { debounce } from 'lodash'

export function SuppliersPage() {
  const [queryParams, setQueryParams] = useState<ProductQueryParams>({
    sortBy: "createdAt",
    sortOrder: "desc",
    search: "",
    limit: 8,
    page: 1,
  })
  const { data: suppliersResponse, isLoading, } = useGetSuppliers(queryParams)
  const deleteSupplierMutation = useDeleteSupplier()
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setQueryParams((prev) => ({
        ...prev,
        search: query,
        page: 1,
      }))
    }, 500),
    []
  )
  const handleDeleteSupplier = (supplierId: string) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      deleteSupplierMutation.mutate(supplierId)
    }
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    debouncedSearch(value)
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
         <Header title="Suppliers">
        <div className="flex items-center justify-end h-16 px-6 gap-6">
          <CustomSearch 
            placeholder="Search suppliers..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-[25rem]"
          />
          <Button
            variant="default"
            size="lg"
            className="bg-[#024AFE] hover:bg-[#0228fe] text-white rounded-lg"
            onClick={() => navigate("/admin/products/add-supplier")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </div>
      </Header>

      <div className="mt-6">
        <Card className="bg-white rounded-2xl border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Existing Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                    <TableHead className="p-3 rounded-tl-lg rounded-bl-lg">Name</TableHead>
                    <TableHead className="p-3">Email</TableHead>
                    <TableHead className="p-3">City</TableHead>
                    <TableHead className="p-3">Country</TableHead>
                    <TableHead className="p-3">Currency</TableHead>
                    <TableHead className="p-3 rounded-tr-lg rounded-br-lg">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                      <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        <div className="flex justify-center items-center h-64">
                          <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : suppliers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        <p className="text-gray-500">No suppliers found. Add your first supplier to get started.</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                  suppliers.map((supplier) => (
                    <TableRow key={supplier._id} className="text-[#11263C] text-sm border-b border-gray-200">
                      <TableCell className="p-3 text-start font-medium">{supplier.supplierName}</TableCell>
                      <TableCell className="p-3 text-start">{supplier.supplierEmailAddress}</TableCell>
                      <TableCell className="p-3 text-start">{supplier.city}</TableCell>
                      <TableCell className="p-3 text-start">{supplier.country}</TableCell>
                      <TableCell className="p-3 text-start">{supplier.supplierCurrency}</TableCell>
                      <TableCell className="p-3 text-start">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/products/supplier-details/${supplier._id}`}
                            className="text-[#024AFE] hover:text-[#0228fe] underline flex items-center gap-1"
                          >
                            View/Edit Supplier
                          </Link>
                          <Button
                            variant="ghost"
                            size="lg"
                            onClick={() => handleDeleteSupplier(supplier._id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )))}
                </TableBody>
              </Table>
          </CardContent>
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={suppliersResponse?.total || 0}
              itemsPerPage={queryParams.limit || 10}
              onPageChange={handlePageChange}
            />
        </Card>
      </div>
    </div>
  )
}

export default SuppliersPage
