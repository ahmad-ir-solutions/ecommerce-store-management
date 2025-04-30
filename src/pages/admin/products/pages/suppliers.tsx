import { Header } from "@/components/shared/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // ✅ Correct Table import
import { Plus } from "lucide-react"; // ✅ Only importing the icon, not the table
import { Link } from "react-router-dom";

export function SuppliersPage() {

const supplierId = 12342345645; // This should be replaced with the actual supplier ID you want to use
  return (
    <div>
      <Header title="Products">
        <Link to="/admin/products/add-supplier" className="rounded-xl flex items-center bg-blue-500 px-3 py-2.5 text-white font-normal hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Supplier
        </Link>
      </Header>

      <div className="mt-6">
        <Card className="bg-white rounded-2xl border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
            Existing Suppliers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                  <TableHead className="p-3 rounded-tl-lg rounded-bl-lg">Name</TableHead>
                  <TableHead className="p-3">Amount of products</TableHead>
                  <TableHead className="p-3">Supplier Carton Quantity</TableHead>
                  <TableHead className="p-3 rounded-tr-lg rounded-br-lg"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Static example row; you can map through your data here */}
                <TableRow className="text-[#11263C] text-sm">
                  <TableCell className="p-3 text-start">Designer Collection</TableCell>
                  <TableCell className="p-3 text-start">954</TableCell>
                  <TableCell className="p-3 text-start">Is Default</TableCell>
                  <TableCell className="text-start text-[#3D8BFF] p-3 underline hover:text-[#3d4aff]">
                    <Link to={`/admin/products/supplier-details/${supplierId}`}>View/Edit Supplier</Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SuppliersPage;
