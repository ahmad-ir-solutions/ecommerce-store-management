// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { useNavigate } from "react-router-dom"
// import { Header } from "@/components/shared/header"
// import { Button } from "@/components/ui/button"
// import { PlusCircle } from "lucide-react"

// // interface User {
// //   id: string
// //   name: string
// //   email: string
// //   lastLoggedIn: string
// //   role: string
// //   designatedPicker: boolean
// //   accountOwner: boolean
// //   passwordAge: string
// //   mfaStatus: string
// //   ipRestriction: string
// // }

// export function ExistingUsers() {
//   const navigate = useNavigate()
//   const users = [
//     {
//       id: "1",
//       name: "Benson",
//       email: "benson@xyz.co",
//       lastLoggedIn: "04/04/2023 10:38:26",
//       role: "Administrator",
//       designatedPicker: true,
//       accountOwner: true,
//       passwordAge: "122 days",
//       mfaStatus: "Disabled",
//       ipRestriction: "Unrestricted",
//     },
//     // Add more mock users as needed
//   ]

//   const handleAddUser = () => {
//     // navigate("/admin/settings/users/add")
//   }

//   const handleEditUser = (userId: string) => {
//     navigate(`/admin/settings/users/edit-user-details/${userId}`)
//   }

//   return (
//     <div>
//       <Header title="Users">
//         <Button onClick={handleAddUser} className="rounded-lg" size="lg" variant="primary">
//             <PlusCircle className="w-4 h-4 mr-2" />
//             Add User
//         </Button>
//       </Header>
//       <div className="mt-6">
//         <Card className="bg-white rounded-2xl border-none shadow-none">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-lg font-medium">
//                 Existing Users
//             </CardTitle>
//             </CardHeader>
//             <CardContent>
//             <Table>
//                 <TableHeader>
//                 <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
//                     <TableHead className="p-3 rounded-l-lg">Name</TableHead>
//                     <TableHead className="p-3">Email</TableHead>
//                     <TableHead className="p-3">Last Logged In</TableHead>
//                     <TableHead className="p-3">Role</TableHead>
//                     <TableHead className="p-3">Designated Picker</TableHead>
//                     <TableHead className="p-3">Account's Owner</TableHead>
//                     <TableHead className="p-3">Password Age</TableHead>
//                     <TableHead className="p-3">MFA Status</TableHead>
//                     <TableHead className="p-3">IP Restriction</TableHead>
//                     <TableHead className="p-3 rounded-tr-lg rounded-br-lg"></TableHead>
//                 </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                 {/* Static example row; you can map through your data here */}
//                 {users.map((user) => (
//                     <TableRow key={user.id} className="border-b">
//                     <TableCell className="py-3 font-medium">{user.name}</TableCell>
//                     <TableCell className="py-3 text-[#3D8BFF] underline">{user.email}</TableCell>
//                     <TableCell className="py-3 text-sm text-gray-500">{user.lastLoggedIn}</TableCell>
//                     <TableCell className="py-3">{user.role}</TableCell>
//                     <TableCell className="py-3">{user.designatedPicker ? "Yes" : "No"}</TableCell>
//                     <TableCell className="py-3">{user.accountOwner ? "Yes" : "No"}</TableCell>
//                     <TableCell className="py-3">{user.passwordAge}</TableCell>
//                     <TableCell className="py-3">
//                         {user.mfaStatus}
//                     </TableCell>
//                     <TableCell className="py-3">{user.ipRestriction}</TableCell>
//                     <TableCell className="py-3">
//                         <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => handleEditUser(user.id)}
//                         className="text-[#3D8BFF] hover:text-[#3D8BFF] hover:bg-blue-50"
//                         >
//                         Edit/View User
//                         </Button>
//                     </TableCell>
//                     </TableRow>
//                 ))}
//                 </TableBody>
//             </Table>
//             </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export default ExistingUsers;

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/shared/header"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2 } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useDeleteUser, useGetAllUsers } from "../core/hooks/use-user"

export function ExistingUsers() {
  const navigate = useNavigate()
  const { data: users = [], isLoading } = useGetAllUsers()
  const deleteUserMutation = useDeleteUser()
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleAddUser = () => {
    navigate("/admin/settings/users/add")
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
              <div className="flex justify-center py-8">Loading users...</div>
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
                      <TableRow key={user.id} className="border-b">
                        <TableCell className="py-3 font-medium">{user.name}</TableCell>
                        <TableCell className="py-3 text-[#3D8BFF] underline">{user.email}</TableCell>
                        <TableCell className="py-3 text-sm text-gray-500">{user.lastLoggedIn || "Never"}</TableCell>
                        <TableCell className="py-3">{user.role}</TableCell>
                        <TableCell className="py-3">{user.designatedPicker ? "Yes" : "No"}</TableCell>
                        <TableCell className="py-3">{user.accountOwner ? "Yes" : "No"}</TableCell>
                        <TableCell className="py-3">{user.passwordAge || "N/A"}</TableCell>
                        <TableCell className="py-3">{user.mfaStatus || "Disabled"}</TableCell>
                        <TableCell className="py-3">{user.ipRestriction || "Unrestricted"}</TableCell>
                        <TableCell className="py-3">
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditUser(user.id)}
                              className="text-[#3D8BFF] hover:text-[#3D8BFF] hover:bg-blue-50"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDeleteDialog(user.id)}
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
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={deleteUserMutation.isPending}>
              {deleteUserMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ExistingUsers
