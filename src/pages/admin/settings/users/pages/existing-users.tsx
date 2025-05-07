import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/shared/header"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  lastLoggedIn: string
  role: string
  designatedPicker: boolean
  accountOwner: boolean
  passwordAge: string
  mfaStatus: string
  ipRestriction: string
}

export function ExistingUsers() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Benson",
      email: "benson@xyz.co",
      lastLoggedIn: "04/04/2023 10:38:26",
      role: "Administrator",
      designatedPicker: true,
      accountOwner: true,
      passwordAge: "122 days",
      mfaStatus: "Disabled",
      ipRestriction: "Unrestricted",
    },
    // Add more mock users as needed
  ])

  const handleAddUser = () => {
    // navigate("/admin/settings/users/add")
  }

  const handleEditUser = (userId: string) => {
    navigate(`/admin/settings/users/edit-user-details/${userId}`)
  }

  return (
    <div>
      <Header title="Users">
        <Button onClick={handleAddUser} className="rounded-lg" size="lg" variant="primary">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add User
        </Button>
      </Header>
      <div className="mt-6">
        <Card className="bg-white rounded-2xl border-none shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
                Existing Users
            </CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                    <TableHead className="p-3 rounded-l-lg">Name</TableHead>
                    <TableHead className="p-3">Email</TableHead>
                    <TableHead className="p-3">Last Logged In</TableHead>
                    <TableHead className="p-3">Role</TableHead>
                    <TableHead className="p-3">Designated Picker</TableHead>
                    <TableHead className="p-3">Account's Owner</TableHead>
                    <TableHead className="p-3">Password Age</TableHead>
                    <TableHead className="p-3">MFA Status</TableHead>
                    <TableHead className="p-3">IP Restriction</TableHead>
                    <TableHead className="p-3 rounded-tr-lg rounded-br-lg"></TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {/* Static example row; you can map through your data here */}
                {users.map((user) => (
                    <TableRow key={user.id} className="border-b">
                    <TableCell className="py-3 font-medium">{user.name}</TableCell>
                    <TableCell className="py-3 text-[#3D8BFF] underline">{user.email}</TableCell>
                    <TableCell className="py-3 text-sm text-gray-500">{user.lastLoggedIn}</TableCell>
                    <TableCell className="py-3">{user.role}</TableCell>
                    <TableCell className="py-3">{user.designatedPicker ? "Yes" : "No"}</TableCell>
                    <TableCell className="py-3">{user.accountOwner ? "Yes" : "No"}</TableCell>
                    <TableCell className="py-3">{user.passwordAge}</TableCell>
                    <TableCell className="py-3">
                        {user.mfaStatus}
                    </TableCell>
                    <TableCell className="py-3">{user.ipRestriction}</TableCell>
                    <TableCell className="py-3">
                        <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditUser(user.id)}
                        className="text-[#3D8BFF] hover:text-[#3D8BFF] hover:bg-blue-50"
                        >
                        Edit/View User
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ExistingUsers;