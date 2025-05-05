import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "react-router-dom"
import { CustomerOverview } from "./customer-overview"
import { CustomerBasicDetails } from "./customer-basic-details"
import { fetchCustomerById } from "../core/dummy"
import { useCustomerStore } from "@/store/admin/customer-store"
import { CustomerAddresses } from "./customer-adresses"
import { Header } from "@/components/shared/header"

export function CustomerDetails() {
  const [activeTab, setActiveTab] = useState("overview")
  const { customerId } = useParams<{ customerId: string }>()

  const { data: customer, isLoading } = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => fetchCustomerById(customerId as string),
    enabled: !!customerId,
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
    return <div>Loading...</div>
  }

  if (!customer) {
    return <div>Customer not found</div>
  }

  return (
    <div>
      <Header title="Customers" />
      <div className="mt-4">
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="rounded-xl bg-white px-4 py-2 shadow-none">
              <TabsList className="justify-start rounded-none">
                <TabsTrigger
                  value="overview"
                  className="py-6 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="basic-details"
                  className="py-6 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none"
                >
                  Basic Details
                </TabsTrigger>
                <TabsTrigger
                  value="addresses"
                  className="py-6 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none"
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
      </div>
    </div>
  )
}
