// import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/shared/header"
import { Button } from "@/components/ui/button"
import { CustomSearch } from '@/components/shared/custom-search'
import { Plus } from "lucide-react"

// interface Warehouse {
//   id: string
//   warehouse: string
//   adress1: string
//   adress2: string
//   city: string
//   postCode: string
//   default: string
// }

export function ExistingWarehouse() {
  const navigate = useNavigate()
  const warehouse = [
       {
      id: "1",
      warehouse: "Benson",
      adress1: "benson@xyz.co",
      adress2: "sgdsgd  sdf s",
      city: "Administrator",
      postCode: "3434",
      default: "is Default",
    },
  ]

  const handleAddWarehouse = () => {
    // navigate("/admin/settings/users/add")
  }

  const handleEditWarehouse = (warehouseId: string) => {
    navigate(`/admin/settings/warehouse/edit-warehouse-details/${warehouseId}`)
  }

  return (
    <div>
      <Header title="Warehouse">
      <div className="flex items-center justify-end h-16 px-6 gap-6">
        <CustomSearch className='w-[25rem]' onClick={() => {}} placeholder="Search by name/Master SKU/Channel SKU" />
        <div className="flex items-center gap-4">
          <Button  variant="default" size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg" onClick={handleAddWarehouse}>
          <Plus />
            Add New
          </Button>
        </div>
      </div>
      </Header>
      <div className="mt-6">
        <Card className="bg-white rounded-2xl border-none shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
                Existing Warehouse
            </CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                    <TableHead className="p-3 rounded-l-lg">Warehouse</TableHead>
                    <TableHead className="p-3">Address Line 1</TableHead>
                    <TableHead className="p-3">Address Line 2</TableHead>
                    <TableHead className="p-3">City</TableHead>
                    <TableHead className="p-3">Post Code</TableHead>
                    <TableHead className="p-3">Default</TableHead>
                    <TableHead className="p-3 rounded-r-lg">Edit</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {/* Static example row; you can map through your data here */}
                {warehouse.map((item) => (
                    <TableRow key={item.id} className="border-b">
                    <TableCell className="py-3 font-medium">{item.warehouse}</TableCell>
                    <TableCell className="py-3">{item.adress1}</TableCell>
                    <TableCell className="py-3">{item.adress2}</TableCell>
                    <TableCell className="py-3">{item.city}</TableCell>
                    <TableCell className="py-3">{item.postCode}</TableCell>
                    <TableCell className="py-3">{item.default}</TableCell>
                    <TableCell className="py-3">
                        <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditWarehouse(item.id)}
                        className="text-[#3D8BFF] hover:text-[#3D8BFF] hover:bg-blue-50 underline"
                        >
                            Edit/View
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ExistingWarehouse;