import { Header } from "@/components/shared/header"
import { PaymentMethod } from "../components/payment-method"
import { FinancialStats } from "../components/financial-stats"
import { PaymentTransactionsTable } from "../components/payment-transaction-table"
import StripeProvider from "@/lib/stripe/stripe-provider"

export function SellerPaymentPage() {

  return (
    <div>
      <Header title="Payment Methods" />
      <div className="space-y-6 mt-6">
        <FinancialStats />
        <StripeProvider>
          <PaymentMethod />
        </StripeProvider>
        <PaymentTransactionsTable />
      </div>
    </div>
  )
}

export default SellerPaymentPage;
