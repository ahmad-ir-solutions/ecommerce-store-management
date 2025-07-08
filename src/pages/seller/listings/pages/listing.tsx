import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { CustomSearch } from "@/components/shared/custom-search"
import { ReusableTable } from "@/components/shared/reusableTable"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/shared/header"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"
import { AddToChannelListModal } from "../components/modal/add-to-channel-list-modal"
import { useDeleteWoocommerceProduct, useGetWoocommerceProducts } from "../core/hooks/useListing"
import { Trash2Icon } from "lucide-react"
import { debounce } from 'lodash'
import { ProductQueryParams } from "@/pages/admin/products/core/_modals"

interface UserListing {
  _id: string
  image: string
  masterSku: string
  name: string
  warehouse: string
  channel: string
  channelSku: string
  quantity: number
  inventoryPrice: string
  channelPrice: string
  status: string
  siteUrl: string
}

export function SellerListingsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const deleteProductMutation = useDeleteWoocommerceProduct()
  const [queryParams, setQueryParams] = useState<ProductQueryParams>({
    // sortBy: "createdAt",
    sortOrder: "desc",
  })
  
  const { data: woocommerceProducts = [], isLoading, refetch } = useGetWoocommerceProducts(queryParams);
  
  // Debounce search input
   const handleSearch = useCallback(
    debounce((query: string) => {
      setQueryParams((prev) => ({
        ...prev,
        search: query,
        // page: 1,
      }))
    }, 500),
    []
  )

  const handleDelete = (id: string, siteUrl: string) => {
    deleteProductMutation.mutate({
      productId: id,
      siteUrl: siteUrl,
    })
    refetch()
  }
  // console.log(woocommerceProducts, "woocommerceProducts");

  const mappedListings: UserListing[] = woocommerceProducts.flatMap((site: any) =>
    (site.products || []).map((product: any) => {
      const meta = Object.fromEntries(product.meta_data.map((m: any) => [m.key, m.value]));
      return {
        _id: String(product.id),
        image: product.images?.[0]?.src || "/placeholder.svg",
        masterSku: product.sku || "N/A",
        name: product.name || "N/A",
        warehouse: meta.warehouse || "Default",
        channel: "WooCommerce",
        channelSku: product.sku || "N/A",
        quantity: product.stock_quantity ?? 0,
        inventoryPrice: product.price ? `£${product.price}` : "N/A",
        channelPrice: product.price ? `£${product.price}` : "N/A",
        status: product.status === "publish" ? "Binded" : "Unbinded",
        siteUrl: site.siteUrl || "N/A",
      };
    })
  );

  const userListingColumns = [
    {
      key: "checkbox",
      title: "",
      render: (
        row: UserListing,
        selectedRows?: string[],
        toggleSelectRow?: (id: string) => void,
        toggleSelectAll?: () => void,
        isAllSelected?: boolean,
      ) => {
        if (row._id === "header") {
          // This is for the header row
          return <Checkbox checked={isAllSelected || false} onCheckedChange={toggleSelectAll} />
        }
        return (
          <Checkbox
            checked={selectedRows?.includes(row._id) || false}
            onCheckedChange={() => toggleSelectRow?.(row._id)}
          />
        )
      },
      width: "50px",
    },
    {
      key: "image",
      title: "Image",
      render: (row: UserListing) => (
        <img src={row.image || "/placeholder.svg"} alt={row.name} className="w-12 h-12 rounded object-cover" />
      ),
      width: "80px",
    },
    {
      key: "masterSku",
      title: "Master SKU",
      render: (row: UserListing) => (
        <Link to={`edit-listing-info/${row._id}?siteUrl=${encodeURIComponent(row.siteUrl)}`} className="text-[#024AFE]">
          {row.masterSku}
        </Link>
      ),
      width: "140px",
    },
    {
      key: "name",
      title: "Name",
      width: "220px",
    },
    {
      key: "warehouse",
      title: "Warehouse",
      width: "120px",
    },
    {
      key: "channel",
      title: "Channel",
      render: (row: UserListing) => (
        <div className="flex items-center">
          {row.channel === "Amazon" && <img src="/placeholder.svg?height=20&width=60" alt="Amazon" className="h-5" />}
          {row.channel !== "Amazon" && <span className="text-sm font-medium">{row.channel}</span>}
        </div>
      ),
      width: "100px",
    },
    {
      key: "channelSku",
      title: "Channel SKU",
      width: "140px",
    },
    {
      key: "quantity",
      title: "Quantity",
      width: "100px",
    },
    {
      key: "inventoryPrice",
      title: "Inventory Price",
      width: "140px",
    },
    {
      key: "channelPrice",
      title: "Channel Price",
      width: "140px",
    },
    {
      key: "status",
      title: "Status",
      render: (row: UserListing) => (
        <Badge
          variant={row.status === "Binded" ? "default" : "secondary"}
          className={row.status === "Binded" ? "bg-green-100 text-green-800" : ""}
        >
          {row.status}
        </Badge>
      ),
      width: "100px",
    },
    {
      key: "action",
      title: "Action",
      render: (row: UserListing) => {
        console.log(row, "row");
        
        return (
        <Button
          size="sm"
          variant="primary"
          onClick={() => handleDelete(row._id, row.siteUrl)}
          className="bg-red-600 text-white hover:bg-red-700">
            <Trash2Icon className="w-4 h-4" />
          </Button>
      )
      },
      width: "100px",
    },
  ]

  return (
    <div>
      {/* Header */}
      <Header title="Seller Listings">
        <CustomSearch
          placeholder="Search by name/Master SKU/Channel SKU"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
        />
        {/* <Button variant="primary" className="rounded-lg"  onClick={() => setIsAddModalOpen(true)}>
          Add New
        </Button> */}
      </Header>

      {/* Table */}
      <ReusableTable
        title="Listing On Channel"
        data={mappedListings}
        columns={userListingColumns}
        itemsPerPage={8}
        isLoading={isLoading}
      />

      <AddToChannelListModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}

export default SellerListingsPage
