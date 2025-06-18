import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Filter, Settings, RotateCw } from "lucide-react"
import { CustomersTable } from "../components/customers-table"
import type { CustomerQueryParams } from "../core/_modals"
import { Header } from "@/components/shared/header"
import { useGetCustomers } from '../core/hooks/useCustomer'
import { CustomSearch } from "@/components/shared/custom-search"
import { debounce } from 'lodash'

export function Customers() {
  const [searchText, setSearchText] = useState("")
  const [queryParams, setQueryParams] = useState<CustomerQueryParams>({
    limit: 10,
    page: 1,
  })

  const { data, isLoading, error } = useGetCustomers(queryParams)

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

  // const handleCreateCustomer = () => {
  //   navigate("/admin/customers/new")
  // }

  const handleRefresh = () => {
    // Refetch the current data
    setQueryParams({ ...queryParams })
  }

  if (error) {
    return <div className="p-8">Error loading customers: {(error as Error).message}</div>
  }

  return (
    <div>
      <Header title="Customers">
        <div className="flex items-center justify-end h-16 px-6 gap-6">
          <CustomSearch 
            placeholder="Search for customers name"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
              handleSearch(e.target.value)
            }}
            onEnter={handleSearch}
            className="w-[25rem]"
          />
          {/* <Button
            variant="default"
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            onClick={handleCreateCustomer}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Customer
          </Button> */}
        </div>
      </Header>

      <div className="mt-6">
        <div className="space-y-4 bg-white rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="filter" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="filter" size="sm" className="h-9" onClick={handleRefresh}>
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button variant="filter" size="sm" className="h-9">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <CustomersTable
            customers={data?.orders || []}
            isLoading={isLoading}
            onPageChange={(page) => setQueryParams({ ...queryParams, page })}
            totalPages={Math.ceil((data?.total || 0) / (queryParams.limit || 10))}
            currentPage={queryParams.page || 1}
          />
        </div>
      </div>
    </div>
  )
}
