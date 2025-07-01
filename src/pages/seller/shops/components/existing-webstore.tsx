import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import ShopifyLogo from "@/assets/images/shopyfy.svg";
import WoocommerceLogo from "@/assets/images/WooCommerce-Logo.png";

export function ExistingWebstore({ webstores, isLoading }: { webstores: any, isLoading: boolean }) {
    // const webstoreId = "164123126545641231";

    // Helper to get platform image
    const getPlatformImage = (platformType: string) => {
        switch (platformType.toLowerCase()) {
            case "woocommerce":
                return WoocommerceLogo;
            case "shopify":
                return ShopifyLogo;
            default:
                return "";
        }
    };

    return (
        <div className="mt-6">
            <Card className="bg-white rounded-2xl border-none shadow-none gap-3">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-medium">Existing Webstores</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                                <TableHead className="p-3 rounded-tl-lg rounded-bl-lg">Name</TableHead>
                                <TableHead className="p-3">Profile Name</TableHead>
                                <TableHead className="p-3">Active</TableHead>
                                <TableHead className="p-3 rounded-tr-lg rounded-br-lg w-1/2">Edit</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-4">
                                        <div className="flex justify-center items-center h-64">
                                            <Loader2 className="h-8 w-8 animate-spin" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : webstores.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-4">
                                        No connected accounts found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                webstores.map((webstore: any) => {
                                    const profileName = webstore?.profileName || "-";
                                    // const siteUrl = account?.woocommerce?.woocommerceSiteUrl || "";
                                    const platformLogo = getPlatformImage("woocommerce"); // You can adjust if type is stored
                                    const webstoreId = webstore?._id;

                                    return (
                                        <TableRow key={webstoreId} className="text-[#11263C] text-sm border-b border-gray-200">
                                            <TableCell className="p-3 text-start">
                                                <div className="w-16 h-16 flex items-center justify-center">
                                                    <img src={platformLogo} alt="platform logo" className="object-contain w-full h-full" />
                                                </div>
                                            </TableCell>
                                            <TableCell className="p-3 text-start">{profileName}</TableCell>
                                            <TableCell className="p-3 text-start">
                                                <Switch checked={webstore?.isActive} />
                                            </TableCell>
                                            <TableCell className="text-start text-[#024AFE] p-3 underline hover:text-[#0228fe]">
                                                <Link to={`/seller/shops/edit-webstore/${webstoreId}`}>View/Edit</Link>
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

export default ExistingWebstore; 