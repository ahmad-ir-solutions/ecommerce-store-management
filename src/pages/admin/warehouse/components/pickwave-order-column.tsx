import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { ChannelType, PickwaveOrder } from "../core/_modals"
import { TikTokIcon } from "../../orders/components/TikTokIcon"

export const usePickwaveOrderColumns: ColumnDef<PickwaveOrder>[] = [
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
    meta: {
      type: "boolean",
      filterable: false,
      sortable: false,
    },
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse",
    cell: ({ row }) => {
      const warehouse = row.original.warehouse?.[0]?.warehouseName || "Default Warehouse"
      return <div className="text-sm">{warehouse}</div>
    },
    filterFn: (row, id, value) => {
        console.log(id);
      const warehouse = row.original.warehouse?.[0]?.warehouseName || "Default Warehouse"
      return value.includes(warehouse)
    },
    meta: {
      type: "text",
      filterable: true,
      sortable: true,
      filterType: "checkbox-list",
      filterOptions: ["All", "Default Warehouse", "Central Hub", "North Warehouse", "South Warehouse"],
    },
  },
  {
    accessorKey: "companyIdentity",
    header: "Company Identity",
    cell: ({ row }) => <div className="text-sm">{row.getValue("companyIdentity") || "-"}</div>,
    meta: {
      type: "text",
      filterable: true,
      sortable: true,
      filterType: "input",
    },
  },
  {
    accessorKey: "channel",
    header: "Channel",
    cell: ({ row }) => {
      const channelName = row.original.channelDetails?.[0]?.channelName || (row.getValue("channel") as string)
      return (
        <div className="flex items-center justify-center">
          {channelName === ChannelType.TIKTOK && <TikTokIcon className="h-5 w-5" />}
          {channelName !== ChannelType.TIKTOK && <span className="text-sm">{channelName}</span>}
        </div>
      )
    },
    filterFn: (row, id, value) => {
        console.log(id);
      const channelName = row.original.channelDetails?.[0]?.channelName || row.getValue("channel")
      return value.includes(channelName)
    },
    meta: {
      type: "enum",
      filterable: true,
      sortable: true,
      filterType: "checkbox-list",
      filterOptions: ["All", "TikTok", "Amazon", "eBay", "Shopify", "Woocommerce"],
    },
  },
  {
    accessorKey: "ordersFlags",
    header: "Order Flags",
    cell: ({ row }) => {
      const attentionRequired = row.original.attentionRequired
      return (
        <div className="w-full">
          {attentionRequired && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Attention Required
            </span>
          )}
        </div>
      )
    },
    filterFn: (row, id, value) => {
        console.log(id);
      const attentionRequired = row.original.attentionRequired
      const flagValue = attentionRequired ? "Attention Required" : "Normal"
      return value.includes(flagValue)
    },
    meta: {
      type: "enum",
      filterable: true,
      sortable: true,
      filterType: "checkbox-list",
      filterOptions: ["All", "Attention Required", "Normal"],
    },
  },
  {
    accessorKey: "_id",
    header: "Order Number",
    cell: ({ row }) => {
      const navigate = useNavigate()

      const handleClick = () => {
        navigate(`/admin/orders/edit-order/${row.original._id}`)
      }

      return (
        <div className="relative">
          <div className="font-medium text-[#024AFE] hover:underline cursor-pointer text-sm" onClick={handleClick}>
            {row.original._id}
          </div>
        </div>
      )
    },
    meta: {
      type: "text",
      filterable: true,
      sortable: true,
      filterType: "input",
    },
  },
  {
    accessorKey: "channelOrderNumber",
    header: "Channel Order Ref",
    cell: ({ row }) => <div className="text-sm">{row.getValue("channelOrderNumber") || "-"}</div>,
    meta: {
      type: "text",
      filterable: true,
      sortable: true,
      filterType: "input",
    },
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => {
      const date = row.getValue("orderDate") as string
      return (
        <div className="text-sm">
          {format(new Date(date), "dd/MM/yyyy")}
          <br />
          <span className="text-xs text-gray-500">{format(new Date(date), "HH:mm")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      if (!value.from || !value.to) return true
      const date = new Date(row.getValue(id) as string)
      const from = new Date(value.from)
      const to = new Date(value.to)
      return date >= from && date <= to
    },
    meta: {
      type: "date",
      filterable: true,
      sortable: true,
      filterType: "date-range",
    },
  },
  {
    accessorKey: "multipleLines",
    header: "Multiple Lines",
    cell: ({ row }) => {
      const quantity = row.original.quantity || 1
      const hasMultipleLines = quantity > 1
      return <div className="text-center">{hasMultipleLines ? "Yes" : "No"}</div>
    },
    meta: {
      type: "boolean",
      filterable: true,
      sortable: true,
      filterType: "checkbox-list",
      filterOptions: ["All", "Yes", "No"],
    },
  },
  {
    accessorKey: "productSKU",
    header: "Product SKU",
    cell: ({ row }) => {
      const sku = row.original.productDetails?.sku || "-"
      return <div className="text-sm font-mono">{sku}</div>
    },
    meta: {
      type: "text",
      filterable: true,
      sortable: true,
      filterType: "input",
    },
  },
  {
    accessorKey: "stockLocations",
    header: "Stock Locations",
    cell: ({ row }) => {
      const warehouse = row.original.warehouse?.[0]
      const location = warehouse?.collectionPoint || warehouse?.address || "-"
      return <div className="text-sm">{location}</div>
    },
    meta: {
      type: "text",
      filterable: true,
      sortable: true,
      filterType: "input",
    },
  },
  {
    accessorKey: "warehouseLocations",
    header: "Warehouse Locations",
    cell: ({ row }) => {
      const warehouse = row.original.warehouse?.[0]
      const fullAddress = warehouse
        ? `${warehouse.address || ""} ${warehouse.city || ""} ${warehouse.postcode || ""}`.trim()
        : "-"
      return <div className="text-sm">{fullAddress}</div>
    },
    meta: {
      type: "text",
      filterable: true,
      sortable: true,
      filterType: "input",
    },
  },
  {
    accessorKey: "packageSize",
    header: "Package Size",
    cell: ({ row }) => {
      const packageSize = row.original.shippingAndHandling?.packageSize || "-"
      return <div className="text-sm">{packageSize}</div>
    },
    filterFn: (row, id, value) => {
        console.log(id);
      const packageSize = row.original.shippingAndHandling?.packageSize || "-"
      return value.includes(packageSize)
    },
    meta: {
      type: "enum",
      filterable: true,
      sortable: true,
      filterType: "checkbox-list",
      filterOptions: ["All", "Small", "Medium", "Large", "Extra Large"],
    },
  },
  {
    accessorKey: "orderWeight",
    header: "Order Weight",
    cell: ({ row }) => {
      const weight = row.original.shippingAndHandling?.orderWeight || 0
      return <div className="text-sm">{weight} kg</div>
    },
    meta: {
      type: "weight",
      filterable: true,
      sortable: true,
      filterType: "input",
    },
  },
  {
    accessorKey: "shippingMethod",
    header: "Shipping Method",
    cell: ({ row }) => {
      const shippingMethod = row.original.shippingAndHandling?.shippingMethod || "-"
      return <div className="text-sm">{shippingMethod}</div>
    },
    filterFn: (row, id, value) => {
        console.log(id);
      const shippingMethod = row.original.shippingAndHandling?.shippingMethod || "-"
      return value.includes(shippingMethod)
    },
    meta: {
      type: "enum",
      filterable: true,
      sortable: true,
      filterType: "checkbox-list",
      filterOptions: ["All", "Royal Mail Tracked 24", "Royal Mail Tracked 48", "Standard", "Express", "Next Day"],
    },
  },
  {
    accessorKey: "postCode",
    header: "Post Code",
    cell: ({ row }) => {
      const postCode =
        row.original.shippingAddress?.postalCode || row.original.customerDetails?.shippingAddress?.postalCode || "-"
      return <div className="text-sm font-mono">{postCode}</div>
    },
    meta: {
      type: "text",
      filterable: true,
      sortable: true,
      filterType: "input",
    },
  },
]

// Column metadata for dynamic table configuration
export const columnMetadata = {
  select: { type: "boolean", filterable: false, sortable: false },
  warehouse: { type: "text", filterable: true, sortable: true, filterType: "checkbox-list" },
  companyIdentity: { type: "text", filterable: true, sortable: true, filterType: "input" },
  channel: { type: "enum", filterable: true, sortable: true, filterType: "checkbox-list" },
  ordersFlags: { type: "enum", filterable: true, sortable: true, filterType: "checkbox-list" },
  _id: { type: "text", filterable: true, sortable: true, filterType: "input" },
  channelOrderNumber: { type: "text", filterable: true, sortable: true, filterType: "input" },
  orderDate: { type: "date", filterable: true, sortable: true, filterType: "date-range" },
  multipleLines: { type: "boolean", filterable: true, sortable: true, filterType: "checkbox-list" },
  productSKU: { type: "text", filterable: true, sortable: true, filterType: "input" },
  stockLocations: { type: "text", filterable: true, sortable: true, filterType: "input" },
  warehouseLocations: { type: "text", filterable: true, sortable: true, filterType: "input" },
  packageSize: { type: "enum", filterable: true, sortable: true, filterType: "checkbox-list" },
  orderWeight: { type: "weight", filterable: true, sortable: true, filterType: "input" },
  shippingMethod: { type: "enum", filterable: true, sortable: true, filterType: "checkbox-list" },
  postCode: { type: "text", filterable: true, sortable: true, filterType: "input" },
} as const
