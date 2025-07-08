import { Header } from "@/components/shared/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Loader2, Trash2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDeleteCompany, useGetCompanies } from "../core/hooks/useCompany"
import { ICompanyModel } from "../core/_modal"

export function CompanyPage() {
  const navigate = useNavigate()
  const { data: companies, isLoading, error } = useGetCompanies()
  const deleteCompanyMutation = useDeleteCompany()

  const handleAddCompany = () => {
    navigate("/admin/settings/company/add-company")
  }

  const handleDeleteCompany = (companyId: string) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      deleteCompanyMutation.mutate(companyId)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error loading companies. Please try again.</p>
      </div>
    )
  }
  console.log(companies, "companies data");
  

  return (
    <div>
      <Header title="Companies">
        <Button onClick={handleAddCompany} className="rounded-lg" size="lg" variant="primary">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Company
        </Button>
      </Header>
      <div className="mt-6">
        <Card className="bg-white rounded-2xl border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Existing Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                  <TableHead className="p-3 rounded-tl-lg rounded-bl-lg">Name</TableHead>
                  <TableHead className="p-3">Email</TableHead>
                  <TableHead className="p-3">Actions</TableHead>
                  <TableHead className="p-3 rounded-tr-lg rounded-br-lg w-1/2"></TableHead>
                </TableRow>
              </TableHeader>
                <TableBody>
                {companies && Array.isArray(companies) && companies.map((company: ICompanyModel) => (
                  <TableRow key={company._id} className="text-[#11263C] text-sm border-gray-200">
                  <TableCell className="p-3 text-start">{company.companyName}</TableCell>
                  <TableCell className="p-3 text-start">{company.contactEmail}</TableCell>
                  <TableCell className="text-start text-[#024AFE] p-3">
                    <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/settings/company/edit-company-details/${company._id}`}
                      className="underline hover:text-[#0228fe]"
                    >
                      View/Edit
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCompany(company._id)}
                      disabled={deleteCompanyMutation.isPending}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    </div>
                  </TableCell>
                  <TableCell className="p-3 text-start w-1/2"></TableCell>
                  </TableRow>
                ))}
                {(!companies || !Array.isArray(companies) || companies.length === 0) && (
                  <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    No companies found. Create your first company to get started.
                  </TableCell>
                  </TableRow>
                )}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CompanyPage
