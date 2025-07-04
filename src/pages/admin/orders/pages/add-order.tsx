import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/shared/header"
import { CustomSelect } from "@/components/shared/custom-select"
import { useCreateOrder } from "../core/hooks/use-orders"
import { CreateOrderData } from "../core/_modals"
import { useGetProducts } from "../../products/core/hooks/useProduct"

// Zod Schema
const orderSchema = z.object({
    productDetails: z.string().min(1, "Product id is required"),
    customerDetails: z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email address"),
        phoneNumber: z.string().min(1, "Phone number is required"),
        emailCC: z.string().email("Invalid CC email").optional().or(z.literal("")),
        customerReference: z.string().optional(),
        vatNumbers: z.string().optional(),
        abn: z.string().optional(),
        shippingAddress: z.object({
            firstName: z.string().min(1, "First name is required"),
            lastName: z.string().min(1, "Last name is required"),
            company: z.string().optional(),
            addressLine1: z.string().min(1, "Address line 1 is required"),
            addressLine2: z.string().optional(),
            city: z.string().min(1, "City is required"),
            state: z.string().min(1, "State is required"),
            postalCode: z.string().min(1, "Postal code is required"),
            country: z.string().min(1, "Country is required"),
            phone: z.string().optional(),
        }),
        billingAddress: z.object({
            firstName: z.string().min(1, "First name is required"),
            lastName: z.string().min(1, "Last name is required"),
            company: z.string().optional(),
            addressLine1: z.string().min(1, "Address line 1 is required"),
            addressLine2: z.string().optional(),
            city: z.string().min(1, "City is required"),
            state: z.string().min(1, "State is required"),
            postalCode: z.string().min(1, "Postal code is required"),
            country: z.string().min(1, "Country is required"),
            phone: z.string().optional(),
        }),
        channelDetails: z.string().min(1, "Channel details required"),
    }),
    channelDetails: z.string().min(1, "Channel details required"),
    companyIdentity: z.string().min(1, "Company identity is required"),
    channelPurhasedFrom: z.string().min(1, "Channel purchased from is required"),
    channelOrderNumber: z.string().min(1, "Channel order ID is required"),
    orderStatus: z.string().min(1, "Order status is required"),
    attentionRequired: z.boolean(),
    sellerId: z.string().min(1, "Seller ID is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    itemOptions: z.number().min(1, "Item options must be at least 1"),
    quantityAllocated: z.number().min(0, "Quantity allocated must be non-negative"),
    unitSubtotal: z.number().min(0, "Unit subtotal must be non-negative"),
    taxRate: z.number().min(0, "Tax rate must be non-negative"),
    taxTotal: z.number().min(0, "Tax total must be non-negative"),
    discount: z.number().min(0, "Discount must be non-negative"),
    totalPrice: z.number().min(0, "Total price must be non-negative"),
    status: z.string().min(1, "Status is required"),
    orderDate: z.date(),
    importedFromChannelOn: z.date().optional(),
    assignedToPickerOn: z.date().optional(),
    dispatchedOn: z.date().optional(),
    dispatchSentToChannel: z.date().optional(),
    paymentId: z.string().optional(),
    deliveredOn: z.date().optional(),
    manifestedOn: z.date().optional(),
    designatedPicker: z.string().optional(),
    designatedPacker: z.string().optional(),
    signedForBy: z.string().optional(),
    shippingAndHandling: z.object({
        warehouse: z.string().min(1, "Warehouse is required"),
        shippingMethod: z.string().min(1, "Shipping method is required"),
        updateOrderTotal: z.boolean(),
        shippingCost: z.number().min(0, "Shipping cost must be non-negative"),
        channelShippingMethod: z.string().optional(),
        trackingNumber: z.string().optional(),
        specialInstructions: z.string().optional(),
        pickerInstructions: z.string().optional(),
        orderWeight: z.number().min(0, "Order weight must be non-negative"),
        overrideWeight: z.boolean(),
        packageSize: z.string().optional(),
        numberOfParcels: z.number().min(1, "Number of parcels must be at least 1"),
        airNumber: z.string().optional(),
    }),
    billingAddress: z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        company: z.string().optional(),
        addressLine1: z.string().min(1, "Address line 1 is required"),
        addressLine2: z.string().optional(),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        postalCode: z.string().min(1, "Postal code is required"),
        country: z.string().min(1, "Country is required"),
    }),
    notes: z.array(
        z.object({
            subject: z.string().min(1, "Subject is required"),
            note: z.string().min(1, "Note is required"),
        }),
    ),
    refundedAmount: z.string().optional(),
    pickwave: z.string().optional(),
    scannedQuantity: z.number().min(0, "Scanned quantity must be non-negative"),
    royalMailLabelUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
})

type OrderFormData = z.infer<typeof orderSchema>

// Mock data for dropdowns
const mockWarehouses = [
    { id: "6836ad6a7ad0996826a6e132", name: "Main Warehouse" },
    { id: "6836ad6a7ad0996826a6e133", name: "Secondary Warehouse" },
]

const orderStatuses = ["Processing", "Complete (Ready to pick)", "Pending", "Shipped", "Delivered", "Cancelled"]

const shippingMethods = ["Royal Mail Tracked 24", "Royal Mail Tracked 48", "DPD Next Day", "Standard Delivery"]

export function AddOrderPage() {
    const [selectedProducts, setSelectedProducts] = useState<string[]>([])

    const {mutate: createOrderMutation, isPending} = useCreateOrder()
    const { data: productsData } = useGetProducts({
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
    })  
    console.log(productsData, "products");

    const form = useForm<OrderFormData>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
          productDetails: "",
          customerDetails: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            emailCC: "",
            customerReference: "",
            vatNumbers: "",
            abn: "",
            shippingAddress: {
              firstName: "",
              lastName: "",
              company: "",
              addressLine1: "",
              addressLine2: "",
              city: "",
              state: "",
              postalCode: "",
              country: "",
              phone: "",
            },
            billingAddress: {
              firstName: "",
              lastName: "",
              company: "",
              addressLine1: "",
              addressLine2: "",
              city: "",
              state: "",
              postalCode: "",
              country: "",
              phone: "",
            },
            channelDetails: "",
          },
          channelDetails: "",
          companyIdentity: "",
          channelPurhasedFrom: "",
          channelOrderNumber: "",
          orderStatus: "Processing",
          attentionRequired: false,
          sellerId: "",
          quantity: 1,
          itemOptions: 1,
          quantityAllocated: 0,
          unitSubtotal: 0,
          taxRate: 0,
          taxTotal: 0,
          discount: 0,
          totalPrice: 0,
          status: "pending",
          orderDate: new Date(),
          importedFromChannelOn: new Date(),
          assignedToPickerOn: new Date(),
          dispatchedOn: new Date(),
          dispatchSentToChannel: new Date(),
          paymentId: "",
          deliveredOn: new Date(),    
          manifestedOn: new Date(),
          designatedPicker: "",
          designatedPacker: "",
          signedForBy: "",
          shippingAndHandling: {
            warehouse: "",
            shippingMethod: "",
            updateOrderTotal: true,
            shippingCost: 0,
            channelShippingMethod: "",
            trackingNumber: "",
            specialInstructions: "",
            pickerInstructions: "",
            orderWeight: 0,
            overrideWeight: false,
            packageSize: "",
            numberOfParcels: 1,
            airNumber: "",
          },
          notes: [],
          refundedAmount: "",
          pickwave: "",
          scannedQuantity: 0,
          royalMailLabelUrl: "",
        },
      });
    
    const {
        fields: noteFields,
        append: appendNote,
        remove: removeNote,
    } = useFieldArray({
        control: form.control,
        name: "notes",
    })

    console.log(form.formState.errors, "form.formState.errors");

    // const createOrderMutation = useMutation({
    //     mutationFn: async (data: OrderFormData) => {
    //         // Mock API call
    //         console.log("Creating order:", data)
    //         await new Promise((resolve) => setTimeout(resolve, 1000))
    //         return { success: true, orderId: "ORD-" + Date.now() }
    //     },
    //     onSuccess: (data) => {
    //         console.log("Order created successfully:", data)
    //         // Reset form or redirect
    //     },
    //     onError: (error) => {
    //         console.error("Error creating order:", error)
    //     },
    // })

    const onSubmit = (data: OrderFormData) => {
        console.log(data, "data");
        createOrderMutation(data as unknown as CreateOrderData)
    }

    const copyBillingToShipping = () => {
        const billingAddress = form.getValues("billingAddress")
        form.setValue("customerDetails.shippingAddress", {
            firstName: billingAddress.firstName,
            lastName: billingAddress.lastName,
            company: billingAddress.company || "",
            addressLine1: billingAddress.addressLine1,
            addressLine2: billingAddress.addressLine2 || "",
            city: billingAddress.city,
            state: billingAddress.state,
            postalCode: billingAddress.postalCode,
            country: billingAddress.country,
            phone: "",
        })
    }

    return (
        <div>
            <Header title="Order" />
            <div className="mt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-[#4E5967]">
                            {/* Left Column - Order Information */}
                            <div className="lg:col-span-2 space-y-6">
                                <Card className="bg-[#ECF6FF] border-none rounded-2xl shadow-none">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <CardTitle>Order Information</CardTitle>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground">eBay</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="channelOrderNumber"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Channel Order ID</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Enter order ID" className="bg-white border-gray-300 rounded-lg" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="companyIdentity"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Company Identity</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Enter company identity" className="bg-white border-gray-300 rounded-lg" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="channelPurhasedFrom"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Channel Purchased From</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Enter channel" className="bg-white border-gray-300 rounded-lg"/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="orderStatus"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Order Status</FormLabel>
                                                        <CustomSelect
                                                            defaultValue={field.value}
                                                            placeholder="Select status"
                                                            options={orderStatuses.map((status) => ({
                                                                id: status,
                                                                label: status,
                                                                value: status,
                                                            }))}
                                                            onChange={field.onChange}
                                                            className=" bg-white w-full"
                                                        />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="attentionRequired"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormControl>
                                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel className="w-40">Attention Required</FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>

                                {/* Customer Section */}
                                <Card className="bg-[#ECF6FF] border-none rounded-2xl shadow-none">
                                    <CardHeader>
                                        <CardTitle>Customer</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="customerDetails.firstName"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">First Name</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Enter first name" className="bg-white border-gray-300 rounded-lg"/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="customerDetails.lastName"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Last Name</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Enter last name" className="bg-white border-gray-300 rounded-lg"/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="customerDetails.phoneNumber"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Phone</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Enter phone number" className="bg-white border-gray-300 rounded-lg" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="customerDetails.email"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Email</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} type="email" placeholder="Enter email" className="bg-white border-gray-300 rounded-lg" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="customerDetails.emailCC"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormLabel className="w-40">Email CC (comma-separated)</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Enter CC emails"  className="bg-white border-gray-300 rounded-lg"/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>

                                {/* Address Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Billing Address */}
                                    <Card className="bg-[#ECF6FF] border-none rounded-2xl shadow-none">
                                        <CardHeader>
                                            <CardTitle>Billing Address</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="billingAddress.firstName"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-center gap-2">
                                                            <FormLabel className="w-40">Name</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} placeholder="First name" className="bg-white border-gray-300 rounded-lg"/>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="billingAddress.lastName"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-center gap-2">
                                                            <FormLabel className="w-40">&nbsp;</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} placeholder="Last name" className="bg-white border-gray-300 rounded-lg"/>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="billingAddress.company"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Company</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Company name" className="bg-white border-gray-300 rounded-lg"/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="billingAddress.addressLine1"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Address 1</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Address line 1" className="bg-white border-gray-300 rounded-lg"/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="billingAddress.addressLine2"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Address 2</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Address line 2" className="bg-white border-gray-300 rounded-lg"/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="billingAddress.city"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-center gap-2">
                                                            <FormLabel className="w-40">City</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} placeholder="City" className="bg-white border-gray-300 rounded-lg"/>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="billingAddress.state"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-center gap-2">
                                                            <FormLabel className="w-40">County</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} placeholder="State/County" className="bg-white border-gray-300 rounded-lg"/>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="billingAddress.postalCode"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-center gap-2">
                                                            <FormLabel className="w-40">Postcode</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} placeholder="Postal code" className="bg-white border-gray-300 rounded-lg"/>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="billingAddress.country"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-center gap-2">
                                                            <FormLabel className="w-40">Country</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} placeholder="Country" className="bg-white border-gray-300 rounded-lg"/>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Shipping Address */}
                                    <Card className="bg-[#ECF6FF] border-none rounded-2xl shadow-none">
                                        <CardHeader className="flex flex-row items-center justify-between">
                                            <CardTitle>Shipping Address</CardTitle>
                                            <Button type="button" variant="outline" size="sm" onClick={copyBillingToShipping}>
                                                Copy from Billing
                                            </Button>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="customerDetails.shippingAddress.firstName"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-center gap-2">
                                                            <FormLabel className="w-40">Name</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} placeholder="First name" className="bg-white border-gray-300 rounded-lg"/>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="customerDetails.shippingAddress.lastName"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-center gap-2">
                                                            <FormLabel className="w-40">&nbsp;</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} placeholder="Last name" className="bg-white border-gray-300 rounded-lg"/>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="customerDetails.shippingAddress.company"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Company</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Company name" className="bg-white border-gray-300 rounded-lg"/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="customerDetails.shippingAddress.addressLine1"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Address 1</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Address line 1" className="bg-white border-gray-300 rounded-lg"/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="customerDetails.shippingAddress.addressLine2"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Address 2</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Address line 2" className="bg-white border-gray-300 rounded-lg"/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="customerDetails.shippingAddress.city"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-center gap-2">
                                                            <FormLabel className="w-40">City</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} placeholder="City" className="bg-white border-gray-300 rounded-lg"/>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="customerDetails.shippingAddress.state"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-center gap-2">
                                                            <FormLabel className="w-40">County</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} placeholder="State/County" className="bg-white border-gray-300 rounded-lg"/>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="customerDetails.shippingAddress.postalCode"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-center gap-2">
                                                            <FormLabel className="w-40">Postcode</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} placeholder="Postal code" className="bg-white border-gray-300 rounded-lg"/>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="customerDetails.shippingAddress.country"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-center gap-2">
                                                            <FormLabel className="w-40">Country</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} placeholder="Country" className="bg-white border-gray-300 rounded-lg"/>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="customerDetails.shippingAddress.phone"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Phone</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Phone number" className="bg-white border-gray-300 rounded-lg"/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* Right Column - Order Information Panel */}
                            <div className="space-y-6">
                            <Card className="bg-white border-none rounded-2xl shadow-none"> 
                                    <CardHeader>
                                        <CardTitle>Order Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <Label className="text-muted-foreground">Order Date</Label>
                                                <FormField
                                                    control={form.control}
                                                    name="orderDate"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-center gap-2">
                                                            <FormLabel className="w-40">Order Date</FormLabel>
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <FormControl>
                                                                        <Button
                                                                            variant="outline"
                                                                            className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                                                        >
                                                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={field.value}
                                                                        onSelect={field.onChange}
                                                                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                                                        initialFocus
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Delivered on</Label>
                                                <p className="font-medium">100736937802/8</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <Label className="text-muted-foreground">Imported from Channel on</Label>
                                                <p>-</p>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Manifested on</Label>
                                                <p>Not Yet Set</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <Label className="text-muted-foreground">Assigned to Picker on</Label>
                                                <p>-</p>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Pickwave ID</Label>
                                                <p>Not Yet Set</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <Label className="text-muted-foreground">Pickwave ID</Label>
                                                <p>-</p>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Designated Picker</Label>
                                                <p>Not Yet Set</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <Label className="text-muted-foreground">Dispatched on</Label>
                                                <p>-</p>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Designated Packer</Label>
                                                <p>-</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <Label className="text-muted-foreground">Dispatch sent to Channel</Label>
                                                <p>-</p>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Signed for by</Label>
                                                <p>-</p>
                                            </div>
                                        </div>

                                        <div className="text-sm">
                                            <Label className="text-muted-foreground">Payment ID</Label>
                                            <p>-</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Shipping & Handling */}
                                <Card className="bg-white border-none rounded-2xl shadow-none">
                                    <CardHeader>
                                        <CardTitle>Shipping & Handling</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="text-sm">
                                            <Label className="text-muted-foreground">Warehouse</Label>
                                            <FormField
                                                control={form.control}
                                                name="shippingAndHandling.warehouse"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Warehouse</FormLabel>
                                                        <FormControl>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select warehouse" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {mockWarehouses.map((warehouse) => (
                                                                        <SelectItem key={warehouse.id} value={warehouse.id}>
                                                                            {warehouse.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label className="text-muted-foreground">Shipping Method *</Label>
                                                <FormField
                                                    control={form.control}
                                                    name="shippingAndHandling.shippingMethod"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-row items-center gap-2">
                                                            <FormLabel className="w-40">Shipping Method</FormLabel>
                                                            <FormControl>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select method" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {shippingMethods.map((method) => (
                                                                            <SelectItem key={method} value={method}>
                                                                                {method}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="flex items-end">
                                                <Button variant="outline" size="sm">
                                                    Update Order Total
                                                </Button>
                                            </div>
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="shippingAndHandling.shippingCost"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormLabel className="w-40">Shipping Cost</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            step="0.01"
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                                                            placeholder="0.00"
                                                            className="bg-white border-gray-300 rounded-lg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="shippingAndHandling.channelShippingMethod"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormLabel className="w-40">Channel Shipping Method</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="e.g. RoyalMail/eBay" className="bg-white border-gray-300 rounded-lg"/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="shippingAndHandling.trackingNumber"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormLabel className="w-40">Tracking Number</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Enter tracking number" className="bg-white border-gray-300 rounded-lg"/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="shippingAndHandling.specialInstructions"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormLabel className="w-40">Special Instructions</FormLabel>
                                                    <FormControl>
                                                        <Textarea {...field} placeholder="Enter special instructions" className="bg-white border-gray-300 rounded-lg"/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="shippingAndHandling.pickerInstructions"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormLabel className="w-40">Picker Instructions</FormLabel>
                                                    <FormControl>
                                                        <Textarea {...field} placeholder="Enter picker instructions" className="bg-white border-gray-300 rounded-lg"/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="shippingAndHandling.orderWeight"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Order Weight</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                step="0.01"
                                                                {...field}
                                                                onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                                                                placeholder="0.00"
                                                                className="bg-white border-gray-300 rounded-lg"/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="shippingAndHandling.overrideWeight"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormControl>
                                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                        </FormControl>
                                                        <div className="space-y-1 leading-none">
                                                            <FormLabel className="w-40">Override Weight</FormLabel>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="shippingAndHandling.packageSize"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormLabel className="w-40">Package Size</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Enter package size" className="bg-white border-gray-300 rounded-lg"/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="shippingAndHandling.numberOfParcels"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormLabel className="w-40">Number Of Parcels</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 1)}
                                                            placeholder="1"
                                                            className="bg-white border-gray-300 rounded-lg"/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="shippingAndHandling.airNumber"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormLabel className="w-40">Air Number</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="e.g. RoyalMail/eBay" className="bg-white border-gray-300 rounded-lg"/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Items Ordered Section */}
                        <Card className="bg-white border-none rounded-2xl shadow-none">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Items Ordered</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-12">Select</TableHead>
                                            <TableHead>Product SKU</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Item Options</TableHead>
                                            <TableHead>Quantity Allocated</TableHead>
                                            <TableHead>Unit Subtotal</TableHead>
                                            <TableHead>Tax Rate</TableHead>
                                            <TableHead>Tax Total</TableHead>
                                            <TableHead>Discount</TableHead>
                                            <TableHead>Total</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(productsData?.productsWithOrderCOunt?.length ?? 0) > 0 ? (
                                            (productsData?.productsWithOrderCOunt ?? []).map((product) => {
                                                const isSelected = selectedProducts.includes(product._id)
                                                return (
                                                    <TableRow key={product._id} className="border-b border-gray-200">
                                                        <TableCell>
                                                            <Checkbox
                                                                checked={isSelected}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) {
                                                                        setSelectedProducts([...selectedProducts, product._id])
                                                                    } else {
                                                                        setSelectedProducts(selectedProducts.filter((id) => id !== product._id))
                                                                    }
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell>{product.sku}</TableCell>
                                                        <TableCell>{product.productName}</TableCell>
                                                        <TableCell>
                                                            <FormField
                                                                control={form.control}
                                                                name="quantity"
                                                                render={({ field }) => (
                                                                    <Input
                                                                        type="number"
                                                                        className="w-20 bg-white border-gray-300 rounded-lg"
                                                                        {...field}
                                                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                                                        disabled={!isSelected}
                                                                    />
                                                                )}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <FormField
                                                                control={form.control}
                                                                name="itemOptions"
                                                                render={({ field }) => (
                                                                    <Input
                                                                        type="number"
                                                                        className="w-20 bg-white border-gray-300 rounded-lg"
                                                                        {...field}
                                                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                                                        disabled={!isSelected}
                                                                    />
                                                                )}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <FormField
                                                                control={form.control}
                                                                name="quantityAllocated"
                                                                render={({ field }) => (
                                                                    <Input
                                                                        type="number"
                                                                        className="w-20 bg-white border-gray-300 rounded-lg"
                                                                        {...field}
                                                                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                                                        disabled={!isSelected}
                                                                    />
                                                                )}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <FormField
                                                                control={form.control}
                                                                name="unitSubtotal"
                                                                render={({ field }) => (
                                                                    <Input
                                                                        type="number"
                                                                        step="0.01"
                                                                        className="w-24 bg-white border-gray-300 rounded-lg"
                                                                        {...field}
                                                                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                                                                        disabled={!isSelected}
                                                                    />
                                                                )}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <FormField
                                                                control={form.control}
                                                                name="taxRate"
                                                                render={({ field }) => (
                                                                    <Input
                                                                        type="number"
                                                                        step="0.01"
                                                                        className="w-20 bg-white border-gray-300 rounded-lg"
                                                                        {...field}
                                                                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                                                                        disabled={!isSelected}
                                                                    />
                                                                )}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <FormField
                                                                control={form.control}
                                                                name="taxTotal"
                                                                render={({ field }) => (
                                                                    <Input
                                                                        type="number"
                                                                        step="0.01"
                                                                        className="w-24 bg-white border-gray-300 rounded-lg"
                                                                        {...field}
                                                                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                                                                        disabled={!isSelected}
                                                                    />
                                                                )}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <FormField
                                                                control={form.control}
                                                                name="discount"
                                                                render={({ field }) => (
                                                                    <Input
                                                                        type="number"
                                                                        step="0.01"
                                                                        className="w-24 bg-white border-gray-300 rounded-lg"
                                                                        {...field}
                                                                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                                                                        disabled={!isSelected}
                                                                    />
                                                                )}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <FormField
                                                                control={form.control}
                                                                name="totalPrice"
                                                                render={({ field }) => (
                                                                    <Input
                                                                        type="number"
                                                                        step="0.01"
                                                                        className="w-24 bg-white border-gray-300 rounded-lg"
                                                                        {...field}
                                                                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                                                                        disabled={!isSelected}
                                                                    />
                                                                )}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant="secondary">Allocated</Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={12} className="text-center text-muted-foreground">
                                                    No products found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        {/* Bottom Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Order Totals */}
                            <Card className="bg-white border-none rounded-2xl shadow-none">
                                <CardHeader>
                                    <CardTitle>Order Totals</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>£ 6.43</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping Costs</span>
                                        <span>£ 6.43</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping Tax</span>
                                        <span>£ 6.43</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Discount</span>
                                        <span>£ 6.43</span>
                                    </div>
                                    {/* <Separator /> */}
                                    <div className="flex justify-between">
                                        <span>Lines Total Tax</span>
                                        <span>£ 6.43</span>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>£ 6.43</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Refunded Amount</span>
                                        <FormField
                                            control={form.control}
                                            name="refundedAmount"
                                            render={({ field }) => <Input {...field} className="w-24 bg-white border-gray-300 rounded-lg" placeholder="0.00" />}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Order Notes */}
                            <Card className="bg-white border-none rounded-2xl shadow-none">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Order Notes</CardTitle>
                                    <Button type="button" variant="outline" size="sm" onClick={() => appendNote({ subject: "", note: "" })}>
                                        + Add Note
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {noteFields.length > 0 ? (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-4 gap-2 text-sm font-medium">
                                                <span>Subject</span>
                                                <span>Note</span>
                                                <span>Created On</span>
                                                <span>Created By</span>
                                            </div>
                                            {noteFields.map((field, index) => (
                                                <div key={field.id} className="grid grid-cols-4 gap-2 items-start">
                                                    <FormField
                                                        control={form.control}
                                                        name={`notes.${index}.subject`}
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-center gap-2">
                                                                <FormControl>
                                                                    <Input {...field} placeholder="Subject" className="bg-white border-gray-300 rounded-lg"/>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name={`notes.${index}.note`}
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-center gap-2">
                                                                <FormControl>
                                                                    <Textarea {...field} placeholder="Note" className="min-h-[40px] bg-white border-gray-300 rounded-lg" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <div className="text-sm text-muted-foreground">{format(new Date(), "PPP")}</div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-muted-foreground">Admin</span>
                                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeNote(index)}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-center text-muted-foreground">No records to display.</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Creating..." : "Save"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default AddOrderPage