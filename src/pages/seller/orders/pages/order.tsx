import { useState, useCallback } from "react"
import { CustomSearch } from "@/components/shared/custom-search"
import { Header } from "@/components/shared/header"
import { debounce } from "lodash"
import type { ProductQueryParams } from "@/pages/admin/products/core/_modals"
import { useGetWooCommerceOrders } from "../core/hooks/useWoocommerceOrders"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlatformOrdersTab } from "../components/platform-orders-tab"
import { FulfilmentOrdersTab } from "../components/fulfilment-orders-tab"

export function SellerOrdersPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [activeTab, setActiveTab] = useState("platform")
    const [queryParams, setQueryParams] = useState<ProductQueryParams>({
        sortBy: "createdAt",
        sortOrder: "desc",
    })

    const {
        data: woocommerceOrdersResponseArray,
        isLoading: isOrdersLoading,
        refetch,
    } = useGetWooCommerceOrders(queryParams)

    // Flatten all orders and attach siteUrl to each
    const woocommerceOrders =
        woocommerceOrdersResponseArray?.flatMap((site: any) =>
            (site.orders || []).map((order: any) => ({
                ...order,
                siteUrl: site.woocommerceSiteUrl || "",
            })),
        ) || []

    // Debounce search input
    const handleSearch = useCallback(
        debounce((query: string) => {
            setQueryParams((prev) => ({
                ...prev,
                search: query,
            }))
        }, 500),
        [],
    )

    return (
        <div>
            {/* Header */}
            <Header title="Order Management">
                <CustomSearch
                    placeholder="Search by Channel Order ID, customer name, or email"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        handleSearch(e.target.value)
                    }}
                />
            </Header>
            <div className="mt-6 bg-white p-4 rounded-2xl">
                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full gap-0">
                    <TabsList className="grid w-1/2 grid-cols-2">
                        <TabsTrigger
                            value="platform"
                            className={activeTab === "platform" ? "bg-[#024AFE] text-white" : "p-3"}
                        >
                            Platform Orders 
                        </TabsTrigger>
                        <TabsTrigger
                            value="fulfilment"
                            className={activeTab === "fulfilment" ? "bg-[#024AFE] text-white" : "p-3"}
                        >
                            Fulfilment Orders
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="platform">
                        <PlatformOrdersTab orders={woocommerceOrders} isLoading={isOrdersLoading} onRefresh={refetch} />
                    </TabsContent>

                    <TabsContent value="fulfilment">
                        <FulfilmentOrdersTab />
                    </TabsContent>
                </Tabs>
            </div>

        </div>
    )
}

export default SellerOrdersPage
