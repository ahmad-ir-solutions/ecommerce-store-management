import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/shared/header"
import { Button } from "@/components/ui/button"
import { Loader2, PlusCircle, Trash2 } from "lucide-react"
import { useState } from "react"
import { useDeleteUser, useGetAllUsers } from "../core/hooks/use-user"
import { DeleteConfirmationModal } from '@/pages/admin/products/components/modals/delete-confirmation-modal'
import { IUserModel } from '../core/_models'

export function ExistingUsers() {
  const navigate = useNavigate()
  const { data, isLoading } = useGetAllUsers()
  const users = (data?.data ?? []) as IUserModel[]
  const deleteUserMutation = useDeleteUser()
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleAddUser = () => {
    navigate("/admin/settings/users/add-user")
  }

  const handleEditUser = (userId: string) => {
    navigate(`/admin/settings/users/edit-user-details/${userId}`)
  }

  const openDeleteDialog = (userId: string) => {
    setUserToDelete(userId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUserMutation.mutate(userToDelete)
      setIsDeleteDialogOpen(false)
      setUserToDelete(null)
    }
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
            <CardTitle className="text-lg font-medium">Existing Users</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
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
                    <TableHead className="p-3 rounded-tr-lg rounded-br-lg">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-8">
                        No users found. Add your first user!
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user._id} className="border-none">
                        <TableCell className="py-3 font-medium">{user.name}</TableCell>
                        <TableCell className="py-3">{user.email}</TableCell>
                        <TableCell className="py-3 text-sm text-gray-500">{user.lastLogin?.split("T")[0] || "-"}</TableCell>
                        <TableCell className="py-3">{user.role}</TableCell>
                        <TableCell className="py-3">{user.designatedPicker ? "Yes" : "No"}</TableCell>
                        <TableCell className="py-3">{user.accountOwner ? "Yes" : "No"}</TableCell>
                        <TableCell className="py-3">{user.passwordAge || "-"}</TableCell>
                        <TableCell className="py-3">{user.mfaStatus || "Disabled"}</TableCell>
                        <TableCell className="py-3">{user.ipRestriction || "Unrestricted"}</TableCell>
                        <TableCell className="py-3">
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditUser(user._id)}
                              className="text-[#3D8BFF] hover:text-[#3D8BFF] hover:bg-blue-50"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDeleteDialog(user._id)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationModal
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        loading={deleteUserMutation.isPending}
      />
    </div>
  )
}

export default ExistingUsers
