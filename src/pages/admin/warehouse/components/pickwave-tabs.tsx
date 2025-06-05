import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link } from "react-router-dom"

const pickwaves = [
    {
        id: "609499",
        despatched: 0,
        total: 20,
        assigned: "17/03/2025 10:34",
        warehouse: "Default Warehouse",
        picker: "Adnan",
    },
]

export function PickwaveTabs() {
    return (
        <Tabs defaultValue="open" className="bg-white px-3 rounded-2xl mt-4">
            <div className="border-b border-gray-200 w-full px-6 pt-6 pb-0">
                <TabsList className="bg-white border-b border-gray-200 p-0 shadow-none data-[state=active]:shadow-none">
                    <TabsTrigger
                        value="open"
                        className="data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-500 border-b-2 border-transparent text-gray-600 rounded-none px-4 py-2 shadow-none data-[state=active]:shadow-none"
                    >
                        Open Pickwaves
                    </TabsTrigger>
                    <TabsTrigger
                        value="completed"
                        className="data-[state=active]:border-b-blue-500 data-[state=active]:text-blue-500 border-b-2 border-transparent text-gray-600 rounded-none px-4 py-2 shadow-none data-[state=active]:shadow-none"
                    >
                        Completed Pickwaves
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="open">
                <div className="">
                    <PickwaveTable data={pickwaves} />
                </div>
            </TabsContent>

            <TabsContent value="completed">
                <div className="">
                    <PickwaveTable data={pickwaves} />
                </div>
            </TabsContent>
        </Tabs>
    )
}

function PickwaveTable({ data }: { data: typeof pickwaves }) {
    return (
        <Card className="border-none shadow-none">
            <CardContent>
                <h3 className="text-lg font-medium mb-4">Items Ordered</h3>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                            <TableHead className="p-3 rounded-l-xl">Pickwave ID</TableHead>
                            <TableHead className="p-3">Despatched/Total Orders</TableHead>
                            <TableHead className="p-3">Assigned</TableHead>
                            <TableHead className="p-3">Warehouse</TableHead>
                            <TableHead className="p-3">Picker</TableHead>
                            <TableHead className="p-3">Tag</TableHead>
                            <TableHead className="p-3">Tracking Number</TableHead>
                            <TableHead className="p-3">Packing List</TableHead>
                            <TableHead className="p-3">Scan Products</TableHead>
                            <TableHead className="p-3">Pre-Generate Labels</TableHead>
                            <TableHead className="p-3 rounded-r-xl">Quick Despatch</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id} className="text-sm text-[#11263C]">
                                <TableCell className="p-3 underline">
                                    <Link to={`/admin/warehouse/edit-pickwave-details/${item.id}`}>{item.id}</Link>
                                </TableCell>
                                <TableCell className="p-3">{item.despatched}/{item.total}</TableCell>
                                <TableCell className="p-3">{item.assigned}</TableCell>
                                <TableCell className="p-3">{item.warehouse}</TableCell>
                                <TableCell className="p-3">{item.picker}</TableCell>
                                <TableCell className="p-3">-</TableCell>
                                <TableCell className="p-3 text-blue-500 underline cursor-pointer">
                                    <Link to={`/admin/warehouse/update-tracking-number/${item.id}`}>Input</Link>
                                </TableCell>
                                <TableCell className="p-3 text-blue-500 underline cursor-pointer">
                                    <Link to={`/admin/warehouse/update-tracking-number/${item.id}`}>Print</Link>
                                </TableCell>
                                <TableCell className="p-3 text-blue-500 underline cursor-pointer">
                                    <Link to={`/admin/warehouse/update-tracking-number/${item.id}`}>Scan Products</Link>
                                </TableCell>
                                <TableCell className="p-3 text-blue-500 underline cursor-pointer">
                                    <Link to={`/admin/warehouse/update-tracking-number/${item.id}`}>Pre Generate</Link>
                                </TableCell>
                                <TableCell className="p-3 text-blue-500 underline cursor-pointer">
                                    <Link to={`/admin/warehouse/update-tracking-number/${item.id}`}>Despatch Pickwave</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
