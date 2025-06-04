import { useEffect } from "react"
import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useNavigate, useParams } from "react-router-dom"
import { Header } from "@/components/shared/header"
import { Loader2 } from "lucide-react"
import { CustomSelect } from "@/components/shared/custom-select"
import { useQuery } from "@tanstack/react-query"
import { EditUserFormData, editUserSchema } from '../core/_schema'
import { getUserById, updateUser } from '../core/_requests'
import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils"
import type { AxiosError } from "axios"
import { type IUserModel } from '../core/_models'

export function EditUserDetails() {
  const navigate = useNavigate()
  const params = useParams()
  const userId = params?.userId as string

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: "",
      designatedPicker: false,
      accountOwner: false,
      notifyMe: true,
      copyPermissionFrom: "Select Member",
    },
  })

  // Fetch user data
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<IUserModel>({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId).then(res => res.data),
    enabled: !!userId,
  })

  // Populate form when user data is loaded
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        designatedPicker: user.designatedPicker || false,
        accountOwner: user.accountOwner || false,
        notifyMe: true,
        copyPermissionFrom: "Select Member",
      })
    }
  }, [user, reset])

  const handleCancel = () => {
    navigate("/admin/settings/users")
  }

  const onSubmit: SubmitHandler<EditUserFormData> = async (data) => {
    try {
      const updateData = {
        name: data.name,
        designatedPicker: data.designatedPicker,
        accountOwner: data.accountOwner,
        notifyMe: data.notifyMe,
        copyPermissionFrom: data.copyPermissionFrom,
      }

      const response = await updateUser(userId, updateData)
      showSuccessMessage(response.data.message || "User updated successfully!")
      navigate("/admin/settings/users")
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string; errors?: { [key: string]: string } }>
      if (axiosError.response?.data.errors) {
        Object.values(axiosError.response.data.errors).forEach((errorMessage) => {
          showErrorMessage(errorMessage)
        })
      } else {
        showErrorMessage(axiosError.response?.data?.message || "Failed to update user. Please try again.")
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
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
      <Header title="Edit User"/>
      <div className="mt-6">
        <Card className="overflow-hidden border-0 shadow-none bg-white rounded-2xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Information */}
                <div>
                  <h2 className="text-lg font-semibold mb-4">User Information</h2>
                  <div className="space-y-4 bg-[#ECF6FF] p-4 rounded-lg">
                    <div className="space-y-2 grid grid-cols-3">
                      <Label htmlFor="email" className="text-sm text-[#4E5967]">
                        Email
                      </Label>
                      <div className="col-span-2">
                        <Input
                          id="email"
                          value={user.email}
                          disabled
                          className="bg-gray-100 border-gray-300 rounded-lg cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 grid grid-cols-3">
                      <Label htmlFor="name" className="text-sm text-[#4E5967]">
                        Name *
                      </Label>
                      <div className="col-span-2">
                        <Input
                          id="name"
                          {...register("name")}
                          className={`bg-white border-gray-300 rounded-lg ${errors.name ? "border-red-500" : ""}`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2 grid grid-cols-3">
                      <Label htmlFor="email" className="text-sm text-[#4E5967]">
                        Role
                      </Label>
                      <div className="col-span-2">
                        <Input
                          id="role"
                          value={user.role}
                          disabled
                          className="bg-gray-100 border-gray-300 rounded-lg cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-3">
                        <div>
                          <Label htmlFor="designatedPicker" className="text-sm text-[#4E5967]">
                            Designated Picker
                          </Label>
                        </div>
                        <div className="flex justify-end">
                          <Controller
                            name="designatedPicker"
                            control={control}
                            render={({ field }) => (
                              <Switch id="designatedPicker" checked={field.value} onCheckedChange={field.onChange} />
                            )}
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
                          <Controller
                            name="accountOwner"
                            control={control}
                            render={({ field }) => (
                              <Switch id="accountOwner" checked={field.value} onCheckedChange={field.onChange} />
                            )}
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
                          <Controller
                            name="notifyMe"
                            control={control}
                            render={({ field }) => (
                              <Switch id="notifyMe" checked={field.value} onCheckedChange={field.onChange} />
                            )}
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
                        <Controller
                          name="copyPermissionFrom"
                          control={control}
                          render={({ field }) => (
                            <CustomSelect
                              placeholder="Select Member"
                              options={[
                                { id: "1", label: "Select Member", value: "Select Member" },
                                { id: "2", label: "John Doe", value: "John Doe" },
                                { id: "3", label: "Jane Smith", value: "Jane Smith" },
                              ]}
                              defaultValue={field.value}
                              onChange={field.onChange}
                              className="w-full bg-white"
                            />
                          )}
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
                          To bill you and collect money that you owe us, including authorizing and processing credit
                          card transactions
                        </li>
                      </ul>
                      <p>
                        At any time, you may request a copy of your information that we hold about you. You may ask us
                        to correct or remove information you think is inaccurate.
                      </p>
                      <p>You can change your preferences at any time.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 mt-16">
                <Button type="button" variant="outline" size="lg" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-lg"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update User"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EditUserDetails