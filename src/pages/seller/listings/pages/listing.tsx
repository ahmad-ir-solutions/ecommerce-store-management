import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CustomSearch } from "@/components/shared/custom-search"
import { ReusableTable } from "@/components/shared/reusableTable"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/shared/header"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"

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
}

export function SellerListingsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleEdit = (row: UserListing) => {
    console.log("Edit clicked for", row)
    // Handle edit functionality here
  }

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
        <Link to={`edit-listing-info/${row._id}`} className="text-[#024AFE]">
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
      render: (row: UserListing) => (
        <Button
          size="sm"
          variant="primary"
          onClick={() => handleEdit(row)}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Edit
        </Button>
      ),
      width: "100px",
    },
  ]

  const mockUserListings: UserListing[] = [
    {
      _id: "1",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop",
      masterSku: "805432000553",
      name: "Xerjoff Accento EDP-S 100ml",
      warehouse: "Default",
      channel: "Amazon",
      channelSku: "805432000553",
      quantity: 546,
      inventoryPrice: "£112.95",
      channelPrice: "£143.95",
      status: "Binded",
    },
    {
      _id: "2",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop",
      masterSku: "805432000554",
      name: "Xerjoff Accento EDP-S 100ml",
      warehouse: "Default",
      channel: "Amazon",
      channelSku: "805432000554",
      quantity: 546,
      inventoryPrice: "£112.95",
      channelPrice: "£143.95",
      status: "Binded",
    },
    {
      _id: "3",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop",
      masterSku: "805432000555",
      name: "Xerjoff Accento EDP-S 100ml",
      warehouse: "Default",
      channel: "Amazon",
      channelSku: "805432000555",
      quantity: 546,
      inventoryPrice: "£112.95",
      channelPrice: "£143.95",
      status: "Binded",
    },
    {
      _id: "4",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop",
      masterSku: "805432000556",
      name: "Xerjoff Accento EDP-S 100ml",
      warehouse: "Default",
      channel: "Amazon",
      channelSku: "805432000556",
      quantity: 546,
      inventoryPrice: "£112.95",
      channelPrice: "£143.95",
      status: "Binded",
    },
    {
      _id: "5",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop",
      masterSku: "805432000557",
      name: "Xerjoff Accento EDP-S 100ml",
      warehouse: "Default",
      channel: "Amazon",
      channelSku: "805432000557",
      quantity: 546,
      inventoryPrice: "£112.95",
      channelPrice: "£143.95",
      status: "Binded",
    },
    {
      _id: "6",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop",
      masterSku: "805432000558",
      name: "Xerjoff Accento EDP-S 100ml",
      warehouse: "Default",
      channel: "Amazon",
      channelSku: "805432000558",
      quantity: 546,
      inventoryPrice: "£112.95",
      channelPrice: "£143.95",
      status: "Binded",
    },
    {
      _id: "7",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop",
      masterSku: "805432000559",
      name: "Xerjoff Accento EDP-S 100ml",
      warehouse: "Default",
      channel: "Amazon",
      channelSku: "805432000559",
      quantity: 546,
      inventoryPrice: "£112.95",
      channelPrice: "£143.95",
      status: "Binded",
    },
    {
      _id: "8",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop",
      masterSku: "805432000560",
      name: "Xerjoff Accento EDP-S 100ml",
      warehouse: "Default",
      channel: "Amazon",
      channelSku: "805432000560",
      quantity: 546,
      inventoryPrice: "£112.95",
      channelPrice: "£143.95",
      status: "Binded",
    },
    {
      _id: "9",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop",
      masterSku: "805432000561",
      name: "Xerjoff Accento EDP-S 100ml",
      warehouse: "Default",
      channel: "Amazon",
      channelSku: "805432000561",
      quantity: 546,
      inventoryPrice: "£112.95",
      channelPrice: "£143.95",
      status: "Binded",
    },
    {
      _id: "10",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop",
      masterSku: "805432000562",
      name: "Xerjoff Accento EDP-S 100ml",
      warehouse: "Default",
      channel: "Amazon",
      channelSku: "805432000562",
      quantity: 546,
      inventoryPrice: "£112.95",
      channelPrice: "£143.95",
      status: "Binded",
    },
    {
      _id: "11",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop",
      masterSku: "805432000563",
      name: "Xerjoff Accento EDP-S 100ml",
      warehouse: "Default",
      channel: "Amazon",
      channelSku: "805432000563",
      quantity: 546,
      inventoryPrice: "£112.95",
      channelPrice: "£143.95",
      status: "Binded",
    },
  ]

  return (
    <div>
      {/* Header */}
      <Header title="User Listing">
        <CustomSearch
          placeholder="Search by name/Master SKU/Channel SKU"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="primary" className="rounded-lg">
          Add New
        </Button>
      </Header>

      {/* Table */}
      <ReusableTable
        title="Listing On Channel"
        data={mockUserListings}
        columns={userListingColumns}
        searchTerm={searchTerm}
        itemsPerPage={10}
        isLoading={false}
      />
    </div>
  )
}

export default SellerListingsPage
