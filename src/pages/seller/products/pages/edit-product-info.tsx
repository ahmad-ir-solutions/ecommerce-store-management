import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Globe, List, ShoppingCart, CreditCard, Package } from "lucide-react"

interface Product {
  id: string
  image: string
  masterSku: string
  name: string
  warehouse: string
  cost: string
  price: string
  inventory: number
  status: string
}

// Mock data - in real app this would come from API
const mockProducts: Product[] = [
  {
    id: "1",
    image: "/product-1.png",
    masterSku: "805432000253",
    name: "Xerjoff Accento EDP-S 100ml",
    warehouse: "Default",
    cost: "£112.95",
    price: "£143.95",
    inventory: 546,
    status: "-",
  },
  {
    id: "2",
    image: "/product-2.png",
    masterSku: "805432000254",
    name: "Xerjoff Accento EDP-S 100ml",
    warehouse: "Default",
    cost: "£112.95",
    price: "£143.95",
    inventory: 546,
    status: "-",
  },
  {
    id: "3",
    image: "/product-3.png",
    masterSku: "805432000255",
    name: "Xerjoff Accento EDP-S 100ml",
    warehouse: "Default",
    cost: "£112.95",
    price: "£143.95",
    inventory: 546,
    status: "-",
  },
]

export function EditProductInfoPage() {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  // Simulate API call to fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const foundProduct = mockProducts.find((p) => p.id === productId)
      setProduct(foundProduct || null)
      setLoading(false)
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  // Convert selected product data to form format
  const getInitialProductData = () => {
    if (product) {
      return {
        productName: product.name,
        masterSku: product.masterSku,
        sku: "",
        price: Number.parseFloat(product.price.replace("£", "")),
        rrp: Number.parseFloat(product.cost.replace("£", "")),
        taxClass: 20,
        priceIncludesVat: true,
        inventory: product.inventory,
        weight: 0.74,
        length: "",
        width: "",
        height: "",
        warehouse: product.warehouse === "Default" ? "Default Warehouse" : product.warehouse,
        brand: "Xerjoff",
        ean: "",
        upc: "",
        image: product.image,
      }
    }

    return null
  }

  const [productData, setProductData] = useState(getInitialProductData())

  // Update product data when product changes
  useEffect(() => {
    if (product) {
      setProductData(getInitialProductData())
    }
  }, [product])

  const handleSave = () => {
    setIsEditing(false)
    // Handle save logic - in real app, make API call
    console.log("Saving product data:", productData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data to original values
    setProductData(getInitialProductData())
  }

  const handleBack = () => {
    navigate("/products")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product information...</p>
        </div>
      </div>
    )
  }

  if (!product || !productData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Button onClick={handleBack} className="bg-blue-600 hover:bg-blue-700">
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-cyan-400 rounded-full"></div>
            </div>

            <nav className="space-y-2">
              <div className="flex items-center space-x-3 p-2 bg-blue-600 rounded">
                <Globe className="w-5 h-5" />
                <span>Products</span>
              </div>
              <div className="flex items-center space-x-3 p-2 text-gray-300 hover:text-white">
                <List className="w-5 h-5" />
                <span>Listings</span>
              </div>
              <div className="flex items-center space-x-3 p-2 text-gray-300 hover:text-white">
                <ShoppingCart className="w-5 h-5" />
                <span>Orders</span>
              </div>
              <div className="flex items-center space-x-3 p-2 text-gray-300 hover:text-white">
                <Package className="w-5 h-5" />
                <span>Shops</span>
              </div>
              <div className="flex items-center space-x-3 p-2 text-gray-300 hover:text-white">
                <CreditCard className="w-5 h-5" />
                <span>Payments</span>
              </div>
              <div className="flex items-center space-x-3 p-2 text-gray-300 hover:text-white">
                <CreditCard className="w-5 h-5" />
                <span>Billing</span>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-2xl font-semibold">Product</h1>
              <span className="text-blue-600">{product.id}</span>
            </div>
            <div className="text-sm text-gray-500">
              <span>Products</span>
              <span className="mx-2">/</span>
              <span className="text-blue-600">{product.masterSku}</span>
            </div>
          </div>

          {/* Product Information Card */}
          <div className="bg-white rounded-lg shadow-sm border-2 border-blue-200">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Product Information</h2>
            </div>

            <div className="p-6 bg-blue-50">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label className="text-sm font-medium">Product name *</Label>
                    {isEditing ? (
                      <Input
                        value={productData.productName}
                        onChange={(e) => setProductData({ ...productData, productName: e.target.value })}
                        className="bg-white"
                      />
                    ) : (
                      <div className="bg-white border rounded p-2 text-sm">{productData.productName}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label className="text-sm font-medium">Master SKU</Label>
                    <div className="bg-white border rounded p-2 text-sm">{productData.masterSku}</div>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label className="text-sm font-medium">SKU</Label>
                    <div className="bg-white border rounded p-2 text-sm flex items-center justify-between">
                      <span>{productData.sku || productData.masterSku}</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                        Build
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label className="text-sm font-medium">Price *</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={productData.price}
                        onChange={(e) => setProductData({ ...productData, price: Number.parseFloat(e.target.value) })}
                        className="bg-white w-24"
                      />
                    ) : (
                      <div className="bg-white border rounded p-2 text-sm w-24">£{productData.price}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label className="text-sm font-medium">RRP</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={productData.rrp}
                        onChange={(e) => setProductData({ ...productData, rrp: Number.parseFloat(e.target.value) })}
                        className="bg-white w-24"
                      />
                    ) : (
                      <div className="bg-white border rounded p-2 text-sm w-24">£{productData.rrp}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label className="text-sm font-medium">Tax class</Label>
                    {isEditing ? (
                      <Select
                        value={productData.taxClass.toString()}
                        onValueChange={(value) => setProductData({ ...productData, taxClass: Number.parseInt(value) })}
                      >
                        <SelectTrigger className="bg-white w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="0">0</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="bg-white border rounded p-2 text-sm w-24">{productData.taxClass}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label className="text-sm font-medium">Price Includes VAT</Label>
                    <Switch
                      checked={productData.priceIncludesVat}
                      onCheckedChange={(checked) => setProductData({ ...productData, priceIncludesVat: checked })}
                      disabled={!isEditing}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label className="text-sm font-medium">Inventory</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={productData.inventory}
                        onChange={(e) => setProductData({ ...productData, inventory: Number.parseInt(e.target.value) })}
                        className="bg-white w-24"
                      />
                    ) : (
                      <div className="text-sm">{productData.inventory}</div>
                    )}
                  </div>
                </div>

                {/* Middle Column */}
                <div className="space-y-4">
                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label className="text-sm font-medium">Weight</Label>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <Input
                          type="number"
                          step="0.01"
                          value={productData.weight}
                          onChange={(e) =>
                            setProductData({ ...productData, weight: Number.parseFloat(e.target.value) })
                          }
                          className="bg-white w-24"
                        />
                      ) : (
                        <div className="bg-white border rounded p-2 text-sm w-24">{productData.weight}</div>
                      )}
                      <span className="text-sm">kg</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label className="text-sm font-medium">Length</Label>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <Input
                          type="number"
                          value={productData.length}
                          onChange={(e) => setProductData({ ...productData, length: e.target.value })}
                          className="bg-white w-24"
                        />
                      ) : (
                        <div className="bg-white border rounded p-2 text-sm w-24">{productData.length || ""}</div>
                      )}
                      <span className="text-sm">mm</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label className="text-sm font-medium">Width</Label>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <Input
                          type="number"
                          value={productData.width}
                          onChange={(e) => setProductData({ ...productData, width: e.target.value })}
                          className="bg-white w-24"
                        />
                      ) : (
                        <div className="bg-white border rounded p-2 text-sm w-24">{productData.width || ""}</div>
                      )}
                      <span className="text-sm">mm</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label className="text-sm font-medium">Height/Depth</Label>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <Input
                          type="number"
                          value={productData.height}
                          onChange={(e) => setProductData({ ...productData, height: e.target.value })}
                          className="bg-white w-24"
                        />
                      ) : (
                        <div className="bg-white border rounded p-2 text-sm w-24">{productData.height || ""}</div>
                      )}
                      <span className="text-sm">mm</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label className="text-sm font-medium">Warehouse</Label>
                    {isEditing ? (
                      <Select
                        value={productData.warehouse}
                        onValueChange={(value) => setProductData({ ...productData, warehouse: value })}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Default Warehouse">Default Warehouse</SelectItem>
                          <SelectItem value="Secondary Warehouse">Secondary Warehouse</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="bg-white border rounded p-2 text-sm">{productData.warehouse}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label className="text-sm font-medium">Brand</Label>
                    {isEditing ? (
                      <Select
                        value={productData.brand}
                        onValueChange={(value) => setProductData({ ...productData, brand: value })}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Xerjoff">Xerjoff</SelectItem>
                          <SelectItem value="Other Brand">Other Brand</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="bg-white border rounded p-2 text-sm">{productData.brand}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label className="text-sm font-medium">EAN</Label>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <Input
                          value={productData.ean}
                          onChange={(e) => setProductData({ ...productData, ean: e.target.value })}
                          className="bg-white flex-1"
                        />
                      ) : (
                        <div className="bg-white border rounded p-2 text-sm flex-1">{productData.ean || ""}</div>
                      )}
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Autofill
                      </Button>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                        Print
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                    <Label className="text-sm font-medium">UPC</Label>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <Input
                          value={productData.upc}
                          onChange={(e) => setProductData({ ...productData, upc: e.target.value })}
                          className="bg-white flex-1"
                        />
                      ) : (
                        <div className="bg-white border rounded p-2 text-sm flex-1">{productData.upc || ""}</div>
                      )}
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                        Print
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right Column - Product Image */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-48 h-48 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
                    <img
                      src={productData.image || "/product-1.png"}
                      alt="Product"
                      width={180}
                      height={180}
                      className="object-cover rounded"
                    />
                  </div>
                  {isEditing && <Input type="file" accept="image/*" className="bg-white w-48" />}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                  Save
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProductInfoPage;