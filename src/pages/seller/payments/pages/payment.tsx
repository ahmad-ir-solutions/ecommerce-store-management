import { Header } from "@/components/shared/header"
import { PaymentMethod } from "../components/payment-method"
import { FinancialStats } from "../components/financial-stats"
import { PaymentTransactionsTable } from "../components/payment-transaction-table"

export function SellerPaymentPage() {

  return (
    <div>
      <Header title="Payment Methods" />
      <div className="space-y-6 mt-6">
        <FinancialStats />
        <PaymentMethod />
      <PaymentTransactionsTable />
      </div>
    </div>
  )
}

export default SellerPaymentPage
