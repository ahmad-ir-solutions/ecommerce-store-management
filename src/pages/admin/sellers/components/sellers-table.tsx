import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { Trash2 } from "lucide-react"
import type { ISellerModel } from "../core/_modals"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomPagination } from "@/components/shared/custom-pagination"
import { Loader2 } from "lucide-react"
import { useDeleteSeller } from "../core/hooks/useSeller"

interface SellersTableProps {
  sellers: ISellerModel[]
  isLoading: boolean
  onPageChange: (page: number) => void
  totalItems: number
  totalPages: number
  itemsPerPage: number
  currentPage: number
  error: any
  search?: string
  title: string
}

export function SellersTable({
  sellers,
  isLoading,
  onPageChange,
  totalItems,
  totalPages,
  itemsPerPage,
  currentPage,
  error,
  search,
  title,
}: SellersTableProps) {
  const navigate = useNavigate()

  const { mutate: deleteSeller } = useDeleteSeller()
  const handlePageChange = (page: number) => {
    onPageChange(page)
  }
  console.log(sellers, "seJllers");

  const handleEditSeller = (sellerId: string) => {
    navigate(`/admin/sellers/seller-details/${sellerId}`)
  }

  const handleDeleteSeller = (sellerId: string) => {
    // TODO: Implement delete functionality
    if (window.confirm("Are you sure you want to delete this seller?")) {
      deleteSeller(sellerId)
    }
  }

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      ADMIN: { variant: "default" as const, className: "bg-blue-100 text-blue-800" },
      SELLER: { variant: "secondary" as const, className: "bg-green-100 text-green-800" },
      USER: { variant: "outline" as const, className: "bg-gray-100 text-gray-800" },
    }

    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.USER

    return (
      <Badge variant={config.variant} className={config.className}>
        {role}
      </Badge>
    )
  }

  // const getMfaStatusBadge = (mfaStatus: boolean | string | undefined) => {
  //   const isEnabled = typeof mfaStatus === 'boolean' ? mfaStatus : mfaStatus === 'true'
  //   return (
  //     <Badge variant={isEnabled ? "default" : "secondary"} className={isEnabled ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
  //       {isEnabled ? "Enabled" : "Disabled"}
  //     </Badge>
  //   )
  // }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card className="bg-white rounded-2xl border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
              <TableHead className="p-3 rounded-l-lg">Name</TableHead>
              <TableHead className="p-3">Email</TableHead>
              <TableHead className="p-3">Role</TableHead>
              <TableHead className="p-3">Last Login</TableHead>
              <TableHead className="p-3">Password Age</TableHead>
              <TableHead className="p-3">Created At</TableHead>
              <TableHead className="p-3 rounded-r-lg">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <TableRow><TableCell colSpan={7}><div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
            </div></TableCell></TableRow>}
            {!search && (error && !isLoading) && <TableRow><TableCell colSpan={7}><div className="flex justify-center items-center h-74">
              Error loading sellers: {(error as Error).message}
            </div></TableCell></TableRow>}
            {search && (sellers.length === 0 && !isLoading) && <TableRow><TableCell colSpan={7}><div className="flex justify-center items-center h-64">
              {search && (sellers.length === 0 && !isLoading) && "No sellers found matching your search."}
            </div></TableCell></TableRow>}
            {sellers?.map((seller) => (
              <TableRow key={seller._id} className="border-b border-gray-200">
                <TableCell className="py-3 font-medium">{seller.name}</TableCell>
                <TableCell className="py-3">{seller.email}</TableCell>
                <TableCell className="py-3">{getRoleBadge(seller.role)}</TableCell>
                <TableCell className="py-3">{seller.lastLogin ? formatDate(seller.lastLogin) : "Never"}</TableCell>
                <TableCell className="py-3">{seller.passwordAge || "-"}</TableCell>
                <TableCell className="py-3">{seller.createdAt ? formatDate(seller.createdAt) : "Never"}</TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditSeller(seller._id)}
                      className="text-[#024AFE] hover:text-[#0228fe] hover:bg-blue-50 underline"
                    >
                      Edit/View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSeller(seller._id)}
                      // disabled={deleteSellerMutation.isPending}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </Card>
  )
} 