import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ChevronRight } from "lucide-react"
import { Link, useParams } from "react-router-dom"

const marketplaceSchema = z.object({
  profileName: z.string().min(1, "Profile name is required"),
  trackingUrlTemplate: z.string().optional(),
  companyIdentity: z.string().min(1, "Company identity is required"),
  active: z.boolean(),
  sellerId: z.string().min(1, "Seller ID is required"),
  amazonStore: z.string().min(1, "Amazon Store is required"),
  marketplaceId: z.string().min(1, "Marketplace ID is required"),
  importUnpaidOrders: z.boolean(),
  useAmazonDefaultHandlingTime: z.boolean(),
  fulfillmentByAmazon: z.boolean(),
  feesExclusiveOfVat: z.boolean(),
  amazonDeliveryExperience: z.boolean(),
  automaticallyRetryMatch: z.boolean(),
  uploadImagesToAmazon: z.boolean(),
  uploadImagesToAmazonDuplicate: z.boolean(),
  trackingUrlTemplateValue: z.string().optional(),
  subscriptionRepricer: z.boolean(),
  subscriptionRepricerDuplicate: z.boolean(),
  removeExistingImages: z.boolean(),
  removeExistingImagesDuplicate: z.boolean(),
  importOrders: z.boolean(),
  automaticInventoryUpdates: z.boolean(),
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

type MarketplaceFormData = z.infer<typeof marketplaceSchema>

export function EditMarketplaceDetails() {
  const {marketplaceId} = useParams()

  console.log(marketplaceId,"marketPlace");
  
  const form = useForm<MarketplaceFormData>({
    resolver: zodResolver(marketplaceSchema),
    defaultValues: {
      profileName: "Amazon Integration Profile",
      trackingUrlTemplate: "https://track.amazon.com/{tracking_number}",
      companyIdentity: "Default Warehouse",
      active: true,
      sellerId: "A39ILJ37TRP1C6",
      amazonStore: "Amazon Australia (AU)",
      marketplaceId: "A39ILJ37TRP1C6",
      importUnpaidOrders: false,
      useAmazonDefaultHandlingTime: false,
      fulfillmentByAmazon: true,
      feesExclusiveOfVat: false,
      amazonDeliveryExperience: true,
      automaticallyRetryMatch: true,
      uploadImagesToAmazon: true,
      uploadImagesToAmazonDuplicate: false,
      trackingUrlTemplateValue: "0",
      subscriptionRepricer: true,
      subscriptionRepricerDuplicate: true,
      removeExistingImages: false,
      removeExistingImagesDuplicate: false,
      importOrders: false,
      automaticInventoryUpdates: false,
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

  const onSubmit = (data: MarketplaceFormData) => {
    console.log("Form submitted:", data)
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <span>Settings</span>
          <ChevronRight className="w-4 h-4" />
          <span>Integration</span>
          <ChevronRight className="w-4 h-4" />
          <Link to="#" className="text-blue-600">
            Edit Marketplace
          </Link>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Integration Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Integration Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Label className="text-sm font-medium">Integration type</Label>
                      <div className="flex items-center gap-2">
                        <img src="/placeholder.svg?height=24&width=80" alt="Amazon" className="h-6" />
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
              </CardContent>
            </Card>

            {/* Link your Amazon Account */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Link your Amazon Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Sign up for Amazon MWS *</Label>
                      <div className="mt-2 text-sm text-gray-600">https://developer.amazonservices.com.au/</div>
                    </div>

                    <FormField
                      control={form.control}
                      name="sellerId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seller ID *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="amazonStore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amazon Store</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="marketplaceId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>MarketplaceID</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="button" className="bg-blue-600 hover:bg-blue-700">
                      Test Connection
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amazon Specific Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Amazon Specific Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    {[
                      { name: "importUnpaidOrders", label: "Import unpaid orders" },
                      { name: "feesExclusiveOfVat", label: "Fees exclusive of VAT" },
                      { name: "uploadImagesToAmazon", label: "Upload Images To Amazon" },
                      { name: "subscriptionRepricer", label: "Subscription Repricer" },
                      { name: "removeExistingImages", label: "Remove Existing Images" },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <Label className="text-sm">{item.label}</Label>
                        <FormField
                          control={form.control}
                          name={item.name as keyof MarketplaceFormData}
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
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: "useAmazonDefaultHandlingTime", label: "Use Amazon Default Handling Time" },
                      { name: "amazonDeliveryExperience", label: "Amazon Delivery Experience" },
                      { name: "uploadImagesToAmazonDuplicate", label: "Upload Images To Amazon" },
                      { name: "subscriptionRepricerDuplicate", label: "Subscription Repricer" },
                      { name: "removeExistingImagesDuplicate", label: "Remove Existing Images" },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <Label className="text-sm">{item.label}</Label>
                        <FormField
                          control={form.control}
                          name={item.name as keyof MarketplaceFormData}
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
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Fulfillment by Amazon</Label>
                      <FormField
                        control={form.control}
                        name="fulfillmentByAmazon"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Automatically retry Match & List upload</Label>
                      <FormField
                        control={form.control}
                        name="automaticallyRetryMatch"
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
                      name="trackingUrlTemplateValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tracking URL template</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Input {...field} className="flex-1" />
                              <span className="text-sm text-gray-500">(pence/cents)</span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Processing, Stock Management sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Order Processing */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Order Processing</CardTitle>
                </CardHeader>
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
                        name={item.name as keyof MarketplaceFormData}
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

              {/* Stock Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Stock Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "automaticInventoryUpdates", label: "Automatic Inventory Updates" },
                    { name: "automaticPriceUpdates", label: "Automatic Price Updates" },
                    { name: "automaticListingsDownload", label: "Automatic Listings Download" },
                    { name: "uploadListings", label: "Upload Listings" },
                    { name: "downloadListings", label: "Download Listings" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <Label className="text-sm">{item.label}</Label>
                      <FormField
                        control={form.control}
                        name={item.name as keyof MarketplaceFormData}
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

              {/* Stock Management (Right Column) */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Stock Management</CardTitle>
                </CardHeader>
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
                </CardContent>
              </Card>
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

export default EditMarketplaceDetails