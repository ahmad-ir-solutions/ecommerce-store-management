import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PaymentTransaction } from "../core/_schema"
import { TableFilters } from "./table-filter"
import { ReusableTable } from "@/components/shared/reusableTable"

// Mock data
const mockTransactions: PaymentTransaction[] = [
    {
        _id: "1",
        customerName: "Hammad Al-Khuder",
        customerEmail: "hammad@example.com",
        customerAddress: "Flat 81 george street london W1U 8AQ United Kingdom",
        productSku: "805432082553",
        productName: "Xerjoff Accento EDP-S 100ml",
        productImage: "/placeholder.svg?height=40&width=40",
        date: "Today",
        orderNumber: "ORD-001",
        quantity: 1,
        unitPrice: 25.5,
        totalAmount: 25.5,
        channel: "Amazon United Kingdom (UK)",
        status: "Paid",
        paymentMethod: "Credit Card",
    },
    {
        _id: "2",
        customerName: "Hammad Al-Khuder",
        customerEmail: "hammad@example.com",
        customerAddress: "Flat 81 george street london W1U 8AQ United Kingdom",
        productSku: "805432082553",
        productName: "Xerjoff Accento EDP-S 100ml",
        productImage: "/placeholder.svg?height=40&width=40",
        date: "Today",
        orderNumber: "ORD-002",
        quantity: 1,
        unitPrice: 25.5,
        totalAmount: 25.5,
        channel: "Amazon United Kingdom (UK)",
        status: "Unfulfilled",
        paymentMethod: "PayPal",
        notes: "Pay Now",
    },
    {
        _id: "3",
        customerName: "Hammad Al-Khuder",
        customerEmail: "hammad@example.com",
        customerAddress: "Flat 81 george street london W1U 8AQ United Kingdom",
        productSku: "805432082553",
        productName: "Xerjoff Accento EDP-S 100ml",
        productImage: "/placeholder.svg?height=40&width=40",
        date: "Today",
        orderNumber: "ORD-003",
        quantity: 1,
        unitPrice: 25.5,
        totalAmount: 25.5,
        channel: "Amazon United Kingdom (UK)",
        status: "Paid",
        paymentMethod: "Credit Card",
    },
    {
        _id: "4",
        customerName: "Hammad Al-Khuder",
        customerEmail: "hammad@example.com",
        customerAddress: "Flat 81 george street london W1U 8AQ United Kingdom",
        productSku: "805432082553",
        productName: "Xerjoff Accento EDP-S 100ml",
        productImage: "/placeholder.svg?height=40&width=40",
        date: "Today",
        orderNumber: "ORD-004",
        quantity: 1,
        unitPrice: 25.5,
        totalAmount: 25.5,
        channel: "Amazon United Kingdom (UK)",
        status: "Unfulfilled",
        paymentMethod: "Bank Transfer",
        notes: "Pay Now",
    },
    {
        _id: "5",
        customerName: "Hammad Al-Khuder",
        customerEmail: "hammad@example.com",
        customerAddress: "Flat 81 george street london W1U 8AQ United Kingdom",
        productSku: "805432082553",
        productName: "Xerjoff Accento EDP-S 100ml",
        productImage: "/placeholder.svg?height=40&width=40",
        date: "Today",
        orderNumber: "ORD-005",
        quantity: 1,
        unitPrice: 25.5,
        totalAmount: 25.5,
        channel: "Amazon United Kingdom (UK)",
        status: "Paid",
        paymentMethod: "Credit Card",
    },
    {
        _id: "6",
        customerName: "Hammad Al-Khuder",
        customerEmail: "hammad@example.com",
        customerAddress: "Flat 81 george street london W1U 8AQ United Kingdom",
        productSku: "805432082553",
        productName: "Xerjoff Accento EDP-S 100ml",
        productImage: "/placeholder.svg?height=40&width=40",
        date: "Today",
        orderNumber: "ORD-006",
        quantity: 1,
        unitPrice: 25.5,
        totalAmount: 25.5,
        channel: "Amazon United Kingdom (UK)",
        status: "Paid",
        paymentMethod: "PayPal",
    },
]

export function PaymentTransactionsTable() {
    const [activeTab, setActiveTab] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    // Filter data based on active tab
    const filteredTransactions = useMemo(() => {
        let filtered = mockTransactions

        switch (activeTab) {
            case "unpaid":
                filtered = filtered.filter((t) => t.status === "Unfulfilled")
                break
            case "paid":
                filtered = filtered.filter((t) => t.status === "Paid")
                break
            default:
                // "all" - no additional filtering
                break
        }

        return filtered
    }, [activeTab])

    // Calculate counts for tabs
    const tabCounts = useMemo(() => {
        const unpaidCount = mockTransactions.filter((t) => t.status === "Unfulfilled").length
        const paidCount = mockTransactions.filter((t) => t.status === "Paid").length

        return {
            all: mockTransactions.length,
            unpaid: unpaidCount,
            paid: paidCount,
        }
    }, [])

    const filterTabs = [
        { id: "all", label: "All", count: tabCounts.all },
        { id: "unpaid", label: "Unpaid", count: tabCounts.unpaid },
        { id: "paid", label: "Paid", count: tabCounts.paid },
    ]

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Paid":
                return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
            case "Unfulfilled":
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Unfulfilled</Badge>
            case "Processing":
                return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Processing</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const getChannelBadge = (channel: string) => {
        return (
            <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                        {/* {row.customerName
              .split(" ")
              .map((n) => n[0])
              .join("")} */}
                    </AvatarFallback>
                </Avatar>
                <span className="text-sm text-blue-600 hover:underline cursor-pointer">{channel}</span>
            </div>

        )
    }

    const columns = [
        {
            key: "select",
            title: "",
            width: "50px",
            render: (
                row: PaymentTransaction,
                selectedRows?: string[],
                toggleSelectRow?: (id: string) => void,
                // toggleSelectAll?: () => void,
                // isAllSelected?: boolean,
            ) => (
                <Checkbox
                    checked={selectedRows?.includes(row._id) || false}
                    onCheckedChange={() => toggleSelectRow?.(row._id)}
                />
            ),
        },
        {
            key: "customer",
            title: "Customers",
            width: "200px",
            render: (row: PaymentTransaction) => (
                <div className="flex items-center">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                            {row.customerName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                </div>
            ),
        },
        {
            key: "productSku",
            title: "Product SKU",
            width: "120px",
        },
        {
            key: "product",
            title: "Name",
            width: "200px",
            render: (row: PaymentTransaction) => (
                <div className="flex items-center space-x-3">
                    <img
                        src={row.productImage || "/placeholder.svg"}
                        alt={row.productName}
                        className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="font-medium text-sm">{row.productName}</span>
                </div>
            ),
        },
        {
            key: "customerDetails",
            title: "Customer Details",
            width: "150px",
            render: (row: PaymentTransaction) => (
                <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                            {row.customerName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium text-sm">{row.customerName}</div>
                        <div className="text-xs text-gray-500">{row.customerAddress}</div>
                    </div>
                </div>
            ),
        },
        {
            key: "date",
            title: "Date",
            width: "100px",
        },
        {
            key: "orderDetails",
            title: "Order Details",
            width: "120px",
            render: (row: PaymentTransaction) => (
                <div className="text-sm">
                    <div>Numbers: {row.quantity}</div>
                    <div>Average: £{row.unitPrice.toFixed(2)}</div>
                    <div>Total: £{row.totalAmount.toFixed(2)}</div>
                </div>
            ),
        },
        {
            key: "channel",
            title: "Channel",
            width: "180px",
            render: (row: PaymentTransaction) => getChannelBadge(row.channel),
        },
        {
            key: "status",
            title: "Status",
            width: "100px",
            render: (row: PaymentTransaction) => getStatusBadge(row.status),
        },
        {
            key: "notes",
            title: "Note",
            width: "100px",
            render: (row: PaymentTransaction) =>
                row.notes ? (
                    <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                        {row.notes}
                    </Button>
                ) : null,
        },
    ]

    return (
        <div>
            <TableFilters
                tabs={filterTabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onRefresh={() => {
                    console.log("Refreshing data...")
                }}
            />

            <ReusableTable
                data={filteredTransactions}
                columns={columns}
                searchTerm={searchTerm}
                itemsPerPage={5}
                isLoading={false}
            />
        </div>
    )
}

