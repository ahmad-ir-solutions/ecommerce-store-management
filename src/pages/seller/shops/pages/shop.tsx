import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import ExistingMarketplace from "../components/existing-marketplace";
import ExistingWebstore from "../components/existing-webstore";
import { IntegratePlatformModal } from "../components/modal/integrate-platform-modal";
import { useState } from "react";
import { useGetConnectedAccounts } from "../core/hooks/useConnectAccount";

export function SellerShopsPage() {
    const [isModalOpen, setModalOpen] = useState(false);
    const { data: connectedAccounts = [], isLoading } = useGetConnectedAccounts();
    
    // Separate by type
    const webstores = connectedAccounts.filter((acc: any) => acc.platformType === "webstore");
    const marketplaces = connectedAccounts.filter((acc: any) => acc.platformType === "marketplace");

    return (
        <div>
            <Header title="Shop">
                <Button
                    onClick={() => setModalOpen(true)}
                    className="rounded-lg" size="lg" variant="primary">
                    Add New
                </Button>
            </Header>
            <div className="mt-6">
                <ExistingMarketplace marketplaces={marketplaces} isLoading={isLoading} />
                <ExistingWebstore webstores={webstores} isLoading={isLoading} />
            </div>
            {/* New Integration Modal */}
            <IntegratePlatformModal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
}

export default SellerShopsPage;