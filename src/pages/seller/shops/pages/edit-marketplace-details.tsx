import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useParams } from "react-router-dom"
import Amazon from "@/assets/images/amazon.svg";
import { CustomSelect } from '@/components/shared/custom-select';
import { Header } from "@/components/shared/header"

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
  const { marketplaceId } = useParams()

  console.log(marketplaceId, "marketPlace");

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
    <div>
      <Header title="Settings" />
      <div className="mt-6 bg-white p-6 rounded-2xl shadow-none text-[#4E5967]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Integration Profile */}
            <h1 className="text-lg font-medium text-[#11263C]">Integration Profile</h1>
            <Card className="bg-[#ECF6FF] border-none shadow-none">
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                      <Label className="text-sm font-medium">Integration type</Label>
                      <div className="flex items-center gap-2">
                        <img src={Amazon} alt="Amazon" className="h-6" />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="profileName"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                            <FormLabel className="">Profile name *</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white text-[#11263C] border-gray-300 shadow-none rounded-lg" />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="trackingUrlTemplate"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                            <FormLabel>Tracking URL template</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white text-[#11263C] border-gray-300 shadow-none rounded-lg" />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                      <Label className="text-sm font-medium">Active</Label>
                      <FormField
                        control={form.control}
                        name="active"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </div>
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
                          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                            <FormLabel>Company identity *</FormLabel>
                            <FormControl>
                              <CustomSelect
                                options={[{ id: 'Default Warehouse', label: 'Default Warehouse', value: 'Default Warehouse' }]}
                                defaultValue={field.value}
                                onChange={field.onChange}
                                className="bg-white"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                {/* Link your Amazon Account */}
                <div>
                  <h1 className="text-lg font-medium text-[#11263C] mb-2">Link your Amazon Account</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                        <Label className="text-sm font-medium">Sign up for Amazon MWS *</Label>
                        <div className="mt-2 text-sm text-gray-600 underline">https://developer.amazonservices.com.au/</div>
                      </div>

                      <FormField
                        control={form.control}
                        name="sellerId"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                              <FormLabel>Seller ID *</FormLabel>
                              <FormControl>
                                <Input {...field} className="bg-white text-[#11263C] border-gray-300 shadow-none rounded-lg" />
                              </FormControl>
                            </div>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                              <FormLabel>Amazon Store</FormLabel>
                              <FormControl>
                                <Input {...field} readOnly className="bg-white text-[#11263C] border-gray-300 shadow-none rounded-lg" />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="marketplaceId"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                              <FormLabel>MarketplaceID</FormLabel>
                              <FormControl>
                                <Input {...field} className="bg-white text-[#11263C] border-gray-300 shadow-none rounded-lg" />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                        <span />
                        <Button type="button" className="rounded-lg" variant="primary">
                          Test Connection
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amazon Specific Settings */}
            <h1 className="text-lg font-medium text-[#11263C]">Amazon Specific Settings</h1>
            <Card className="bg-[#ECF6FF] border-none shadow-none">
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
                      <div key={item.name} className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                        <Label className="text-sm">{item.label}</Label>
                        <FormField
                          control={form.control}
                          name={item.name as keyof MarketplaceFormData}
                          render={({ field }) => (
                            <FormItem className="mb-0">
                              <FormControl>
                                <div>
                                  <Switch checked={field.value as boolean} onCheckedChange={field.onChange} />
                                </div>
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
                      <div key={item.name} className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                        <Label className="text-sm">{item.label}</Label>
                        <FormField
                          control={form.control}
                          name={item.name as keyof MarketplaceFormData}
                          render={({ field }) => (
                            <FormItem className="mb-0">
                              <FormControl>
                                <div>
                                  <Switch checked={field.value as boolean} onCheckedChange={field.onChange} />
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                      <Label className="text-sm">Fulfillment by Amazon</Label>
                      <FormField
                        control={form.control}
                        name="fulfillmentByAmazon"
                        render={({ field }) => (
                          <FormItem className="mb-0">
                            <FormControl>
                              <div>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                      <Label className="text-sm">Automatically retry Match & List upload</Label>
                      <FormField
                        control={form.control}
                        name="automaticallyRetryMatch"
                        render={({ field }) => (
                          <FormItem className="mb-0">
                            <FormControl>
                              <div>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </div>
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
                          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
                            <FormLabel>Tracking URL template</FormLabel>
                            <div className="flex items-center gap-2">
                              <FormControl>
                                <Input {...field} className="bg-white text-[#11263C] border-gray-300 shadow-none rounded-lg" />
                              </FormControl>
                              <span className="text-sm text-gray-500">(pence/cents)</span>
                            </div>
                          </div>
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
              <div className="space-y-3">
                <h1 className="text-lg font-medium text-[#11263C]">Order Processing</h1>
                <Card className="bg-[#ECF6FF] border-none shadow-none">
                  <CardContent className="space-y-4">
                    {[
                      { name: "importOrders", label: "Import Orders" },
                      { name: "sendDispatchNotifications", label: "Send Despatch Notifications" },
                      { name: "ignoreChannelTax", label: "Ignore Channel Tax" },
                      { name: "disableInvoicePrinting", label: "Disable Invoice Printing" },
                      { name: "enforceChannelWarehouse", label: "Enforce Channel Warehouse" },
                    ].map((item) => (
                      <div key={item.name} className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                        <Label className="text-sm">{item.label}</Label>
                        <FormField
                          control={form.control}
                          name={item.name as keyof MarketplaceFormData}
                          render={({ field }) => (
                            <FormItem className="mb-0">
                              <FormControl>
                                <div>
                                  <Switch checked={field.value as boolean} onCheckedChange={field.onChange} />
                                </div>
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
                <h1 className="text-lg font-medium text-[#11263C]">Stock Management</h1>
                <Card className="bg-[#ECF6FF] border-none shadow-none">
                  <CardContent className="space-y-4">
                    {[
                      { name: "automaticInventoryUpdates", label: "Automatic Inventory Updates" },
                      { name: "automaticPriceUpdates", label: "Automatic Price Updates" },
                      { name: "automaticListingsDownload", label: "Automatic Listings Download" },
                      { name: "uploadListings", label: "Upload Listings" },
                      { name: "downloadListings", label: "Download Listings" },
                    ].map((item) => (
                      <div key={item.name} className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                        <Label className="text-sm">{item.label}</Label>
                        <FormField
                          control={form.control}
                          name={item.name as keyof MarketplaceFormData}
                          render={({ field }) => (
                            <FormItem className="mb-0">
                              <FormControl>
                                <div>
                                  <Switch checked={field.value as boolean} onCheckedChange={field.onChange} />
                                </div>
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
                <h1 className="text-lg font-medium text-[#11263C]">Stock Management</h1>
                <Card className="bg-[#ECF6FF] border-none shadow-none">
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                            <FormLabel>Currency *</FormLabel>
                            <FormControl>
                              <CustomSelect
                                options={[{ id: 'Default Warehouse', label: 'Default Warehouse', value: 'Default Warehouse' }]}
                                defaultValue={field.value}
                                onChange={field.onChange}
                                className="bg-white"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                      <Label className="text-sm">Calculate Shipping Tax</Label>
                      <FormField
                        control={form.control}
                        name="calculateShippingTax"
                        render={({ field }) => (
                          <FormItem className="mb-0">
                            <FormControl>
                              <div>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </div>
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
                          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                            <FormLabel>Default Pricing Profile</FormLabel>
                            <FormControl>
                              <CustomSelect
                                options={[{ id: 'Default Warehouse', label: 'Default Warehouse', value: 'Default Warehouse' }]}
                                defaultValue={field.value}
                                onChange={field.onChange}
                                className="bg-white"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="channelPercentageFees"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                            <FormLabel>Channel Percentage Fees</FormLabel>
                            <FormControl>
                              <CustomSelect
                                options={[{ id: 'Default Warehouse', label: 'Default Warehouse', value: 'Default Warehouse' }]}
                                defaultValue={field.value}
                                onChange={field.onChange}
                                className="bg-white"
                              />
                            </FormControl>
                          </div>
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
              <Button type="button" variant="outline" className="rounded-lg px-8">
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="rounded-lg px-8">
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