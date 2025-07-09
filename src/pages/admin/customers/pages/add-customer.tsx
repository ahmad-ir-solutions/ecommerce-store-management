import { Button } from "@/components/ui/button"
import { Header } from "@/components/shared/header"
import { CustomSearch } from "@/components/shared/custom-search"
import { Plus } from "lucide-react"
import { useState } from "react"

export function AddCustomerPage() {
    const [searchText, setSearchText] = useState("")    

    const handleSearch = (query: string) => {
        console.log(query)
    }

    const handleCreateCustomer = () => {    
        console.log("create customer")
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
          />
          <Button
            variant="default"
            size="lg"
            className="bg-[#024AFE] hover:bg-[#1b02fe] text-white rounded-lg"
            onClick={handleCreateCustomer}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Customer
          </Button>
        </div>
      </Header>

      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <h2 className="text-lg font-medium">Customer Details</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCustomerPage;