import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Header } from "@/components/shared/header"
import { CustomSelect } from "@/components/shared/custom-select"
import { useGetAllChannels } from "@/pages/admin/common-api/channels/core/_hooks"
import { IChannel } from "@/pages/admin/common-api/channels/core/_modals"
import { useCreateCustomer } from "../core/hooks/useCustomer"
import { useGetCountriesList } from "../../common-api/countries/core/_hooks"
import { CreateCustomerFormValues, createCustomerSchema } from "../core/_schema"
import { useNavigate } from "react-router-dom"
import { PhoneInput } from "@/components/shared/custom-phone-input"

export function AddCustomerPage() {
    const { data: channelsData } = useGetAllChannels();
    const { mutate: createCustomerMutation, isPending: isCreatingCustomer } = useCreateCustomer();
    const { data: countriesList } = useGetCountriesList();
    const navigate = useNavigate();

    const handleCreateCustomer = (data: CreateCustomerFormValues) => {
        // Transform form data to match CreateCustomerData structure
        const transformedData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            emailCC: data.emailCC,
            customerReference: data.customerReference,
            vatNumber: data.vatNumbers, // Map vatNumbers to vatNumber
            airn: data.airn,
            shippingAddress: data.shippingAddress?.firstName ? {
                firstName: data.shippingAddress.firstName,
                lastName: data.shippingAddress.lastName || "",
                company: data.shippingAddress.company,
                addressLine1: data.shippingAddress.addressLine1 || "",
                addressLine2: data.shippingAddress.addressLine2,
                city: data.shippingAddress.city || "",
                state: data.shippingAddress.state || "",
                postalCode: data.shippingAddress.postalCode || "",
                country: data.shippingAddress.country || "",
                phone: data.shippingAddress.phone || "",
            } : undefined,
            billingAddress: data.billingAddress?.firstName ? {
                firstName: data.billingAddress.firstName,
                lastName: data.billingAddress.lastName || "",
                company: data.billingAddress.company,
                addressLine1: data.billingAddress.addressLine1 || "",
                addressLine2: data.billingAddress.addressLine2,
                city: data.billingAddress.city || "",
                state: data.billingAddress.state || "",
                postalCode: data.billingAddress.postalCode || "",
                country: data.billingAddress.country || "",
                phone: data.billingAddress.phone || "",
            } : undefined,
            channelDetails: data.channelDetails,
        }

        createCustomerMutation(transformedData, {
            onSuccess: () => {
                form.reset()
                navigate("/admin/customers")
            }
        })
    }

    const form = useForm<CreateCustomerFormValues>({
        resolver: zodResolver(createCustomerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            emailCC: "",
            customerReference: "",
            vatNumbers: "",
            airn: "",
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
    })

    const onSubmit = async (data: CreateCustomerFormValues) => {
        try {
            handleCreateCustomer(data)
            form.reset()
        } catch (error) {
            console.error("Error creating customer:", error)
        }
    }

    const copyBillingToShipping = () => {
        const billingAddress = form.getValues("billingAddress")
        form.setValue("shippingAddress", {
            firstName: billingAddress?.firstName || "",
            lastName: billingAddress?.lastName || "",
            company: billingAddress?.company || "",
            addressLine1: billingAddress?.addressLine1 || "",
            addressLine2: billingAddress?.addressLine2 || "",
            city: billingAddress?.city || "",
            state: billingAddress?.state || "",
            postalCode: billingAddress?.postalCode || "",
            country: billingAddress?.country || "",
            phone: billingAddress?.phone || "",
        })
    }

    return (
        <div>
            <Header title="Add Customer" />
            <div className="mt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Main form container */}
                        <div>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                                <div className="p-8">
                                    <h2 className="text-2xl font-bold text-[#11263C] mb-8">Customer Information</h2>

                                    <div className="space-y-8">
                                        {/* Basic Customer Details Section */}
                                        <div className="bg-[#ECF6FF] rounded-xl p-6">
                                            <h3 className="text-lg font-semibold text-[#11263C] mb-6">Basic Details</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="firstName"
                                                    render={({ field }) => (
                                                        <div className="space-y-1">
                                                            <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                    First Name <span className="text-red-500">*</span>
                                                                </FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Enter first name"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                            <FormMessage className="text-red-500 text-sm ml-36" />
                                                        </div>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="lastName"
                                                    render={({ field }) => (
                                                        <div className="space-y-1">
                                                            <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                    Last Name <span className="text-red-500">*</span>
                                                                </FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Enter last name"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                            <FormMessage className="text-red-500 text-sm ml-36" />
                                                        </div>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <div className="space-y-1">
                                                            <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                    Email <span className="text-red-500">*</span>
                                                                </FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        type="email"
                                                                        placeholder="Enter email address"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                            <FormMessage className="text-red-500 text-sm ml-36" />
                                                        </div>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="phoneNumber"
                                                    render={({ field }) => (
                                                        <div className="space-y-1">
                                                            <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                    Phone Number <span className="text-red-500">*</span>
                                                                </FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <PhoneInput
                                                                        placeholder="Phone"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                            <FormMessage className="text-red-500 text-sm ml-36" />
                                                        </div>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="emailCC"
                                                    render={({ field }) => (
                                                        <div className="space-y-1">
                                                            <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">Email CC</FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        type="email"
                                                                        placeholder="Enter CC email address"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                            <FormMessage className="text-red-500 text-sm ml-36" />
                                                        </div>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="customerReference"
                                                    render={({ field }) => (
                                                        <div className="space-y-1">
                                                            <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">Customer Reference</FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Enter customer reference"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                            <FormMessage className="text-red-500 text-sm ml-36" />
                                                        </div>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="vatNumbers"
                                                    render={({ field }) => (
                                                        <div className="space-y-1">
                                                            <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">VAT Number</FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Enter VAT number"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                            <FormMessage className="text-red-500 text-sm ml-36" />
                                                        </div>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="airn"
                                                    render={({ field }) => (
                                                        <div className="space-y-1">
                                                            <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">AIRN</FormLabel>
                                                                <FormControl className="flex-1">
                                                                    <Input
                                                                        {...field}
                                                                        placeholder="Enter AIRN"
                                                                        className="bg-white border-gray-300 rounded-lg"
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                            <FormMessage className="text-red-500 text-sm ml-36" />
                                                        </div>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="channelDetails"
                                                render={({ field }) => (
                                                    <div className="space-y-1 mt-7 w-full">
                                                        <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                                                            <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                Channel <span className="text-red-500">*</span>
                                                            </FormLabel>
                                                            <FormControl className="flex-1">
                                                                <CustomSelect
                                                                    placeholder="Select channel"
                                                                    defaultValue={field.value}
                                                                    options={(channelsData?.data ?? []).map((channel: IChannel) => ({
                                                                        id: channel._id,
                                                                        label: channel.channelName,
                                                                        value: channel._id,
                                                                    }))}
                                                                    onChange={field.onChange}
                                                                    className="bg-white"
                                                                    width="flex-1"
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                        <FormMessage className="text-red-500 text-sm ml-36" />
                                                    </div>
                                                )}
                                            />
                                        </div>

                                        {/* Address Section */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            {/* Billing Address */}
                                            <div className="bg-[#ECF6FF] rounded-xl p-6">
                                                <h3 className="text-lg font-semibold text-[#11263C] mb-6">Billing Address</h3>
                                                <div className="space-y-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="billingAddress.firstName"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                        First Name <span className="text-red-500">*</span>
                                                                    </FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="First name"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="billingAddress.lastName"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                        Last Name <span className="text-red-500">*</span>
                                                                    </FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Last name"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="billingAddress.company"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">Company</FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Company name"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="billingAddress.addressLine1"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                        Address 1 <span className="text-red-500">*</span>
                                                                    </FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Address line 1"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="billingAddress.addressLine2"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">Address 2</FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Address line 2"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="billingAddress.country"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                        Country <span className="text-red-500">*</span>
                                                                    </FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <CustomSelect
                                                                            placeholder="Select Country"
                                                                            defaultValue={field.value}
                                                                            options={countriesList || []}
                                                                            onChange={field.onChange}
                                                                            className="bg-white"
                                                                            width="flex-1"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="billingAddress.state"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                        State <span className="text-red-500">*</span>
                                                                    </FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input {...field} placeholder="State" className="bg-white border-gray-300 rounded-lg" />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="billingAddress.city"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                        City <span className="text-red-500">*</span>
                                                                    </FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input {...field} placeholder="City" className="bg-white border-gray-300 rounded-lg" />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />


                                                    <FormField
                                                        control={form.control}
                                                        name="billingAddress.postalCode"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                        Postcode <span className="text-red-500">*</span>
                                                                    </FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Postal code"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="billingAddress.phone"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">Phone</FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <PhoneInput
                                                                            placeholder="Phone"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            {/* Shipping Address */}
                                            <div className="bg-[#ECF6FF] rounded-xl p-6">
                                                <div className="flex flex-row items-center justify-between mb-6">
                                                    <h3 className="text-lg font-semibold text-[#11263C]">Shipping Address</h3>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={copyBillingToShipping}
                                                        className="text-xs bg-transparent"
                                                    >
                                                        Copy from Billing
                                                    </Button>
                                                </div>
                                                <div className="space-y-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="shippingAddress.firstName"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                        First Name <span className="text-red-500">*</span>
                                                                    </FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="First name"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="shippingAddress.lastName"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                        Last Name <span className="text-red-500">*</span>
                                                                    </FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Last name"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="shippingAddress.company"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">Company</FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Company name"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="shippingAddress.addressLine1"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                        Address 1 <span className="text-red-500">*</span>
                                                                    </FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Address line 1"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="shippingAddress.addressLine2"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">Address 2</FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Address line 2"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />

                                                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}

                                                    <FormField
                                                        control={form.control}
                                                        name="shippingAddress.country"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                        Country <span className="text-red-500">*</span>
                                                                    </FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <CustomSelect
                                                                            placeholder="Select Country"
                                                                            defaultValue={field.value}
                                                                            options={countriesList || []}
                                                                            onChange={field.onChange}
                                                                            className="bg-white"
                                                                            width="flex-1"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="shippingAddress.state"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                        State <span className="text-red-500">*</span>
                                                                    </FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input {...field} placeholder="State" className="bg-white border-gray-300 rounded-lg" />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="shippingAddress.city"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                        City <span className="text-red-500">*</span>
                                                                    </FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input {...field} placeholder="City" className="bg-white border-gray-300 rounded-lg" />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />

                                                    {/* </div> */}

                                                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                                                    <FormField
                                                        control={form.control}
                                                        name="shippingAddress.postalCode"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">
                                                                        Postcode <span className="text-red-500">*</span>
                                                                    </FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder="Postal code"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="shippingAddress.phone"
                                                        render={({ field }) => (
                                                            <div className="space-y-1">
                                                                <FormItem className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                    <FormLabel className="text-sm font-medium text-[#4E5967] sm:w-32">Phone</FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <PhoneInput
                                                                            placeholder="Phone"
                                                                            className="bg-white border-gray-300 rounded-lg"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                                <FormMessage className="text-red-500 text-sm ml-36" />
                                                            </div>
                                                        )}
                                                    />
                                                    {/* </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Form Actions */}
                                <div className="flex flex-col sm:flex-row justify-end gap-4 mx-7 mb-7">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="rounded-lg"
                                        onClick={() => {
                                            navigate('/admin/customers')
                                        }}
                                        disabled={isCreatingCustomer}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="rounded-lg"
                                        disabled={isCreatingCustomer}
                                    >
                                        {isCreatingCustomer ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            "Save"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default AddCustomerPage
