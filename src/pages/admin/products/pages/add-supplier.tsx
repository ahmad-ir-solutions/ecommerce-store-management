import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { ChevronDown, Plus } from "lucide-react"

import { Header } from "@/components/shared/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useSupplierStore } from "@/store/admin/supplier-store"
import { supplierSchema } from "../core/_schema"
import { showErrorMessage, showInfoMessage, showSuccessMessage } from "@/lib/utils/messageUtils"
import { SupplierFormValues } from "../core/_modals"

export const AddSupplierPage = () => {
  const addSupplier = useSupplierStore((state) => state.addSupplier)

  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues:  {
        supplierName: "",
        address: "",
        city: "",
        country: "UK",
        postcode: "",
        supplierCurrency: "British Pound",
        isManufacturer: true,
        sendEmailWhenProductBelowReorderLevel: false,
        sendEmailWhenProductBelowOutOfStockThreshold: true,
        includeProductsEqualToReorderLevel: true,
        excludeOutOfStockProductsWithZeroManualReorderLevel: true,
        includeSupplierInRequisitions: false,
        consolidateDropshipSupplierEmails: true,
        address2: "",
        countryState: "",
        phone: "",
        supplierCode: "",
        supplierReference: "",
        commaDelimitedEmails: "",
        minimumOrderValue: "",
        supplierEmail: "",
        contactEmail: "",
        leadTime: "",
        purchaseOrderMode: "",
        purchaseOrderShippingCostType: "British Pound",
        purchaseOrderChangeToStatus: "",
        totalPurchaseOrderShippingCost: "",
        dropShipmentShippingCostType: "British Pound",
        dropShipmentChangeToStatus: "",
        totalDropShipmentShippingCost: "",
        transferMethod: "Manual",
        exportMethod: "CSV",
        templateType: "CSV",
        defaultExportMethod: false,
        exportDelimiter: ",",
        exportHeaders: true,
      },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SupplierFormValues) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return data
    },
    onSuccess: (data) => {
      addSupplier(data)
      showSuccessMessage("Supplier has been added successfully")
    //   navigate("/suppliers")
    },
    onError: (error) => {
      showErrorMessage(error.message || "Failed to add supplier. Please try again.")
    },
  })

  const onSubmit = (data: SupplierFormValues) => {
    mutate(data)
  }

  const findEmail = () => {
    showInfoMessage("Searching for email based on postcode...")
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <Header title="Products" />
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground mr-2">Suppliers</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="h-4 w-4 mr-2" /> Add Supplier
        </Button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Order Information */}
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="supplierName">Supplier Name *</Label>
                <Input
                  id="supplierName"
                  {...form.register("supplierName")}
                  className={form.formState.errors.supplierName ? "border-red-500" : ""}
                />
                {form.formState.errors.supplierName && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.supplierName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="address2">Address 2</Label>
                <Input id="address2" {...form.register("address2")} />
              </div>

              <div>
                <Label htmlFor="countryState">Country/State</Label>
                <Input id="countryState" {...form.register("countryState")} />
              </div>

              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Label htmlFor="postcode">Postcode/Zip Code *</Label>
                  <Input
                    id="postcode"
                    {...form.register("postcode")}
                    className={form.formState.errors.postcode ? "border-red-500" : ""}
                  />
                  {form.formState.errors.postcode && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.postcode.message}</p>
                  )}
                </div>
                <Button type="button" variant="outline" onClick={findEmail} className="mb-[2px]">
                  Find Email
                </Button>
              </div>

              <div>
                <Label htmlFor="supplierCode">Supplier Code</Label>
                <Input id="supplierCode" {...form.register("supplierCode")} />
              </div>

              <div>
                <Label htmlFor="supplierCurrency">Supplier Currency</Label>
                <Select
                  defaultValue={form.getValues("supplierCurrency")}
                  onValueChange={(value) => form.setValue("supplierCurrency", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="British Pound">British Pound</SelectItem>
                    <SelectItem value="US Dollar">US Dollar</SelectItem>
                    <SelectItem value="Euro">Euro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="commaDelimitedEmails">Comma Delimited Email Addresses To Send To</Label>
                <Input id="commaDelimitedEmails" {...form.register("commaDelimitedEmails")} />
              </div>

              <div>
                <Label htmlFor="minimumOrderValue">Minimum Order Value</Label>
                <Input id="minimumOrderValue" {...form.register("minimumOrderValue")} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="sendEmailWhenProductBelowReorderLevel">
                  Send Email When Product Below Reorder Level
                </Label>
                <Switch
                  id="sendEmailWhenProductBelowReorderLevel"
                  checked={form.watch("sendEmailWhenProductBelowReorderLevel")}
                  onCheckedChange={(checked) => form.setValue("sendEmailWhenProductBelowReorderLevel", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="sendEmailWhenProductBelowOutOfStockThreshold">
                  Send Email When Product Below Out of Stock Threshold
                </Label>
                <Switch
                  id="sendEmailWhenProductBelowOutOfStockThreshold"
                  checked={form.watch("sendEmailWhenProductBelowOutOfStockThreshold")}
                  onCheckedChange={(checked) => form.setValue("sendEmailWhenProductBelowOutOfStockThreshold", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="includeProductsEqualToReorderLevel">Include Products Equal To Reorder Level</Label>
                <Switch
                  id="includeProductsEqualToReorderLevel"
                  checked={form.watch("includeProductsEqualToReorderLevel")}
                  onCheckedChange={(checked) => form.setValue("includeProductsEqualToReorderLevel", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="excludeOutOfStockProductsWithZeroManualReorderLevel" className="text-sm">
                  Exclude Out of Stock Products With Zero Manual Reorder Level
                </Label>
                <Switch
                  id="excludeOutOfStockProductsWithZeroManualReorderLevel"
                  checked={form.watch("excludeOutOfStockProductsWithZeroManualReorderLevel")}
                  onCheckedChange={(checked) =>
                    form.setValue("excludeOutOfStockProductsWithZeroManualReorderLevel", checked)
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  {...form.register("address")}
                  className={form.formState.errors.address ? "border-red-500" : ""}
                />
                {form.formState.errors.address && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.address.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  {...form.register("city")}
                  className={form.formState.errors.city ? "border-red-500" : ""}
                />
                {form.formState.errors.city && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.city.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Select
                  defaultValue={form.getValues("country")}
                  onValueChange={(value) => form.setValue("country", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UK">UK</SelectItem>
                    <SelectItem value="US">US</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...form.register("phone")} />
              </div>

              <div>
                <Label htmlFor="supplierReference">Suppliers Reference</Label>
                <Input id="supplierReference" {...form.register("supplierReference")} />
              </div>

              <div>
                <Label htmlFor="supplierEmail">Supplier E-mail Address</Label>
                <Input
                  id="supplierEmail"
                  type="email"
                  {...form.register("supplierEmail")}
                  className={form.formState.errors.supplierEmail ? "border-red-500" : ""}
                />
                {form.formState.errors.supplierEmail && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.supplierEmail.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="leadTime">Lead Time</Label>
                <Input id="leadTime" {...form.register("leadTime")} />
              </div>

              <div>
                <Label htmlFor="purchaseOrderMode">Purchase Order Mode</Label>
                <Select
                  defaultValue={form.getValues("purchaseOrderMode")}
                  onValueChange={(value) => form.setValue("purchaseOrderMode", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Express">Express</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="isManufacturer">Is Manufacturer</Label>
                <Switch
                  id="isManufacturer"
                  checked={form.watch("isManufacturer")}
                  onCheckedChange={(checked) => form.setValue("isManufacturer", checked)}
                />
              </div>

              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  {...form.register("contactEmail")}
                  className={form.formState.errors.contactEmail ? "border-red-500" : ""}
                />
                {form.formState.errors.contactEmail && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.contactEmail.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Purchase Order / Drop Shipment Information */}
        <Card>
          <CardHeader>
            <CardTitle>Purchase Order / Drop Shipment Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="purchaseOrderShippingCostType">Purchase Order Shipping Cost Type</Label>
                <Select
                  defaultValue={form.getValues("purchaseOrderShippingCostType")}
                  onValueChange={(value) => form.setValue("purchaseOrderShippingCostType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="British Pound">British Pound</SelectItem>
                    <SelectItem value="US Dollar">US Dollar</SelectItem>
                    <SelectItem value="Euro">Euro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="purchaseOrderChangeToStatus">Purchase Order Change to Status</Label>
                <Select
                  defaultValue={form.getValues("purchaseOrderChangeToStatus")}
                  onValueChange={(value) => form.setValue("purchaseOrderChangeToStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Please Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="totalPurchaseOrderShippingCost">Total Purchase Order Shipping Cost</Label>
                <Input id="totalPurchaseOrderShippingCost" {...form.register("totalPurchaseOrderShippingCost")} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="sendEmailWhenProductBelowReorderLevel2">
                  Send Email When Product Below Reorder Level
                </Label>
                <Switch
                  id="sendEmailWhenProductBelowReorderLevel2"
                  checked={form.watch("sendEmailWhenProductBelowReorderLevel")}
                  onCheckedChange={(checked) => form.setValue("sendEmailWhenProductBelowReorderLevel", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="sendEmailWhenProductBelowReorderLevel3">
                  Send Email When Product Below Reorder Level
                </Label>
                <Switch
                  id="sendEmailWhenProductBelowReorderLevel3"
                  checked={form.watch("sendEmailWhenProductBelowReorderLevel")}
                  onCheckedChange={(checked) => form.setValue("sendEmailWhenProductBelowReorderLevel", checked)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="dropShipmentShippingCostType">Drop Shipment Shipping Cost Type</Label>
                <Select
                  defaultValue={form.getValues("dropShipmentShippingCostType")}
                  onValueChange={(value) => form.setValue("dropShipmentShippingCostType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="British Pound">British Pound</SelectItem>
                    <SelectItem value="US Dollar">US Dollar</SelectItem>
                    <SelectItem value="Euro">Euro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dropShipmentChangeToStatus">Drop Shipment Change to Status</Label>
                <Select
                  defaultValue={form.getValues("dropShipmentChangeToStatus")}
                  onValueChange={(value) => form.setValue("dropShipmentChangeToStatus", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="British Pound">British Pound</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="totalDropShipmentShippingCost">Total Drop Shipment Shipping Cost</Label>
                <Input id="totalDropShipmentShippingCost" {...form.register("totalDropShipmentShippingCost")} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="includeSupplierInRequisitions">Include Supplier in Requisitions</Label>
                <Switch
                  id="includeSupplierInRequisitions"
                  checked={form.watch("includeSupplierInRequisitions")}
                  onCheckedChange={(checked) => form.setValue("includeSupplierInRequisitions", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="consolidateDropshipSupplierEmails">Consolidate Dropship Supplier Emails</Label>
                <Switch
                  id="consolidateDropshipSupplierEmails"
                  checked={form.watch("consolidateDropshipSupplierEmails")}
                  onCheckedChange={(checked) => form.setValue("consolidateDropshipSupplierEmails", checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Templates and CSV Export Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="transferMethod">Transfer Method</Label>
                <Select
                  defaultValue={form.getValues("transferMethod")}
                  onValueChange={(value) => form.setValue("transferMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="exportMethod">Export Method</Label>
                <Select
                  defaultValue={form.getValues("exportMethod")}
                  onValueChange={(value) => form.setValue("exportMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSV">CSV</SelectItem>
                    <SelectItem value="XML">XML</SelectItem>
                    <SelectItem value="JSON">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="templateType">Template Type</Label>
                <Select
                  defaultValue={form.getValues("templateType")}
                  onValueChange={(value) => form.setValue("templateType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSV">CSV</SelectItem>
                    <SelectItem value="XML">XML</SelectItem>
                    <SelectItem value="JSON">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CSV Export Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="defaultExportMethod"
                  checked={form.watch("defaultExportMethod")}
                  onCheckedChange={(checked) => form.setValue("defaultExportMethod", checked as boolean)}
                />
                <Label htmlFor="defaultExportMethod">Default Export Method</Label>
              </div>

              <div>
                <Label htmlFor="exportDelimiter">Export Delimiter</Label>
                <Input id="exportDelimiter" {...form.register("exportDelimiter")} />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="exportHeaders"
                  checked={form.watch("exportHeaders")}
                  onCheckedChange={(checked) => form.setValue("exportHeaders", checked as boolean)}
                />
                <Label htmlFor="exportHeaders">Export Headers</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isPending} className="bg-blue-500 hover:bg-blue-600">
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddSupplierPage
