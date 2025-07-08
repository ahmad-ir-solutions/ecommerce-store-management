import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Header } from "@/components/shared/header"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUploadProductImage } from '@/hooks/useUploadProductImage'
import { IProductModel } from "@/pages/admin/products/core/_modals"
import { useGetProduct } from "@/pages/admin/products/core/hooks/useProduct"
import { useUpdateProduct } from "@/pages/admin/products/core/hooks/useProduct"
import { ProductFormValues } from "@/pages/admin/products/core/_schema"
import { productSchema } from "@/pages/admin/products/core/_schema"
import ProductInformation from "@/pages/admin/products/components/product-imformation"

export const EditProductInfoPage = () => {
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
  const navigate = useNavigate()
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
          unitCostPrice: data.unitCostPrice,
        },
      })
      setIsEditing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
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
      <Header title="Products"></Header>
      <div>
        <form onSubmit={handleSubmit(onSubmit as (data: any) => void)}>
          <div className="py-4 space-y-4">
            <ProductInformation
              currentProduct={currentProduct}
              isEditing={isEditing}
              control={control}
              handleSkuClick={handleSkuClick}
              handleImageChange={handleImageChange}
              uploading={uploading}
              uploadedImageUrl={uploadedImageUrl}
            />

            <div className="flex justify-end gap-4">
              {isEditing ?(
                <>
                  <Button
                    type="button"
                    variant="outline"
                    className="px-8 rounded-lg"
                    onClick={() => {
                      setIsEditing(false)
                      // setCurrentProduct(originalProduct)
                      // reset(originalProduct || undefined)
                      navigate("/seller/products")
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="px-8 rounded-lg">
                    Save
                  </Button>
                </>
              ):(
                <Button type="button" variant="primary" className="px-8 rounded-lg" onClick={handleEditClick}>
                  Edit
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProductInfoPage
