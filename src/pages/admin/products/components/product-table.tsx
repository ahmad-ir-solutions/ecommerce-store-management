import { useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, Loader2 } from "lucide-react"
import { useProductColumns } from "./product-column"
import { SavedFilters } from "./saved-filter"
import { CustomSelect } from "@/components/shared/custom-select"
import { useProductsStore } from "@/store/admin/products-store"
import { ComparisonOperatorFilter } from "./comparison-operator-filter"
import { DateRangePickerFilter } from "@/components/shared/date-range-picker-filter"
import { CheckboxListFilter } from "@/components/shared/checkbox-list-filter"
import { SaveFilterModal } from "./modals/save-filter-modal"
import { PaginationControls } from "@/components/shared/PaginationControls"
import { AddProductModal } from "./modals/add-product-modal"
import { ProductQueryParams } from '../core/_modals'
import { useDeleteProduct, useGetProducts } from '../core/hooks/useProduct'
import { DeleteConfirmationModal } from './modals/delete-confirmation-modal'
import { ArchiveConfirmationModal } from './modals/archive-confirmation-modal'

interface ProductTableProps {
  isAddProductModalOpen: boolean
  setIsAddProductModalOpen: (isOpen: boolean) => void
  queryParams: ProductQueryParams
  setQueryParams: React.Dispatch<React.SetStateAction<ProductQueryParams>>
}

export default function ProductTable({
  isAddProductModalOpen,
  setIsAddProductModalOpen,
  queryParams,
  setQueryParams,
}: ProductTableProps) {
  const { applySavedFilter } = useProductsStore()
  const { data, isLoading, isError } = useGetProducts(queryParams)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const deleteProduct = useDeleteProduct()

  const columns = useProductColumns()
  const [columnFilters, setColumnFilters] = useState<any[]>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)

  // Listen for delete events from the column actions
  useState(() => {
    const handleOpenDeleteModal = (event: CustomEvent) => {
      setDeleteId(event.detail._id)
    }

    window.addEventListener("open-delete-modal", handleOpenDeleteModal as EventListener)

    return () => {
      window.removeEventListener("open-delete-modal", handleOpenDeleteModal as EventListener)
    }
  })

  const table = useReactTable({
    data: data?.productsWithOrderCOunt || [],
    columns,
    state: {
      columnFilters,
      globalFilter,
    },
    enableRowSelection: true,
    enableSorting: true,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const columnFilterTypes: Record<string, string> = {
    type: "checkbox-list",
    inventory: "comparison-operator",
    price: "comparison-operator",
    rrp: "comparison-operator",
    taxClass: "comparison-operator",
    weight: "comparison-operator",
    length: "comparison-operator",
    width: "comparison-operator",
    height: "comparison-operator",
    warehouse: "checkbox-list",
    brand: "checkbox-list",
  }

  // Define options for dropdown filters
  const filterOptions = {
    type: ["All", "Simple", "Variation", "Kit"],
    warehouse: ["Default Warehouse", "Secondary Warehouse", "Distribution Center"],
    brand: ["Apple", "Samsung", "Google", "Sony", "LG"],
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  const handleSelectChange = (value: string) => {
    applySavedFilter(value)
  }

  const handleSaveFilters = () => {
    setIsSaveModalOpen(true)
  }

  const handleResetFilters = () => {
    setColumnFilters([]) // Clear column filters
    setGlobalFilter("") // Clear global filter
  }

  const handleSort = (field: string) => {
    setQueryParams((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === "asc" ? "desc" : "asc",
    }))
  }

  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page,
    }))
  }

  const confirmDelete = (id: string) => {
    setDeleteId(id)
  }

  const handleDelete = () => {
    if (deleteId) {
      deleteProduct.mutate(deleteId, {
        onSuccess: () => {
          setDeleteId(null)
        },
      })
    }
  }

    const handleArchiveProduct = (product: any) => {
    // Here you would call your API to archive the product
    console.log("Archiving product:", product)
    // After successful archiving, refetch the data
    // queryClient.invalidateQueries(["inventory"])
  }

  const totalPages = data?.total ? Math.ceil(data.total / (queryParams.limit || 10)) : 0
  const currentPage = queryParams.page || 1

  if (isError) {
    return <div className="text-center py-10">No Products Found</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-white py-4 px-6 rounded-2xl">
        <div className="flex items-center space-x-2">
          <CustomSelect
            placeholder="Please select"
            options={[{ id: "export", label: "Export", value: "export" }]}
            className="w-[200px]"
            onChange={handleSelectChange}
          />
          <Button variant="default" size="icon" className="bg-blue-500 hover:bg-blue-600">
            <Check className="h-4 w-4 text-white" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <SavedFilters />
          <Button variant="outline" onClick={handleSaveFilters}>
            Save Filters
          </Button>
          <Button variant="outline" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white py-3 px-6 rounded-2xl">
        <Table>
          <TableHeader className="">
            <TableRow className="border-none">
              {table.getFlatHeaders().map((header) => (
                <TableHead key={header.id} className="whitespace-nowrap leading-0">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
            <TableRow className="border-gray-400">
              {table.getFlatHeaders().map((header) => (
                <TableHead key={`filter-${header.id}`}>
                  {header.column.getCanFilter() ? (
                    <div>
                      {/* Render different filter types based on column */}
                      {columnFilterTypes[header.id] === "checkbox-list" ? (
                        <CheckboxListFilter
                          column={header.column}
                          options={filterOptions[header.id as keyof typeof filterOptions] || []}
                        />
                      ) : columnFilterTypes[header.id] === "comparison-operator" ? (
                        <ComparisonOperatorFilter column={header.column} />
                      ) : columnFilterTypes[header.id] === "date-range" ? (
                        <DateRangePickerFilter column={header.column} />
                      ) : (
                        <Input
                          placeholder={`Filter ${header.column.columnDef.header?.toString() || ""}`}
                          value={(header.column.getFilterValue() as string) ?? ""}
                          onChange={(e) => header.column.setFilterValue(e.target.value)}
                          className="h-8 w-full border-gray-300"
                        />
                      )}
                    </div>
                  ) : null}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="border-gray-200">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
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
          {Math.min(currentPage * (queryParams.limit || 10), data?.total ?? 0)} of {data?.total ?? 0}
        </div>
      </div>

      <SaveFilterModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        currentFilters={{ columnFilters, globalFilter }}
      />
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
      />
      <DeleteConfirmationModal onConfirm={handleDelete} onCancel={() => console.log("Delete cancelled")} />
      {/* <ArchiveConfirmationModal onConfirm={handleArchiveProduct} onCancel={() => console.log("Archive cancelled")} /> */}
    
    </div>
  )
}
