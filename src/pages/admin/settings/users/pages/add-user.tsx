import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { AddUserFormData, addUserSchema } from '../core/_schema'
import { addUser } from '../core/_requests'

export function AddUser() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      name: "",
      role: "SELLER",
      designatedPicker: false,
      accountOwner: false,
      notifyMe: true,
      copyPermissionFrom: "Select Member",
    },
  })

  const addUserMutation = useMutation({
    mutationFn: (data: AddUserFormData) =>
      addUser({
        email: data.email,
        password: data.password,
        name: data.name,
        role: "SELLER",
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

  const handleCancel = () => {
    navigate("/admin/settings/users")
  }

  const onSubmit: SubmitHandler<AddUserFormData> = (data) => {
    addUserMutation.mutate(data)
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
                          type="email"
                          {...register("email")}
                          className={`bg-white border-gray-300 rounded-lg ${errors.email ? "border-red-500" : ""}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>
                    <div className="space-y-2 grid grid-cols-3">
                      <Label htmlFor="confirmEmail" className="text-sm text-[#4E5967]">
                        Confirm Email *
                      </Label>
                      <div className="col-span-2">
                        <Input
                          id="confirmEmail"
                          type="email"
                          {...register("confirmEmail")}
                          className={`bg-white border-gray-300 rounded-lg ${errors.confirmEmail ? "border-red-500" : ""}`}
                        />
                        {errors.confirmEmail && (
                          <p className="text-red-500 text-xs mt-1">{errors.confirmEmail.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 grid grid-cols-3">
                      <Label htmlFor="password" className="text-sm text-[#4E5967]">
                        Password *
                      </Label>
                      <div className="col-span-2">
                        <Input
                          id="password"
                          type="password"
                          {...register("password")}
                          className={`bg-white border-gray-300 rounded-lg ${errors.password ? "border-red-500" : ""}`}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                      </div>
                    </div>
                    <div className="space-y-2 grid grid-cols-3">
                      <Label htmlFor="confirmPassword" className="text-sm text-[#4E5967]">
                        Confirm Password *
                      </Label>
                      <div className="col-span-2">
                        <Input
                          id="confirmPassword"
                          type="password"
                          {...register("confirmPassword")}
                          className={`bg-white border-gray-300 rounded-lg ${errors.confirmPassword ? "border-red-500" : ""}`}
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                        )}
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
                    {/* <div className="space-y-2 grid grid-cols-3">
                      <Label htmlFor="role" className="text-sm text-[#4E5967]">
                        Role *
                      </Label>
                      <div className="col-span-2">
                        <Controller
                          name="role"
                          control={control}
                          render={({ field }) => (
                            <CustomSelect
                              placeholder="Select Role"
                              options={[
                                { id: "1", label: "Admin", value: "ADMIN" },
                                { id: "2", label: "User", value: "USER" },
                                { id: "3", label: "Seller", value: "SELLER" },

                              ]}
                              defaultValue={field.value}
                              onChange={field.onChange}
                              className="w-full bg-white"
                            />
                          )}
                        />
                        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                      </div>
                    </div> */}
                    <div className="space-y-4 mt-4">
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
                  disabled={isSubmitting || addUserMutation.isPending}
                >
                  {isSubmitting || addUserMutation.isPending ? "Adding..." : "Add User"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AddUser