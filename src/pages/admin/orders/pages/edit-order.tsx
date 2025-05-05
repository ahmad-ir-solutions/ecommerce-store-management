import { Header } from "@/components/shared/header";
import { useParams } from "react-router-dom";

export function EditOrderPage() {
const {orderId} = useParams()


  return (
    <div>
      <Header title="Eid order" />
      <div className="mt-6">
        gdfg {orderId}
      </div>
    </div>
  );
}

export default EditOrderPage;