import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Customer } from "../core/_modals"
import { updateCustomer } from "../core/dummy"

const basicDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().optional(),
  email: z.string().email("Invalid email address"),
  ccEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  customerReference: z.string().optional(),
})

type BasicDetailsFormValues = z.infer<typeof basicDetailsSchema>

export function CustomerBasicDetails({ customer }: { customer: Customer }) {
  const queryClient = useQueryClient()

  const form = useForm<BasicDetailsFormValues>({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: {
      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      phoneNumber: customer.phoneNumber || "",
      email: customer.email || "",
      ccEmail: customer.ccEmail || "",
      customerReference: customer.reference || "",
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer", customer.id] })
    },
  })

  function onSubmit(data: BasicDetailsFormValues) {
    updateMutation.mutate({
      id: customer.id,
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        ccEmail: data.ccEmail,
        reference: data.customerReference,
      },
    })
    console.log(data, "Form submitted")
    form.reset();
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Name & contact details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:col-span-2 border-t pt-4 mt-2"></div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ccEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email CC address</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax & customs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormItem>
                <FormLabel>VAT Number</FormLabel>
                <FormControl>
                  <Input placeholder="Add a new tag" />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>EORI</FormLabel>
                <FormControl>
                  <Input placeholder="Add a new tag" />
                </FormControl>
              </FormItem>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
