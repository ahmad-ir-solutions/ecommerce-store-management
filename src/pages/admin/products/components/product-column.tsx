import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import UserProfile from "../../../../assets/images/avatar.png"
import { Button } from "@/components/ui/button"
import { ProductItem } from "../core/_modals"

export function useProductColumns(): ColumnDef<ProductItem>[] {
  return [
    {
      accessorKey: "checked",
      header: ({ table }) => (
        <Checkbox
          className="w-5 h-5 rounded-sm border-[#BBC2CB]"
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <div>
          <Checkbox
            className="w-5 h-5 rounded-sm border-[#BBC2CB]"
            checked={row.getIsSelected()}
            onCheckedChange={row.getToggleSelectedHandler()}
          />
        </div>
      ),
      enableSorting: false,
      enableColumnFilter: false,
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
          <AvatarImage src={row.original.image || UserProfile} alt="User" />
          <AvatarFallback>img</AvatarFallback>
        </Avatar>
      ),
      enableSorting: false,
      enableColumnFilter: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          {/* <div className="text-sm text-muted-foreground">{row.original.description}</div> */}
        </div>
      ),
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
              <Button variant="link" onClick={() => (window.location.href = `/products/edit/${row.original.sku}`)} className="font-medium">{row.original.sku}</Button>
            </div>

            {isHovered && (
              <div className="absolute left-0 -bottom-8 flex space-x-2 bg-white shadow-sm p-2 rounded z-10">
                <button
                  onClick={() => (window.location.href = `/products/edit/${row.original.sku}`)}
                  className="text-blue-500 hover:text-blue-700 text-xs"
                >
                  Edit
                </button>
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
      cell: ({ row }) => <div>{row.original.price}</div>,
    },
    {
      accessorKey: "rrp",
      header: "RRP",
      cell: ({ row }) => <div>{row.original.rrp}</div>,
    },
    {
      accessorKey: "textClass",
      header: "Text Class",
      cell: ({ row }) => <div>{row.original.textClass}</div>,
    },
    {
      accessorKey: "priceIncludesVat",
      header: "Price Includes VAT",
      cell: ({ row }) => <div>{row.original.priceIncludesVat}</div>,
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
      accessorKey: "heightDepth",
      header: "Height/Depth",
      cell: ({ row }) => <div>{row.original.heightDepth} mm</div>,
    },
    {
      accessorKey: "warehouse",
      header: "Warehouse",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.warehouse}</div>
          <div className="text-sm text-muted-foreground">{row.original.warehouseDetail}</div>
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
    },
    {
      accessorKey: "upc",
      header: "UPC",
      cell: ({ row }) => <div>{row.original.upc}</div>,
    },

    // {
    //   accessorKey: "mpn",
    //   header: "MPN",
    // },
    // {
    //   accessorKey: "supplierSku",
    //   header: "Supplier SKU",
    // },
    // {
    //   accessorKey: "supplierInventory",
    //   header: "Supplier Inventory",
    // },
    // {
    //   accessorKey: "outOfStockDate",
    //   header: "Out Of Stock Date",
    // },
    // {
    //   accessorKey: "onPurchaseOrder",
    //   header: "On Purchase Order",
    // },
    // {
    //   accessorKey: "onBackOrder",
    //   header: "On Back Order",
    // },
    // {
    //   accessorKey: "soldLast30Days",
    //   header: "Sold Last 30 Days",
    // },
    // {
    //   accessorKey: "daysSinceLastOrder",
    //   header: "Days Since Last Order",
    // },
    // {
    //   accessorKey: "stockLocations",
    //   header: "Stock Locations",
    // },
    // {
    //   accessorKey: "cost",
    //   header: "Cost",
    //   cell: ({ row }) => <div>£{row.original.cost}</div>,
    // },
    // {
    //   accessorKey: "createDate",
    //   header: "Create Date",
    //   cell: ({ row }) => (
    //     <div>
    //       <div>{row.original.createDate}</div>
    //       <div className="text-sm text-muted-foreground">{row.original.createTime}</div>
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: "suppliers",
    //   header: "Suppliers",
    //   cell: ({ row }) => (
    //     <div>
    //       <div className="font-medium">{row.original.suppliers}</div>
    //       <div className="text-sm text-muted-foreground">{row.original.suppliersDetail}</div>
    //     </div>
    //   ),
    // },
  ]
}
