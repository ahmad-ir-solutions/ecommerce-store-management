import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Filter, Settings, RotateCw, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CustomersTable } from "../components/customers-table"
import type { CustomerQueryParams } from "../core/_modals"
import { Header } from "@/components/shared/header"
import { useGetCustomers } from '../core/hooks/useCustomer'

export function Customers() {
  const [searchText, setSearchText] = useState("")
  const [queryParams, setQueryParams] = useState<CustomerQueryParams>({
    limit: 10,
    page: 1,
  })

  const { data, isLoading, error } = useGetCustomers(queryParams)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setQueryParams((prev) => ({
      ...prev,
      search: searchText,
      page: 1,
    }))
  }

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
          <div className="relative w-full sm:w-72">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search customers..."
                  className="pl-8 pr-4 py-2 border-gray-300 rounded-md w-full"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </form>
          </div>
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
