import type React from "react"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/shared/header"
import { Loader2 } from "lucide-react"
import { ProductFormValues } from "../../products/core/_schema"
import ProductInformation from "../../products/components/product-info"

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
    image: "/placeholder.svg?height=200&width=200",
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
    image: "/placeholder.svg?height=200&width=200",
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
    image: "/placeholder.svg?height=200&width=200",
    masterSku: "805432000255",
    name: "Xerjoff Accento EDP-S 100ml",
    warehouse: "Default",
    cost: "£112.95",
    price: "£143.95",
    inventory: 546,
    status: "-",
  },
]

export function EditListingInfoPage() {
  // For demo purposes, we'll use the first product
  const productId = "1"
  const [isEditing, setIsEditing] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)

  // Convert selected product data to form format
  const getInitialProductData = (): ProductFormValues => {
    if (product) {
      return {
        productName: product.name,
        sku: product.masterSku,
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
        imageUrl: product.image,
      }
    }

    return {
      productName: "",
      sku: "",
      price: 0,
      rrp: 0,
      taxClass: 20,
      priceIncludesVat: true,
      inventory: 0,
      weight: 0,
      length: "",
      width: "",
      height: "",
      warehouse: "",
      brand: "",
      ean: "",
      upc: "",
      imageUrl: "",
    }
  }

  const { control, handleSubmit, reset, watch } = useForm<ProductFormValues>({
    defaultValues: getInitialProductData(),
  })

  const currentProduct = watch()

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

  // Reset form when product changes
  useEffect(() => {
    if (product) {
      reset(getInitialProductData())
    }
  }, [product, reset])

  const handleSave = (data: ProductFormValues) => {
    setIsEditing(false)
    // Handle save logic - in real app, make API call
    console.log("Saving product data:", data)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data to original values
    reset(getInitialProductData())
    setUploadedImageUrl(null)
  }

  const handleBack = () => {
    // In real app, use router navigation
    console.log("Navigate back to products")
  }

  const handleSkuClick = () => {
    console.log("Build SKU clicked")
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploading(true)
      // Simulate image upload
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create a temporary URL for preview
      const imageUrl = URL.createObjectURL(file)
      setUploadedImageUrl(imageUrl)
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!product) {
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
    <div>
      {/* Header */}
      <Header title="Product"></Header>

      <div className="mt-6">
        {/* Product Information Component */}
        <ProductInformation
          currentProduct={currentProduct}
          isEditing={isEditing}
          control={control}
          handleSkuClick={handleSkuClick}
          handleImageChange={handleImageChange}
          uploading={uploading}
          uploadedImageUrl={uploadedImageUrl}
        />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSubmit(handleSave)}  variant="primary" className="rounded-lg">
                Save
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="primary" className="rounded-lg">
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditListingInfoPage
