"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/shared/header"
import { CustomSelect } from "@/components/shared/custom-select"
import { useMutation } from "@tanstack/react-query"
import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils"
import type { AxiosError } from "axios"
import { addUser } from "../core/_requests"

interface AddUserFormData {
  email: string
  confirmEmail: string
  name: string
  password: string
  confirmPassword: string
  role: string
  designatedPicker: boolean
  accountOwner: boolean
  notifyMe: boolean
  copyPermissionFrom: string
}

export function AddUser() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<AddUserFormData>({
    email: "",
    confirmEmail: "",
    name: "",
    password: "",
    confirmPassword: "",
    role: "USER",
    designatedPicker: false,
    accountOwner: false,
    notifyMe: true,
    copyPermissionFrom: "Select Member",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const addUserMutation = useMutation({
    mutationFn: (data: AddUserFormData) =>
      addUser({
        email: data.email,
        name: data.name,
        password: data.password,
        role: data.role,
        designatedPicker: data.designatedPicker,
        accountOwner: data.accountOwner,
      }),
    onSuccess: (response) => {
      showSuccessMessage(response.data.message || "User added successfully!")
      navigate("/admin/settings/users")
    },
    onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
      if (error.response?.data.errors) {
        Object.values(error.response.data.errors).forEach((errorMessage) => {
          showErrorMessage(errorMessage)
        })
      } else {
        showErrorMessage(error.response?.data?.message || "Failed to add user. Please try again.")
      }
    },
  })

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

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      addUserMutation.mutate(formData)
    }
  }

  return (
    <div>
      <Header title="Add New User">
        <Button onClick={handleCancel} className="rounded-lg" size="lg" variant="outline">
          Back to Users
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
                    <Label htmlFor="password" className="text-sm text-[#4E5967]">
                      Password *
                    </Label>
                    <div className="col-span-2">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`bg-white border-gray-300 rounded-lg ${errors.password ? "border-red-500" : ""}`}
                      />
                      {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                  </div>
                  <div className="space-y-2 grid grid-cols-3">
                    <Label htmlFor="confirmPassword" className="text-sm text-[#4E5967]">
                      Confirm Password *
                    </Label>
                    <div className="col-span-2">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`bg-white border-gray-300 rounded-lg ${errors.confirmPassword ? "border-red-500" : ""}`}
                      />
                      {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
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
                  <div className="space-y-4 mt-4">
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
                disabled={addUserMutation.isPending}
              >
                {addUserMutation.isPending ? "Adding..." : "Add User"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AddUser
