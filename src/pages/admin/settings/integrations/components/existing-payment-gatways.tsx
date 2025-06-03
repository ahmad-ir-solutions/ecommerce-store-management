import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link} from "react-router-dom";

export function ExistingPaymentGatways() {
    const paymentGatewaysId = "164123126545641231";

  return (
    <div className="mt-6">
    <Card className="bg-white rounded-2xl border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
        Existing Payment Gatways
        </CardTitle>
        </CardHeader>
        <CardContent>
        <Table>
            <TableHeader>
            <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                <TableHead className="p-3 rounded-tl-lg rounded-bl-lg">Name</TableHead>
                <TableHead className="p-3">Profile Name</TableHead>
                <TableHead className="p-3">Action</TableHead>
                <TableHead className="p-3 rounded-tr-lg rounded-br-lg w-1/2">Edit</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {/* Static example row; you can map through your data here */}
            <TableRow className="text-[#11263C] text-sm border-b border-gray-200">
                <TableCell className="p-3 text-start">
                    <div className="w-16 h-16 flex items-center justify-center">
                        <img 
                            src="https://logowik.com/content/uploads/images/opayo-by-elavon5689.logowik.com.webp" 
                            alt="courier company logo" 
                            className="object-contain w-full h-full"
                        />
                    </div>
                {/* <img src="https://logowik.com/content/uploads/images/opayo-by-elavon5689.logowik.com.webp" alt="courier company logo"/> */}
                </TableCell>
                <TableCell className="p-3 text-start">
                Opayo
                </TableCell>
                <TableCell className="p-3 text-start w-1/2">
                <Switch/>
                </TableCell>
                <TableCell className="text-start text-[#3D8BFF] p-3 underline hover:text-[#3d4aff]">
                <Link to={`/admin/settings/integrations/edit-payment-gateways-details/${paymentGatewaysId}`}>View/Edit Payment-gateways</Link>
                </TableCell>
            </TableRow>
            </TableBody>
        </Table>
        </CardContent>
    </Card>
    </div>
  );
}

export default ExistingPaymentGatways; 