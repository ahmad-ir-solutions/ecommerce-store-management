import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function CompanyPage() {
    const navigate = useNavigate();
    const companyId = "164123126545641231";

    const handleAddCompany = () => {
        // navigate("/admin/settings/company/company-details")
      }

  return (
    <div>
      <Header title="Users">
        <Button onClick={handleAddCompany} className="rounded-lg" size="lg" variant="primary">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Company
        </Button>
      </Header>
      <div className="mt-6">
      <Card className="bg-white rounded-2xl border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
            Existing Companies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                  <TableHead className="p-3 rounded-tl-lg rounded-bl-lg">Name</TableHead>
                  <TableHead className="p-3">Actions</TableHead>
                  <TableHead className="p-3 rounded-tr-lg rounded-br-lg w-1/2"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Static example row; you can map through your data here */}
                <TableRow className="text-[#11263C] text-sm">
                  <TableCell className="p-3 text-start">Designer Collection</TableCell>
                  <TableCell className="text-start text-[#3D8BFF] p-3 underline hover:text-[#3d4aff]">
                    <Link to={`/admin/settings/company/edit-company-details/${companyId}`}>View/Edit Company</Link>
                  </TableCell>
                  <TableCell className="p-3 text-start w-1/2"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CompanyPage; 