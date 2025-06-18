import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link } from "react-router-dom"
import { IPickwave } from "../core/_modals"
import { useCreatePickList, useGetOrderLabel } from "../core/hooks/usePickwave";
import { showErrorMessage, showSuccessMessage } from "@/lib/utils/messageUtils";

export function PickwaveTable({ data }: { data: IPickwave[] }) {
    const { mutate: createPickList } = useCreatePickList()
    const [labelPickwaveId, setLabelPickwaveId] = useState<string | null>(null);

    // Call the hook at the top level, using the current labelPickwaveId
    const { data: labelData, error } = useGetOrderLabel(
        labelPickwaveId ? { orderId: labelPickwaveId } : { orderId: "" }
    );

    const handlePrint = (pickwaveId: string) => {
        createPickList(pickwaveId)
    }

    const handleGenerateLabels = (pickwaveId: string) => {
        setLabelPickwaveId(pickwaveId);
    }

    // Optionally, open the label in a new tab when labelData changes
    useEffect(() => {
        if (labelData?.allPickwaveLabelsUrl) {
            showSuccessMessage("Label generated successfully");
            window.open(labelData.allPickwaveLabelsUrl, '_blank');
            setLabelPickwaveId(null);
        }
        if (error) {
            showErrorMessage((error as Error).message || "Failed to fetch label");
        }
    }, [labelData, error]);

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
                            <TableRow key={item._id} className="text-sm text-[#11263C] border-none">
                                <TableCell className="p-3 underline">
                                    <Link to={`/admin/warehouse/edit-pickwave-details/${item._id}`}>{item._id}</Link>
                                </TableCell>
                                <TableCell className="p-3">{item.orders.length}</TableCell>
                                <TableCell className="p-3">{new Date(item.createdAt).toLocaleString()}</TableCell>
                                <TableCell className="p-3">Default Warehouse</TableCell>
                                <TableCell className="p-3">{item.picker || '-'}</TableCell>
                                <TableCell className="p-3">{item.tag || '-'}</TableCell>
                                <TableCell className="p-3 text-blue-500 underline cursor-pointer">
                                    <Link to={`/admin/warehouse/update-tracking-number/${item._id}`}>Input</Link>
                                </TableCell>
                                <TableCell className="p-3 text-blue-500 underline cursor-pointer">
                                    <span
                                        className="cursor-pointer"
                                        onClick={() => handlePrint(item._id)}
                                    >
                                        Print
                                    </span>
                                </TableCell>
                                <TableCell className="p-3 text-blue-500 underline cursor-pointer">
                                    <Link to={`/admin/warehouse/edit-pickwave-details/${item._id}`}>Scan Products</Link>
                                </TableCell>
                                <TableCell className="p-3 text-blue-500 underline cursor-pointer">
                                    {/* <Link to={`/admin/warehouse/update-tracking-number/${item._id}`}>Pre Generate</Link> */}
                                    <span
                                        className="cursor-pointer"
                                        onClick={() => handleGenerateLabels(item._id)}
                                    >
                                        Pre Generate
                                    </span>
                                </TableCell>
                                <TableCell className="p-3 text-blue-500 underline cursor-pointer">
                                    <Link to={`/admin/warehouse/update-tracking-number/${item._id}`}>Despatch Pickwave</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}