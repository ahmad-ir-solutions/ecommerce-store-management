import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2, Trash2 } from "lucide-react"

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
import { Header } from "@/components/shared/header"
import { CustomSelect } from "@/components/shared/custom-select"
import { useCreateOrder } from "../core/hooks/use-orders"
import { useGetProducts } from "../../products/core/hooks/useProduct"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { showInfoMessage } from "@/lib/utils/messageUtils"
import { Link, useNavigate } from "react-router-dom"
import { useGetAllUsers } from "../../settings/users/core/hooks/use-user"
import type { IUserModel } from "../../settings/users/core/_models"
import { useGetAllChannels } from "../../common-api/channels/core/_hooks"

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
            firstName: z.string().optional(),
            lastName: z.string().optional(),
            company: z.string().optional(),
            addressLine1: z.string().optional(),
            addressLine2: z.string().optional(),
            city: z.string().optional(),
            state: z.string().optional(),
            postalCode: z.string().optional(),
            country: z.string().optional(),
            phone: z.string().optional(),
        }),
        billingAddress: z.object({
            firstName: z.string().optional(),
            lastName: z.string().optional(),
            company: z.string().optional(),
            addressLine1: z.string().optional(),
            addressLine2: z.string().optional(),
            city: z.string().optional(),
            state: z.string().optional(),
            postalCode: z.string().optional(),
            country: z.string().optional(),
            phone: z.string().optional(),
        }),
        channelDetails: z.string().optional(),
    }),
    channelDetails: z.string().optional(),
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

    notes: z.array(
        z.object({
            subject: z.string().min(1, "Subject is required"),
            note: z.string().min(1, "Note is required"),
        }),
    ),
    refundedAmount: z.string().optional(),
    //   pickwave: z.string().optional(),
    scannedQuantity: z.number().min(0, "Scanned quantity must be non-negative").optional(),
    // royalMailLabelUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
})

type OrderFormData = z.infer<typeof orderSchema>

// Mock data for dropdowns
const mockWarehouses = [
    { id: "6836ad6a7ad0996826a6e132", name: "Main Warehouse" },
    { id: "6836ad6a7ad0996826a6e133", name: "Secondary Warehouse" },
]

const orderStatuses = ["processing", "confirmed", "shipped", "delivered", "cancelled"]

const shippingMethods = ["Royal Mail Tracked 24", "Royal Mail Tracked 48", "DPD Next Day", "Standard Delivery"]

export function AddOrderPage() {
    // const [selectedProducts, setSelectedProducts] = useState<string[]>([])
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

    const {
        data: productsData,
        isLoading: productsLoading,
        // isError,
    } = useGetProducts({
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
    })
    const { mutate: createOrderMutation, isPending } = useCreateOrder()
    const { data: sellersData } = useGetAllUsers()
    const { data: channelsData } = useGetAllChannels()
    const navigate = useNavigate()
    // console.log(sellersData.data, "sellersData");

    // Filter sellers to only show users with role "USER"
    const sellers = sellersData?.data?.filter((user: IUserModel) => user.role === "USER") || []
    console.log(productsData, "products")

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
            //   pickwave: "",
            scannedQuantity: 0,
            // royalMailLabelUrl: "",
        },
    })

    const {
        fields: noteFields,
        append: appendNote,
        remove: removeNote,
    } = useFieldArray({
        control: form.control,
        name: "notes",
    })

    console.log(form.formState.errors, "form.formState.errors")

    const handleAddSelectedProducts = () => {
        if (selectedProductId === null) {
            showInfoMessage("Please select at least one product.")
            return
        }

        // Store in your app state, cart, or form
        console.log("Selected Product IDs:", selectedProductId)

        // Set the selected product ID to the form field
        form.setValue("productDetails", selectedProductId)
    }

    const onSubmit = (data: OrderFormData) => {
        console.log(data, "data")
        try {
            createOrderMutation({ ...data, quantity: 1 })
            form.reset()
            navigate("/admin/orders")
        } catch (error) {
            console.log(error, "error")
        }
    }

    const copyBillingToShipping = () => {
        const billingAddress = form.getValues("customerDetails.billingAddress")
        form.setValue("customerDetails.shippingAddress", {
            firstName: billingAddress?.firstName || "",
            lastName: billingAddress?.lastName || "",
            company: billingAddress?.company || "",
            addressLine1: billingAddress?.addressLine1 || "",
            addressLine2: billingAddress?.addressLine2 || "",
            city: billingAddress?.city || "",
            state: billingAddress?.state || "",
            postalCode: billingAddress?.postalCode || "",
            country: billingAddress?.country || "",
            phone: "",
        })
    }

    return (
        <div>
            <Header title="Order" />
            <div className="mt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[#4E5967]">
                            {/* Left Column - Order Information */}
                            <div className="space-y-6 bg-white rounded-2xl p-6">
                                <div className="flex items-center gap-2">
                                <h2 className="text-lg text-[#11263C] font-semibold">Order Information</h2>
                                    {/* <span className="text-sm text-muted-foreground">eBay</span> */}
                                </div>
                                <Card className="bg-[#ECF6FF] border-none rounded-2xl shadow-none">
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="channelOrderNumber"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Channel Order ID</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="Enter order ID"
                                                                className="bg-white border-gray-300 rounded-lg"
                                                            />
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
                                                            <Input
                                                                {...field}
                                                                placeholder="Enter company identity"
                                                                className="bg-white border-gray-300 rounded-lg"
                                                            />
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
                                                            <Input
                                                                {...field}
                                                                placeholder="Enter channel"
                                                                className="bg-white border-gray-300 rounded-lg"
                                                            />
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

                                        <FormField
                                            control={form.control}
                                            name="sellerId"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormLabel className="w-40">Seller <span className="text-red-500">*</span></FormLabel>
                                                    <CustomSelect
                                                        defaultValue={field.value}
                                                        placeholder="Select seller"
                                                        options={sellers.map((user: IUserModel) => ({
                                                            id: user._id,
                                                            label: user.name,
                                                            value: user._id,
                                                        }))}
                                                        onChange={field.onChange}
                                                        className=" bg-white w-full"
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* <FormField
                                            control={form.control}
                                            name="channelDetails"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormLabel className="w-40">Channel</FormLabel>
                                                    <CustomSelect
                                                        defaultValue={field.value}
                                                        placeholder="Select channel"
                                                        options={(channelsData?.data ?? []).map((channel: any) => ({
                                                            id: channel._id,
                                                            label: channel.channelName,
                                                            value: channel._id,
                                                        }))}
                                                        onChange={field.onChange}
                                                        className=" bg-white w-full"
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /> */}

                                        <FormField
                                            control={form.control}
                                            name="customerDetails.channelDetails"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormLabel className="w-40">Channel <span className="text-red-500">*</span></FormLabel>
                                                    <CustomSelect
                                                        defaultValue={field.value}
                                                        placeholder="Select channel"
                                                        options={(channelsData?.data ?? []).map((channel: any) => ({
                                                            id: channel._id,
                                                            label: channel.channelName,
                                                            value: channel._id,
                                                        }))}
                                                        onChange={(val) => {
                                                            field.onChange(val);
                                                            form.setValue("customerDetails.channelDetails", val as string);
                                                            form.setValue("channelDetails", val as string);
                                                        }}
                                                        className=" bg-white w-full"
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />


                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="quantity"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Quantity</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 1)}
                                                                placeholder="1"
                                                                className="bg-white border-gray-300 rounded-lg"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="itemOptions"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Item Options</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 1)}
                                                                placeholder="1"
                                                                className="bg-white border-gray-300 rounded-lg"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="quantityAllocated"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Quantity Allocated</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                                                placeholder="0"
                                                                className="bg-white border-gray-300 rounded-lg"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="unitSubtotal"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Unit Subtotal</FormLabel>
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
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="taxRate"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Tax Rate</FormLabel>
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
                                                name="taxTotal"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Tax Total</FormLabel>
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
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="discount"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Discount</FormLabel>
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
                                                name="totalPrice"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40">Total Price</FormLabel>
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
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormLabel className="w-40">Status</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="Enter status"
                                                            className="bg-white border-gray-300 rounded-lg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>

                                {/* Customer Section */}
                                <h2 className="text-lg text-[#11263C] font-semibold">Customer</h2>
                                <Card className="bg-[#ECF6FF] border-none rounded-2xl shadow-none">
                                    <CardContent className="space-y-6">
                                        {/* Customer Details */}
                                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                                        <FormField
                                            control={form.control}
                                            name="customerDetails.firstName"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                    <FormLabel className="sm:w-32 md:w-40 text-sm">First Name</FormLabel>
                                                    <FormControl className="flex-1">
                                                        <Input
                                                            {...field}
                                                            placeholder="Enter first name"
                                                            className="bg-white border-gray-300 rounded-lg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="customerDetails.lastName"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                    <FormLabel className="sm:w-32 md:w-40 text-sm">Last Name</FormLabel>
                                                    <FormControl className="flex-1">
                                                        <Input
                                                            {...field}
                                                            placeholder="Enter last name"
                                                            className="bg-white border-gray-300 rounded-lg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* </div> */}

                                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                                        <FormField
                                            control={form.control}
                                            name="customerDetails.phoneNumber"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                    <FormLabel className="sm:w-32 md:w-40 text-sm">Phone</FormLabel>
                                                    <FormControl className="flex-1">
                                                        <Input
                                                            {...field}
                                                            placeholder="Enter phone number"
                                                            className="bg-white border-gray-300 rounded-lg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="customerDetails.email"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                    <FormLabel className="sm:w-32 md:w-40 text-sm">Email</FormLabel>
                                                    <FormControl className="flex-1">
                                                        <Input
                                                            {...field}
                                                            type="email"
                                                            placeholder="Enter email"
                                                            className="bg-white border-gray-300 rounded-lg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {/* </div> */}

                                        <FormField
                                            control={form.control}
                                            name="customerDetails.emailCC"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                    <FormLabel className="sm:w-32 md:w-40 text-sm">Email CC (comma-separated)</FormLabel>
                                                    <FormControl className="flex-1">
                                                        <Input
                                                            {...field}
                                                            placeholder="Enter CC emails"
                                                            className="bg-white border-gray-300 rounded-lg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Address Section */}
                                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                                            {/* Billing Address */}
                                            <Card className="border-none rounded-2xl shadow-none">
                                                <CardHeader className="px-0 pb-4">
                                                    <CardTitle className="text-base">Billing Address</CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4 px-0">
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="customerDetails.billingAddress.firstName"
                                                            render={({ field }) => (
                                                                <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                    <FormLabel className="lg:w-24 xl:w-32 text-sm">First Name</FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="First name"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="customerDetails.billingAddress.lastName"
                                                            render={({ field }) => (
                                                                <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                    <FormLabel className="lg:w-24 xl:w-32 text-sm">Last Name</FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Last name"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <FormField
                                                        control={form.control}
                                                        name="customerDetails.billingAddress.company"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                <FormLabel className="lg:w-24 xl:w-32 text-sm">Company</FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Company name"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="customerDetails.billingAddress.addressLine1"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                <FormLabel className="lg:w-24 xl:w-32 text-sm">Address 1</FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Address line 1"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="customerDetails.billingAddress.addressLine2"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                <FormLabel className="lg:w-24 xl:w-32 text-sm">Address 2</FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Address line 2"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> */}
                                                    <FormField
                                                        control={form.control}
                                                        name="customerDetails.billingAddress.city"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                <FormLabel className="lg:w-24 xl:w-32 text-sm">City</FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="City"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    {/* <FormField
                  control={form.control}
                  name="billingAddress.state"
                  render={({ field }) => (
                    <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                      <FormLabel className="lg:w-24 xl:w-32 text-sm">County</FormLabel>
                      <FormControl className="flex-1">
                        <Input {...field} placeholder="State/County" className="bg-white border-gray-300 rounded-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                                                    {/* </div> */}

                                                    <div className="grid grid-cols-1 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="customerDetails.billingAddress.country"
                                                            render={({ field }) => (
                                                                <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                    <FormLabel className="lg:w-24 xl:w-32 text-sm">Country</FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Country"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="customerDetails.billingAddress.postalCode"
                                                            render={({ field }) => (
                                                                <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                    <FormLabel className="lg:w-24 xl:w-32 text-sm">Postcode</FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Postal code"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                    {/* <FormField
                                                        control={form.control}
                                                        name="customerDetails.billingAddress.phone"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                <FormLabel className="lg:w-24 xl:w-32 text-sm xl:hidden">Phone</FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Phone"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    /> */}

                                                    <FormField
                                                        control={form.control}
                                                        name="customerDetails.billingAddress.phone"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                <FormLabel className="lg:w-24 xl:w-32 text-sm">Phone</FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Phone Number"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </CardContent>
                                            </Card>

                                            {/* Shipping Address */}
                                            <Card className="border-none rounded-2xl shadow-none">
                                                <CardHeader className="flex flex-row items-center justify-between px-0 pb-4">
                                                    <CardTitle className="text-base">Shipping Address</CardTitle>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={copyBillingToShipping}
                                                        className="text-xs bg-transparent"
                                                    >
                                                        Copy from Billing
                                                    </Button>
                                                </CardHeader>
                                                <CardContent className="space-y-4 px-0">
                                                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4"> */}
                                                    <FormField
                                                        control={form.control}
                                                        name="customerDetails.shippingAddress.firstName"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                <FormLabel className="lg:w-24 xl:w-32 text-sm xl:hidden">First Name</FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="First name"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="customerDetails.shippingAddress.lastName"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                <FormLabel className="lg:w-24 xl:w-32 text-sm xl:hidden">Last Name</FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Last name"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    {/* </div> */}

                                                    <FormField
                                                        control={form.control}
                                                        name="customerDetails.shippingAddress.company"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                <FormLabel className="lg:w-24 xl:w-32 text-sm xl:hidden">Company</FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Company name"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="customerDetails.shippingAddress.addressLine1"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                <FormLabel className="lg:w-24 xl:w-32 text-sm xl:hidden">Address 1</FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Address line 1"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="customerDetails.shippingAddress.addressLine2"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                <FormLabel className="lg:w-24 xl:w-32 text-sm xl:hidden">Address 2</FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Address line 2"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4"> */}
                                                    <FormField
                                                        control={form.control}
                                                        name="customerDetails.shippingAddress.city"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                <FormLabel className="lg:w-24 xl:w-32 text-sm xl:hidden">City</FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="City"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    {/* <FormField
                  control={form.control}
                  name="customerDetails.shippingAddress.state"
                  render={({ field }) => (
                    <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                      <FormLabel className="lg:w-24 xl:w-32 text-sm xl:hidden">County</FormLabel>
                      <FormControl className="flex-1">
                        <Input {...field} placeholder="State/County" className="bg-white border-gray-300 rounded-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                                                    {/* </div> */}

                                                    <div className="grid grid-cols-1 xl:grid-cols-1 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="customerDetails.shippingAddress.country"
                                                            render={({ field }) => (
                                                                <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                    <FormLabel className="lg:w-24 xl:w-32 text-sm xl:hidden">Country</FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Country"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="customerDetails.shippingAddress.postalCode"
                                                            render={({ field }) => (
                                                                <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                    <FormLabel className="lg:w-24 xl:w-32 text-sm xl:hidden">Postcode</FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Postal code"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
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
                                                            <FormItem className="flex flex-col lg:flex-row lg:items-center gap-2">
                                                                <FormLabel className="lg:w-24 xl:w-32 text-sm xl:hidden">Phone</FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Phone number"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Order Information Panel */}
                            <div className="space-y-6">
                                <Card className="bg-white border-none rounded-2xl shadow-none">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-[#11263C] font-semibold">Order Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="orderDate"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40 text-sm">Order Date</FormLabel>
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

                                            <FormField
                                                control={form.control}
                                                name="deliveredOn"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40 text-sm">Delivered on</FormLabel>
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
                                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="importedFromChannelOn"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40 text-sm">Imported from Channel on</FormLabel>
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
                                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="manifestedOn"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40 text-sm">Manifested on</FormLabel>
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
                                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="assignedToPickerOn"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40 text-sm">Assigned to Picker on</FormLabel>
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
                                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* <FormField
                        control={form.control}
                        name="pickwave"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center gap-2">
                            <FormLabel className="w-40 text-sm">Pickwave ID</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter pickwave ID"
                                className="bg-white border-gray-300 rounded-lg"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}

                                            <FormField
                                                control={form.control}
                                                name="designatedPicker"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40 text-sm">Designated Picker</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="Enter designated picker"
                                                                className="bg-white border-gray-300 rounded-lg"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="dispatchedOn"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40 text-sm">Dispatched on</FormLabel>
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
                                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="designatedPacker"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40 text-sm">Designated Packer</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="Enter designated packer"
                                                                className="bg-white border-gray-300 rounded-lg"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="dispatchSentToChannel"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40 text-sm">Dispatch sent to Channel</FormLabel>
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
                                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="signedForBy"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40 text-sm">Signed for by</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="Enter who signed for delivery"
                                                                className="bg-white border-gray-300 rounded-lg"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="paymentId"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center gap-2">
                                                        <FormLabel className="w-40 text-sm">Payment ID</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="Enter payment ID"
                                                                className="bg-white border-gray-300 rounded-lg"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Shipping & Handling */}
                                <Card className="bg-white border-none rounded-2xl shadow-none">
                                    <CardHeader>    
                                        <CardTitle className="text-lg text-[#11263C] font-semibold">Shipping & Handling</CardTitle>
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
                                                <Label className="text-muted-foreground">Shipping Method <span className="text-red-500">*</span></Label>
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
                                                        <Input
                                                            {...field}
                                                            placeholder="e.g. RoyalMail/eBay"
                                                            className="bg-white border-gray-300 rounded-lg"
                                                        />
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
                                                        <Input
                                                            {...field}
                                                            placeholder="Enter tracking number"
                                                            className="bg-white border-gray-300 rounded-lg"
                                                        />
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
                                                        <Textarea
                                                            {...field}
                                                            placeholder="Enter special instructions"
                                                            className="bg-white border-gray-300 rounded-lg"
                                                        />
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
                                                        <Textarea
                                                            {...field}
                                                            placeholder="Enter picker instructions"
                                                            className="bg-white border-gray-300 rounded-lg"
                                                        />
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
                                                                className="bg-white border-gray-300 rounded-lg"
                                                            />
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
                                                        <Input
                                                            {...field}
                                                            placeholder="Enter package size"
                                                            className="bg-white border-gray-300 rounded-lg"
                                                        />
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
                                                            className="bg-white border-gray-300 rounded-lg"
                                                        />
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
                                                        <Input
                                                            {...field}
                                                            placeholder="e.g. RoyalMail/eBay"
                                                            className="bg-white border-gray-300 rounded-lg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="scannedQuantity"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormLabel className="w-40">Scanned Quantity</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                                            placeholder="0"
                                                            className="bg-white border-gray-300 rounded-lg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* <FormField
                                            control={form.control}
                                            name="royalMailLabelUrl"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center gap-2">
                                                    <FormLabel className="w-40">Royal Mail Label URL</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="Enter label URL"
                                                            className="bg-white border-gray-300 rounded-lg"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /> */}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* products */}
                        <Card className="bg-white rounded-2xl border-none shadow-none">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-medium">Select Products</CardTitle>
                                <div className="flex gap-2">
                                    <Button variant="primary" type="button" onClick={handleAddSelectedProducts} className="rounded-lg">
                                        Add Selected Products
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-[#ECF6FF] border-none rounded-lg text-[#11263C] text-sm">
                                            <TableHead className="p-3 rounded-tl-lg rounded-bl-lg">Select</TableHead>
                                            {/* <TableHead className="p-3">Qty</TableHead> */}
                                            <TableHead className="p-3">Image</TableHead>
                                            <TableHead className="p-3">SKU</TableHead>
                                            <TableHead className="p-3">Product Name</TableHead>
                                            {/* <TableHead className="p-3">MPN</TableHead> */}
                                            <TableHead className="p-3">EAN</TableHead>
                                            <TableHead className="p-3">Inventory</TableHead>
                                            <TableHead className="p-3">Price</TableHead>
                                            <TableHead className="p-3 rounded-tr-lg rounded-br-lg">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        <TableRow>
                                            <TableCell colSpan={9}>
                                                {productsLoading && (
                                                    <div className="flex justify-center items-center h-64">
                                                        <Loader2 className="h-8 w-8 animate-spin" />
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        {productsData?.productsWithOrderCOunt && productsData.productsWithOrderCOunt.length > 0 ? (
                                            productsData.productsWithOrderCOunt.map((product) => {
                                                // const isSelected = selectedProducts.includes(product._id);
                                                return (
                                                    <TableRow key={product._id} className="text-[#11263C] text-sm border-gray-200">
                                                        <TableCell className="p-3">
                                                            {/* <Checkbox
                                                                checked={isSelected}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) {
                                                                        setSelectedProducts([...selectedProducts, product._id]);
                                                                    } else {
                                                                        setSelectedProducts(selectedProducts.filter((id) => id !== product._id));
                                                                    }
                                                                }}
                                                                /> */}
                                                            <Checkbox
                                                                checked={selectedProductId === product._id}
                                                                onCheckedChange={(checked) => {
                                                                    setSelectedProductId(checked ? product._id : null)
                                                                    if (checked) {
                                                                        form.setValue("productDetails", product._id)
                                                                    } else {
                                                                        form.setValue("productDetails", "")
                                                                    }
                                                                }}
                                                            />
                                                        </TableCell>

                                                        {/* <TableCell className="p-3">
                                                            <Input
                                                                type="number"
                                                                className="w-20 bg-white border-gray-300 rounded-lg"
                                                                value={product.quantityAllocated || 0}
                                                                onChange={(e) => updateProduct(product._id, { quantityAllocated: Number(e.target.value) })}
                                                                disabled={!isSelected}
                                                            />
                                                        </TableCell> */}

                                                        <TableCell className="p-3">
                                                            <Avatar className="h-12 w-12 bg-gray-300 rounded-sm">
                                                                <AvatarImage
                                                                    src={product.imageUrl || "https://picsum.photos/400/300"}
                                                                    alt="Product img"
                                                                />
                                                                <AvatarFallback>img</AvatarFallback>
                                                            </Avatar>
                                                        </TableCell>
                                                        <TableCell className="p-3">{product.sku}</TableCell>
                                                        <TableCell className="p-3">{product.productName}</TableCell>
                                                        {/* <TableCell className="p-3">{product.mpn}</TableCell> */}
                                                        <TableCell className="p-3">{product.ean}</TableCell>
                                                        <TableCell className="p-3">{product.inventory}</TableCell>
                                                        <TableCell className="p-3">£ {product.price?.toFixed(2)}</TableCell>
                                                        <TableCell className="p-3 text-blue-600 cursor-pointer hover:text-blue-800">
                                                            <Link to={`/admin/products/${product._id}`}>View</Link>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                                                    No products found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>

                                {/* Pagination */}
                                {/* <CustomPagination totalPages={productsData?.totalPages ?? 0} currentPage={1} onPageChange={() => {}} totalItems={productsData?.totalCount ?? 0} itemsPerPage={10} /> */}
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
                                            render={({ field }) => (
                                                <Input {...field} className="w-24 bg-white border-gray-300 rounded-lg" placeholder="0.00" />
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Order Notes */}
                            <Card className="bg-white border-none rounded-2xl shadow-none">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Order Notes</CardTitle>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => appendNote({ subject: "", note: "" })}
                                    >
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
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Subject"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
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
                                                                    <Textarea
                                                                        {...field}
                                                                        placeholder="Note"
                                                                        className="min-h-[40px] bg-white border-gray-300 rounded-lg"
                                                                    />
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
                            <Button
                                type="button"
                                variant="outline"
                                className="px-8 bg-white border-gray-300"
                                onClick={() => { }}
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-[#024AFE] hover:bg-[#021bfe] px-8 text-white" disabled={isPending}>
                                {isPending ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default AddOrderPage