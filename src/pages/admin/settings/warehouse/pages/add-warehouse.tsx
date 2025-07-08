import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { warehouseSchema } from "../core/_schema"
import { Header } from "@/components/shared/header"
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react"
import type { WarehouseFormValues } from "../core/_modal"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { AddWarehouseZoneModal } from "../components/modal/add-warehouse-zone-modal"
import {
  useCreateWarehouse,
  useDeleteWarehouseZone,
  useGetWarehouseZones,
} from "../core/hooks/useWarehouse"
import { SelectDropdown } from "@/components/shared/select-dropdown"
import { CustomPagination } from "@/components/shared/custom-pagination"

export function AddWarehouse() {
  const navigate = useNavigate()
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false)
  const [zoneToEdit, setZoneToEdit] = useState<any>(null)

  const [queryParams, setQueryParams] = useState<any>({
    sortBy: "createdAt",
    sortOrder: "desc",
    search: "",
    limit: 10, 
    page: 1,
  })

  // Create warehouse mutation
  const { data: warehouseZonesData } = useGetWarehouseZones(queryParams)

  const warehouseZonesList =
    warehouseZonesData?.data?.map((zone: any) => ({
      id: zone._id,
      warehouseZoneName: zone.warehouseZoneName,
      warehouseName: zone.warehouse?.warehouseName || "Unknown",
      warehouse: zone.warehouse?._id || "",
      _id: zone._id,
    })) || []

  const createWarehouseMutation = useCreateWarehouse()
  const deleteWarehouseZoneMutation = useDeleteWarehouseZone()

  // Initialize form with react-hook-form
  const form = useForm<WarehouseFormValues>({
    resolver: zodResolver(warehouseSchema),
    defaultValues: {
      contactName: "",
      warehouseName: "",
      address: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      postcode: "",
      collectionPoint: "",
      country: "",
      countryCode: "",
      handlingTimeInDays: 1,
    },
  })

  // Handle form submission
  const onSubmit = (data: WarehouseFormValues) => {
    createWarehouseMutation.mutate(data)
    form.reset()
  }

  // Handle cancel
  const handleCancel = () => {
    navigate("/admin/settings/warehouse")
  }

  const handleDeleteZone = (id: string) => {
    if (window.confirm("Are you sure you want to delete this zone?")) {
      deleteWarehouseZoneMutation.mutate(id)
    }
  }

  const handleUpdateZone = (zone: any) => {
    setZoneToEdit({
      _id: zone.id,
      warehouseZoneName: zone.warehouseZoneName,
      warehouse: zone.warehouseName,
    })
    setIsZoneModalOpen(true)
  }

  const handleAddNewZone = () => {
    setZoneToEdit(null)
    setIsZoneModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsZoneModalOpen(false)
    // Add a small delay to ensure modal closes before clearing state
    setTimeout(() => {
      setZoneToEdit(null)
    }, 100)
  }

  const handlePageChange = (page: number) => {
    setQueryParams((prev: any) => ({ 
      ...prev,
      page,
    }))
  }

  const totalPages = warehouseZonesData?.total ? Math.ceil(warehouseZonesData.total / (queryParams.limit || 10)) : 0
  const currentPage = queryParams.page
    

  return (
    <div>
      <Header title="Add Warehouse"></Header>
      <div className="mt-6">
        <div>
          <Tabs defaultValue="warehouse-information">
            <TabsList className="mb-4 space-x-4">
              <TabsTrigger
                value="warehouse-information"
                className="data-[state=active]:bg-[#024AFE] bg-white data-[state=active]:text-white p-6 rounded-2xl text-base font-normal"
              >
                Warehouse Information
              </TabsTrigger>
              <TabsTrigger
                value="warehouse-zone"
                className="data-[state=active]:bg-[#024AFE] bg-white data-[state=active]:text-white p-6 rounded-2xl text-base font-normal"
              >
                Warehouse Zone
              </TabsTrigger>
            </TabsList>

            <TabsContent value="warehouse-information">
              <Card className="border-none bg-white shadow-none px-0 rounded-2xl">
                <CardContent className="p-6">
                  <h2 className="text-lg font-medium mb-6">Warehouse Information</h2>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="bg-[#f0f8ff] p-6 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                          {/* Left Column */}
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="contactName"
                              render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-4">
                                  <FormLabel className="text-sm text-gray-600">Contact Name</FormLabel>
                                  <div className="col-span-2">
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter contact name"
                                        className="bg-white border-gray-300 rounded-md"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="warehouseName"
                              render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-4">
                                  <FormLabel className="text-sm text-gray-600">Warehouse Name *</FormLabel>
                                  <div className="col-span-2">
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter warehouse name"
                                        className="bg-white border-gray-300 rounded-md"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-4">
                                  <FormLabel className="text-sm text-gray-600">Address *</FormLabel>
                                  <div className="col-span-2">
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter address"
                                        className="bg-white border-gray-300 rounded-md"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="address1"
                              render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-4">
                                  <FormLabel className="text-sm text-gray-600">Address 1</FormLabel>
                                  <div className="col-span-2">
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter address line 1"
                                        className="bg-white border-gray-300 rounded-md"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="address2"
                              render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-4">
                                  <FormLabel className="text-sm text-gray-600">Address 2</FormLabel>
                                  <div className="col-span-2">
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter address line 2"
                                        className="bg-white border-gray-300 rounded-md"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-4">
                                  <FormLabel className="text-sm text-gray-600">City *</FormLabel>
                                  <div className="col-span-2">
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter city"
                                        className="bg-white border-gray-300 rounded-md"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-4">
                                  <FormLabel className="text-sm text-gray-600">State</FormLabel>
                                  <div className="col-span-2">
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter state/province"
                                        className="bg-white border-gray-300 rounded-md"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Right Column */}
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="postcode"
                              render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-4">
                                  <FormLabel className="text-sm text-gray-600">Postcode/ Zip Code *</FormLabel>
                                  <div className="col-span-2">
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter postcode"
                                        className="bg-white border-gray-300 rounded-md"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="collectionPoint"
                              render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-4">
                                  <FormLabel className="text-sm text-gray-600">Collection Point</FormLabel>
                                  <div className="col-span-2">
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter collection point"
                                        className="bg-white border-gray-300 rounded-md"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="country"
                              render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-4">
                                  <FormLabel className="text-sm text-gray-600">Country</FormLabel>
                                  <div className="col-span-2">
                                    <SelectDropdown
                                      defaultValue={field.value}
                                      placeholder="Select a country"
                                      options={[
                                        { id: "United Kingdom", label: "United Kingdom", value: "United Kingdom" },
                                        { id: "United States", label: "United States", value: "United States" },
                                        { id: "Canada", label: "Canada", value: "Canada" },
                                        { id: "Australia", label: "Australia", value: "Australia" },
                                      ]}
                                      onChange={field.onChange}
                                      className="border-gray-200 bg-white"
                                    />
                                    <FormMessage className="text-red-500" />
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="countryCode"
                              render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-4">
                                  <FormLabel className="text-sm text-gray-600">Country Code</FormLabel>
                                  <div className="col-span-2">
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter country code"
                                        className="bg-white border-gray-300 rounded-md"
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="handlingTimeInDays"
                              render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-4">
                                  <FormLabel className="text-sm text-gray-600">Handling Time (in days) *</FormLabel>
                                  <div className="col-span-2">
                                    <FormControl>
                                      <Input
                                        {...field}
                                        type="number"
                                        placeholder="Enter handling time"
                                        className="bg-white border-gray-300 rounded-md"
                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 1)}
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4">
                        <Button
                          variant="outline"
                          type="button"
                          className="rounded-lg bg-transparent"
                          size="lg"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          className="rounded-lg"
                          size="lg"
                          disabled={createWarehouseMutation.isPending}
                        >
                          {createWarehouseMutation.isPending ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="warehouse-zone">
              <Card className="bg-white rounded-2xl border-none shadow-none">
                <CardContent className="">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Warehouse Zones</h3>
                    <Button variant="primary" size="lg" className="rounded-xl" onClick={handleAddNewZone}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Zone
                    </Button>
                  </div>

                  <div className="rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                          <TableHead className="p-3 rounded-l-lg">
                            <Checkbox className="border-gray-400" />
                          </TableHead>
                          <TableHead className="p-3">Zone Name</TableHead>
                          <TableHead className="p-3">Warehouse</TableHead>
                          <TableHead className="p-3 rounded-r-lg">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Display warehouse zones when available */}
                        {warehouseZonesList && warehouseZonesList.length > 0
                          ? warehouseZonesList.map((zone, index) => (
                              <TableRow key={index} className="border-b border-gray-200">
                                <TableHead className="p-3">
                                  <Checkbox className="border-gray-400" />
                                </TableHead>
                                <TableHead className="p-3">{zone.warehouseZoneName}</TableHead>
                                <TableHead className="p-3">{zone.warehouseName}</TableHead>
                                <TableHead className="p-3">
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-[#024AFE] hover:text-blue-700 pl-1"
                                      onClick={() => handleUpdateZone(zone)}
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-red-500 hover:text-red-700 p-1"
                                      onClick={() => handleDeleteZone(zone.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableHead>
                              </TableRow>
                            ))
                          : null}
                      </TableBody>
                    </Table>
                    {warehouseZonesList && warehouseZonesList.length === 0 && (
                      <div className="flex items-center justify-center py-10 text-gray-500">
                        There are no Warehouse Zones to display. Add a zone after creating the warehouse.
                      </div>
                    )}
                  </div>
                </CardContent>
                <CustomPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={warehouseZonesData?.total || 0}
                  itemsPerPage={queryParams.limit}
                  onPageChange={handlePageChange}
                />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* Add/Edit Warehouse Zone Modal */}
      <AddWarehouseZoneModal
        isOpen={isZoneModalOpen}
        onClose={handleCloseModal}
        zoneToEdit={zoneToEdit}
      />
    </div>
  )
}

export default AddWarehouse
