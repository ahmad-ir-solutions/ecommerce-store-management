import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import ExistingMarketplace from "../components/existing-marketplace";
import ExistingWebstore from "../components/existing-webstore";
import { IntegratePlatformModal } from "../components/modal/integrate-platform-modal";
import { useState } from "react";

export function SellerShopsPage() {
    const [isModalOpen, setModalOpen] = useState(false);
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
                <ExistingMarketplace />
                <ExistingWebstore />
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