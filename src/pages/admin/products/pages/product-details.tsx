import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Header } from "@/components/shared/header"
import { Button } from "@/components/ui/button"
import { FileCheck, Loader2, Printer, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ProductListOverview from "../components/product-list-overview"
import SupplierInformation from "../components/supplier-information"
import type { IProductModel } from "../core/_modals"
import { useGetProduct, useUpdateProduct } from '../core/hooks/useProduct'
import ProductInformation from '../components/product-imformation'
import { ProductFormValues, productSchema } from '../core/_schema'
import { useUploadProductImage } from '@/hooks/useUploadProductImage'

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>()
  const [isEditing, setIsEditing] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<ProductFormValues | null>(null)
  const [originalProduct, setOriginalProduct] = useState<ProductFormValues | null>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  // image Upload hook
  const { mutateAsync: uploadImage, isPending: uploading } = useUploadProductImage();
  // Fetch product data
  const { data: productData, isLoading, error } = useGetProduct(productId || "")
  const updateProductMutation = useUpdateProduct()

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: currentProduct || undefined,
  })
  console.log(errors, "errors");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file, {
        onSuccess: (url) => {
          setValue("imageUrl", url);
          setUploadedImageUrl(url);
        },
      });
    }
  };

  useEffect(() => {
    if (productData) {
      setCurrentProduct(productData)
      setOriginalProduct(productData)
      reset(productData)
    }
  }, [productData, reset])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSkuClick = () => {
    if (isEditing) {
      setIsEditing(false)
      setCurrentProduct(originalProduct)
      reset(originalProduct || undefined)
    }
  }

  const onSubmit = (data: IProductModel) => {
    console.log(data, "data.priceIncludesVat");
    if (productId) {
      updateProductMutation.mutate({
        id: productId,
        data: {
          productName: data.productName,
          productType: data.productType,
          imageUrl: data.imageUrl,
          sku: data.sku,
          inventory: data.inventory,
          price: data.price,
          rrp: data.rrp,
          taxClass: data.taxClass,
          priceIncludesVat: data.priceIncludesVat,
          weight: data.weight,
          length: data.length,
          width: data.width,
          height: data.height,
          warehouse: data.warehouse,
          brand: data.brand,
          ean: data.ean,
          upc: data.upc,
        },
      })
      setIsEditing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }


  if (error) {
    return <div className="p-8 flex justify-center items-center">
      <p>Error loading product: {error.message}</p>
    </div>
  }

  if (!currentProduct) {
    return <div className="p-8 flex justify-center items-center w-full">
      <p>Product is not available</p>
    </div>
  }


  return (
    <div>
      <Header title="Products">
        <div className="flex items-center justify-end h-16 px-6 gap-3">
          <Button variant="filter" size="lg" className="rounded-lg">
            <Printer className="h-4 w-4 mr-2" />
            Discontinue Product
          </Button>
          <Button variant="filter" size="lg" className="rounded-lg">
            <Printer className="h-4 w-4 mr-2" />
            Archive Products
          </Button>
          <Button variant="primary" size="lg" className="bg-[#024AFE] hover:bg-[#0228fe] text-white rounded-lg">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="bg-[#024AFE] hover:bg-[#0228fe] text-white rounded-lg"
            onClick={handleEditClick}
          >
            <FileCheck className="h-4 w-4" />
          </Button>
        </div>
      </Header>
      <div>
        <form onSubmit={handleSubmit(onSubmit as (data: any) => void)}>
          <div className="py-4 space-y-4">
            <ProductListOverview />
            <ProductInformation
              currentProduct={currentProduct}
              isEditing={isEditing}
              control={control}
              handleSkuClick={handleSkuClick}
              handleImageChange={handleImageChange}
              uploading={uploading}
              uploadedImageUrl={uploadedImageUrl}
            />
            <SupplierInformation isEditing={isEditing} />

            <div className="flex justify-end gap-4">
              {isEditing && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    className="px-8 rounded-lg"
                    onClick={() => {
                      setIsEditing(false)
                      setCurrentProduct(originalProduct)
                      reset(originalProduct || undefined)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="px-8 rounded-lg">
                    Save
                  </Button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductDetailsPage
