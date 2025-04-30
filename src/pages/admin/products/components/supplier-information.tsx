import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, Trash2 } from "lucide-react";
import { CustomSelect } from "@/components/shared/custom-select";


interface SupplierInformationProps {
  isEditing: boolean;
}

export const SupplierInformation: React.FC<SupplierInformationProps> = ({ isEditing }) => {

    return (
        <div className="bg-white rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Supplier Information</h2>
                <Button variant="outline" size="sm" className="rounded-sm bg-gray-300 border-none">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#ECF6FF]">
                    <tr>
                      <th className="p-2 text-left text-sm font-medium">Priority Order</th>
                      <th className="p-2 text-left text-sm font-medium">Supplier</th>
                      <th className="p-2 text-left text-sm font-medium">Supplier SKU</th>
                      <th className="p-2 text-left text-sm font-medium">Unit Cost Price *</th>
                      <th className="p-2 text-left text-sm font-medium">Carton Cost Price</th>
                      <th className="p-2 text-left text-sm font-medium">Supplier Stock Level</th>
                      <th className="p-2 text-left text-sm font-medium">Supplier Carton Quantity</th>
                      <th className="p-2 text-left text-sm font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2">
                        <Input value="0.00" className="h-8 w-24 rounded-lg" disabled={!isEditing} />
                      </td>
                      <td className="p-2">
                        {isEditing ? (
                        <CustomSelect
                        // defaultValue={field.value}
                        placeholder="Select Supplier"
                        options={[
                        { id: "20", label: "Other Supplier", value: "Other Supplier" },
                        { id: "5", label: "Designer Collection", value: "Designer Collection" },
                        { id: "0", label: "0", value: "0" },
                        ]}
                        // onChange={field.onChange}
                        className="border-gray-200 bg-white w-48"
                        />
                        ) : (
                          <div className="h-8 border rounded-lg border-gray-400 flex items-center w-48 overflow-ellipsis whitespace-nowrap text-sm px-3">Designer Collection</div>
                        )}
                      </td>
                      <td className="p-2">
                        <Input value="£ 0.00" className="h-8 w-24 rounded-lg" disabled={!isEditing} />
                      </td>
                      <td className="p-2">
                        <Input value="£ 0.00" className="h-8 w-24 rounded-lg" disabled={!isEditing} />
                      </td>
                      <td className="p-2">
                        <Input value="6.43" className="h-8 w-24 rounded-lg" disabled={!isEditing} />
                      </td>
                      <td className="p-2">
                        <Input value="6.43" className="h-8 w-24 rounded-lg" disabled={!isEditing} />
                      </td>
                      <td className="p-2">
                        <Input value="6.43" className="h-8 w-24 rounded-lg" disabled={!isEditing} />
                      </td>
                      <td className="p-2">
                        {/* {!isEditing && ( */}
                            <div className="flex items-center space-x-3 justify-end">
                          <Button variant="filter" size="sm" className="rounded-lg">
                            + Add Supplier
                          </Button>
                          <Button variant="primary" size="sm" className="rounded-sm"><Trash2/></Button>
                          </div>
                        {/* )} */}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {isEditing && (
                <div className="mt-4 text-right">
                  <Button variant="outline" size="sm" className="text-blue-500">
                    + Add Supplier
                  </Button>
                </div>
              )}
            </div>
    );
  };
  
  export default SupplierInformation;