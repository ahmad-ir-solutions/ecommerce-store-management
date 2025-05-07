import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate, useParams } from "react-router-dom"
import { Header } from "@/components/shared/header"
import { PlusCircle } from "lucide-react"

interface UserFormData {
  email: string
  name: string
  designatedPicker: boolean
  accountOwner: boolean
  notifyMe: boolean
  copyPermissionFrom: string
}

export function EditUserDetails() {
  let navigate = useNavigate()
  const params = useParams()
  const userId = params?.userId as string

  const [formData, setFormData] = useState<UserFormData>({
    email: "user@example.com",
    name: "John Smith",
    designatedPicker: true,
    accountOwner: true,
    notifyMe: true,
    copyPermissionFrom: "Select Member",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, copyPermissionFrom: value }))
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const handleSave = () => {
    // Save user data
    console.log("Saving user data:", formData)
    navigate("/admin/settings/users")
  }

  return (
    <div>
      <Header title="Users">
        <Button
        //  onClick={handleAddUser} 
         className="rounded-lg" size="lg" variant="primary">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add User
        </Button>
      </Header>
      <div className="mt-6">
        <Card className="overflow-hidden">
            <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {/* User Information */}
                <div>
                <h2 className="text-lg font-semibold mb-4">User Information</h2>
                <div className="space-y-4 bg-[#f0f8ff] p-4 rounded-md">
                    <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm">
                        Contact Email *
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-white"
                    />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm">
                        Name *
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-white"
                    />
                    </div>
                    <div className="space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="designatedPicker" className="text-sm">
                        Designated Picker
                        </Label>
                        <Switch
                        id="designatedPicker"
                        checked={formData.designatedPicker}
                        onCheckedChange={(checked) => handleSwitchChange("designatedPicker", checked)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="accountOwner" className="text-sm">
                        Account Owner
                        </Label>
                        <Switch
                        id="accountOwner"
                        checked={formData.accountOwner}
                        onCheckedChange={(checked) => handleSwitchChange("accountOwner", checked)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="notifyMe" className="text-sm">
                        Notify Me
                        </Label>
                        <Switch
                        id="notifyMe"
                        checked={formData.notifyMe}
                        onCheckedChange={(checked) => handleSwitchChange("notifyMe", checked)}
                        />
                    </div>
                    </div>
                    <div className="space-y-2 pt-2">
                    <Label htmlFor="copyPermissionFrom" className="text-sm">
                        Copy Permissions From
                    </Label>
                    <Select value={formData.copyPermissionFrom} onValueChange={handleSelectChange}>
                        <SelectTrigger id="copyPermissionFrom" className="bg-white">
                        <SelectValue placeholder="Select Member" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="Select Member">Select Member</SelectItem>
                        <SelectItem value="John Doe">John Doe</SelectItem>
                        <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                </div>
                </div>

                {/* Privacy Statement */}
                <div>
                <h2 className="text-lg font-semibold mb-4">Privacy Statement</h2>
                <div className="bg-[#f0f8ff] p-4 rounded-md h-full">
                    <div className="text-sm text-gray-600 space-y-4">
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
            <div className="flex justify-end gap-4 p-6">
                <Button variant="outline" onClick={handleCancel}>
                Cancel
                </Button>
                <Button className="bg-[#3D8BFF]" onClick={handleSave}>
                Save
                </Button>
            </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EditUserDetails;