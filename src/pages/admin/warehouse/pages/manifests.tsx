import { useState } from "react";
import { Header } from "@/components/shared/header";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomSelect } from "@/components/shared/custom-select"
import { DateRangePickerFilter } from "@/components/shared/date-range-picker-filter";
import { Column } from "@tanstack/react-table";

interface MenifestData {
  id: number;
  courierName: string;
  courierType: string;
  totalOrders: number;
  warehouse: string;
  pickwave: string;
  dispatchedDate: string;
}

const dummyData: MenifestData[] = [
  { id: 1, courierName: "Courier A", courierType: "Express", totalOrders: 10, warehouse: "Warehouse 1", pickwave: "PW-001", dispatchedDate: "2024-03-20" },
  { id: 2, courierName: "Courier B", courierType: "Standard", totalOrders: 15, warehouse: "Warehouse 2", pickwave: "PW-002", dispatchedDate: "2024-03-21" },
  { id: 3, courierName: "Courier C", courierType: "Express", totalOrders: 8, warehouse: "Warehouse 1", pickwave: "PW-003", dispatchedDate: "2024-03-22" },
  { id: 4, courierName: "Courier D", courierType: "Standard", totalOrders: 12, warehouse: "Warehouse 3", pickwave: "PW-004", dispatchedDate: "2024-03-23" },
];

const warehouseOptions = [
  { id: "1", label: "All Warehouses", value: "all" },
  { id: "2", label: "Warehouse 1", value: "Warehouse 1" },
  { id: "3", label: "Warehouse 2", value: "Warehouse 2" },
  { id: "4", label: "Warehouse 3", value: "Warehouse 3" },
];

const pickwaveOptions = [
  { id: "1", label: "All Pickwaves", value: "all" },
  { id: "2", label: "PW-001", value: "PW-001" },
  { id: "3", label: "PW-002", value: "PW-002" },
  { id: "4", label: "PW-003", value: "PW-003" },
  { id: "5", label: "PW-004", value: "PW-004" },
];

export function ManifestsPage() {
  const [selectedWarehouse, setSelectedWarehouse] = useState("all");
  const [selectedPickwave, setSelectedPickwave] = useState("all");
  const [dateRange, setDateRange] = useState<{ from: string; to: string } | null>(null);

  console.log(setDateRange);
  

  const filteredData = dummyData.filter((item) => {
    const warehouseMatch = selectedWarehouse === "all" || item.warehouse === selectedWarehouse;
    const pickwaveMatch = selectedPickwave === "all" || item.pickwave === selectedPickwave;
    const dateMatch = !dateRange || (
      item.dispatchedDate >= dateRange.from &&
      item.dispatchedDate <= dateRange.to
    );
    return warehouseMatch && pickwaveMatch && dateMatch;
  });

  return (
    <div>
      <Header title="Menifests" />
      <div className="mt-6">
        <Card className="overflow-hidden border-0 shadow-none bg-white rounded-2xl">
          <CardContent className="p-6 pt-0">
            <div className="grid grid-cols-1 gap-6 justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-4">Filtering</h2>
                <div className="space-y-4 bg-[#ECF6FF] p-4 rounded-lg">
                  <div className="space-y-2 grid grid-cols-2">
                    <Label htmlFor="email" className="text-sm text-[#4E5967]">
                      Despatched Date Range
                    </Label>
                    <div>
                      <DateRangePickerFilter 
                        column={{ id: "dispatchedDate" } as Column<MenifestData>}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 grid grid-cols-2">
                    <Label htmlFor="name" className="text-sm text-[#4E5967]">
                      Warehouse
                    </Label>
                    <div>
                      <CustomSelect
                        placeholder="Please Select Warehouse"
                        options={warehouseOptions}
                        defaultValue={selectedWarehouse}
                        onChange={(value) => setSelectedWarehouse(value as string)}
                        className="w-full bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 grid grid-cols-2">
                    <Label htmlFor="email" className="text-sm text-[#4E5967]">
                      Pickwaves
                    </Label>
                    <div>
                      <CustomSelect
                        placeholder="Please Select Pickwave"
                        options={pickwaveOptions}
                        defaultValue={selectedPickwave}
                        onChange={(value) => setSelectedPickwave(value as string)}
                        className="w-full bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-2xl border-none shadow-none mt-6">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Outstanding Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                  <TableHead className="p-3 rounded-tl-lg rounded-bl-lg">Courier Name</TableHead>
                  <TableHead className="p-3">Courier Type</TableHead>
                  <TableHead className="p-3 rounded-tr-lg rounded-br-lg">Total UI-Manifested Orders</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id} className="text-[#11263C] text-sm border-b border-gray-200">
                    <TableCell className="p-3 text-start">{item.courierName}</TableCell>
                    <TableCell className="p-3 text-start w-1/2">{item.courierType}</TableCell>
                    <TableCell className="text-start">{item.totalOrders}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ManifestsPage; 