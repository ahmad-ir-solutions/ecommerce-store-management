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
import { Header } from "@/components/shared/header"
import Woocommerce from "@/assets/images/WooCommerce-Logo.png";
import { CustomSelect } from '@/components/shared/custom-select';

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
      <div className="mt-6 bg-white p-6 rounded-2xl shadow-none text-[#4E5967]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Integration Profile */}
            <h1 className="text-lg font-medium text-[#11263C]">Integration Profile</h1>
            <Card className="bg-[#ECF6FF] border-none shadow-none">
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                      <Label className="text-sm font-medium">Integration type</Label>
                      <div className="flex items-center gap-2">
                        <img src={Woocommerce} alt="WooCommerce" className="h-6" />
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="profileName"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                            <FormLabel>Profile name *</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white text-[#11263C] border-gray-300 shadow-none rounded-lg"/>
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
                              <Input {...field} className="bg-white text-[#11263C] border-gray-300 shadow-none rounded-lg"/>
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
                {/* Test your WooCommerce Account */}
                <div>
                  <h1 className="text-lg font-medium text-[#11263C] mb-2">Test your WooCommerce Account</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="testProfileName"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                              <FormLabel>Profile name *</FormLabel>
                              <FormControl>
                                <Input {...field} className="bg-white text-[#11263C] border-gray-300 shadow-none rounded-lg"/>
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                        <Label className="text-sm font-medium">Last Connected Successfully:</Label>
                        <div className="mt-1 text-sm text-gray-600">{form.watch("lastConnected")}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                        <Label className="text-sm font-medium">Amazon Store</Label>
                        <div className="mt-1 text-sm text-gray-600">{form.watch("amazonStore")}</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                        <Label className="text-sm font-medium">MarketplaceID</Label>
                        <div className="mt-1 text-sm text-gray-600">{form.watch("marketplaceId")}</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                        <span />
                        <Button type="button" variant="primary" className="rounded-lg">
                          Test Connection
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* WooCommerce Settings */}
            <h1 className="text-lg font-medium mt-6 text-[#11263C]">WooCommerce Settings</h1>
            <Card className="bg-[#ECF6FF] border-none shadow-none">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="weightUnit"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                            <FormLabel>Weight Unit</FormLabel>
                            <FormControl>
                              <CustomSelect
                                options={[
                                  { id: 'KG', label: 'KG', value: 'KG' },
                                  { id: 'LB', label: 'LB', value: 'LB' },
                                ]}
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
                      name="generateSlugFrom"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                            <FormLabel>Generate Slug from</FormLabel>
                            <FormControl>
                              <CustomSelect
                                options={[
                                  { id: 'SKU', label: 'SKU', value: 'SKU' },
                                  { id: 'Title', label: 'Title', value: 'Title' },
                                ]}
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

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="orderTrackingNoteSettings"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                            <FormLabel>Order Tracking Note Settings</FormLabel>
                            <FormControl>
                              <CustomSelect
                                options={[{ id: 'KG', label: 'KG', value: 'KG' }]}
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
                      <Label className="text-sm">Automatic Inventory Updates</Label>
                      <FormField
                        control={form.control}
                        name="automaticInventoryUpdates"
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
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Processing, Stock Management sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Order Processing */}
              <div className="space-y-3">
                <h1 className="text-lg font-medium mt-6 text-[#11263C]">Order Processing</h1>
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
                          name={item.name as keyof WebstoreFormData}
                          render={({ field }) => (
                            <FormItem>
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
                <h1 className="text-lg font-medium mt-6 text-[#11263C]">Stock Management</h1>
                <Card className="bg-[#ECF6FF] border-none shadow-none">
                  <CardContent className="space-y-4">
                    {[
                      { name: "automaticInventoryUpdatesStock", label: "Automatic Inventory Updates" },
                      { name: "automaticPriceUpdates", label: "Automatic Price Updates" },
                      { name: "automaticListingsDownload", label: "Automatic Listings Download" },
                      { name: "uploadListings", label: "Upload Listings" },
                      { name: "downloadListings", label: "Download Listings" },
                    ].map((item) => (
                      <div key={item.name} className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                        <Label className="text-sm">{item.label}</Label>
                        <FormField
                          control={form.control}
                          name={item.name as keyof WebstoreFormData}
                          render={({ field }) => (
                            <FormItem>
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
                <h1 className="text-lg font-medium mt-6 text-[#11263C]">Stock Management</h1>
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
                              <Input {...field} className="bg-white text-[#11263C] border-gray-300 shadow-none rounded-lg"/>
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

export default EditWebstoreDetails;