import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { CustomersTable } from "./customers-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Clock, Download } from "lucide-react"
import { fetchCustomers } from "../core/dummy"

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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-8"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Clock className="mr-2 h-4 w-4" />
            Today
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <CustomersTable customers={filteredCustomers} isLoading={isLoading} />
    </div>
  )
}
