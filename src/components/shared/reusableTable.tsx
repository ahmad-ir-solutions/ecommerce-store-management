import type React from "react"

import { useMemo, useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { CustomPagination } from "@/components/shared/custom-pagination"

interface Column<T> {
  key: keyof T | string
  title: string
  render?: (
    row: T,
    selectedRows?: string[],
    toggleSelectRow?: (id: string) => void,
    toggleSelectAll?: () => void,
    isAllSelected?: boolean,
  ) => React.ReactNode
  width?: string
}

interface ReusableTableProps<T> {
  title?: string
  data: T[]
  columns: Column<T>[]
  searchTerm?: string
  itemsPerPage?: number
  isLoading?: boolean
  className?: string
}

export function ReusableTable<T extends { _id: string }>({
  title,
  data,
  columns,
  searchTerm = "",
  itemsPerPage = 2,
  isLoading = false,
  className,
}: ReusableTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  // Clear selected rows when page changes
  useEffect(() => {
    setSelectedRows([])
  }, [currentPage])

  const filteredData = useMemo(() => {
    if (!searchTerm) return data
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.key as keyof T]
        return typeof val === "string" && val.toLowerCase().includes(searchTerm.toLowerCase())
      }),
    )
  }, [data, searchTerm, columns])

  const totalItems = filteredData?.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData?.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage, itemsPerPage])

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) => (prev?.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    const currentIds = currentPageData.map((r) => r._id)
    const currentPageSelectedCount = currentIds?.filter((id) => selectedRows.includes(id)).length

    if (currentPageSelectedCount === currentPageData?.length && currentPageData?.length > 0) {
      // Unselect all on current page
      setSelectedRows((prev) => prev.filter((id) => !currentIds.includes(id)))
    } else {
      // Select all on current page
      setSelectedRows((prev) => [...new Set([...prev, ...currentIds])])
    }
  }

  const currentPageSelectedCount = currentPageData?.filter((row) => selectedRows?.includes(row._id)).length
  const isAllCurrentPageSelected = currentPageSelectedCount === currentPageData?.length && currentPageData?.length > 0

  return (
    <div className={`mt-6 bg-white rounded-2xl border-none shadow-none ${className}`}>
      <Card className="border-none shadow-none">
        <CardHeader className="flex justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                    {columns.map((col, index) => (
                      <TableHead
                        key={col.key as string}
                        className={`p-3 whitespace-nowrap ${index === 0 ? "rounded-l-lg" : ""} ${index === columns.length - 1 ? "rounded-r-lg" : ""}`}
                        style={{ width: col.width, minWidth: col.width || "120px" }}
                      >
                        {col.title}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPageData?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="text-center py-8">
                        No data found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentPageData?.map((row) => (
                      <TableRow key={row._id} className="border-b-gray-100">
                        {columns.map((col) => (
                          <TableCell
                            key={col.key as string}
                            className="py-3 whitespace-nowrap"
                            style={{ minWidth: col.width || "120px" }}
                          >
                            {col.render
                              ? col.render(
                                  row,
                                  selectedRows,
                                  toggleSelectRow,
                                  toggleSelectAll,
                                  isAllCurrentPageSelected,
                                )
                              : String(row[col.key as keyof T])}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}
