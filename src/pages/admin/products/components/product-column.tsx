import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
// import UserProfile from "@/assets/images/avatar.png"
import { Link } from "react-router-dom"
import { IProductModel } from '../core/_modals'

export function useProductColumns(): ColumnDef<IProductModel>[] {
  const ProductSkuCell = ({ row }: { row: any }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
      <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div>
          <Link
            to={`/admin/products/${row.original._id}`}
            className="text-blue-500 hover:text-blue-700 hover:underline"
          >
            {row.original.sku}
          </Link>
        </div>

        {isHovered && (
          <div className="absolute left-0 -bottom-8 flex space-x-2 bg-white shadow-sm p-2 rounded z-10">
            <Link to={`/admin/products/${row.original._id}`} className="text-blue-500 hover:text-blue-700 text-xs">
              Edit
            </Link>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-delete-modal", { detail: row.original }))}
              className="text-red-500 hover:text-red-700 text-xs"
            >
              Delete
            </button>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-archive-modal", { detail: row.original }))}
              className="text-amber-500 hover:text-amber-700 text-xs"
            >
              Archive
            </button>
          </div>
        )}
      </div>
    )
  }

  return [
    {
      accessorKey: "checked",
      header: ({ table }) => (
        <Checkbox
          className="w-5 h-5 rounded-sm border-[#BBC2CB]"
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="w-5 h-5 rounded-sm border-[#BBC2CB]"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableColumnFilter: false,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div key={row.id}></div>,
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <Avatar className="h-12 w-12 bg-gray-300 rounded-sm">
          <AvatarImage src='https://picsum.photos/400/300'
          // src={
          //   row.original.image || 
          //   UserProfile}
             alt="User" />
          <AvatarFallback>img</AvatarFallback>
        </Avatar>
      ),
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: "productName",
      header: "Product Name",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original?.productName}</div>
        </div>
      ),
    },
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => <ProductSkuCell row={row} />,
    },
    {
      accessorKey: "inventory",
      header: "Inventory",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.inventory}</div>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <div>${row?.original?.price?.toFixed(2)}</div>,
    },
    {
      accessorKey: "rrp",
      header: "RRP",
      cell: ({ row }) => <div>${row?.original?.rrp?.toFixed(2)}</div>,
    },
    {
      accessorKey: "taxClass",
      header: "Tax Class",
      cell: ({ row }) => <div>{row.original.taxClass}%</div>,
    },
    {
      accessorKey: "priceIncludesVAT",
      header: "Price Includes VAT",
      cell: ({ row }) => <div>{row.original.priceIncludesVAT ? "Yes" : "No"}</div>,
    },
    {
      accessorKey: "weight",
      header: "Weight",
      cell: ({ row }) => <div>{row.original.weight} kg</div>,
    },
    {
      accessorKey: "length",
      header: "Length",
      cell: ({ row }) => <div>{row.original.length} mm</div>,
    },
    {
      accessorKey: "width",
      header: "Width",
      cell: ({ row }) => <div>{row.original.width} mm</div>,
    },
    {
      accessorKey: "height",
      header: "Height/Depth",
      cell: ({ row }) => <div>{row.original.height} mm</div>,
    },
    {
      accessorKey: "warehouse",
      header: "Warehouse",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.warehouse}</div>
        </div>
      ),
    },
    {
      accessorKey: "brand",
      header: "Brand",
      cell: ({ row }) => <div>{row.original.brand}</div>,
    },
    {
      accessorKey: "ean",
      header: "EAN",
      cell: ({ row }) => <div>{row.original.ean || "-"}</div>,
    },
    {
      accessorKey: "upc",
      header: "UPC",
      cell: ({ row }) => <div>{row.original.upc || "-"}</div>,
    },
  ]
}
