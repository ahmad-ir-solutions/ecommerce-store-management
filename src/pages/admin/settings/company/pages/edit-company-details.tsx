import { useState, useRef } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { ImagePlus, Loader2 } from "lucide-react"

import { Header } from "@/components/shared/header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCompanyStore } from "@/store/admin/company-store"
import { fetchCompanyDetails, updateCompanyDetails } from "../core/_dummy"
import { companySchema } from "../core/_schema"
import { Company } from "../core/_modal"
import { CustomSelect } from "@/components/shared/custom-select"

export const EditCompanyDetails = () => {
  const { companyId } = useParams()
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const { setCompany } = useCompanyStore()

  // Fetch company details
  const { data: companyData, isLoading } = useQuery({
    queryKey: ["company", companyId],
    queryFn: () => fetchCompanyDetails(companyId as string),
    enabled: !!companyId,
    // Mock data for demonstration
    // initialData: {
    //   companyName: "Designer Collection",
    //   address: "123 Main St",
    //   address2: "",
    //   city: "London",
    //   country: "Default Warehouse",
    //   postcode: "SW1A 1AA",
    //   contactEmail: "contact@designercollection.com",
    //   contactPhone: "+44 123 456 7890",
    //   websiteUrl: "www.designercollection.com",
    //   registeredCompanyName: "Designer Collection Ltd",
    //   overrideCnSenderName: "",
    //   vatNumber: "GB123456789",
    //   eoriNumber: "GB123456789000",
    //   iossNumber: "IM123456789",
    //   grantPermissions: true,
    //   ukimsNumber: "Xerjoff",
    //   eoriNumberNi: "XI123456789000",
    //   declarationCategories: {
    //     document: true,
    //     returnedGoods: false,
    //     gift: true,
    //     saleOfGoods: true,
    //     mixedContent: false,
    //     commercialSample: false,
    //     other: false,
    //   },
    //   autoSignDeclarations: true,
    //   declarationFile: "",
    //   companyLogo: "",
    // },
  })

  // Update company mutation
  const mutation = useMutation({
    mutationFn: (data: Company) => updateCompanyDetails(companyId as string, data),
    onSuccess: (data) => {
      setCompany(data)
      // You could add a toast notification here
    },
  })

  // Initialize form with react-hook-form
  const form = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: companyData?.companyName,
      address: "",
      address2: "",
      city: "",
      country: "Default Warehouse",
      postcode: "",
      contactEmail: "",
      contactPhone: "",
      websiteUrl: "",
      registeredCompanyName: "",
      overrideCnSenderName: "",
      vatNumber: "",
      eoriNumber: "",
      iossNumber: "",
      grantPermissions: false,
      ukimsNumber: "",
      eoriNumberNi: "",
      declarationCategories: {
        document: false,
        returnedGoods: false,
        gift: false,
        saleOfGoods: false,
        mixedContent: false,
        commercialSample: false,
        other: false,
      },
      autoSignDeclarations: false,
      declarationFile: "",
      companyLogo: "",
    },
  })

  // Handle form submission
  const onSubmit = (data: Company) => {
    mutation.mutate(data)
  }

  // Handle file selection
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file.name)
      // In a real app, you would upload the file to a server here
      // and set the returned URL to the form value
      form.setValue("declarationFile", file.name)
    }
  }

  // Handle image upload
  const handleImageUpload = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click()
    }
  }

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create a URL for the selected image
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
      form.setValue("companyLogo", imageUrl)
    }
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
      <Header title="Company" />
      <div className="mt-6">
        <Card className="bg-white border-none shadow-none">
          <CardContent>
            <h2 className="text-xl font-semibold mb-6">Company Information</h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit as SubmitHandler<Company>)} className="space-y-6 bg-[#ECF6FF] rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-4">
                          <FormLabel className="text-xs text-[#4E5967]">Company Name *</FormLabel>
                          <div className="col-span-2">
                            <FormControl>
                              <Input placeholder="" {...field} className="bg-white border-gray-300 rounded-lg max-w-52" />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-4">
                          <FormLabel className="text-xs text-[#4E5967]">Address *</FormLabel>
                          <div className="col-span-2">
                            <FormControl>
                              <Input placeholder="" {...field} className="bg-white border-gray-300 rounded-lg max-w-52" />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address2"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-4">
                          <FormLabel className="text-xs text-[#4E5967]">Address 2</FormLabel>
                          <div className="col-span-2">
                            <FormControl>
                              <Input placeholder="" {...field} className="bg-white border-gray-300 rounded-lg max-w-52" />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-4">
                          <FormLabel className="text-xs text-[#4E5967]">City *</FormLabel>
                          <div className="col-span-2">
                            <FormControl>
                              <Input placeholder="" {...field} className="bg-white border-gray-300 rounded-lg max-w-52" />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-4">
                          <FormLabel className="text-xs text-[#4E5967]">Country</FormLabel>
                          <div className="col-span-2">
                            <CustomSelect
                              placeholder="Select a country"
                              options={[
                                { id: "1", label: "United Kingdom", value: "United Kingdom" },
                                { id: "2", label: "United States", value: "United States" },
                                { id: "3", label: "Canada", value: "Canada" },
                                { id: "4", label: "Australia", value: "Australia" },
                              ]}
                              onChange={(value) => field.onChange(value)}
                              className="w-full bg-white max-w-52"
                            />
                            <FormMessage className="text-red-400" />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="postcode"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-4">
                          <FormLabel className="text-xs text-[#4E5967]">Postcode/ Zip Code *</FormLabel>
                          <div className="col-span-2">
                            <FormControl>
                              <Input placeholder="" {...field} className="bg-white border-gray-300 rounded-lg max-w-52" />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-4">
                          <FormLabel className="text-xs text-[#4E5967]">Contact Email Address *</FormLabel>
                          <div className="col-span-2">
                            <FormControl>
                              <Input placeholder="" {...field} className="bg-white border-gray-300 rounded-lg max-w-52" />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-4">
                          <FormLabel className="text-xs text-[#4E5967]">Contact Phone Number *</FormLabel>
                          <div className="col-span-2">
                            <FormControl>
                              <Input placeholder="" {...field} className="bg-white border-gray-300 rounded-lg max-w-52" />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="websiteUrl"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-4">
                          <FormLabel className="text-xs text-[#4E5967]">Website URL (eg: www.yourdomain.com)</FormLabel>
                          <div className="col-span-2">
                            <FormControl>
                              <Input placeholder="" {...field} className="bg-white border-gray-300 rounded-lg max-w-52" />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="registeredCompanyName"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-4">
                          <FormLabel className="text-xs text-[#4E5967]">Registered Company Name</FormLabel>
                          <div className="col-span-2">
                            <FormControl>
                              <Input placeholder="" {...field} className="bg-white border-gray-300 rounded-lg max-w-52" />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="overrideCnSenderName"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-3 items-center gap-4">
                          <FormLabel className="text-xs text-[#4E5967]">Override CN Sender Name</FormLabel>
                          <div className="col-span-2">
                            <FormControl>
                              <Input placeholder="" {...field} className="bg-white border-gray-300 rounded-lg max-w-52" />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div className="space-y-4 flex-1 mr-4">
                        <FormField
                          control={form.control}
                          name="vatNumber"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-3 items-center gap-4">
                              <FormLabel className="text-xs text-[#4E5967]">VAT Number</FormLabel>
                              <div className="col-span-2">
                                <FormControl>
                                  <Input placeholder="" {...field} className="bg-white border-gray-300 rounded-lg max-w-52" />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="eoriNumber"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-3 items-center gap-4">
                              <FormLabel className="text-xs text-[#4E5967]">EORI Number</FormLabel>
                              <div className="col-span-2">
                                <FormControl>
                                  <Input placeholder="" {...field} className="bg-white border-gray-300 rounded-lg max-w-52" />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="iossNumber"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-3 items-center gap-4">
                              <FormLabel className="text-xs text-[#4E5967]">IOSS Number</FormLabel>
                              <div className="col-span-2">
                                <FormControl>
                                  <Input placeholder="" {...field} className="bg-white border-gray-300 rounded-lg max-w-52" />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="grantPermissions"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-start space-y-0 rounded-md">
                              <FormLabel className="text-xs text-[#4E5967]">
                                Grant company channel permissions to all existing users
                              </FormLabel>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="ukimsNumber"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-3 items-center gap-4">
                              <FormLabel className="text-xs text-[#4E5967]">UKIMS Number</FormLabel>
                              <div className="col-span-2">
                                <CustomSelect
                                  placeholder="Select an option"
                                  options={[
                                    { id: "1", label: "Xerjoff", value: "Xerjoff" },
                                    { id: "2", label: "Option 1", value: "Option 1" },
                                    { id: "3", label: "Option 2", value: "Option 2" },
                                  ]}
                                  onChange={(value) => field.onChange(value)}
                                  className="w-full bg-white max-w-52"
                                />
                                <FormMessage className="text-red-400" />
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="eoriNumberNi"
                          render={({ field }) => (
                            <FormItem className="grid grid-cols-3 items-center gap-4">
                              <FormLabel className="text-xs text-[#4E5967]">EORI Number (Northern Ireland)</FormLabel>
                              <div className="col-span-2">
                                <FormControl>
                                  <Input placeholder="" {...field} className="bg-white border-gray-300 rounded-lg max-w-52" />
                                </FormControl>
                                <FormMessage className="text-red-400" />
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Declaration Categories */}
                    <div className="mt-6">
                      <Label className="text-xs text-[#4E5967]">Custom Declaration Categories</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <FormField
                          control={form.control}
                          name="declarationCategories.document"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked === true)
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-xs text-[#4E5967]">Document</FormLabel>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="declarationCategories.returnedGoods"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked === true)
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-xs text-[#4E5967]">Returned goods</FormLabel>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="declarationCategories.gift"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked === true)
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-xs text-[#4E5967]">Gift</FormLabel>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="declarationCategories.saleOfGoods"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked === true)
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-xs text-[#4E5967]">Sale of goods</FormLabel>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="declarationCategories.mixedContent"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked === true)
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-xs text-[#4E5967]">Mixed Content</FormLabel>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="declarationCategories.commercialSample"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked === true)
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-xs text-[#4E5967]">Commercial sample</FormLabel>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="declarationCategories.other"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked === true)
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-xs text-[#4E5967]">Other</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Auto Sign Declarations */}
                    <div className="mt-6">
                      <Label className="text-xs text-[#4E5967]">Custom Declaration Categories</Label>
                      <div className="flex items-center mt-2">
                        <FormField
                          control={form.control}
                          name="autoSignDeclarations"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked === true)
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-xs text-[#4E5967]">
                                Automatically sign and date custom declaration documents
                              </FormLabel>
                            </FormItem>
                          )}
                        />

                        <Button
                          variant="link"
                          type="button"
                          onClick={handleFileSelect}
                          className="text-[#3D8BFF] p-0 h-auto ml-2"
                        >
                          Select File
                        </Button>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

                        {selectedFile && <span className="text-sm ml-2">{selectedFile}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Company Logo Upload */}
                  <div className="w-32 h-32 bg-white rounded-md flex flex-col items-center justify-center border border-gray-200">
                    {selectedImage || form.watch("companyLogo") ? (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 mx-auto mb-2 flex items-center justify-center">
                          <img
                            src={selectedImage || form.watch("companyLogo") || "/placeholder.svg"}
                            alt="Company Logo"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          type="button"
                          onClick={() => {
                            setSelectedImage(null)
                            form.setValue("companyLogo", "")
                          }}
                          className="text-xs"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={handleImageUpload}
                        className="flex flex-col items-center h-full justify-center"
                      >
                        <ImagePlus className="h-6 w-6 mb-1 text-[#4E5967]" />
                        <span className="text-xs text-[#4E5967]">+ Add Image</span>
                      </Button>
                    )}
                    <input
                      type="file"
                      ref={imageInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4 mt-8">
                  <Button variant="outline" type="button" size="lg" className="bg-white">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="lg" className="rounded-lg">
                    Save
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

export default EditCompanyDetails
