import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Amazon from "@/assets/images/amazon.svg";
import { Loader2, Trash2Icon } from "lucide-react";
import { useDeleteAccountConnection } from "../core/hooks/useConnectAccount";
import { Button } from "@/components/ui/button";

export function ExistingMarketplace({ marketplaces, isLoading }: { marketplaces: any, isLoading: boolean }) {
    // const marketplaceId = "164123126545641231";

    // Helper to get platform image
    const getPlatformImage = (platformType: string) => {
        switch (platformType.toLowerCase()) {
            case "amazon":
                return Amazon;
            default:
                return "";
        }
    };

    const { mutate: deleteMarketplace } = useDeleteAccountConnection();

    const handleDelete = (marketplaceId: string) => {
        deleteMarketplace(marketplaceId);
    }

    return (
        <div className="mt-6">
            <Card className="bg-white rounded-2xl border-none shadow-none gap-3">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Existing Marketplaces</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                                <TableHead className="p-3 rounded-tl-lg rounded-bl-lg">Name</TableHead>
                                <TableHead className="p-3">Profile Name</TableHead>
                                <TableHead className="p-3">Active</TableHead>
                                <TableHead className="p-3 rounded-tr-lg rounded-br-lg">Edit</TableHead>
                                <TableHead className="p-3 rounded-tr-lg rounded-br-lg">Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4">
                                        <div className="flex justify-center items-center h-64">
                                            <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : marketplaces.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4">
                                        No connected accounts found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                marketplaces.map((marketplace: any) => {
                                    const profileName = marketplace?.profileName || "-";
                                    // const siteUrl = account?.woocommerce?.woocommerceSiteUrl || "";
                                    const platformLogo = getPlatformImage("amazon"); // You can adjust if type is stored
                                    const marketplaceId = marketplace?._id;

                                    return (
                                        <TableRow key={marketplaceId} className="text-[#11263C] text-sm border-b border-gray-200">
                                            <TableCell className="p-3 text-start">
                                                <div className="w-16 h-16 flex items-center justify-center">
                                                    <img src={platformLogo} alt="platform logo" className="object-contain w-full h-full" />
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-3 text-start">{profileName}</TableCell>
                                            <TableCell className="p-3 text-start">
                                                <Switch />
                                            </TableCell>
                                            <TableCell className="text-start text-[#024AFE] p-3 underline hover:text-[#0228fe]">
                                                <Link to={`/seller/shops/edit-marketplace/${marketplaceId}`}>View/Edit</Link>
                                            </TableCell>
                                            <TableCell className="p-3">
                                                <Button size="sm" onClick={() => handleDelete(marketplaceId)} className="bg-red-600 text-white hover:bg-red-700" disabled={marketplace?.isActive}>
                                                    <Trash2Icon className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default ExistingMarketplace; 