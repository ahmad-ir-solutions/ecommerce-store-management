// import { useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
// import { useNavigate } from "react-router-dom"
// import { Header } from "@/components/shared/header"
// import { PlusCircle } from "lucide-react"
// import { CustomSelect } from "@/components/shared/custom-select"

// interface UserFormData {
//   email: string
//   confirmEmail: string
//   name: string
//   designatedPicker: boolean
//   accountOwner: boolean
//   notifyMe: boolean
//   copyPermissionFrom: string
// }

// export function EditUserDetails() {
//   const navigate = useNavigate()
//   // const params = useParams()
//   // const userId = params?.userId as string

//   const [formData, setFormData] = useState<UserFormData>({
//     email: "user@example.com",
//     confirmEmail: "",
//     name: "John Smith",
//     designatedPicker: true,
//     accountOwner: true,
//     notifyMe: true,
//     copyPermissionFrom: "Select Member",
//   })
  
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSwitchChange = (name: string, checked: boolean) => {
//     setFormData((prev) => ({ ...prev, [name]: checked }))
//   }

//   const handleSelectChange = (value: string) => {
//     setFormData((prev) => ({ ...prev, copyPermissionFrom: value }))
//   }

//   const handleCancel = () => {
//     navigate(-1)
//   }

//   const handleSave = () => {
//     // Save user data
//     console.log("Saving user data:", formData)
//     navigate("/admin/settings/users")
//   }

//   return (
//     <div>
//       <Header title="Users">
//         <Button
//         //  onClick={handleAddUser} 
//          className="rounded-lg" size="lg" variant="primary">
//             <PlusCircle className="w-4 h-4 mr-2" />
//             Add User
//         </Button>
//       </Header>
//       <div className="mt-6">
//         <Card className="overflow-hidden border-0 shadow-none bg-white rounded-2xl">
//             <CardContent className="p-0">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
//                 {/* User Information */}
//                 <div>
//                 <h2 className="text-lg font-semibold mb-4">User Information</h2>
//                 <div className="space-y-4 bg-[#ECF6FF] p-4 rounded-lg">
//                     <div className="space-y-2 grid grid-cols-3">
//                     <Label htmlFor="email" className="text-sm text-[#4E5967]">
//                         Email *
//                     </Label>
//                     <Input
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className="bg-white border-gray-300 rounded-lg"
//                     />
//                     </div>
//                     <div className="space-y-2 grid grid-cols-3">
//                     <Label htmlFor="confirmEmail" className="text-sm text-[#4E5967]">
//                         Confirm Email *
//                     </Label>
//                     <Input
//                         id="confirmEmail"
//                         name="confirmEmail"
//                         value={formData.confirmEmail}
//                         onChange={handleInputChange}
//                         className="bg-white border-gray-300 rounded-lg"
//                     />
//                     </div>
//                     <div className="space-y-2 grid grid-cols-3">
//                     <Label htmlFor="name" className="text-sm text-[#4E5967]">
//                         Name *
//                     </Label>
//                     <Input
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         className="bg-white border-gray-300 rounded-lg"
//                     />
//                     </div>
//                     <div className="space-y-4 mt-4">
//                     <div className="grid grid-cols-3">
//                       <div>
//                         <Label htmlFor="designatedPicker" className="text-sm text-[#4E5967]">
//                         Designated Picker
//                         </Label>
//                       </div>
//                       <div className='flex justify-end'>
//                         <Switch
//                         id="designatedPicker"
//                         checked={formData.designatedPicker}
//                         onCheckedChange={(checked) => handleSwitchChange("designatedPicker", checked)}
//                         />
//                       </div>
//                     </div>
//                     <div className="grid grid-cols-3">
//                       <div>
//                          <Label htmlFor="accountOwner" className="text-sm text-[#4E5967]">
//                         Account Owner
//                         </Label>
//                       </div>
//                        <div className='flex justify-end'>
//                         <Switch
//                         id="accountOwner"
//                         checked={formData.accountOwner}
//                         onCheckedChange={(checked) => handleSwitchChange("accountOwner", checked)}
//                         />
//                        </div>
                        
//                     </div>
//                     <div className="grid grid-cols-3">
//                       <div>
//                         <Label htmlFor="notifyMe" className="text-sm text-[#4E5967]">
//                         Notify Me
//                         </Label>
//                       </div>
//                       <div className='flex justify-end'>
//                         <Switch
//                         id="notifyMe"
//                         checked={formData.notifyMe}
//                         onCheckedChange={(checked) => handleSwitchChange("notifyMe", checked)}
//                         />
//                       </div>
//                     </div>
//                     </div>
//                     <div className="space-y-2 grid grid-cols-3 pt-2">
//                       <div>
//                         <Label htmlFor="copyPermissionFrom" className="text-sm text-[#4E5967]">
//                           Copy Permissions From
//                         </Label>
//                       </div>
//                       <div>
//                         <CustomSelect
//                         placeholder="Select Member"
//                         options={[
//                           { id: "1", label: "Select Member", value: "Select Member" },
//                           { id: "2", label: "John Doe", value: "John Doe" },
//                           { id: "3", label: "Jane Smith", value: "Jane Smith" },
//                         ]}
//                         defaultValue={formData.copyPermissionFrom}
//                         onChange={(value) => handleSelectChange(String(value))}
//                         className="w-full bg-white"
//                       />
//                       </div>
//                     </div>
//                 </div>
//                 </div>

//                 {/* Privacy Statement */}
//                 <div>
//                 <h2 className="text-lg font-semibold mb-4">Privacy Statement</h2>
//                 <div className="bg-[#ECF6FF] p-4 rounded-lg h-full">
//                     <div className="text-sm text-[#4E5967] space-y-4">
//                     <p className="font-medium">
//                         We collect personal information from you, including information about your:
//                     </p>
//                     <p>We collect your contact details, name, and billing details for the following reasons:</p>
//                     <ul className="list-disc pl-5 space-y-1">
//                         <li>To verify your identity</li>
//                         <li>To provide services and products</li>
//                         <li>To market to you</li>
//                         <li>To improve our services</li>
//                         <li>
//                         To bill you and collect money that you owe us, including authorizing and processing credit
//                         card transactions
//                         </li>
//                     </ul>
//                     <p>
//                         At any time, you may request a copy of your information that we hold about you. You may ask us
//                         to correct or remove information you think is inaccurate.
//                     </p>
//                     <p>You can change your preferences at any time.</p>
//                     </div>
//                 </div>
//                 </div>
//             </div>

//             {/* Form Actions */}
//             <div className="flex justify-end gap-4 px-6
//              mt-16">
//                 <Button variant="outline" size="lg" onClick={handleCancel}>
//                 Cancel
//                 </Button>
//                 <Button className="rounded-lg" variant="primary" size="lg" onClick={handleSave}>
//                 Save
//                 </Button>
//             </div>
//             </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export default EditUserDetails;



import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useNavigate, useParams } from "react-router-dom"
import { Header } from "@/components/shared/header"
import { PlusCircle } from "lucide-react"
import { CustomSelect } from "@/components/shared/custom-select"
import { useQuery } from "@tanstack/react-query"
import { useUpdateUser } from "../core/hooks/use-user"

interface EditUserFormData {
  email: string
  confirmEmail: string
  name: string
  role: string
  designatedPicker: boolean
  accountOwner: boolean
  notifyMe: boolean
  copyPermissionFrom: string
  changePassword: boolean
  newPassword: string
  confirmNewPassword: string
}

export function EditUserDetails() {
  const navigate = useNavigate()
  const params = useParams()
  const userId = params?.userId as string

  const [formData, setFormData] = useState<EditUserFormData>({
    email: "",
    confirmEmail: "",
    name: "",
    role: "USER",
    designatedPicker: false,
    accountOwner: false,
    notifyMe: true,
    copyPermissionFrom: "Select Member",
    changePassword: false,
    newPassword: "",
    confirmNewPassword: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Fetch user data
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
    select: (data) => data.data,
  })

  // Update user mutation
  const updateUserMutation = useUpdateUser()

  // Populate form when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        confirmEmail: user.email || "",
        name: user.name || "",
        role: user.role || "USER",
        designatedPicker: user.designatedPicker || false,
        accountOwner: user.accountOwner || false,
        notifyMe: true,
        copyPermissionFrom: "Select Member",
        changePassword: false,
        newPassword: "",
        confirmNewPassword: "",
      })
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, copyPermissionFrom: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleCancel = () => {
    navigate("/admin/settings/users")
  }

  const handleAddUser = () => {
    navigate("/admin/settings/users/add")
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.confirmEmail) {
      newErrors.confirmEmail = "Please confirm email"
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = "Emails do not match"
    }

    if (!formData.name) {
      newErrors.name = "Name is required"
    }

    // Password validation only if changing password
    if (formData.changePassword) {
      if (!formData.newPassword) {
        newErrors.newPassword = "New password is required"
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters"
      }

      if (!formData.confirmNewPassword) {
        newErrors.confirmNewPassword = "Please confirm new password"
      } else if (formData.newPassword !== formData.confirmNewPassword) {
        newErrors.confirmNewPassword = "Passwords do not match"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      const updateData: any = {
        email: formData.email,
        name: formData.name,
        role: formData.role,
        designatedPicker: formData.designatedPicker,
        accountOwner: formData.accountOwner,
      }

      // Only include password if changing it
      if (formData.changePassword && formData.newPassword) {
        updateData.password = formData.newPassword
      }

      updateUserMutation.mutate(
        { userId, userData: updateData },
        {
          onSuccess: () => {
            navigate("/admin/settings/users")
          },
        },
      )
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading user details...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error loading user details. Please try again.</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>User not found.</div>
      </div>
    )
  }

  return (
    <div>
      <Header title="Edit User">
        <Button onClick={handleAddUser} className="rounded-lg" size="lg" variant="primary">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </Header>
      <div className="mt-6">
        <Card className="overflow-hidden border-0 shadow-none bg-white rounded-2xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Information */}
              <div>
                <h2 className="text-lg font-semibold mb-4">User Information</h2>
                <div className="space-y-4 bg-[#ECF6FF] p-4 rounded-lg">
                  <div className="space-y-2 grid grid-cols-3">
                    <Label htmlFor="email" className="text-sm text-[#4E5967]">
                      Email *
                    </Label>
                    <div className="col-span-2">
                      <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`bg-white border-gray-300 rounded-lg ${errors.email ? "border-red-500" : ""}`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="space-y-2 grid grid-cols-3">
                    <Label htmlFor="confirmEmail" className="text-sm text-[#4E5967]">
                      Confirm Email *
                    </Label>
                    <div className="col-span-2">
                      <Input
                        id="confirmEmail"
                        name="confirmEmail"
                        value={formData.confirmEmail}
                        onChange={handleInputChange}
                        className={`bg-white border-gray-300 rounded-lg ${errors.confirmEmail ? "border-red-500" : ""}`}
                      />
                      {errors.confirmEmail && <p className="text-red-500 text-xs mt-1">{errors.confirmEmail}</p>}
                    </div>
                  </div>
                  <div className="space-y-2 grid grid-cols-3">
                    <Label htmlFor="name" className="text-sm text-[#4E5967]">
                      Name *
                    </Label>
                    <div className="col-span-2">
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`bg-white border-gray-300 rounded-lg ${errors.name ? "border-red-500" : ""}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                  </div>
                  <div className="space-y-2 grid grid-cols-3">
                    <Label htmlFor="role" className="text-sm text-[#4E5967]">
                      Role *
                    </Label>
                    <div className="col-span-2">
                      <CustomSelect
                        placeholder="Select Role"
                        options={[
                          { id: "1", label: "User", value: "USER" },
                          { id: "2", label: "Admin", value: "ADMIN" },
                        ]}
                        defaultValue={formData.role}
                        onChange={(value) => handleRoleChange(String(value))}
                        className="w-full bg-white"
                      />
                    </div>
                  </div>

                  {/* Password Change Section */}
                  <div className="space-y-4 mt-6 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-3">
                      <div>
                        <Label htmlFor="changePassword" className="text-sm text-[#4E5967]">
                          Change Password
                        </Label>
                      </div>
                      <div className="flex justify-end">
                        <Switch
                          id="changePassword"
                          checked={formData.changePassword}
                          onCheckedChange={(checked) => handleSwitchChange("changePassword", checked)}
                        />
                      </div>
                    </div>

                    {formData.changePassword && (
                      <>
                        <div className="space-y-2 grid grid-cols-3">
                          <Label htmlFor="newPassword" className="text-sm text-[#4E5967]">
                            New Password *
                          </Label>
                          <div className="col-span-2">
                            <Input
                              id="newPassword"
                              name="newPassword"
                              type="password"
                              value={formData.newPassword}
                              onChange={handleInputChange}
                              className={`bg-white border-gray-300 rounded-lg ${errors.newPassword ? "border-red-500" : ""}`}
                            />
                            {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
                          </div>
                        </div>
                        <div className="space-y-2 grid grid-cols-3">
                          <Label htmlFor="confirmNewPassword" className="text-sm text-[#4E5967]">
                            Confirm New Password *
                          </Label>
                          <div className="col-span-2">
                            <Input
                              id="confirmNewPassword"
                              name="confirmNewPassword"
                              type="password"
                              value={formData.confirmNewPassword}
                              onChange={handleInputChange}
                              className={`bg-white border-gray-300 rounded-lg ${errors.confirmNewPassword ? "border-red-500" : ""}`}
                            />
                            {errors.confirmNewPassword && (
                              <p className="text-red-500 text-xs mt-1">{errors.confirmNewPassword}</p>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-3">
                      <div>
                        <Label htmlFor="designatedPicker" className="text-sm text-[#4E5967]">
                          Designated Picker
                        </Label>
                      </div>
                      <div className="flex justify-end">
                        <Switch
                          id="designatedPicker"
                          checked={formData.designatedPicker}
                          onCheckedChange={(checked) => handleSwitchChange("designatedPicker", checked)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div>
                        <Label htmlFor="accountOwner" className="text-sm text-[#4E5967]">
                          Account Owner
                        </Label>
                      </div>
                      <div className="flex justify-end">
                        <Switch
                          id="accountOwner"
                          checked={formData.accountOwner}
                          onCheckedChange={(checked) => handleSwitchChange("accountOwner", checked)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div>
                        <Label htmlFor="notifyMe" className="text-sm text-[#4E5967]">
                          Notify User
                        </Label>
                      </div>
                      <div className="flex justify-end">
                        <Switch
                          id="notifyMe"
                          checked={formData.notifyMe}
                          onCheckedChange={(checked) => handleSwitchChange("notifyMe", checked)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 grid grid-cols-3 pt-2">
                    <div>
                      <Label htmlFor="copyPermissionFrom" className="text-sm text-[#4E5967]">
                        Copy Permissions From
                      </Label>
                    </div>
                    <div className="col-span-2">
                      <CustomSelect
                        placeholder="Select Member"
                        options={[
                          { id: "1", label: "Select Member", value: "Select Member" },
                          { id: "2", label: "John Doe", value: "John Doe" },
                          { id: "3", label: "Jane Smith", value: "Jane Smith" },
                        ]}
                        defaultValue={formData.copyPermissionFrom}
                        onChange={(value) => handleSelectChange(String(value))}
                        className="w-full bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy Statement */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Privacy Statement</h2>
                <div className="bg-[#ECF6FF] p-4 rounded-lg h-full">
                  <div className="text-sm text-[#4E5967] space-y-4">
                    <p className="font-medium">
                      We collect personal information from you, including information about your:
                    </p>
                    <p>We collect your contact details, name, and billing details for the following reasons:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>To verify your identity</li>
                      <li>To provide services and products</li>
                      <li>To market to you</li>
                      <li>To improve our services</li>
                      <li>
                        To bill you and collect money that you owe us, including authorizing and processing credit card
                        transactions
                      </li>
                    </ul>
                    <p>
                      At any time, you may request a copy of your information that we hold about you. You may ask us to
                      correct or remove information you think is inaccurate.
                    </p>
                    <p>You can change your preferences at any time.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 mt-16">
              <Button variant="outline" size="lg" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                className="rounded-lg"
                variant="primary"
                size="lg"
                onClick={handleSave}
                disabled={updateUserMutation.isPending}
              >
                {updateUserMutation.isPending ? "Updating..." : "Update User"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EditUserDetails
