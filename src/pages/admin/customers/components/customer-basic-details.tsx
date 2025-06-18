import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { ICustomer } from "../core/_modals"
import { useState } from "react"
import { BasicDetailsFormValues, basicDetailsSchema } from '../core/_schema'

export function CustomerBasicDetails({
  customer,
  onUpdate,
}: {
  customer: ICustomer
  onUpdate: (data: BasicDetailsFormValues) => Promise<boolean>
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<BasicDetailsFormValues>({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: {
      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      phoneNumber: customer.phoneNumber || "",
      email: customer.email || "",
      emailCC: customer.emailCC || "",
      customerReference: customer.customerReference || "",
      vatNumber: customer.vatNumber || "",
      abn: customer.abn || "",
    },
  })

  async function onSubmit(data: BasicDetailsFormValues) {
    setIsSubmitting(true)
    try {
      const success = await onUpdate(data)
      if (success) {
        form.reset(data)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <Card className="col-span-2 bg-white border-none rounded-2xl shadow-none">
            <CardHeader>
              <CardTitle>Name & contact details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name *</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emailCC"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email CC address</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="customerReference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer reference</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div>
            <Card className="bg-white border-none rounded-2xl shadow-none h-fit">
              <CardHeader>
                <CardTitle>Tax & customs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    control={form.control}
                    name="vatNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VAT Number</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="abn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>EORI</FormLabel>
                        <FormControl>
                          <Input {...field} className="border-gray-300" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex justify-end gap-4 w-full mt-9">
          <Button type="button" variant="outline" className="rounded-lg" size="lg">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="rounded-lg bg-[#024AFE] hover:bg-[#1b02fe]" size="lg">
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
