import { useState, useCallback } from "react"
import type { SellerQueryParams } from "../core/_modals"
import { Header } from "@/components/shared/header"
import { useGetAllSellers } from '../core/hooks/useSeller'
import { CustomSearch } from "@/components/shared/custom-search"
import { debounce } from 'lodash'
import { SellersTable } from "../components/sellers-table"

export function Sellers() {
  const [searchText, setSearchText] = useState("")
  const [queryParams, setQueryParams] = useState<SellerQueryParams>({
    sortBy: "createdAt",
    sortOrder: "desc",
    search: "",
    limit: 10,
    page: 1,
    role: "seller",
  })    

  const { data, isLoading, error } = useGetAllSellers(queryParams)

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
 
  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page,
    }))
  }

  const totalPages = data?.total ? Math.ceil(data.total / (queryParams.limit || 10)) : 0
  const currentPage = queryParams.page || 1

  return (
    <div>
      <Header title="Sellers">
        <div className="flex items-center justify-end h-16 px-6 gap-6">
          <CustomSearch 
            placeholder="Search for sellers name"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
              handleSearch(e.target.value)
            }}
            onEnter={handleSearch}
          />
          {/* <Button
            variant="default"
            size="lg"
            className="bg-[#024AFE] hover:bg-[#1b02fe] text-white rounded-lg"
            onClick={handleCreateSeller}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Seller
          </Button> */}
        </div>
      </Header>

      <div className="mt-6">
      {/* {searchText !== "" && data?.data && data?.data?.length === 0 && (
          <div className="mt-6">
            <Card className="bg-white rounded-2xl border-none shadow-none">
              <CardContent className="flex justify-center items-center h-64">
                <p className="text-gray-500">No sellers found</p>
              </CardContent>
            </Card>
          </div>
        )} */}
          <SellersTable
            sellers={data?.data|| []}
            isLoading={isLoading}
            onPageChange={handlePageChange}
            totalItems={data?.total || 0}
            totalPages={totalPages}
            itemsPerPage={queryParams.limit || 10}
            currentPage={currentPage}
            error={error}
            search={searchText}
            title="Existing Sellers"
          />
      </div>
    </div>
  )
} 

export default Sellers;