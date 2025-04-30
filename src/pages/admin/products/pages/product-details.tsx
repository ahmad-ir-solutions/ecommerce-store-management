import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Header } from "@/components/shared/header"
import { Button } from "@/components/ui/button"
import { FileCheck, Printer, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useProductsStore } from "@/store/admin/products-store"
import { useProductDetailStore } from "@/store/admin/product-detail-store"
import { productSchema } from "../core/_schema"
import ProductListOverview from "../components/product-list-overview"
import ProductInformation from "../components/product-imformation"
import SupplierInformation from "../components/supplier-information"

// Mock product data - in a real app, you would fetch this from an API
const fetchProductData = async (productId: string) => {
  // Simulate API call
  return {
    id: productId,
    name: "Xerjoff Accento EDP 5 100ml",
    sku: productId,
    inventory: "6",
    price: "112.95",
    rrp: "112.95",
    taxClass: "20",
    priceIncludesVAT: true,
    weight: "0.74",
    length: "100",
    width: "50",
    heightDepth: "50",
    warehouse: "Default Warehouse",
    brand: "Xerjoff",
    ean: "",
    upc: "",
    listings: [
      { platform: "woocommerce", status: "-" },
      { platform: "ebay", status: "-" },
      { platform: "onbuy", status: "-" },
      { platform: "tiktok", status: "-" },
    ],
    suppliers: [
      {
        name: "Designer Collection",
        sku: "£ 0.00",
        unitCost: "£ 0.00",
        cartonCost: "6.43",
        stockLevel: "6.43",
        cartonQuantity: "6.43",
        priority: "0.00",
      },
    ],
  }
}

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>()

  // Use the product detail store for managing the current product being edited
  const {
    currentProduct,
    isEditing,
    isLoading: detailLoading,
    error: detailError,
    setProduct,
    setIsEditing,
    updateProduct,
    resetProduct,
    setLoading,
    setError,
  } = useProductDetailStore()

  // Use the main products store for any global product data
  const { product: allProducts, isLoading: productsLoading } = useProductsStore()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: currentProduct || undefined,
  })

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return

      setLoading(true)
      try {
        // First check if the product exists in the global store
        const existingProduct = allProducts.find((p) => p.id.toString() === productId || p.sku === productId)

        if (existingProduct) {
          setProduct(existingProduct)
          reset(existingProduct)
        } else {
          // If not found in store, fetch it directly
          const data = await fetchProductData(productId)
          setProduct(data)
          reset(data)
        }
        setLoading(false)
      } catch (error) {
        console.error("Failed to load product:", error)
        setError(error instanceof Error ? error : new Error("Failed to load product"))
        setLoading(false)
      }
    }

    loadProduct()
  }, [productId, setProduct, reset, setLoading, setError, allProducts])

  // Update form when currentProduct changes
  useEffect(() => {
    if (currentProduct) {
      reset(currentProduct)
    }
  }, [currentProduct, reset])

  const onSubmit = (data: any) => {
    updateProduct(data)
    setIsEditing(false)
    // Here you would typically save to your backend
    console.log("Saving product:", data)
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSkuClick = () => {
    if (isEditing) {
      setIsEditing(false)
      resetProduct()
      reset(currentProduct || undefined)
    }
  }

  const isLoadingData = detailLoading || productsLoading

  if (isLoadingData) {
    return <div className="p-8">Loading product details...</div>
  }

  if (detailError) {
    return <div className="p-8">Error loading product: {detailError.message}</div>
  }

  if (!currentProduct) {
    return <div className="p-8">Product not found</div>
  }

  return (
    
    <div>
      <Header title="Products
      ">
        <div className="flex items-center justify-end h-16 px-6 gap-3">
        <Button variant="filter" size="lg" className="rounded-lg">
          <Printer className="h-4 w-4 mr-2" />
          Discontinue Product
        </Button>
        <Button variant="filter" size="lg" className="rounded-lg">
          <Printer className="h-4 w-4 mr-2" />
          Archive Products
        </Button>
        <Button  variant="primary" size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
        <Trash2 className="h-4 w-4"/>
        </Button>
        <Button  variant="primary" size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg" onClick={handleEditClick}>
        <FileCheck  className="h-4 w-4"/>
        </Button>
        </div>
      </Header>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4 space-y-4">
            <ProductListOverview />
            <ProductInformation currentProduct={{ ...currentProduct, inventory: currentProduct.inventory || "" }} isEditing={isEditing} control={control} handleSkuClick={handleSkuClick}/>
            <SupplierInformation isEditing={isEditing}/>

            <div className="flex justify-end gap-4">
            {!isEditing && (
              <>
              <Button
                type="button"
                variant="outline"
                className="px-8 rounded-lg"
                onClick={() => {
                  setIsEditing(false)
                  resetProduct()
                  reset(currentProduct || undefined)
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
