import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomPagination } from "@/components/shared/custom-pagination"
import { Loader2 } from "lucide-react"
import { useGetSellerTransactions } from "../core/hooks/useSeller"
import { useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { ITransaction } from "../core/_modals"
import { useState } from "react"
import { formatCurrency } from "@/helpers/currencyFormat"

interface SellersTransactionsProps {
  title: string
}

export function SellersTransactions({ title }: SellersTransactionsProps) {
  const { sellerId } = useParams()
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
  })
  const { data: transactionsData, isLoading, error } = useGetSellerTransactions(sellerId || "", queryParams)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTypeBadge = (type: string) => {
    return (
      <Badge
        variant={type === "debit" ? "destructive" : "default"}
        className={type === "debit" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    )
  }


  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page,
    }))
  }

  const totalPages = transactionsData?.total ? Math.ceil(transactionsData.total / (queryParams.limit || 10)) : 0
  const currentPage = queryParams.page || 1

  return (
    <Card className="bg-white rounded-2xl border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
              <TableHead className="p-3 rounded-l-lg">Transaction ID</TableHead>
              <TableHead className="p-3">Type</TableHead>
              <TableHead className="p-3">Amount</TableHead>
              <TableHead className="p-3">Source</TableHead>
              <TableHead className="p-3">Order ID</TableHead>
              <TableHead className="p-3">Description</TableHead>
              <TableHead className="p-3">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={8}>
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
                  </div>
                </TableCell>
              </TableRow>
            )}

            {error && !isLoading && (
              <TableRow>
                <TableCell colSpan={8}>
                  <div className="flex justify-center items-center h-64">
                    Error loading transactions: {(error as Error).message}
                  </div>
                </TableCell>
              </TableRow>
            )}

            {transactionsData?.data?.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={8}>
                  <div className="flex justify-center items-center h-64">No transactions found.</div>
                </TableCell>
              </TableRow>
            )}

            {transactionsData?.data?.map((transaction: ITransaction) => (
              <TableRow key={transaction._id} className="border-b border-gray-200">
                <TableCell className="py-3 font-medium text-sm">{transaction._id || "N/A"}</TableCell>
                <TableCell className="py-3">{getTypeBadge(transaction.type) || "N/A"}</TableCell>
                <TableCell className="py-3 font-semibold"> {formatCurrency(transaction.amount || 0)}</TableCell>
                <TableCell className="py-3 capitalize">{transaction.source || "N/A"}</TableCell>
                <TableCell className="py-3 font-mono text-sm">{transaction.orderId || "N/A"}</TableCell>
                <TableCell className="py-3 max-w-xs truncate" title={transaction.description || "N/A"}>
                  {transaction.description || "N/A"}
                </TableCell>
                <TableCell className="py-3 text-sm text-gray-600">{formatDate(transaction.createdAt || "N/A")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {/* Pagination */}
        {transactionsData && transactionsData.total > 10 && (
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={transactionsData?.total || 0}
          itemsPerPage={queryParams.limit}
          onPageChange={handlePageChange}
        />
      )}
    </Card>
  )
}
