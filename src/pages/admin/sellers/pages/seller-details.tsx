import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from 'react-router-dom'
import { Header } from '@/components/shared/header'
import { Loader2 } from 'lucide-react'
import { ISeller, ISellerModel } from "../core/_modals"
import { SellerBasicInfo } from '../components/seller-basic-details'
import { SellerConnectedAccounts } from '../components/seller-connected-accounts'
import { useGetSellerById } from "../core/hooks/useSeller"
import SellerOrders from "../components/seller-orders"
import { SellersTransactions } from "../components/seller-transactions"

export function SellerDetails() {
  const [activeTab, setActiveTab] = useState("basic-details")
  const params = useParams()
  const sellerId = params.sellerId as string

  const {
    data: seller,
    isLoading,
    error,
    refetch,
  } = useGetSellerById(sellerId)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
      </div>
    )
  }

  return (
    <div>
      <Header title="Sellers" />
      <div className="mt-4">
        {error && <div className="flex justify-center items-center h-64">Error loading seller: {(error as Error).message}</div>}
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="rounded-xl bg-white px-4 py-2 shadow-none">
              <TabsList className="justify-start rounded-none">
                <TabsTrigger
                  value="basic-details"
                  className="py-6 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-[#024AFE] data-[state=active]:text-[#024AFE] data-[state=active]:shadow-none"
                >
                  Basic Details
                </TabsTrigger>
                <TabsTrigger
                  value="connected-accounts"
                  className="py-6 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-[#024AFE] data-[state=active]:text-[#024AFE] data-[state=active]:shadow-none"
                >
                  Connected Accounts
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="py-6 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-[#024AFE] data-[state=active]:text-[#024AFE] data-[state=active]:shadow-none"
                >
                  Orders
                </TabsTrigger>
                <TabsTrigger
                  value="transactions"
                  className="py-6 px-4 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-[#024AFE] data-[state=active]:text-[#024AFE] data-[state=active]:shadow-none"
                >
                  Transactions
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="basic-details" className="mt-4">
                <SellerBasicInfo
                  seller={seller as ISellerModel} 
                  isLoading={isLoading}
                  refetch={refetch}
                />
            </TabsContent>

            <TabsContent value="connected-accounts" className="mt-4">
              <SellerConnectedAccounts />
            </TabsContent>

            <TabsContent value="orders" className="mt-4">
              <SellerOrders seller={seller as unknown as ISeller} />
            </TabsContent>

            <TabsContent value="transactions" className="mt-4">
              <SellersTransactions title="All Transactions" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 

export default SellerDetails