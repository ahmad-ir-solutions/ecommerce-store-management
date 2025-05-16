import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/shared/header"
import { PlusCircle } from "lucide-react"
import { CustomSelect } from "@/components/shared/custom-select"

interface UserFormData {
  email: string
  confirmEmail: string
  name: string
  designatedPicker: boolean
  accountOwner: boolean
  notifyMe: boolean
  copyPermissionFrom: string
}

export function EditUserDetails() {
  const navigate = useNavigate()
  // const params = useParams()
  // const userId = params?.userId as string

  const [formData, setFormData] = useState<UserFormData>({
    email: "user@example.com",
    confirmEmail: "",
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
        <Card className="overflow-hidden border-0 shadow-none bg-white rounded-2xl">
            <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
                {/* User Information */}
                <div>
                <h2 className="text-lg font-semibold mb-4">User Information</h2>
                <div className="space-y-4 bg-[#ECF6FF] p-4 rounded-lg">
                    <div className="space-y-2 grid grid-cols-3">
                    <Label htmlFor="email" className="text-sm text-[#4E5967]">
                        Email *
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-white border-gray-300 rounded-lg"
                    />
                    </div>
                    <div className="space-y-2 grid grid-cols-3">
                    <Label htmlFor="confirmEmail" className="text-sm text-[#4E5967]">
                        Confirm Email *
                    </Label>
                    <Input
                        id="confirmEmail"
                        name="confirmEmail"
                        value={formData.confirmEmail}
                        onChange={handleInputChange}
                        className="bg-white border-gray-300 rounded-lg"
                    />
                    </div>
                    <div className="space-y-2 grid grid-cols-3">
                    <Label htmlFor="name" className="text-sm text-[#4E5967]">
                        Name *
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-white border-gray-300 rounded-lg"
                    />
                    </div>
                    <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-3">
                      <div>
                        <Label htmlFor="designatedPicker" className="text-sm text-[#4E5967]">
                        Designated Picker
                        </Label>
                      </div>
                      <div className='flex justify-end'>
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
                       <div className='flex justify-end'>
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
                        Notify Me
                        </Label>
                      </div>
                      <div className='flex justify-end'>
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
                      <div>
                        <CustomSelect
                        placeholder="Select Member"
                        options={[
                          { id: "1", label: "Select Member", value: "Select Member" },
                          { id: "2", label: "John Doe", value: "John Doe" },
                          { id: "3", label: "Jane Smith", value: "Jane Smith" },
                        ]}
                        defaultValue={formData.copyPermissionFrom}
                        onChange={(value) => handleSelectChange(value)}
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
            <div className="flex justify-end gap-4 px-6
             mt-16">
                <Button variant="outline" size="lg" onClick={handleCancel}>
                Cancel
                </Button>
                <Button className="rounded-lg" variant="primary" size="lg" onClick={handleSave}>
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
