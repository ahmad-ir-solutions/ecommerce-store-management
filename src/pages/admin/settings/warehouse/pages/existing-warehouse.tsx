import { useCallback, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/shared/header"
import { Button } from "@/components/ui/button"
import { CustomSearch } from "@/components/shared/custom-search"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { useGetWarehouses, useDeleteWarehouse } from "../core/hooks/useWarehouse"
import { debounce } from 'lodash'
import { CustomPagination } from "@/components/shared/custom-pagination"

export function ExistingWarehouse() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [queryParams, setQueryParams] = useState({
    search: "",
    limit: 10,
    page: 1,
  })
  const { data: warehousesData, isLoading } = useGetWarehouses(queryParams)
  const deleteWarehouseMutation = useDeleteWarehouse()

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

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    debouncedSearch(value)
  }

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

  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page,
    }))
  }

  const totalPages = warehousesData?.total ? Math.ceil(warehousesData.total / (queryParams.limit || 10)) : 0
  const currentPage = queryParams.page || 1

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  // if (error) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <p className="text-red-500">{(error instanceof Error ? error.message : error) || "Error loading warehouses. Please try again."}</p>
  //     </div>
  //   )
  // }

  return (
    <div>
      <Header title="Warehouses">
        <div className="flex items-center justify-end h-16 px-6 gap-6">
          <CustomSearch 
            placeholder="Search warehouses..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            // className="max-w-[25rem]"
          />
          <Button
            variant="default"
            size="lg"
            className="bg-[#024AFE] hover:bg-[#0228fe] text-white rounded-lg"
            onClick={handleAddWarehouse}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Warehouse
          </Button>
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
                  {/* <TableHead className="p-3">Default</TableHead> */}
                  <TableHead className="p-3 rounded-r-lg">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {warehousesData?.data?.map((warehouse) => (
                  <TableRow key={warehouse._id} className="border-b border-gray-200">
                    <TableCell className="py-3 font-medium">{warehouse.warehouseName}</TableCell>
                    <TableCell className="py-3">{warehouse.address || "-"}</TableCell>
                    <TableCell className="py-3">{warehouse.address2 || "-"}</TableCell>
                    <TableCell className="py-3">{warehouse.city}</TableCell>
                    <TableCell className="py-3">{warehouse.postcode}</TableCell>
                    {/* <TableCell className="py-3">
                      {warehouse.warehouseType === "Default Warehouse" ? "Yes" : "No"}
                    </TableCell> */}
                    <TableCell className="py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditWarehouse(warehouse._id)}
                          className="text-[#024AFE] hover:text-[#0228fe] hover:bg-blue-50 underline"
                        >
                          Edit/View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteWarehouse(warehouse._id)}
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
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={warehousesData?.total || 0}
            itemsPerPage={queryParams.limit}
            onPageChange={handlePageChange}
          />
        </Card>
      </div>
    </div>
  )
}

export default ExistingWarehouse
