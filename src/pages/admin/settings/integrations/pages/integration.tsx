import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import ExistingCourier from "../components/existing-courier";
import ExistingPaymentGatways from "../components/existing-payment-gatways";

export function IntegrationPage() {
    // const { openModal } = useIntegrationStore()
  
  return (
    <div>
      <Header title="Users">
        <Button 
        // onClick={openModal} 
        className="rounded-lg" size="lg" variant="primary">
            New Integration
        </Button>
      </Header>
      <div className="mt-6">
        <ExistingCourier/>
        <ExistingPaymentGatways/>
      </div>
       {/* New Integration Modal */}
       {/* <IntegrationModal /> */}
    </div>
  );
}

export default IntegrationPage; 