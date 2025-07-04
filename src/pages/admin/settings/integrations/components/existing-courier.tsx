import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

export function ExistingCourier() {
    const courierId = "164123126545641231";

  return (
    <div className="mt-6">
        <Card className="bg-white rounded-2xl border-none shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">
                    Existing Couriers
                </CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                    <TableHead className="p-3 rounded-tl-lg rounded-bl-lg">Name</TableHead>
                    <TableHead className="p-3">Profile Name</TableHead>
                    <TableHead className="p-3">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {/* Static example row; you can map through your data here */}
                <TableRow className="text-[#11263C] text-sm border-b border-gray-200">
                    <TableCell className="p-3 text-start">
                    <div className="w-16 h-16 flex items-center justify-center">
                        <img 
                            src="https://informationcentre.co.uk/img_pages/dpd-customer-service.png" 
                            alt="courier company logo" 
                            className="object-contain w-full h-full"
                        />
                    </div>
                    {/* <img src="https://informationcentre.co.uk/img_pages/dpd-customer-service.png" alt="courier company logo"/> */}
                    </TableCell>
                    <TableCell className="p-3 text-start w-1/2">DPD Local</TableCell>
                    <TableCell className="text-start text-[#024AFE] p-3 underline hover:text-[#0228fe]">
                    <Link to={`/admin/settings/integrations/edit-courier-details/${courierId}`}>View/Edit Courier</Link>
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
            </CardContent>
        </Card>
    </div>
  );
}

export default ExistingCourier; 