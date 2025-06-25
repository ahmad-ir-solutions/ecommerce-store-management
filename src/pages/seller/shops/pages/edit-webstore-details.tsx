import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {useParams } from "react-router-dom"
import { Header } from "@/components/shared/header"

const webstoreSchema = z.object({
  profileName: z.string().min(1, "Profile name is required"),
  trackingUrlTemplate: z.string().optional(),
  companyIdentity: z.string().min(1, "Company identity is required"),
  active: z.boolean(),
  testProfileName: z.string().min(1, "Profile name is required"),
  lastConnected: z.string(),
  amazonStore: z.string(),
  marketplaceId: z.string(),
  weightUnit: z.string(),
  generateSlugFrom: z.string(),
  orderTrackingNoteSettings: z.string(),
  automaticInventoryUpdates: z.boolean(),
  importOrders: z.boolean(),
  automaticInventoryUpdatesStock: z.boolean(),
  currency: z.string(),
  sendDispatchNotifications: z.boolean(),
  automaticPriceUpdates: z.boolean(),
  calculateShippingTax: z.boolean(),
  ignoreChannelTax: z.boolean(),
  automaticListingsDownload: z.boolean(),
  defaultPricingProfile: z.string(),
  disableInvoicePrinting: z.boolean(),
  uploadListings: z.boolean(),
  channelPercentageFees: z.string(),
  enforceChannelWarehouse: z.boolean(),
  downloadListings: z.boolean(),
})

type WebstoreFormData = z.infer<typeof webstoreSchema>

export function EditWebstoreDetails() {
  const { webstoreId } = useParams()

  console.log(webstoreId, "webstoreId");

  const form = useForm<WebstoreFormData>({
    resolver: zodResolver(webstoreSchema),
    defaultValues: {
      profileName: "WooCommerce Integration Profile",
      trackingUrlTemplate: "https://track.woocommerce.com/{tracking_number}",
      companyIdentity: "Default Warehouse",
      active: true,
      testProfileName: "WooCommerce Test Profile",
      lastConnected: "14/02/2025 14:15:44",
      amazonStore: "Amazon Australia (AU)",
      marketplaceId: "A39ILJ37TRP1C6",
      weightUnit: "KG",
      generateSlugFrom: "SKU",
      orderTrackingNoteSettings: "KG",
      automaticInventoryUpdates: false,
      importOrders: false,
      automaticInventoryUpdatesStock: false,
      currency: "Default Warehouse",
      sendDispatchNotifications: false,
      automaticPriceUpdates: false,
      calculateShippingTax: false,
      ignoreChannelTax: true,
      automaticListingsDownload: true,
      defaultPricingProfile: "Default Warehouse",
      disableInvoicePrinting: false,
      uploadListings: false,
      channelPercentageFees: "Default Warehouse",
      enforceChannelWarehouse: false,
      downloadListings: false,
    },
  })

  const onSubmit = (data: WebstoreFormData) => {
    console.log("Form submitted:", data)
    // Handle form submission
  }

  return (
    <div>
      <Header title="Settings" />
      <div className="mt-6 bg-white p-6 rounded-2xl shadow-none">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Integration Profile */}
            <h1 className="text-lg font-medium">Integration Profile</h1>
            <Card className="bg-[#ECF6FF] border-none shadow-none">
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Label className="text-sm font-medium">Integration type</Label>
                      <div className="flex items-center gap-2">
                        <img src="/placeholder.svg?height=24&width=100" alt="WooCommerce" className="h-6" />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="profileName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile name *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="trackingUrlTemplate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tracking URL template</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Active</Label>
                      <FormField
                        control={form.control}
                        name="active"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="companyIdentity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company identity *</FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Default Warehouse">Default Warehouse</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                {/* Test your WooCommerce Account */}
                <div>
                  <h1 className="text-lg font-medium">Test your WooCommerce Account</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="testProfileName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Profile name *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <Label className="text-sm font-medium">Last Connected Successfully:</Label>
                        <div className="mt-1 text-sm text-gray-600">{form.watch("lastConnected")}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Amazon Store</Label>
                        <div className="mt-1 text-sm text-gray-600">{form.watch("amazonStore")}</div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">MarketplaceID</Label>
                        <div className="mt-1 text-sm text-gray-600">{form.watch("marketplaceId")}</div>
                      </div>

                      <Button type="button" className="bg-blue-600 hover:bg-blue-700">
                        Test Connection
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* WooCommerce Settings */}
            <h1 className="text-lg font-medium mt-6">WooCommerce Settings</h1>
            <Card className="bg-[#ECF6FF] border-none shadow-none">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="weightUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight Unit</FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="KG">KG</SelectItem>
                                <SelectItem value="LB">LB</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="generateSlugFrom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Generate Slug from</FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="SKU">SKU</SelectItem>
                                <SelectItem value="Title">Title</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="orderTrackingNoteSettings"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order Tracking Note Settings</FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="KG">KG</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Automatic Inventory Updates</Label>
                      <FormField
                        control={form.control}
                        name="automaticInventoryUpdates"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Processing, Stock Management sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Order Processing */}
              <div className="space-y-3">
                <h1 className="text-lg font-medium mt-6">Order Processing</h1>
                <Card className="bg-[#ECF6FF] border-none shadow-none">
                  <CardContent className="space-y-4">
                    {[
                      { name: "importOrders", label: "Import Orders" },
                      { name: "sendDispatchNotifications", label: "Send Despatch Notifications" },
                      { name: "ignoreChannelTax", label: "Ignore Channel Tax" },
                      { name: "disableInvoicePrinting", label: "Disable Invoice Printing" },
                      { name: "enforceChannelWarehouse", label: "Enforce Channel Warehouse" },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <Label className="text-sm">{item.label}</Label>
                        <FormField
                          control={form.control}
                          name={item.name as keyof WebstoreFormData}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Switch checked={field.value as boolean} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Stock Management */}
              <div className="space-y-3">
                <h1 className="text-lg font-medium mt-6">Stock Management</h1>
                <Card className="bg-[#ECF6FF] border-none shadow-none">
                  <CardContent className="space-y-4">
                    {[
                      { name: "automaticInventoryUpdatesStock", label: "Automatic Inventory Updates" },
                      { name: "automaticPriceUpdates", label: "Automatic Price Updates" },
                      { name: "automaticListingsDownload", label: "Automatic Listings Download" },
                      { name: "uploadListings", label: "Upload Listings" },
                      { name: "downloadListings", label: "Download Listings" },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <Label className="text-sm">{item.label}</Label>
                        <FormField
                          control={form.control}
                          name={item.name as keyof WebstoreFormData}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Switch checked={field.value as boolean} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Stock Management (Right Column) */}
              <div className="space-y-3">
                <h1 className="text-lg font-medium mt-6">Stock Management</h1>
                <Card className="bg-[#ECF6FF] border-none shadow-none">
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency *</FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Default Warehouse">Default Warehouse</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Calculate Shipping Tax</Label>
                      <FormField
                        control={form.control}
                        name="calculateShippingTax"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="defaultPricingProfile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Pricing Profile</FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Default Warehouse">Default Warehouse</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="channelPercentageFees"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Channel Percentage Fees</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="outline" className="px-8">
                Cancel
              </Button>
              <Button type="submit" className="px-8 bg-blue-600 hover:bg-blue-700">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default EditWebstoreDetails;