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

// export function EditCourierDetails() {
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
//                           src="https://informationcentre.co.uk/img_pages/dpd-customer-service.png"
//                           alt="img"
//                           className="h-10 w-10 object-cover"
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
//                       <div className="space-y-2 grid grid-cols-3">
//                         <Label
//                           htmlFor="name"
//                           className="text-sm text-[#4E5967]"
//                         >
//                           Tracking URL template
//                         </Label>
//                         <Input
//                           id="name"
//                           name="trackingUrl"
//                           value={formData.trackingUrl}
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
//                               Company Identity *
//                             </Label>
//                           </div>
//                           <div>
//                             <CustomSelect
//                               placeholder="Designers Collection"
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
//                               defaultValue={formData.companyIdentityOne}
//                               onChange={(value) => handleSelectChange(value)}
//                               className="w-full bg-white"
//                             />
//                           </div>
//                         </div>
//                         <div className="space-y-2 grid grid-cols-3 pt-2">
//                           <div>
//                             <Label
//                               htmlFor="CompanyIdentityTwo"
//                               className="text-sm text-[#4E5967]"
//                             >
//                               Company Identity *
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
//                               defaultValue={formData.companyIdentityTwo}
//                               onChange={(value) => handleSelectChange(value)}
//                               className="w-full bg-white"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className=" mt-14">
//                     <h2 className=" mb-6 font-semibold">Courier API Setting</h2>
//                     <div className=" grid grid-cols-2">
//                       <div>
//                         <div className="mb-4 grid grid-cols-3">
//                           <Label
//                             htmlFor="apiUsername"
//                             className="text-sm text-[#4E5967]"
//                           >
//                             API Username *
//                           </Label>
//                           <Input
//                             id=""
//                             name="apiUsername"
//                             value={formData.apiUsername}
//                             onChange={handleInputChange}
//                             className="bg-white border-gray-300 rounded-lg"
//                           />
//                         </div>
//                         <div className="mb-4 grid grid-cols-3">
//                           <Label
//                             htmlFor="amazonEmail"
//                             className="text-sm text-[#4E5967]"
//                           >
//                             Amazon Email Override
//                           </Label>
//                           <Input
//                             id=""
//                             name="amazonEmail"
//                             value={formData.amazonEmail}
//                             onChange={handleInputChange}
//                             className="bg-white border-gray-300 rounded-lg"
//                           />
//                         </div>
//                         <div className="mb-4 grid grid-cols-3">
//                           <Label
//                             htmlFor="email"
//                             className="text-sm text-[#4E5967]"
//                           >
//                             Label Format
//                           </Label>
//                           <Input
//                             id="labelFormat"
//                             name="labelFormat"
//                             value={formData.labelFormat}
//                             onChange={handleInputChange}
//                             className="bg-white border-gray-300 rounded-lg"
//                           />
//                         </div>
//                         <div className="mb-4 grid grid-cols-3">
//                           <Label
//                             htmlFor="accountNo"
//                             className="text-sm text-[#4E5967]"
//                           >
//                             Account No
//                           </Label>
//                           <Input
//                             id="accountNo"
//                             name="accountNo"
//                             value={formData.accountNo}
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
//                             API Password *
//                           </Label>
//                           <Input
//                             id="apiPassword"
//                             name="apiPassword"
//                             value={formData.apiPassword}
//                             onChange={handleInputChange}
//                             className="bg-white border-gray-300 rounded-lg"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* {additional} */}
//               <div className=" mt-10">
//                 <h2 className="text-lg font-semibold mb-2">
//                   Additional StoreFeeder Labels
//                 </h2>
//                 <div className=" space-y-4 bg-[#ECF6FF] p-4 rounded-lg pb-20">
//                   <div className="grid grid-cols-2">
//                     <div>
//                       <div className="space-y-2 grid grid-cols-2">
//                         <Label
//                           htmlFor="email"
//                           className="text-sm text-[#4E5967]"
//                         >
//                           CN22 Label Should be Generated by StoreFeeder
//                         </Label>
//                         <div>
//                           <Switch 
//                           checked={formData.labelCn22}
//                           onCheckedChange={(checked) => handleSwitchChange("labelCn22", checked)}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div>
//                       <div className="space-y-2 grid grid-cols-2">
//                         <Label
//                           htmlFor="name"
//                           className="text-sm text-[#4E5967]"
//                         >
//                           CN23 Label Should be Generated by StoreFeeder
//                         </Label>
//                         <div>
//                           <Switch
//                           checked={formData.labelCn23}
//                           onCheckedChange={(checked) => handleSwitchChange("labelCn23", checked)}
//                           />
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

// export default EditCourierDetails;


import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"
import { z } from "zod"

import { Header } from "@/components/shared/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { CustomSelect } from "@/components/shared/custom-select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Define the form schema with Zod
const courierFormSchema = z.object({
  profileName: z.string().min(1, { message: "Profile name is required" }),
  trackingUrl: z.string().optional(),
  companyIdentityOne: z.string().min(1, { message: "Company identity is required" }),
  companyIdentityTwo: z.string().min(1, { message: "Company identity is required" }),
  apiUsername: z.string().min(1, { message: "API username is required" }),
  amazonEmail: z.string().email().optional().or(z.literal("")),
  labelFormat: z.string().optional(),
  accountNo: z.string().optional(),
  apiPassword: z.string().min(1, { message: "API password is required" }),
  labelCn22: z.boolean(),
  labelCn23: z.boolean(),
})

type CourierFormValues = z.infer<typeof courierFormSchema>

// Mock API functions - replace with your actual API calls
const fetchCourierDetails = async (id?: string) => {
  // In a real app, fetch from API using the ID
  console.log(id);
  
  return {
    profileName: "DPD Standard",
    trackingUrl: "https://track.dpd.co.uk/search?reference={tracking_number}",
    companyIdentityOne: "Designers Collection",
    companyIdentityTwo: "Default Warehouse",
    apiUsername: "user123",
    amazonEmail: "",
    labelFormat: "PDF",
    accountNo: "ACC12345",
    apiPassword: "password123",
    labelCn22: true,
    labelCn23: false,
  }
}

const saveCourierDetails = async (data: CourierFormValues) => {
  // In a real app, send to API
  console.log("Saving courier data:", data)
  return data
}

export function EditCourierDetails() {
  const navigate = useNavigate()
  // const params = useParams();
  // const courierId = params?.courierId as string;

  // Use React Query to fetch courier details
  const { data: courierData, isLoading } = useQuery({
    queryKey: ["courierDetails"], // Add courierId to the key in a real app
    queryFn: () => fetchCourierDetails(),
  })

  // Ensure labelCn22 and labelCn23 are always present and not undefined
  const getSafeCourierData = (data?: Partial<CourierFormValues>): CourierFormValues => ({
    profileName: data?.profileName ?? "",
    trackingUrl: data?.trackingUrl ?? "",
    companyIdentityOne: data?.companyIdentityOne ?? "",
    companyIdentityTwo: data?.companyIdentityTwo ?? "",
    apiUsername: data?.apiUsername ?? "",
    amazonEmail: data?.amazonEmail ?? "",
    labelFormat: data?.labelFormat ?? "",
    accountNo: data?.accountNo ?? "",
    apiPassword: data?.apiPassword ?? "",
    labelCn22: data?.labelCn22 ?? false,
    labelCn23: data?.labelCn23 ?? false,
  })

  // Set up React Hook Form with Zod validation
  const safeCourierData = getSafeCourierData(courierData)
  const form = useForm<CourierFormValues>({
    resolver: zodResolver(courierFormSchema),
    defaultValues: safeCourierData,
    values: safeCourierData,
  })

  // Use React Query mutation for saving data
  const mutation = useMutation({
    mutationFn: saveCourierDetails,
    onSuccess: () => {
      navigate("/admin/settings/integrations")
    },
  })

  const handleCancel = () => {
    navigate(-1)
  }

  const onSubmit = (data: CourierFormValues) => {
    mutation.mutate(data)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Header title="Edit Courier" />
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
                              src="https://informationcentre.co.uk/img_pages/dpd-customer-service.png"
                              alt="img"
                              className="h-10 w-10 object-cover"
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
                          <div className="space-y-2 grid grid-cols-3">
                            <FormField
                              control={form.control}
                              name="trackingUrl"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm text-[#4E5967]">Tracking URL template</FormLabel>
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
                                  name="companyIdentityOne"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-sm text-[#4E5967]">Company Identity *</FormLabel>
                                      <FormControl>
                                        <CustomSelect
                                          placeholder="Designers Collection"
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
                            <div className="space-y-2 grid grid-cols-3 pt-2">
                              <div>
                                <FormField
                                  control={form.control}
                                  name="companyIdentityTwo"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="text-sm text-[#4E5967]">Company Identity *</FormLabel>
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
                        <h2 className="mb-6 font-semibold">Courier API Setting</h2>
                        <div className="grid grid-cols-2">
                          <div>
                            <div className="mb-4 grid grid-cols-3">
                              <FormField
                                control={form.control}
                                name="apiUsername"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm text-[#4E5967]">API Username *</FormLabel>
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
                                name="amazonEmail"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm text-[#4E5967]">Amazon Email Override</FormLabel>
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
                                name="labelFormat"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm text-[#4E5967]">Label Format</FormLabel>
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
                                name="accountNo"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm text-[#4E5967]">Account No</FormLabel>
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
                            <div className="grid grid-cols-3">
                              <FormField
                                control={form.control}
                                name="apiPassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm text-[#4E5967]">API Password *</FormLabel>
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
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional */}
                  <div className="mt-10">
                    <h2 className="text-lg font-semibold mb-2">Additional StoreFeeder Labels</h2>
                    <div className="space-y-4 bg-[#ECF6FF] p-4 rounded-lg pb-20">
                      <div className="grid grid-cols-2">
                        <div>
                          <div className="space-y-2 grid grid-cols-2">
                            <FormField
                              control={form.control}
                              name="labelCn22"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between space-y-0">
                                  <FormLabel className="text-sm text-[#4E5967]">
                                    CN22 Label Should be Generated by StoreFeeder
                                  </FormLabel>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="space-y-2 grid grid-cols-2">
                            <FormField
                              control={form.control}
                              name="labelCn23"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between space-y-0">
                                  <FormLabel className="text-sm text-[#4E5967]">
                                    CN23 Label Should be Generated by StoreFeeder
                                  </FormLabel>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
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

export default EditCourierDetails
