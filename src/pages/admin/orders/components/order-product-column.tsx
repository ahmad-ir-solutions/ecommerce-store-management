import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"
import { ProductItem } from "../../products/core/_modals"

export function useOrderProductColumns(): ColumnDef<ProductItem>[] {
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
        accessorKey: "qty",
        header: "Qty",
        cell: ({ row }) => <div></div>
    },
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => {
        const [isHovered, setIsHovered] = useState(false)

        return (
          <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div>
              <Link to={`/admin/products/${row.original.id}`}  className="text-blue-500 hover:text-blue-700 hover:underline">{row.original.sku}</Link>
            </div>

            {isHovered && (
              <div className="absolute left-0 -bottom-8 flex space-x-2 bg-white shadow-sm p-2 rounded z-10">
                <Link
                  to={`/admin/products/${row.original.id}`}
                  className="text-blue-500 hover:text-blue-700 text-xs"
                >
                  Edit
                </Link>
                <button
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("open-delete-modal", { detail: row.original }))
                  }
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("open-archive-modal", { detail: row.original }))
                  }
                  className="text-amber-500 hover:text-amber-700 text-xs"
                >
                  Archive
                </button>
              </div>
            )}
          </div>
        )
      },
    },
    {
        accessorKey: "productName",
        header: "Product Name",
        cell: ({ row }) => <div>{row.original.price}</div>,
    },
    {
        accessorKey: "mpn",
        header: "MPN",
    },
    {
      accessorKey: "ean",
      header: "EAN",
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
        cell: ({ row }) => <div>£{row.original.price}</div>,
    },
    {
        accessorKey: "view",
        header: "",
        cell: ({ row }) => <Link to={`/admin/products/${row.original.id}`}>View</Link>,
    },
  ]
}
