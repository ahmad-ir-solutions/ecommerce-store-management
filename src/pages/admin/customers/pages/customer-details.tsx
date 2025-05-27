import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from 'react-router-dom'
import { useCustomer } from '../core/hooks/useCustomer'
import { CustomerOverview } from '../components/customer-overview'
import { CustomerBasicDetails } from '../components/customer-basic-details'
import { CustomerAddresses } from '../components/customer-adresses'
import { Header } from '@/components/shared/header'
import { Loader2 } from 'lucide-react'

export function CustomerDetails() {
  const [activeTab, setActiveTab] = useState("overview")
  const params = useParams()
  const customerId = params.customerId as string
  const [addressFormFocus, setAddressFormFocus] = useState<string | null>(null)

  const {
    customer,
    isLoading,
    error,
    updateBasicDetails,
    updateShippingAddress,
    updateBillingAddress,
    addTag,
    removeTag,
    updateNotes,
    // deleteCustomer,
  } = useCustomer(customerId || "")

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
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }


  if (error) {
    return <div>Error loading customer: {(error as Error).message}</div>
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
              <CustomerOverview
                customer={customer}
                setActiveTab={setActiveTab}
                onAddTag={addTag}
                onRemoveTag={removeTag}
                onUpdateNotes={updateNotes}
                setAddressFormFocus={setAddressFormFocus}
              />
            </TabsContent>

            <TabsContent value="basic-details" className="mt-4">
              <CustomerBasicDetails customer={customer} onUpdate={updateBasicDetails} />
            </TabsContent>

            <TabsContent value="addresses" className="mt-4">
              <CustomerAddresses
                customer={customer}
                onUpdateShippingAddress={updateShippingAddress}
                onUpdateBillingAddress={updateBillingAddress}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
