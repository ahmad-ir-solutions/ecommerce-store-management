import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { CustomerOverview } from "./customer-overview"
import { CustomerBasicDetails } from "./customer-basic-details"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchCustomerById } from "../core/dummy"
import { useCustomerStore } from "@/store/admin/customer-store"
import { CustomerAddresses } from "./customer-adresses"

export function CustomerDetails({ customerId }: { customerId: string }) {
  const [activeTab, setActiveTab] = useState("overview")

  const { data: customer, isLoading } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => fetchCustomerById(customerId),
  })

  // Get the address form focus from the store
  const addressFormFocus = useCustomerStore((state) => state.addressFormFocus)

  // Effect to scroll to the focused form when tab changes to addresses
  useEffect(() => {
    if (activeTab === "addresses" && addressFormFocus) {
      const element = document.getElementById(`${addressFormFocus}-address-form`)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
      }
    }
  }, [activeTab, addressFormFocus])

  if (isLoading) {
    return <CustomerDetailsSkeleton />
  }

  if (!customer) {
    return <div>Customer not found</div>
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border rounded-lg">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="overview"
              className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="basic-details"
              className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Basic Details
            </TabsTrigger>
            <TabsTrigger
              value="addresses"
              className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Addresses
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-4">
          <CustomerOverview customer={customer} setActiveTab={setActiveTab} />
        </TabsContent>

        <TabsContent value="basic-details" className="mt-4">
          <CustomerBasicDetails customer={customer} />
        </TabsContent>

        <TabsContent value="addresses" className="mt-4">
          <CustomerAddresses customer={customer} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CustomerDetailsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="border rounded-lg">
        <div className="flex border-b">
          {["Overview", "Basic Details", "Addresses"].map((tab, i) => (
            <div key={i} className="px-4 py-3">
              <Skeleton className="h-5 w-24" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
