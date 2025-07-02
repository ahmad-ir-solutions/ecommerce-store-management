import type React from "react"

import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Controller } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CustomSelect } from "@/components/shared/custom-select"
import { ProductFormValues } from "../core/_schema"

interface ProductInformationProps {
  currentProduct: ProductFormValues
  isEditing: boolean
  control: import("react-hook-form").Control<ProductFormValues>
  handleSkuClick: () => void
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  uploading: boolean
  uploadedImageUrl: string | null
}

export const ProductInformation: React.FC<ProductInformationProps> = ({
  currentProduct,
  isEditing,
  control,
  handleSkuClick,
  handleImageChange,
  uploading,
  uploadedImageUrl,
}) => {
  console.log(currentProduct, "currentProduct");
  
  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Product Information</h2>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 bg-[#ECF6FF] rounded-lg text-[#4E5967]">
        <div className="p-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-[150px_1fr] items-center">
              <Label htmlFor="name" className="text-sm font-medium">
                Product name *
              </Label>
              {isEditing ? (
                <Controller
                  name="productName"
                  control={control}
                  render={({ field }) => <Input {...field} id="productName" className="h-9 border-gray-200 bg-white" />}
                />
              ) : (
                <div className="bg-white border rounded-lg border-gray-200 p-2 px-3 text-sm h-9 overflow-hidden text-ellipsis whitespace-nowrap">
                  {currentProduct.productName}
                </div>
              )}
            </div>

            <div className="grid grid-cols-[150px_1fr] items-center">
              <Label htmlFor="sku" className="text-sm font-medium">
                SKU
              </Label>
              <div className="bg-white border rounded-lg border-gray-200 p-2 px-3 text-sm " onClick={handleSkuClick}>
                {currentProduct.sku}
              </div>
            </div>

            <div className="grid grid-cols-[150px_1fr] items-center">
              <Label htmlFor="inventory" className="text-sm font-medium">
                Inventory
              </Label>
              {isEditing ? (
                <Controller
                  name="inventory"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="inventory"
                      type="number"
                      className="h-9 border-gray-200 bg-white"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  )}
                />
              ) : (
                <div className="p-2 px-3 text-sm h-9">{currentProduct.inventory}</div>
              )}
            </div>

            <div className="grid grid-cols-[150px_1fr] items-center">
              <Label htmlFor="price" className="text-sm font-medium">
                Price *
              </Label>
              {isEditing ? (
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="price"
                      type="number"
                      step="0.01"
                      className="h-9 border-gray-200 bg-white w-24"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  )}
                />
              ) : (
                <div className="bg-white border rounded-lg border-gray-200 p-2 px-3 text-sm h-9 w-24 overflow-hidden text-ellipsis whitespace-nowrap">
                  {currentProduct.price}
                </div>
              )}
            </div>

            <div className="grid grid-cols-[150px_1fr] items-center">
              <Label htmlFor="rrp" className="text-sm font-medium">
                RRP
              </Label>
              {isEditing ? (
                <Controller
                  name="rrp"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="rrp"
                      type="number"
                      step="0.01"
                      className="h-9 border-gray-200 bg-white w-24"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  )}
                />
              ) : (
                <div className="bg-white border rounded-lg border-gray-200 p-2 px-3 text-sm h-9 w-24 overflow-hidden text-ellipsis whitespace-nowrap">
                  {currentProduct.rrp}
                </div>
              )}
            </div>

            <div className="grid grid-cols-[150px_1fr] items-center">
              <div>
                <Label htmlFor="taxClass" className="text-sm font-medium">
                  Tax class
                </Label>
              </div>
              <div>
                {isEditing ? (
                  <Controller
                    name="taxClass"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        defaultValue={field.value}
                        placeholder="Select tax class"
                        options={[
                          { id: 20, label: "20", value: 20 },
                          { id: 5, label: "5", value: 5 },
                          { id: 0, label: "0", value: 0 },
                        ]}
                        onChange={field.onChange}
                        className="border-gray-200 bg-white w-32"
                      />
                    )}
                  />
                ) : (
                  <div className="bg-white border rounded-lg border-gray-200 p-2 px-3 text-sm h-9 w-32 overflow-hidden text-ellipsis whitespace-nowrap">
                    {currentProduct.taxClass}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[150px_1fr] items-center">
              <Label htmlFor="priceIncludesVat" className="text-sm font-medium">
                Price Includes VAT
              </Label>
              {isEditing ? (
                <Controller
                  name="priceIncludesVat"
                  control={control}
                  defaultValue={currentProduct.priceIncludesVat}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="flex items-center">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-[#024AFE]"
                      />
                    </div>
                  )}
                />
              ) : (
                <div className="flex items-center">
                  <Switch
                    checked={currentProduct.priceIncludesVat}
                    disabled
                    className="data-[state=checked]:bg-[#024AFE]"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-[150px_1fr] items-center">
              <Label htmlFor="weight" className="text-sm font-medium">
                Weight
              </Label>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <Controller
                    name="weight"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="weight"
                        type="number"
                        step="0.01"
                        className="h-9 border-gray-200 bg-white w-24"
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    )}
                  />
                ) : (
                  <div className="bg-white border rounded-lg border-gray-200 p-2 px-3 text-sm  w-24 h-9">
                    {currentProduct.weight}
                  </div>
                )}
                <span className="text-sm">kg</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-[150px_1fr] items-center">
              <Label htmlFor="length" className="text-sm font-medium">
                Length
              </Label>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <Controller
                    name="length"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="length"
                        type="number"
                        className="h-9 border-gray-200 bg-white w-24"
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    )}
                  />
                ) : (
                  <div className="bg-white border rounded-lg border-gray-200 p-2 px-3 text-sm  w-24 h-9">
                    {currentProduct.length || ""}
                  </div>
                )}
                <span className="text-sm">mm</span>
              </div>
            </div>

            <div className="grid grid-cols-[150px_1fr] items-center">
              <Label htmlFor="width" className="text-sm font-medium">
                Width
              </Label>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <Controller
                    name="width"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="width"
                        type="number"
                        className="h-9 border-gray-200 bg-white w-24"
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    )}
                  />
                ) : (
                  <div className="bg-white border rounded-lg border-gray-200 p-2 px-3 text-sm  w-24 h-9">
                    {currentProduct.width || ""}
                  </div>
                )}
                <span className="text-sm">mm</span>
              </div>
            </div>

            <div className="grid grid-cols-[150px_1fr] items-center">
              <Label htmlFor="height" className="text-sm font-medium">
                Height
              </Label>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <Controller
                    name="height"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="height"
                        type="number"
                        className="h-9 border-gray-200 bg-white w-24"
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    )}
                  />
                ) : (
                  <div className="bg-white border rounded-lg border-gray-200 p-2 px-3 text-sm w-24 h-9">
                    {currentProduct.height || ""}
                  </div>
                )}
                <span className="text-sm">mm</span>
              </div>
            </div>

            <div className="grid grid-cols-[150px_1fr] items-center">
              <div>
                <Label htmlFor="warehouse" className="text-sm font-medium">
                  Warehouse
                </Label>
              </div>
              <div>
                {isEditing ? (
                  <Controller
                    name="warehouse"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        defaultValue={field.value}
                        placeholder="Select warehouse"
                        options={[
                          { id: "20", label: "Default Warehouse", value: "Default Warehouse" },
                          { id: "5", label: "5", value: "5" },
                          { id: "0", label: "0", value: "0" },
                        ]}
                        onChange={field.onChange}
                        className="border-gray-200 bg-white w-full"
                      />
                    )}
                  />
                ) : (
                  <div className="bg-white border rounded-lg border-gray-200 p-2 px-3 text-sm h-9 overflow-hidden text-ellipsis whitespace-nowrap">
                    {currentProduct.warehouse}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[150px_1fr] items-center">
              <div>
                <Label htmlFor="brand" className="text-sm font-medium">
                  Brand
                </Label>
              </div>
              <div>
                {isEditing ? (
                  <Controller
                    name="brand"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        defaultValue={field.value}
                        placeholder="Select brand"
                        options={[
                          { id: "20", label: "Xerjoff", value: "Xerjoff" },
                          { id: "5", label: "5", value: "5" },
                          { id: "0", label: "dfgdfg", value: "dfgdfg" },
                        ]}
                        onChange={field.onChange}
                        className="border-gray-200 bg-white w-full"
                      />
                    )}
                  />
                ) : (
                  <div className="bg-white border rounded-lg border-gray-200 p-2 px-3 text-sm h-9 overflow-hidden text-ellipsis whitespace-nowrap">
                    {currentProduct.brand}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[150px_1fr] items-center">
              <Label htmlFor="ean" className="text-sm font-medium">
                EAN
              </Label>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <Controller
                    name="ean"
                    control={control}
                    render={({ field }) => <Input {...field} id="ean" className="h-9 border-gray-200 bg-white" />}
                  />
                ) : (
                  <div className="bg-white border rounded-lg h-9 border-gray-200 p-2 px-3 text-sm  flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {currentProduct.ean || ""}
                  </div>
                )}
                <>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-[#024AFE] h-8 rounded-lg text-white hover:bg-[#024AFE]/90"
                  >
                    Autofill
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-[#FF9A3D] h-8 text-white rounded-lg hover:bg-[#FF9A3D]/90"
                  >
                    Print
                  </Button>
                </>
              </div>
            </div>

            <div className="grid grid-cols-[150px_1fr] items-center">
              <Label htmlFor="upc" className="text-sm font-medium">
                UPC
              </Label>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <Controller
                    name="upc"
                    control={control}
                    render={({ field }) => <Input {...field} id="upc" className="h-9 border-gray-200 bg-white" />}
                  />
                ) : (
                  <div className="bg-white border rounded-lg h-9 border-gray-200 p-2 px-3 text-sm  flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {currentProduct.upc || ""}
                  </div>
                )}  
                <Button
                  variant="default"
                  size="sm"
                  className="bg-[#FF9A3D] h-8 text-white rounded-lg hover:bg-[#FF9A3D]/90"
                >
                  Print
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden flex justify-center items-center flex-col p-6">
          {isEditing ? (
            <>
              {/* Preview Box: Shows image after upload or a placeholder */}
              <div className="flex justify-center items-center bg-white border border-dashed border-gray-300 rounded-lg h-[200px] w-[200px] mb-4">
                {uploadedImageUrl ? (
                  <img
                    src={uploadedImageUrl || "/placeholder.svg"}
                    alt="Uploaded preview"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : uploading ? (
                  <span className="text-sm text-[#0228fe]">Uploading image...</span>
                ) : (
                  <span className="text-gray-400 text-sm">No image uploaded</span>
                )}
              </div>

              {/* File Upload Input */}
              <Controller
                name="imageUrl"
                control={control}
                render={() => (
                  <Input
                    id="imageUrl"
                    type="file"
                    onChange={handleImageChange}
                    className="border-gray-200 bg-white h-9 w-[200px]"
                  />
                )}
              />
            </>
          ) : (
            // View Mode: Show saved image or fallback
            <div className="flex justify-center items-center bg-white rounded-lg h-[200px] w-[200px]">
              <img
                src={currentProduct.imageUrl || "/placeholder.svg?height=200&width=200" || "/placeholder.svg"}
                alt="Product image"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductInformation
