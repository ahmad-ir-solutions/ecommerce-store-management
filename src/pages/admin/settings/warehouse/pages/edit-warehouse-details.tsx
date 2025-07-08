import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  useDeleteWarehouseZone,
  useGetWarehouse,
  useGetWarehouseZones,
  useUpdateWarehouse,
} from "../core/hooks/useWarehouse"
import { SelectDropdown } from "@/components/shared/select-dropdown"

export function EditWarehouseDetails() {
  const { warehouseId } = useParams<{ warehouseId: string }>()
  const navigate = useNavigate()
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false)
  const { data: warehouseZonesData } = useGetWarehouseZones()
  const warehouseZonesList = warehouseZonesData?.data?.map((zone: any) => ({
    id: zone._id,
    warehouseZoneName: zone.warehouseZoneName,
    warehouseName: zone.warehouse.warehouseName,
  }))

  // Add these state variables after the existing useState declarations
  const [zoneToEdit, setZoneToEdit] = useState<any>(null)

  // Fetch warehouse details
  const { data: warehouseData, isLoading, error } = useGetWarehouse(warehouseId || "")

  // Update warehouse mutation
  const updateWarehouseMutation = useUpdateWarehouse()
  const deleteWarehouseZoneMutation = useDeleteWarehouseZone()

  // Update the handleUpdateZone function:
  const handleUpdateZone = (zone: any) => {
    setZoneToEdit({
      _id: zone.id,
      warehouseZoneName: zone.warehouseZoneName,
      warehouse: zone.warehouse,
    })
    setIsZoneModalOpen(true)
  }

  // Add handlers for modal management:
  const handleAddNewZone = () => {
    setZoneToEdit(null)
    setIsZoneModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsZoneModalOpen(false)
    setTimeout(() => {
      setZoneToEdit(null)
    }, 100)
  }

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
      // warehouseType: "",
      // freeProduct: "",
    },
  })

  // Update form when warehouse data is loaded
  useEffect(() => {
    if (warehouseData) {
      form.reset(warehouseData)
    }
  }, [warehouseData, form])

  // Handle form submission
  const onSubmit = (data: WarehouseFormValues) => {
    if (warehouseId) {
      updateWarehouseMutation.mutate({ id: warehouseId, data })
    }
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error loading warehouse details. Please try again.</p>
      </div>
    )
  }

  return (
    <div>
      <Header title="Edit Warehouse">
        <div className="flex items-center justify-end h-16 px-6 gap-6"></div>
      </Header>
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
                  <h2 className="text-lg font-medium mb-6">Integration Profile</h2>

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
                                      <Input {...field} className="bg-white border-gray-300 rounded-md" />
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
                                      <Input {...field} className="bg-white border-gray-300 rounded-md" />
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
                                      <Input {...field} className="bg-white border-gray-300 rounded-md" />
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
                                      <Input {...field} className="bg-white border-gray-300 rounded-md" />
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
                                      <Input {...field} className="bg-white border-gray-300 rounded-md" />
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
                                      <Input {...field} className="bg-white border-gray-300 rounded-md" />
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
                                      <Input {...field} className="bg-white border-gray-300 rounded-md" />
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
                                      <Input {...field} className="bg-white border-gray-300 rounded-md" />
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
                                      <Input {...field} className="bg-white border-gray-300 rounded-md" />
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
                                      <Input {...field} className="bg-white border-gray-300 rounded-md" />
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
                                        className="bg-white border-gray-300 rounded-md"
                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 1)}
                                      />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                  </div>
                                </FormItem>
                              )}
                            />

                            {/* <FormField
                              control={form.control}
                              name="warehouseType"
                              render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-4">
                                  <FormLabel className="text-sm text-gray-600">Warehouse Type</FormLabel>
                                  <div className="col-span-2">
                                    <SelectDropdown
                                      defaultValue={field.value}
                                      placeholder="Select warehouse type"
                                      options={[
                                        {
                                          id: "Default Warehouse",
                                          label: "Default Warehouse",
                                          value: "Default Warehouse",
                                        },
                                        {
                                          id: "Distribution Center",
                                          label: "Distribution Center",
                                          value: "Distribution Center",
                                        },
                                        {
                                          id: "Fulfillment Center",
                                          label: "Fulfillment Center",
                                          value: "Fulfillment Center",
                                        },
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
                              name="freeProduct"
                              render={({ field }) => (
                                <FormItem className="grid grid-cols-3 items-center gap-4">
                                  <FormLabel className="text-sm text-gray-600">Free Product</FormLabel>
                                  <div className="col-span-2">
                                    <SelectDropdown
                                      defaultValue={field.value}
                                      placeholder="Select product"
                                      options={[
                                        {
                                          id: "Search For Product",
                                          label: "Search For Product",
                                          value: "Search For Product",
                                        },
                                        { id: "Product 1", label: "Product 1", value: "Product 1" },
                                        { id: "Product 2", label: "Product 2", value: "Product 2" },
                                      ]}
                                      onChange={field.onChange}
                                      className="border-gray-200 bg-white"
                                    />
                                    <FormMessage className="text-red-500" />
                                  </div>
                                </FormItem>
                              )}
                            /> */}
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
                          disabled={updateWarehouseMutation.isPending}
                        >
                          {updateWarehouseMutation.isPending ? (
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
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">Warehouse Zones</CardTitle>
                  <Button variant="primary" size="lg" className="rounded-xl" onClick={handleAddNewZone}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Zone
                  </Button>
                </CardHeader>
                <CardContent>
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
                            <TableRow key={index} className="border-gray-200 border-b">
                              <TableHead className="p-3">
                                <Checkbox className="border-gray-400" />
                              </TableHead>
                              <TableHead className="p-3">{zone.warehouseZoneName}</TableHead>
                              <TableHead className="p-3">{zone.warehouseName}</TableHead>
                              <TableHead className="p-3">
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
                              </TableHead>
                            </TableRow>
                          ))
                        : null}
                    </TableBody>
                  </Table>
                  {warehouseZonesList && warehouseZonesList.length === 0 && (
                    <div className="flex items-center justify-center py-10 text-gray-500">
                      There are no Warehouse Zones to display.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* Add Warehouse Zone Modal */}
      <AddWarehouseZoneModal
        isOpen={isZoneModalOpen}
        onClose={handleCloseModal}
        zoneToEdit={zoneToEdit}
      />
    </div>
  )
}

export default EditWarehouseDetails
