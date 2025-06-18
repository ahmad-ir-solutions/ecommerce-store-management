import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { Order } from "../core/_modals"
import { TikTokIcon } from "./TikTokIcon"
// import { RowActions } from "./row-actions"
import { useNavigate } from "react-router-dom"
// import { useState } from "react"
export const useOrderColumns: ColumnDef<Order>[] = [
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
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ordersFlags",
    header: "Orders Flags",
    cell: () => <div className="w-full"></div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => {
      // const [isHovered, setIsHovered] = useState(false)
      const navigate = useNavigate()
      console.log(row.original);

      const handleClick = () => {
        navigate(`/admin/orders/edit-order/${row.original.id}`)
      }

      return (
        <div
          className="relative"
        // onChangeCapture={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="font-medium text-[#024AFE] hover:underline cursor-pointer"
            onClick={handleClick}
          >
            {row.getValue("id")}
          </div>
          {/* <RowActions orderId={row.original.id} isVisible={isHovered} /> */}
        </div>
      )
    }
  },
  {
    accessorKey: "channel",
    header: "Channel",
    cell: ({ row }) => {
      const channel = row.getValue("channel") as string
      return (
        <div className="flex items-center justify-center">
          {channel === "TikTok" && <TikTokIcon className="h-5 w-5" />}
          {channel !== "TikTok" && channel}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "channelOrderId",
    header: "Channel Order ID",
    cell: ({ row }) => <div>{row.getValue("channelOrderId")}</div>,
  },
  {
    accessorKey: "productSKUs",
    header: "Product SKUs",
    cell: ({ row }) => <div>{row.getValue("productSKUs")}</div>,
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => {
      const date = row.getValue("orderDate") as Date
      return (
        <div>
          {format(date, "MM/dd/yyyy")}
          <br />
          {format(date, "HH:mm")}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      if (!value.from || !value.to) return true
      const date = row.getValue(id) as Date
      const from = new Date(value.from)
      const to = new Date(value.to)
      return date >= from && date <= to
    },
  },
  {
    accessorKey: "dispatchDate",
    header: "Dispatch Date",
    cell: ({ row }) => {
      const date = row.getValue("dispatchDate") as Date | null
      return date ? (
        <div>
          {format(date, "MM/dd/yyyy")}
          <br />
          {format(date, "HH:mm")}
        </div>
      ) : (
        <div>-</div>
      )
    },
  },
  {
    accessorKey: "channelDispatchDate",
    header: "Channel Dispatch Date",
    cell: ({ row }) => {
      const date = row.getValue("channelDispatchDate") as Date | null
      return date ? (
        <div>
          {format(date, "MM/dd/yyyy")}
          <br />
          {format(date, "HH:mm")}
        </div>
      ) : (
        <div>-</div>
      )
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: ({ row }) => (
      <div className="font-medium hover:underline cursor-pointer">{row.getValue("customerName")}</div>
    ),
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => <div>{row.getValue("company") || "-"}</div>,
  },
  {
    accessorKey: "postcode",
    header: "Postcode",
    cell: ({ row }) => <div>{row.getValue("postcode") || "-"}</div>,
  },
  {
    accessorKey: "shippingCountry",
    header: "Shipping Country",
    cell: ({ row }) => <div>{row.getValue("shippingCountry")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "emailAddress",
    header: "Email Address",
    cell: ({ row }) => <div>{row.getValue("emailAddress")}</div>,
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => <div>£{row.getValue("total")}</div>,
  },
  {
    accessorKey: "shippingMethod",
    header: "Shipping Method",
    cell: ({ row }) => <div>{row.getValue("shippingMethod")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "status",
    header: "Order Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      let statusClass = ""

      switch (status?.toLowerCase()) {
        case "confirmed":
          statusClass = "bg-green-500 text-white"
          break
        case "pending":
          statusClass = "bg-yellow-500 text-white"
          break
        case "awaiting payment":
          statusClass = "bg-orange-500 text-white"
          break
        default:
          statusClass = "bg-gray-500 text-white"
      }

      return (
        <div className={`px-2 py-1 rounded-lg text-xs font-medium ${statusClass}`}>
          {status || "N/A"}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
]
