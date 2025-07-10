import { Card, CardContent} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGetConnectedAccountsBySellerId } from "@/pages/seller/shops/core/hooks/useConnectAccount"
import { useParams } from "react-router-dom"
import {
  Link2,
  Store,
  ShoppingCart,
  Globe,
  CheckCircle,
  XCircle,
  Calendar,
  Loader2,
  AlertCircle,
} from "lucide-react"

interface ConnectedAccount {
  _id: string
  userId: string
  integrationType: string
  profileName: string
  platformType: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  isAccountConnected: boolean
}

export function SellerConnectedAccounts() {
  const { sellerId } = useParams()
  const { data: connectedAccounts, isLoading, error } = useGetConnectedAccountsBySellerId(sellerId || "")

  const getIntegrationIcon = (integrationType: string) => {
    switch (integrationType.toLowerCase()) {
      case "woocommerce":
        return <ShoppingCart className="h-5 w-5" />
      case "shopify":
        return <Store className="h-5 w-5" />
      case "amazon":
        return <Globe className="h-5 w-5" />
      default:
        return <Link2 className="h-5 w-5" />
    }
  }

  const getPlatformColor = (platformType: string) => {
    switch (platformType.toLowerCase()) {
      case "webstore":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "marketplace":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "social":
        return "bg-pink-100 text-pink-800 border-pink-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <Card className="bg-white border-0 shadow-none rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading connected accounts...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-white border-0 shadow-none rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12 text-red-600">
            <AlertCircle className="h-8 w-8" />
            <span className="ml-2">Failed to load connected accounts</span>
          </div>
        </CardContent>
      </Card>   
    )
  }

  return (
    <Card className="bg-white border-0 shadow-none rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        {!connectedAccounts || connectedAccounts.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Link2 className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Connected Accounts</h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              Connect your first account to start syncing your products and orders across platforms.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {connectedAccounts.map((account: ConnectedAccount) => (
              <div
                key={account._id}
                className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-white to-blue-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Integration Icon */}
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      {getIntegrationIcon(account.integrationType)}
                    </div>

                    {/* Account Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{account.profileName}</h3>
                        <Badge className={getPlatformColor(account.platformType)}>{account.platformType}</Badge>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{account.integrationType} Integration</p>

                      {/* Status Indicators */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          {account.isAccountConnected ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                          <span
                            className={`text-sm font-medium ${account.isAccountConnected ? "text-green-700" : "text-red-700"
                              }`}
                          >
                            {account.isAccountConnected ? "Connected" : "Disconnected"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${account.isActive ? "bg-green-500" : "bg-gray-400"}`}
                          />
                          <span className="text-sm text-gray-600">{account.isActive ? "Active" : "Inactive"}</span>
                        </div>
                      </div>

                      {/* Timestamps */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>Connected: {formatDate(account.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>Updated: {formatDate(account.updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account ID (for reference) */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 font-mono">Account ID: {account._id}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
