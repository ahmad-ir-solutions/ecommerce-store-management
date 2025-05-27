// import { Header } from "@/components/shared/header";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { useNavigate} from "react-router-dom";
// import { CustomSelect } from "@/components/shared/custom-select";
// import { useState } from "react";

// interface UserFormData {
//   profileName: string;
//   trackingUrl: string;
//   companyIdentityOne: string;
//   companyIdentityTwo: string;
//   apiUsername: string;
//   amazonEmail: string;
//   labelFormat: string;
//   accountNo: string;
//   apiPassword: string;
//   labelCn22: boolean;
//   labelCn23: boolean;
// }

// export function EditPaymentGatewaysDetail() {
//   // const { openModal } = useIntegrationStore()
//   const navigate = useNavigate();
// //   const params = useParams();
// //   const userId = params?.userId as string;

//   const [formData, setFormData] = useState<UserFormData>({
//     profileName: "",
//     trackingUrl: "",
//     companyIdentityOne: "",
//     companyIdentityTwo: "",
//     apiUsername: "",
//     amazonEmail: "",
//     labelFormat: "",
//     accountNo: "",
//     apiPassword: "",
//     labelCn22: false,
//     labelCn23: false,
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSwitchChange = (name: string, checked: boolean) => {
//     setFormData((prev) => ({ ...prev, [name]: checked }));
//   };

//   const handleSelectChange = (value: string) => {
//     setFormData((prev) => ({ ...prev, companyIdentityOne: value, companyIdentityTwo: value }));
//   };

//   const handleCancel = () => {
//     navigate(-1);
//   };

//   const handleSave = () => {
//     // Save user data
//     console.log("Saving Integration Edit data:", formData);
//     navigate("/admin/settings/integrations");
//   };

//   return (
//     <div>
//       <Header title="Edit Courier" />
//       <div className="mt-6">
//         <Card className="overflow-hidden border-0 shadow-none bg-white rounded-2xl">
//           <CardContent className="p-0">
//             <div className="px-6">
//               {/* User Information */}
//               <div>
//                 <h2 className="text-lg font-semibold mb-4">
//                   Integration Profile
//                 </h2>
//                 <div className=" space-y-4 bg-[#ECF6FF] p-4 rounded-lg">
//                   <div className="grid grid-cols-2">
//                     <div>
//                       <div className="space-y-2 grid grid-cols-3">
//                         <span className="text-sm text-[#4E5967]">
//                           integration type
//                         </span>
//                         <img
//                           src="https://logowik.com/content/uploads/images/opayo-by-elavon5689.logowik.com.webp"
//                           alt="img"
//                           className="h-6 w-12 object-cover"
//                         />
//                       </div>
//                       <div className="mb-4 grid grid-cols-3">
//                         <Label
//                           htmlFor="email"
//                           className="text-sm text-[#4E5967]"
//                         >
//                           Profile Name *
//                         </Label>
//                         <Input
//                           id=""
//                           name="profileName"
//                           value={formData.profileName}
//                           onChange={handleInputChange}
//                           className="bg-white border-gray-300 rounded-lg"
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <div>
//                         <div className="mb-1 grid grid-cols-3 pt-2">
//                           <div>
//                             <Label
//                               htmlFor="CompanyIdentityOne"
//                               className="text-sm text-[#4E5967]"
//                             >
//                               Active
//                             </Label>
//                           </div>
//                           <div>
//                             <Switch
//                           checked={formData.active}
//                           onCheckedChange={(checked) => handleSwitchChange("active", checked)}
//                           />
//                           </div>
//                         </div>
//                         <div className="space-y-2 grid grid-cols-3 items-center pt-2">
//                           <div>
//                             <Label
//                               htmlFor="CompanyIdentity"
//                               className="text-sm text-[#4E5967]"
//                             >
//                               Company Identity * Permission From
//                             </Label>
//                           </div>
//                           <div>
//                             <CustomSelect
//                               placeholder="Default Warehouse"
//                               options={[
//                                 {
//                                   id: "1",
//                                   label: "Select Member",
//                                   value: "Select Member",
//                                 },
//                                 {
//                                   id: "2",
//                                   label: "John Doe",
//                                   value: "John Doe",
//                                 },
//                                 {
//                                   id: "3",
//                                   label: "Jane Smith",
//                                   value: "Jane Smith",
//                                 },
//                               ]}
//                               defaultValue={formData.companyIdentity}
//                               onChange={(value) => handleSelectChange(value)}
//                               className="w-full bg-white"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className=" mt-14">
//                     <h2 className=" mb-6 font-semibold">Opayo Setting</h2>
//                     <div className=" grid grid-cols-2">
//                       <div>
//                         <div className="mb-4 grid grid-cols-3">
//                           <Label
//                             htmlFor="apiUsername"
//                             className="text-sm text-[#4E5967]"
//                           >
//                             Vendor Name *
//                           </Label>
//                           <Input
//                             id=""
//                             name="apiUsername"
//                             value={formData.vendorName}
//                             onChange={handleInputChange}
//                             className="bg-white border-gray-300 rounded-lg"
//                           />
//                         </div>
//                         <div className="mb-4 grid grid-cols-3">
//                           <Label
//                             htmlFor="amazonEmail"
//                             className="text-sm text-[#4E5967]"
//                           >
//                             Encryption Password *
//                           </Label>
//                           <Input
//                             id=""
//                             name="amazonEmail"
//                             value={formData.encpassword}
//                             onChange={handleInputChange}
//                             className="bg-white border-gray-300 rounded-lg"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <div className="grid grid-cols-3">
//                           <Label
//                             htmlFor="apiPassword"
//                             className="text-sm text-[#4E5967]"
//                           >
//                             Vendor Name *
//                           </Label>
//                           <div>
//                             <CustomSelect
//                               placeholder="Default Warehouse"
//                               options={[
//                                 {
//                                   id: "1",
//                                   label: "Select Member",
//                                   value: "Select Member",
//                                 },
//                                 {
//                                   id: "2",
//                                   label: "John Doe",
//                                   value: "John Doe",
//                                 },
//                                 {
//                                   id: "3",
//                                   label: "Jane Smith",
//                                   value: "Jane Smith",
//                                 },
//                               ]}
//                               defaultValue={formData.companyIdentityTwo}
//                               onChange={(value) => handleSelectChange(value)}
//                               className="w-full bg-white"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//             </div>

//             {/* Form Actions */}
//             <div
//               className="flex justify-end gap-4 px-6
//              mt-16"
//             >
//               <Button variant="outline" size="lg" onClick={handleCancel}>
//                 Cancel
//               </Button>
//               <Button
//                 className="rounded-lg"
//                 variant="primary"
//                 size="lg"
//                 onClick={handleSave}
//               >
//                 Save
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// export default EditPaymentGatewaysDetail;


import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { z } from "zod"

import { Header } from "@/components/shared/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { CustomSelect } from "@/components/shared/custom-select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2 } from 'lucide-react'

// Define the form schema with Zod
const paymentGatewayFormSchema = z.object({
  profileName: z.string().min(1, { message: "Profile name is required" }),
  vendorName: z.string().min(1, { message: "Vendor name is required" }),
  encpassword: z.string().min(1, { message: "Encryption password is required" }),
  companyIdentityTwo: z.string().min(1, { message: "Company identity is required" }),
  active: z.boolean().catch(false),
})

type PaymentGatewayFormValues = z.infer<typeof paymentGatewayFormSchema>

// Mock API functions - replace with your actual API calls
const fetchPaymentGatewayDetails = async (id?: string) => {
  // In a real app, fetch from API using the ID
  console.log(id);

  return {
    profileName: "Opayo Standard",
    vendorName: "MyStore",
    encpassword: "password123",
    companyIdentityTwo: "Default Warehouse",
    active: true,
  }
}

const savePaymentGatewayDetails = async (data: PaymentGatewayFormValues) => {
  // In a real app, send to API
  console.log("Saving payment gateway data:", data)
  return data
}

export function EditPaymentGatewaysDetail() {
  const navigate = useNavigate()
  // const params = useParams();
  // const gatewayId = params?.gatewayId as string;

  // Use React Query to fetch payment gateway details
  const { data: gatewayData, isLoading } = useQuery({
    queryKey: ["paymentGatewayDetails"], // Add gatewayId to the key in a real app
    queryFn: () => fetchPaymentGatewayDetails(),
  })

  // Set up React Hook Form with Zod validation
  const form = useForm({
    resolver: zodResolver(paymentGatewayFormSchema),
    defaultValues: gatewayData || {
      profileName: "",
      vendorName: "",
      encpassword: "",
      companyIdentityTwo: "",
      active: false,
    },
    values: gatewayData,
  })

  // Use React Query mutation for saving data
  const mutation = useMutation({
    mutationFn: savePaymentGatewayDetails,
    onSuccess: () => {
      navigate("/admin/settings/integrations")
    },
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const onSubmit = (data: PaymentGatewayFormValues) => {
    mutation.mutate(data)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }


  return (
    <div>
      <Header title="Edit Payment Gateway" />
      <div className="mt-6">
        <Card className="overflow-hidden border-0 shadow-none bg-white rounded-2xl">
          <CardContent className="p-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="px-6">
                  {/* User Information */}
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Integration Profile</h2>
                    <div className="space-y-4 bg-[#ECF6FF] p-4 rounded-lg">
                      <div className="grid grid-cols-2">
                        <div>
                          <div className="space-y-2 grid grid-cols-3">
                            <span className="text-sm text-[#4E5967]">integration type</span>
                            <img
                              src="https://logowik.com/content/uploads/images/opayo-by-elavon5689.logowik.com.webp"
                              alt="img"
                              className="h-6 w-12 object-cover"
                            />
                          </div>
                          <div className="mb-4 grid grid-cols-3">
                            <FormField
                              control={form.control}
                              name="profileName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm text-[#4E5967]">Profile Name *</FormLabel>
                                  <FormControl>
                                    <Input {...field} className="bg-white border-gray-300 rounded-lg" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <div>
                          <div>
                            <div className="mb-1 grid grid-cols-3 pt-2">
                              <div>
                                <FormField
                                  control={form.control}
                                  name="active"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-y-0">
                                      <FormLabel className="text-sm text-[#4E5967]">Active</FormLabel>
                                      <FormControl>
                                        <Switch checked={field.value as boolean} onCheckedChange={field.onChange} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                            <div className="space-y-2 grid grid-cols-3 items-center pt-2">
                              <div>
                                <FormField
                                  control={form.control}
                                  name="companyIdentityTwo"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-sm text-[#4E5967]">
                                        Company Identity * Permission From
                                      </FormLabel>
                                      <FormControl>
                                        <CustomSelect
                                          placeholder="Default Warehouse"
                                          options={[
                                            {
                                              id: "1",
                                              label: "Select Member",
                                              value: "Select Member",
                                            },
                                            {
                                              id: "2",
                                              label: "John Doe",
                                              value: "John Doe",
                                            },
                                            {
                                              id: "3",
                                              label: "Jane Smith",
                                              value: "Jane Smith",
                                            },
                                          ]}
                                          defaultValue={field.value}
                                          onChange={field.onChange}
                                          className="w-full bg-white"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-14">
                        <h2 className="mb-6 font-semibold">Opayo Setting</h2>
                        <div className="grid grid-cols-2">
                          <div>
                            <div className="mb-4 grid grid-cols-3">
                              <FormField
                                control={form.control}
                                name="vendorName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm text-[#4E5967]">Vendor Name *</FormLabel>
                                    <FormControl>
                                      <Input {...field} className="bg-white border-gray-300 rounded-lg" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="mb-4 grid grid-cols-3">
                              <FormField
                                control={form.control}
                                name="encpassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm text-[#4E5967]">Encryption Password *</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        type="password"
                                        className="bg-white border-gray-300 rounded-lg"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="grid grid-cols-3">
                              <Label htmlFor="apiPassword" className="text-sm text-[#4E5967]">
                                Vendor Name *
                              </Label>
                              <div>
                                <CustomSelect
                                  placeholder="Default Warehouse"
                                  options={[
                                    {
                                      id: "1",
                                      label: "Select Member",
                                      value: "Select Member",
                                    },
                                    {
                                      id: "2",
                                      label: "John Doe",
                                      value: "John Doe",
                                    },
                                    {
                                      id: "3",
                                      label: "Jane Smith",
                                      value: "Jane Smith",
                                    },
                                  ]}
                                  defaultValue=""
                                  onChange={() => { }}
                                  className="w-full bg-white"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4 px-6 mt-16">
                  <Button variant="outline" size="lg" type="button" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    className="rounded-lg"
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Saving..." : "Save"}
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

export default EditPaymentGatewaysDetail
