import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { ICustomer } from "../core/_modals"
import { useState } from "react"
import { AddressFormValues, addressSchema } from '../core/_schema'
import { PhoneInput } from "@/components/shared/custom-phone-input"

export function CustomerAddresses({
  customer,
  onUpdateShippingAddress,
  onUpdateBillingAddress,
}: {
  customer: ICustomer
  onUpdateShippingAddress: (data: AddressFormValues) => Promise<boolean>
  onUpdateBillingAddress: (data: AddressFormValues) => Promise<boolean>
}) {
  const [isSubmittingShipping, setIsSubmittingShipping] = useState(false)
  const [isSubmittingBilling, setIsSubmittingBilling] = useState(false)

  const shippingForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      firstName: customer.shippingAddress?.firstName || "",
      lastName: customer.shippingAddress?.lastName || "",
      company: customer.shippingAddress?.company || "",
      addressLine1: customer.shippingAddress?.addressLine1 || "",
      addressLine2: customer.shippingAddress?.addressLine2 || "",
      city: customer.shippingAddress?.city || "",
      state: customer.shippingAddress?.state || "",
      postalCode: customer.shippingAddress?.postalCode || "",
      country: customer.shippingAddress?.country || "",
      phone: customer.shippingAddress?.phone || "",
    },
  })

  const billingForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      firstName: customer.billingAddress?.firstName || "",
      lastName: customer.billingAddress?.lastName || "",
      company: customer.billingAddress?.company || "",
      addressLine1: customer.billingAddress?.addressLine1 || "",
      addressLine2: customer.billingAddress?.addressLine2 || "",
      city: customer.billingAddress?.city || "",
      state: customer.billingAddress?.state || "",
      postalCode: customer.billingAddress?.postalCode || "",
      country: customer.billingAddress?.country || "",
      phone: customer.billingAddress?.phone || "",
    },
  })

  async function onSubmitShipping(data: AddressFormValues) {
    setIsSubmittingShipping(true)
    try {
      const success = await onUpdateShippingAddress(data)
      if (success) {
        shippingForm.reset(data)
      }
    } finally {
      setIsSubmittingShipping(false)
    }
  }

  async function onSubmitBilling(data: AddressFormValues) {
    setIsSubmittingBilling(true)
    try {
      const success = await onUpdateBillingAddress(data)
      if (success) {
        billingForm.reset(data)
      }
    } finally {
      setIsSubmittingBilling(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white border-none rounded-2xl shadow-none">
          <CardHeader>
            <CardTitle className="text-xl font-medium">Shipping address</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...shippingForm}>
              <form
                id="shipping-address-form"
                onSubmit={shippingForm.handleSubmit(onSubmitShipping)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={shippingForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name *</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={shippingForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name *</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={shippingForm.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300" />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={shippingForm.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address line 1 *</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300" />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={shippingForm.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address line 2</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300" />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={shippingForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone *</FormLabel>
                      <FormControl>
                        <PhoneInput
                          placeholder="Phone"
                          className="border-[#BBC2CB]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={shippingForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={shippingForm.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Country *</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={shippingForm.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal code *</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={shippingForm.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country *</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" type="submit" disabled={isSubmittingShipping} className="rounded-lg">
                    {isSubmittingShipping ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="bg-white border-none rounded-2xl shadow-none">
          <CardHeader>
            <CardTitle className="text-xl font-medium">Billing address</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...billingForm}>
              <form
                id="billing-address-form"
                onSubmit={billingForm.handleSubmit(onSubmitBilling)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={billingForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name *</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={billingForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name *</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={billingForm.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300" />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={billingForm.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address line 1 *</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300" />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={billingForm.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address line 2</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300" />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={billingForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone *</FormLabel>
                      <FormControl>
                        <PhoneInput
                          placeholder="Phone"
                          className="border-[#BBC2CB]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={billingForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={billingForm.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Country *</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={billingForm.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal code *</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={billingForm.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country *</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" type="submit" disabled={isSubmittingBilling} className="rounded-lg">
                    {isSubmittingBilling ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
