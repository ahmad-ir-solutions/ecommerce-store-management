import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
// import { WithdrawFundsModal } from "./modal/withdraw-funds"
import { AddFundsModal } from "./modal/add-funds-modal"
import { useGetAvailableBalance } from "../core/hooks/useStripe"

interface FinancialData {
  availableBalance: number
  toBePaid: number
  paid: number
}

export function FinancialStats() {
  const { data: availableBalance, refetch } = useGetAvailableBalance()

  const [showAddFundsModal, setShowAddFundsModal] = useState(false)
  // const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [financialData, setFinancialData] = useState<FinancialData>({
    availableBalance: availableBalance || 0,
    toBePaid: 0,
    paid: 0,
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(amount)
  }

  useEffect(() => {
    if (typeof availableBalance === "number" && !isNaN(availableBalance)) {
      setFinancialData((prev) => ({
        ...prev,
        availableBalance,
      }))
    }
  }, [availableBalance])

  // console.log(availableBalance , "availableBalance")
  const handleAddFunds = (amount: number) => {
    setFinancialData((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance + amount,
    }))
    setShowAddFundsModal(false)
  }

  // const handleWithdrawFunds = (amount: number) => {
  //   setFinancialData((prev) => ({
  //     ...prev,
  //     availableBalance: Math.max(0, prev.availableBalance - amount),
  //   }))
  //   setShowWithdrawModal(false)
  // }

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between bg-white py-6 px-6 rounded-2xl shadow-none border border-gray-100">
        {/* Financial Stats */}
        <div className="flex items-center space-x-16">
          {/* Available Balance */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Available Balance</p>
            <p className="text-3xl font-semibold text-gray-900">{formatCurrency(financialData.availableBalance)}</p>
          </div>

          {/* To be Paid */}
          <div>
            <p className="text-sm text-gray-500 mb-1">To be Paid</p>
            <p className="text-3xl font-semibold text-gray-900">{formatCurrency(financialData.toBePaid)}</p>
          </div>

          {/* Paid */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Paid</p>
            <p className="text-3xl font-semibold text-gray-900">{formatCurrency(financialData.paid)}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            variant="primary"
            onClick={() => setShowAddFundsModal(true)}
            className="rounded-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Funds</span>
          </Button>

          {/* <Button
            onClick={() => setShowWithdrawModal(true)}
            variant="primary"
            className="rounded-lg"
          >
            <Minus className="w-4 h-4" />
            <span>Withdraw Funds</span>
          </Button> */}
        </div>
      </div>

      {/* Tablet Layout */}
      <div className="hidden md:block lg:hidden bg-white py-6 px-6 rounded-2xl shadow-sm border border-gray-100">
        {/* Financial Stats */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Available Balance */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Available Balance</p>
            <p className="text-2xl font-semibold text-gray-900">{formatCurrency(financialData.availableBalance)}</p>
          </div>

          {/* To be Paid */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">To be Paid</p>
            <p className="text-2xl font-semibold text-gray-900">{formatCurrency(financialData.toBePaid)}</p>
          </div>

          {/* Paid */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Paid</p>
            <p className="text-2xl font-semibold text-gray-900">{formatCurrency(financialData.paid)}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-3">
          <Button
            onClick={() => setShowAddFundsModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Funds</span>
          </Button>

          {/* <Button
            onClick={() => setShowWithdrawModal(true)}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg flex items-center space-x-2"
          >
            <Minus className="w-4 h-4" />
            <span>Withdraw Funds</span>
          </Button> */}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden bg-white py-4 px-4 rounded-2xl shadow-sm border border-gray-100">
        {/* Financial Stats */}
        <div className="space-y-4 mb-6">
          {/* Available Balance */}
          <div className="text-center bg-blue-50 py-4 px-4 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Available Balance</p>
            <p className="text-xl font-semibold text-gray-900">{formatCurrency(financialData.availableBalance)}</p>
          </div>

          {/* To be Paid and Paid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center bg-gray-50 py-3 px-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">To be Paid</p>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(financialData.toBePaid)}</p>
            </div>

            <div className="text-center bg-gray-50 py-3 px-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Paid</p>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(financialData.paid)}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setShowAddFundsModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add Funds</span>
          </Button>

          {/* <Button
            onClick={() => setShowWithdrawModal(true)}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg flex items-center justify-center space-x-2"
          >
            <Minus className="w-4 h-4" />
            <span className="text-sm">Withdraw</span>
          </Button> */}
        </div>
      </div>

      {/* Modals */}
      <AddFundsModal
        isOpen={showAddFundsModal}
        onClose={() => setShowAddFundsModal(false)}
        onConfirm={handleAddFunds}
        refetch={refetch}
      />

      {/* <WithdrawFundsModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onConfirm={handleWithdrawFunds}
      /> */}
    </>
  )
}
