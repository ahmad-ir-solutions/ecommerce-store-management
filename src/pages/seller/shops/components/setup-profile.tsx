import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { CustomSelect } from "@/components/shared/custom-select"
import Amazon from "@/assets/images/amazon.svg"
import Woocommerce from "@/assets/images/WooCommerce-Logo.png"
import { useCreateAccountConnection } from "../core/hooks/useConnectAccount"
import { Switch } from "@/components/ui/switch"

type Platform = "marketplace" | "webstore"

export interface ProfileProp {
  selectedPlatform: Platform | null
  closeModal: () => void
}

// Zod schema generator based on platform
const createProfileSchema = (platform: Platform | null) => {
  const baseSchema = {
    profileName: z.string().nonempty("Profile name is required"),
    integrationType: z.string().nonempty("Integration type is required"),
    isActive: z.boolean(),
  }

  if (platform === "marketplace") {
    return z.object({
      ...baseSchema,
      integrationType: z.literal("amazon"),
      amazonStore: z.string().nonempty("Amazon store is required"),
    })
  }

  if (platform === "webstore") {
    return z.object({
      ...baseSchema,
      integrationType: z.literal("woocommerce"),
    })
  }

  return z.object(baseSchema)
}

export const SetupProfile = ({ selectedPlatform, closeModal }: ProfileProp) => {
  const { mutate: createConnection } = useCreateAccountConnection()

  const schema = createProfileSchema(selectedPlatform)
  type FormType = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      integrationType: selectedPlatform === "marketplace" ? "amazon" : "woocommerce",
      profileName: selectedPlatform === "marketplace" ? "Amazon" : "WooCommerce",
      isActive: true,
      ...(selectedPlatform === "marketplace" && { amazonStore: "" }),
    } as FormType,
  })
  console.log(errors, "errors");
  
  const onSubmit = (data: FormType) => {
    console.log("Form submitted:", { platformType: selectedPlatform, ...data })
    createConnection({
      profileName: data.profileName,
      integrationType: data.integrationType,
      platformType: selectedPlatform || "marketplace",
      isActive: data.isActive,
      })
    closeModal()
  }

  const renderMarketplaceFields = () => (
    <>
      {/* Integration Type */}
      <div className="grid grid-cols-3 items-center gap-4">
        <Label className="text-sm font-medium text-gray-700">Integration Type</Label>
        <div className="col-span-2 flex items-center space-x-2">
          <img src={Amazon} alt="Amazon" className="h-6" />
        </div>
      </div>

      {/* Profile Name */}
      <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor="profileName" className="text-sm font-medium text-gray-700">Profile Name *</Label>
        <div className="col-span-2">
          <Input
            id="profileName"
            {...register("profileName")}
            placeholder="Amazon"
          />
          {errors.profileName && <p className="text-sm text-red-500 mt-1">{errors.profileName.message}</p>}
        </div>
      </div>

      {/* Amazon Store */}
      <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor="amazonStore" className="text-sm font-medium text-gray-700">Amazon Store *</Label>
        <div className="col-span-2">
          <CustomSelect
            placeholder="Please Select..."
            options={[
              { id: 1, label: "Amazon US", value: "amazon-us" },
              { id: 2, label: "Amazon UK", value: "amazon-uk" },
              { id: 3, label: "Amazon Canada", value: "amazon-ca" },
              { id: 4, label: "Amazon Germany", value: "amazon-de" },
              { id: 5, label: "Amazon France", value: "amazon-fr" },
            ]}
            onChange={(value) => setValue("amazonStore" as any, value)}
          />
          {(errors as any).amazonStore && (
            <p className="text-sm text-red-500 mt-1">{(errors as any).amazonStore.message}</p>
          )}
        </div>
      </div>

      {/* Active Platform */}
      <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor="isActive" className="text-sm font-medium text-gray-700">
          Active Platform
        </Label>
        <div className="col-span-2">
          <Switch
            id="isActive"
            checked={watch("isActive")}
            onCheckedChange={(checked) => setValue("isActive", checked)}
          />
        </div>
      </div>
    </>
  )

  const renderWebstoreFields = () => (
    <>
      {/* Integration Type */}
      <div className="grid grid-cols-3 items-center gap-4">
        <Label className="text-sm font-medium text-gray-700">Integration Type</Label>
        <div className="col-span-2 flex items-center space-x-2">
          <img src={Woocommerce} alt="WooCommerce" className="h-6" />
        </div>
      </div>

      {/* Profile Name */}
      <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor="profileName" className="text-sm font-medium text-gray-700">Profile Name *</Label>
        <div className="col-span-2">
          <Input
            id="profileName"
            {...register("profileName")}
            placeholder="WooCommerce"
          />
          {errors.profileName && <p className="text-sm text-red-500 mt-1">{errors.profileName.message}</p>}
        </div>
      </div>

      {/* Active Platform */}
      <div className="grid grid-cols-3 items-center gap-4">
        <Label htmlFor="isActive" className="text-sm font-medium text-gray-700">
          Active Platform
        </Label>
        <div className="col-span-2">
          <Switch
            id="isActive"
            checked={watch("isActive")}
            onCheckedChange={(checked) => setValue("isActive", checked)}
          />
        </div>
      </div>
    </>
  )

  return (
    <div className="space-y-4">
      <h2>Setup Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 pb-3">
        {selectedPlatform === "marketplace" && renderMarketplaceFields()}
        {selectedPlatform === "webstore" && renderWebstoreFields()}

        <div className="pt-4">
          <Button type="submit" variant="primary" className="w-full">
            Integrate
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SetupProfile
