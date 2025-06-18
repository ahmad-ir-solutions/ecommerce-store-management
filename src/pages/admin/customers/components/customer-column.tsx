import {
    type ColumnDef,
} from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ICustomer } from "../core/_modals"

export const columns: ColumnDef<ICustomer>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                onClick={(e) => e.stopPropagation()}
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "avatar",
        header: "Customers",
        cell: ({ row }) => {
            const name = `${row.original.firstName} ${row.original.lastName}`
            const initials = name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()

            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 bg-red-500 text-white">
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium">{name || "--"}</span>
                        <span className="text-xs text-[#4E5967]">{row.original.email}</span>
                        <span className="text-xs text-[#4E5967]">{row.original.phoneNumber}</span>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "customerReference",
        header: "Reference",
    },
    {
        accessorKey: "billingAddress",
        header: "Billing Address",
        cell: ({ row }) => {
            const address = row.original.billingAddress
            const addressLine = address?.addressLine1
            const country = address?.country || "N/A"

            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 bg-[#024AFE] text-white">
                        <AvatarFallback>{country.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium">{addressLine}</span>
                        <span className="text-xs text-muted-foreground">{country}</span>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt)
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${date.getFullYear()}`
            return <span>{formattedDate}</span>
        },
    },
    // {
    //   accessorKey: "order",
    //   header: "Order",
    //   cell: ({ row }) => {
    //     console.log(row.original,"row.original");

    //     const order = row.original.order || "--"
    //     return (
    //       <div className="flex flex-col">
    //           <div className="grid grid-cols-[65px_1fr] items-center">
    //             <span className="text-[#4E5967]">Number</span>
    //             <span className="font-medium">{order.numbers || "--"}</span>
    //           </div>
    //           <div className="grid grid-cols-[65px_1fr] items-center">
    //             <span className="text-[#4E5967]">Average</span>
    //             <span className="font-medium">£{order.average.toFixed(2) || "--"}</span>
    //           </div>
    //           <div className="grid grid-cols-[65px_1fr] items-center">
    //             <span className="text-[#4E5967]">Total</span>
    //             <span className="font-medium">£{order.total.toFixed(2) || "--"}</span>
    //           </div>
    //       </div>
    //     )
    //   },
    // },
    {
        accessorKey: "channel",
        header: "Channel",
        cell: ({ row }) => {
            console.log(row.original, "row.original in channel");

            const channel = row.original.channel
            return (
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 bg-green-500 text-white">
                        <AvatarFallback>AM</AvatarFallback>
                    </Avatar>
                    <span className="underline">{channel}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => (
            row.original.tags && row.original.tags.length > 0 ? (
                <div className="flex items-center gap-2">
                    {row.original.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-gray-200 rounded-full text-xs text-gray-700 truncate"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            ) : (
                <span>-</span>
            )
        ),
    },
    {
        accessorKey: "notes",
        header: "Notes",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <span>{row.original.notes || "-"}</span>
                </div>
            )
        },
    },
]