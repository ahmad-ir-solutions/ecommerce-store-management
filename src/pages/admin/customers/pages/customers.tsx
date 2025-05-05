import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Filter, Settings, RotateCw } from "lucide-react"
import { fetchCustomers } from "../core/dummy"
import { CustomersTable } from "../components/customers-table"

export function Customers() {
  const [filterText, setFilterText] = useState("")

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  })

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(filterText.toLowerCase()) ||
      customer.reference.toLowerCase().includes(filterText.toLowerCase()),
  )

  return (
    <div className="space-y-4 bg-white rounded-2xl p-5">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-72">
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="filter" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="filter" size="sm" className="h-9">
            <RotateCw  className="h-4 w-4"/>
          </Button>
          <Button variant="filter" size="sm" className="h-9">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CustomersTable customers={filteredCustomers} isLoading={isLoading} />
    </div>
  )
}
