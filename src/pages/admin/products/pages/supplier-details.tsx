import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { Header } from "@/components/shared/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { Checkbox } from "@/components/ui/checkbox"
// import { showInfoMessage } from "@/lib/utils/messageUtils"
import { SelectDropdown } from "@/components/shared/select-dropdown"
import { Loader2 } from "lucide-react"
import {
  useGetSupplier, useUpdateSupplier
} from '../core/hooks/useSupplier'
import { SupplierFormValues, supplierSchema } from '../core/_schema'
import { useGetCountriesList } from "../../common-api/countries/core/_hooks"
import { CardFooter } from "@/components/ui/card"

export const SupplierDetailsPage = () => {
  // Support both /:id and /:supplierId route params for flexibility
  const params = useParams<{ supplierId?: string }>()
  const id = params.supplierId
  // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [currentSupplier, setCurrentSupplier] = useState<SupplierFormValues | null>(null)
  const { data: supplierResponse, isLoading } = useGetSupplier(id!)
  const { data: countriesList } = useGetCountriesList()

  const updateSupplierMutation = useUpdateSupplier()
  const navigate = useNavigate()
  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: currentSupplier || undefined,
  })
  // console.log(form.getValues("templateType"));

  useEffect(() => {
    if (supplierResponse) {
      setCurrentSupplier(supplierResponse)
      // setOriginalProduct(supplierResponse)
      form.reset(supplierResponse)
    }
  }, [supplierResponse, form.reset])

  console.log(form.formState.errors, "form errors");


  const onSubmit = (data: SupplierFormValues) => {
    if (id) {
      console.log(data, "data in supplier details page");

      const safeData = {
        ...data,
        // minimumOrderValue: data.minimumOrderValue == null ? undefined : data.minimumOrderValue,
        // leadTime: data.leadTime == null ? undefined : data.leadTime,
        // totalDropShipCost: data.totalDropShipCost == null ? undefined : data.totalDropShipCost,
        // totalPoShippingCost: data.totalPoShippingCost == null ? undefined : data.totalPoShippingCost,
      }
      updateSupplierMutation.mutate({ id, data: safeData })
    }
  }

  // const findEmail = () => {
  //   showInfoMessage("Searching for email based on postcode...")
  // }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
      </div>
    )
  }

  return (
    <div>
      <Header title="Suppliers">
        {/* <Link
          to="/admin/products/add-supplier"
          className="rounded-xl flex items-center bg-[#024AFE] px-3 py-2.5 text-white font-normal hover:bg-[#0228fe]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Supplier
        </Link> */}
      </Header>
      <div className="mt-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-[#4E5967]">
          {/* Order Information */}
          <Card className="bg-white border-0 shadow-xs rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#11263C] text-lg font-medium">Supplier Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-5">
              <div className="space-y-4">
                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="supplierName">Supplier Name *</Label>
                  <div>
                    <Input
                      id="supplierName"
                      {...form.register("supplierName")}
                      className={
                        form.formState.errors.supplierName ? "border-red-500 max-w-52" : "border-[#BBC2CB] max-w-52"
                      }
                    />
                    {form.formState.errors.supplierName && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.supplierName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="address2">Address Line 2</Label>
                  <Input placeholder="Address Line 2" className="border-[#BBC2CB] max-w-52" id="address2" {...form.register("address2")} />
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="countryState">Country/State</Label>
                  <Input className="border-[#BBC2CB] max-w-52" id="countryState" {...form.register("countryState")} />
                </div>

                <div className="flex items-end gap-2">
                  <div className="flex-1 grid grid-cols-[1fr_1fr] items-center gap-4">
                    <Label htmlFor="postcode">Postcode/Zip Code *</Label>
                    <div>
                      <div className="flex items-center gap-3">
                        <Input
                          id="postcode"
                          {...form.register("postcode")}
                          className={
                            form.formState.errors.postcode ? "border-red-500 max-w-52" : "border-[#BBC2CB] max-w-52"
                          }
                        />
                        {/* <Button
                          type="button"
                          variant="link"
                          className="underline text-[#4E5967] p-0 text-md"
                          onClick={findEmail}
                        >
                          Find Email
                        </Button> */}
                      </div>
                      {form.formState.errors.postcode && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.postcode.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="supplierCode">Supplier Code</Label>
                  <Input placeholder="Supplier Code" className="border-[#BBC2CB] max-w-52" id="supplierCode" {...form.register("supplierCode")} />
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <div>
                    <Label htmlFor="supplierCurrency">Supplier Currency</Label>
                  </div>
                  <div>
                    <SelectDropdown
                      defaultValue={form.watch("supplierCurrency")}
                      placeholder="Select currency"
                      options={[
                        { id: "GBP", label: "British Pound", value: "GBP" },
                        { id: "USD", label: "US Dollar", value: "USD" },
                        { id: "EUR", label: "Euro", value: "EUR" },
                      ]}
                      onChange={(value) => form.setValue("supplierCurrency", String(value), { shouldValidate: true })}
                      className="border-[#BBC2CB] bg-white max-w-52"
                    />
                  </div>
                </div>

                {/* <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="commaDelimitedEmails">Comma Delimited Email Addresses To Send To</Label>
                  <Input
                    className="border-[#BBC2CB] max-w-52"
                    id="commaDelimitedEmails"
                    {...form.register("commaDelimitedEmails")}
                  />
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="minimumOrderValue">Minimum Order Value</Label>
                  <Input
                    className="border-[#BBC2CB] max-w-52"
                    id="minimumOrderValue"
                    type="number"
                    {...form.register("minimumOrderValue", { valueAsNumber: true })}
                  // {...form.register("minimumOrderValue")}
                  />
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="sendEmailBelowReorderLevel">
                    Send Email When Product Below Reorder Level
                  </Label>
                  <div>
                    <Switch
                      id="sendEmailBelowReorderLevel"
                      checked={form.watch("sendEmailBelowReorderLevel")}
                      onCheckedChange={(checked) => form.setValue("sendEmailBelowReorderLevel", checked)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="sendEmailBelowOutOfStockThreshold">
                    Send Email When Product Below Out of Stock Threshold
                  </Label>
                  <div>
                    <Switch
                      id="sendEmailBelowOutOfStockThreshold"
                      checked={form.watch("sendEmailBelowOutOfStockThreshold")}
                      onCheckedChange={(checked) =>
                        form.setValue("sendEmailBelowOutOfStockThreshold", checked)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="includeProductsAtReorderLevel">Include Products Equal To Reorder Level</Label>
                  <div>
                    <Switch
                      id="includeProductsAtReorderLevel"
                      checked={form.watch("includeProductsAtReorderLevel")}
                      onCheckedChange={(checked) => form.setValue("includeProductsAtReorderLevel", checked)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="excludeOutOfStockManualReorderLevel" className="text-sm">
                    Exclude Out of Stock Products With Zero Manual Reorder Level
                  </Label>
                  <div>
                    <Switch
                      id="excludeOutOfStockManualReorderLevel"
                      checked={form.watch("excludeOutOfStockManualReorderLevel")}
                      onCheckedChange={(checked) =>
                        form.setValue("excludeOutOfStockManualReorderLevel", checked)
                      }
                    />
                  </div>
                </div> */}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="address">Address Line 1 *</Label>
                  <div>
                    <Input
                      id="address"
                      {...form.register("address")}
                      className={
                        form.formState.errors.address ? "border-red-500 max-w-52" : "border-[#BBC2CB] max-w-52"
                      }
                    />
                    {form.formState.errors.address && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.address.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="city">City *</Label>
                  <div>
                    <Input
                      id="city"
                      {...form.register("city")}
                      className={form.formState.errors.city ? "border-red-500 max-w-52" : "border-[#BBC2CB] max-w-52"}
                    />
                    {form.formState.errors.city && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.city.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <div>
                    <Label htmlFor="country">Country</Label>
                  </div>
                  <div>
                    <SelectDropdown
                      defaultValue={form.getValues("country")}
                      placeholder="Select country"
                      options={countriesList || []}
                      onChange={(value) => form.setValue("country", String(value), { shouldValidate: true })}
                      // onChange={(value) => form.setValue("country", String(value))}
                      className="border-[#BBC2CB] bg-white max-w-52"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="phone">Phone</Label>
                  <Input placeholder="Phone" type="number" className="border-[#BBC2CB] max-w-52" id="phone" {...form.register("phone")} />
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="supplierReference">Suppliers Reference</Label>
                  <Input
                    placeholder="Suppliers Reference"
                    className="border-[#BBC2CB] max-w-52"
                    id="supplierReference"
                    {...form.register("supplierReference")}
                  />
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="supplierEmailAddress">Supplier E-mail Address</Label>
                  <div>
                    <Input
                      id="supplierEmailAddress"
                      type="email"
                      {...form.register("supplierEmailAddress")}
                      className={
                        form.formState.errors.supplierEmailAddress ? "border-red-500 max-w-52" : "border-[#BBC2CB] max-w-52"
                      }
                    />
                    {form.formState.errors.supplierEmailAddress && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.supplierEmailAddress.message}</p>
                    )}
                  </div>
                </div>

                {/* <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="leadTime">Lead Time</Label>
                  <Input className="border-[#BBC2CB] max-w-52" id="leadTime"
                    type="number"
                    {...form.register("leadTime", { valueAsNumber: true })}
                  // {...form.register("leadTime")}
                  />
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <div>
                    <Label htmlFor="purchaseOrderMode">Purchase Order Mode</Label>
                  </div>
                  <div>
                    <SelectDropdown
                      defaultValue={form.getValues("purchaseOrderMode")}
                      placeholder="Select mode"
                      options={[
                        { id: "Standard", label: "Standard", value: "Standard" },
                        { id: "Express", label: "Express", value: "Express" },
                        { id: "Urgent", label: "Urgent", value: "Urgent" },
                      ]}
                      onChange={(value) => form.setValue("purchaseOrderMode", String(value), { shouldValidate: true })}
                      className="border-[#BBC2CB] bg-white max-w-52"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="isManufacturer">Is Manufacturer</Label>
                  <div>
                    <Switch
                      id="isManufacturer"
                      checked={form.watch("isManufacturer")}
                      onCheckedChange={(checked) => form.setValue("isManufacturer", checked)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <div>
                    <Input
                      id="contactEmail"
                      type="email"
                      {...form.register("contactEmail")}
                      className={
                        form.formState.errors.contactEmail ? "border-red-500 max-w-52" : "border-[#BBC2CB] max-w-52"
                      }
                    />
                    {form.formState.errors.contactEmail && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.contactEmail.message}</p>
                    )}
                  </div>
                </div> */}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => navigate("/admin/products/suppliers")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updateSupplierMutation.isPending} variant="primary" className="rounded-lg">
                  {updateSupplierMutation.isPending ? "Updating..." : "Update"}
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Purchase Order / Drop Shipment Information */}
          {/* <Card className="bg-white border-0 shadow-xs rounded-2xl">
            <CardHeader>
              <CardTitle className="text-[#11263C]">Purchase Order / Drop Shipment Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-5">
              <div className="space-y-4">
                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <div>
                    <Label htmlFor="poShippingCostType">Purchase Order Shipping Cost Type</Label>
                  </div>
                  <div>
                    <SelectDropdown
                      defaultValue={form.getValues("poShippingCostType")}
                      placeholder="Select type"
                      options={[
                        { id: "British Pound", label: "British Pound", value: "British Pound" },
                        { id: "US Dollar", label: "US Dollar", value: "US Dollar" },
                        { id: "Euro", label: "Euro", value: "Euro" },
                      ]}
                      onChange={(value) => form.setValue("poShippingCostType", String(value), { shouldValidate: true })}
                      className="border-[#BBC2CB] bg-white max-w-52"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <div>
                    <Label htmlFor="poChangeToStatus">Purchase Order Change to Status</Label>
                  </div>
                  <div>
                    <SelectDropdown
                      defaultValue={form.getValues("poChangeToStatus")}
                      placeholder="Please Select"
                      options={[
                        { id: "pending", label: "Pending", value: "pending" },
                        { id: "processing", label: "Processing", value: "processing" },
                        { id: "completed", label: "Completed", value: "completed" },
                      ]}
                      onChange={(value) => form.setValue("poChangeToStatus", String(value), { shouldValidate: true })}
                      className="border-[#BBC2CB] bg-white max-w-52"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="totalPoShippingCost">Total Purchase Order Shipping Cost</Label>
                  <Input
                    className="border-[#BBC2CB] max-w-52"
                    id="totalPoShippingCost"
                    type='number'
                    {...form.register("totalPoShippingCost", { valueAsNumber: true })} // Ensure this is a number
                  />
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="includeInRequisitions">Include Supplier in Requisitions</Label>
                  <div>
                    <Switch
                      id="includeInRequisitions"
                      checked={form.watch("includeInRequisitions")}
                      onCheckedChange={(checked) => form.setValue("includeInRequisitions", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <div>
                    <Label htmlFor="dropShipShippingCostType">Drop Shipment Shipping Cost Type</Label>
                  </div>
                  <div>
                    <SelectDropdown
                      defaultValue={form.getValues("dropShipShippingCostType")}
                      placeholder="Select type"
                      options={[
                        { id: "British Pound", label: "British Pound", value: "British Pound" },
                        { id: "US Dollar", label: "US Dollar", value: "US Dollar" },
                        { id: "Euro", label: "Euro", value: "Euro" },
                      ]}
                      onChange={(value) => form.setValue("dropShipShippingCostType", String(value), { shouldValidate: true })}
                      className="border-[#BBC2CB] bg-white max-w-52"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <div>
                    <Label htmlFor="dropShipChangeToStatus">Drop Shipment Change to Status</Label>
                  </div>
                  <div>
                    <SelectDropdown
                      defaultValue={form.getValues("dropShipChangeToStatus")}
                      placeholder="Select status"
                      options={[
                        { id: "pending", label: "Pending", value: "pending" },
                        { id: "processing", label: "Processing", value: "processing" },
                        { id: "completed", label: "Completed", value: "completed" },
                      ]}
                      onChange={(value) => form.setValue("dropShipChangeToStatus", String(value), { shouldValidate: true })}
                      className="border-[#BBC2CB] bg-white max-w-52"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="totalDropShipCost">Total Drop Shipment Shipping Cost</Label>
                  <Input
                    className="border-[#BBC2CB] max-w-52"
                    id="totalDropShipCost"
                    type='number'
                    {...form.register("totalDropShipCost", { valueAsNumber: true })} // Ensure this is a number
                  />
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="consolidateDropShipEmails">Consolidate Dropship Supplier Emails</Label>
                  <div>
                    <Switch
                      id="consolidateDropShipEmails"
                      checked={form.watch("consolidateDropShipEmails")}
                      onCheckedChange={(checked) => form.setValue("consolidateDropShipEmails", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* Export Templates and CSV Export Configuration */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border-0 shadow-xs rounded-2xl">
              <CardHeader>
                <CardTitle className="text-[#11263C] text-xl">Export Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 mx-5">
                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <div>
                    <Label htmlFor="transferMethod">Transfer Method</Label>
                  </div>
                  <div>
                    <SelectDropdown
                      defaultValue={form.getValues("transferMethod")}
                      placeholder="Select method"
                      options={[
                        { id: "Manual", label: "Manual", value: "Manual" },
                        { id: "Automatic", label: "Automatic", value: "Automatic" },
                      ]}
                      onChange={(value) => form.setValue("transferMethod", String(value), { shouldValidate: true })}
                      className="border-[#BBC2CB] bg-white max-w-52"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <div>
                    <Label htmlFor="exportMethod">Export Method</Label>
                  </div>
                  <div>
                    <SelectDropdown
                      defaultValue={form.getValues("exportMethod")}
                      placeholder="Select method"
                      options={[
                        { id: "CSV", label: "CSV", value: "CSV" },
                        { id: "XML", label: "XML", value: "XML" },
                        { id: "JSON", label: "JSON", value: "JSON" },
                      ]}
                      onChange={(value) => form.setValue("exportMethod", String(value), { shouldValidate: true })}
                      className="border-[#BBC2CB] bg-white max-w-52"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <div>
                    <Label htmlFor="templateType">Template Type</Label>
                  </div>
                  <div>
                    <SelectDropdown
                      defaultValue={form.getValues("templateType")}
                      placeholder="Select type"
                      options={[
                        { id: "CSV", label: "CSV", value: "CSV" },
                        { id: "XML", label: "XML", value: "XML" },
                        { id: "JSON", label: "JSON", value: "JSON" },
                      ]}
                      onChange={(value) => form.setValue("templateType", String(value), { shouldValidate: true })}
                      className="border-[#BBC2CB] bg-white max-w-52"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-xs rounded-2xl">
              <CardHeader>
                <CardTitle className="text-[#11263C] text-xl">CSV Export Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 mx-5">
                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <label htmlFor="isDefaultExportMethod">Default Export Method</label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isDefaultExportMethod"
                      checked={form.watch("isDefaultExportMethod")}
                      onCheckedChange={(checked) => form.setValue("isDefaultExportMethod", checked as boolean)}
                    />
                    <p className="text-[#11263C] m-0 leading-normal text-sm">Default Export Method</p>
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="exportDelimiter">Export Delimiter</Label>
                  <Input
                    className="border-[#BBC2CB] max-w-52"
                    id="exportDelimiter"
                    {...form.register("exportDelimiter")}
                  />
                </div>

                <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
                  <Label htmlFor="exportHeaders">Export Headers</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="exportHeaders"
                      checked={form.watch("exportHeaders")}
                      onCheckedChange={(checked) => form.setValue("exportHeaders", checked as boolean)}
                    />
                    <p className="text-[#11263C] m-0 leading-normal text-sm">Export Headers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div> */}
        </form>
      </div>
    </div>
  )
}

export default SupplierDetailsPage
