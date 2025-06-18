import { useEffect, useState } from "react";

type AddToListModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { masterSKU: string; shopSKU: string; channel: string }) => void;
    defaultSKU?: string;
};

export default function AddToListModal({ open, onClose, onSubmit, defaultSKU = "" }: AddToListModalProps) {
    const [masterSKU, setMasterSKU] = useState(defaultSKU);
    const [shopSKU, setShopSKU] = useState("");
    const [channel, setChannel] = useState("");

    // Reset fields when modal opens with a new SKU
    useEffect(() => {
        setMasterSKU(defaultSKU);
        setShopSKU("");
        setChannel("");
    }, [defaultSKU, open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-6 text-center">Add to your list</h2>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        onSubmit({ masterSKU, shopSKU, channel });
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium mb-1">Master SKU</label>
                        <input
                            className="w-full border rounded px-3 py-2"
                            value={masterSKU}
                            onChange={e => setMasterSKU(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Shop SKU</label>
                        <input
                            className="w-full border rounded px-3 py-2"
                            value={shopSKU}
                            onChange={e => setShopSKU(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Channel</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={channel}
                            onChange={e => setChannel(e.target.value)}
                            required
                        >
                            <option value="">Select channel</option>
                            <option value="Amazon">Amazon</option>
                            <option value="eBay">eBay</option>
                            <option value="Shopify">Shopify</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 rounded bg-gray-100 text-gray-700"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Add to list
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}