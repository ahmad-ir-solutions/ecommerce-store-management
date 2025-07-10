import type { ISellerModel } from "../core/_modals"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, Loader2, ShieldCheck } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useUpdateSeller } from "../core/hooks/useSeller"
import { showErrorMessage } from "@/lib/utils/messageUtils"
import { useEffect } from "react"

interface SellerBasicInfoProps {
  seller: ISellerModel
  onEdit?: () => void
  isLoading: boolean
  refetch: () => void
}

export function SellerBasicInfo({ seller, isLoading, refetch }: SellerBasicInfoProps) {
  const { mutate: updateSeller, isPending, isSuccess } = useUpdateSeller()

  const handleUpdateSeller = (isActive: boolean) => {
    try {
      updateSeller({ sellerId: seller._id, sellerData: { isActive } })
      refetch()
    } catch (error: any) {
      showErrorMessage(error.response.data.message)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      refetch()
    }
  }, [isSuccess, refetch])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
      </div>
    )
  }

  // Generate initials from seller name
  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      ?.map((word) => word.charAt(0))
      ?.join("")
      ?.toUpperCase()
      ?.slice(0, 2)
  }

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200"
      case "manager":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "seller":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="bg-white border-0 shadow-none rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        {/* Top Row: Name, Role, Email, ID, Active Switch */}
        <div className="flex items-start gap-4 mb-6 justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
              <AvatarFallback className="bg-transparent text-white font-semibold text-lg">
                {getInitials(seller?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900 truncate">{seller.name}</h3>
                <Badge className={`${getRoleColor(seller.role)} font-medium`}>{seller.role}</Badge>
              </div>
              <p className="text-sm text-gray-600 truncate mb-1">{seller.email}</p>
              <p className="text-xs text-gray-500 font-mono">ID: {seller._id}</p>
            </div>
          </div>

          {/* Active/Inactive Switch */}
          <div className="flex items-center gap-3">
            {isPending && <Loader2 className="h-4 w-4 animate-spin text-[#024AFE]" />}
            <div className="flex flex-col items-end">
              <Switch
                id="seller-status"
                checked={seller.isActive}
                onCheckedChange={handleUpdateSeller}
                disabled={isPending}
              />
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Security & Access */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2">
              Security & Access
            </h4>

            {/* Active Status */}
            {seller.isActive !== undefined && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <ShieldCheck className={`h-4 w-4 ${seller.isActive ? "text-green-600" : "text-red-600"}`} />
                <div>
                  <p className="text-sm font-medium text-gray-900">Status</p>
                  <Badge
                    variant="secondary"
                    className={`${seller.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {seller.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            )}

            {/* Password Age */}
            {seller.passwordAge !== undefined && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Password Age</p>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {seller.passwordAge}
                  </Badge>
                </div>
              </div>
            )}
          </div>

          {/* Activity & Timeline */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-b border-gray-200 pb-2">
              Activity & Timeline
            </h4>

            {seller.lastLogin && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Last Login</p>
                  <p className="text-sm text-gray-600">{formatDate(seller.lastLogin)}</p>
                </div>
              </div>
            )}

            {seller.createdAt && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Account Created</p>
                  <p className="text-sm text-gray-600">{formatDate(seller.createdAt)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
