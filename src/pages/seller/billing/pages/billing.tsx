import { Header } from "@/components/shared/header";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function BillingPage() {
  return (
    <div>
      <Header title="Billing" />
      <div className="mt-6">
        <Card className="bg-white rounded-2xl border-none shadow-none mt-6">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Your Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                  <TableHead className="p-3 rounded-tl-lg rounded-bl-lg">Next Payment:</TableHead>
                  <TableHead className="p-3">Payment Method:</TableHead>
                  <TableHead className="p-3">Payment Method:</TableHead>
                  <TableHead className="p-3 rounded-tr-lg rounded-br-lg">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="text-[#11263C] text-sm border-b border-gray-200">
                  <TableCell className="p-3 text-start align-top">
                    We’ll take a payment of (£350.00) + VAT on 08/05/2025
                  </TableCell>
                  <TableCell className="p-3 text-start w-1/2 align-top">
                    <div>Card Type: Visa</div>
                    <div>Card Number: XXXX-3934</div>
                    <div>Expires: 1/2029</div>
                  </TableCell>
                  <TableCell className="p-3 text-start align-top">
                    <div>Cardholder: DESIGNERS COLLECTION</div>
                    <div>Address: The Metropolitan Centre Derby Road</div>
                    <div>Unit 18</div>
                    <div>Greenford</div>
                    <div>Middlesex</div>
                    <div>UB6 8UJ</div>
                  </TableCell>
                  <TableCell className="p-3 text-start align-top">
                    <a href="#" className="text-[#024AFE] text-sm font-medium underline">
                      Edit
                    </a>
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

export default BillingPage;
