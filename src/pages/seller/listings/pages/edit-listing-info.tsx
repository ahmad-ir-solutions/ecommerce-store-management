import type React from "react"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/shared/header"
import { Loader2 } from "lucide-react"
import { ProductFormValues } from "../../products/core/_schema"
import ProductInformation from "../../products/components/product-info"
import { useParams, useLocation } from "react-router-dom"
import { useGetWoocommerceProductById, useUpdateWoocommerceProduct } from "../core/hooks/useListing"

export function EditListingInfoPage() {
  const { listingId  } = useParams<{ listingId: string }>()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const siteUrl = searchParams.get("siteUrl") || "";
  const [isEditing, setIsEditing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)

  // Fetch product from API
  const { data: product, isLoading } = useGetWoocommerceProductById(listingId, siteUrl)
  const { mutate: updateProductMutation, isPending } = useUpdateWoocommerceProduct()

  const getMetaValue = (key: string) =>
    product?.meta_data?.find((m: any) => m.key === key)?.value || "";
console.log(product, "product");

  // Convert API product data to form format
  const getInitialProductData = (): ProductFormValues => {
    if (product) {
      return {
        productName: product.name || "",
        sku: product.sku || "N/A",
        price: Number(product.price) || 0,
        rrp: Number(product.regular_price) || 0,
        taxClass: 20,
        priceIncludesVat: true,
        inventory: product.stock_quantity ?? 0,
        weight: Number(product.weight) || 0,
        length: product.dimensions?.length || "",
        width: product.dimensions?.width || "",
        height: product.dimensions?.height || "",
        warehouse: getMetaValue("warehouse"),
        brand: getMetaValue("brand"),
        ean: getMetaValue("ean"),
        upc: getMetaValue("upc"),
        imageUrl: uploadedImageUrl || product.images?.[0]?.src || "",
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

  // Reset form when product changes
  useEffect(() => {
    if (product) {
      reset(getInitialProductData())
    }
  }, [product, reset])

  const handleSave = (data: ProductFormValues) => {
    console.log(data, "data");
    setIsEditing(false)
    if (!listingId) return
    // Prepare update payload (adapt as needed)
    const updatePayload = {
      name: data.productName,
      // sku: data.sku,
      price: String(data.price),
      regular_price: String(data.rrp),
      inventory: data.inventory,
      weight: String(data.weight),
      length: String(data.length),
      width: String(data.width),
      height: String(data.height),
      warehouse: data.warehouse,
      brand: data.brand,
      ean: data.ean,
      upc: data.upc,
      image: data.imageUrl,
    }
    // You may need to pass siteUrl if required by your API
    updateProductMutation({ listingId, data: updatePayload, siteUrl })
  }

  const handleCancel = () => {
    setIsEditing(false)
    reset(getInitialProductData())
    setUploadedImageUrl(null)
  }

  const handleSkuClick = () => {
    console.log("Build SKU clicked")
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const imageUrl = URL.createObjectURL(file)
      setUploadedImageUrl(imageUrl)
      setUploading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
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
              <Button onClick={handleSubmit(handleSave)}  variant="primary" className="rounded-lg" disabled={isPending}>
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
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
