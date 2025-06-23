import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { CustomSelect } from "@/components/shared/custom-select"

type Platform = "marketplace" | "webstore"

interface SetupData {
  integrationType: string
  location: string
  profileName: string
  grantPermission: boolean
}

const setupSchema = z.object({
  integrationType: z.string().min(1, "Integration type is required"),
  location: z.string().optional(),
  profileName: z.string().optional(),
  grantPermission: z.boolean(),
})

type SetupFormValues = z.infer<typeof setupSchema>

interface SetupConfigurationProps {
  selectedPlatform: Platform | null
  setupData: SetupData
  onSetupDataChange: (data: Partial<SetupData>) => void
  onNext: () => void
}

export const SetupConfiguration = ({
  selectedPlatform,
  setupData,
  onSetupDataChange,
  onNext,
}: SetupConfigurationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SetupFormValues>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      integrationType: setupData.integrationType,
      location: setupData.location,
      profileName: setupData.profileName,
      grantPermission: setupData.grantPermission,
    },
  })

  const watchedIntegrationType = watch("integrationType")

  const onSubmit = (data: SetupFormValues) => {
    onSetupDataChange(data)
    onNext()
  }

  const getIntegrationOptions = () => {
    if (selectedPlatform === "marketplace") {
      return [
        { id: "amazon", label: "Amazon", value: "amazon" },
        { id: "ebay", label: "eBay", value: "ebay" },
        { id: "etsy", label: "Etsy", value: "etsy" },
      ]
    } else {
      return [
        { id: "shopify", label: "Shopify", value: "shopify" },
        { id: "woocommerce", label: "WooCommerce", value: "woocommerce" },
        { id: "magento", label: "Magento", value: "magento" },
      ]
    }
  }

  const getLocationOptions = () => {
    if (watchedIntegrationType === "amazon") {
      return [
        { id: "amazon-us", label: "Amazon (United States)", value: "amazon-us" },
        { id: "amazon-au", label: "Amazon (Australia)", value: "amazon-au" },
        { id: "amazon-uk", label: "Amazon (United Kingdom)", value: "amazon-uk" },
        { id: "amazon-ca", label: "Amazon (Canada)", value: "amazon-ca" },
      ]
    }
    return []
  }

  return (
    <div className="space-y-6">
      <h2 className="text-md text-[#717171] my-2 font-medium">Setup Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-2 text-[#4E5967]">
        <div className="space-y-2 grid grid-cols-3 items-center justify-between">
          <div>
            <Label htmlFor="integrationType">Integration Type</Label>
          </div>
          <div className="col-span-2">
            <CustomSelect
              defaultValue={setupData.integrationType}
              placeholder="Select integration type"
              options={getIntegrationOptions()}
              onChange={(value) => {
                setValue("integrationType", String(value))
                onSetupDataChange({ integrationType: String(value) })
              }}
              className="border-gray-200 bg-white"
            />
            {errors.integrationType && <p className="text-sm text-red-500 mt-1">{errors.integrationType.message}</p>}
          </div>
        </div>

        {selectedPlatform === "marketplace" && watchedIntegrationType === "amazon" && (
          <div className="space-y-2 grid grid-cols-3 items-center justify-between">
            <div>
              <Label htmlFor="location">Location</Label>
            </div>
            <div className="col-span-2">
              <CustomSelect
                defaultValue={setupData.location}
                placeholder="Select location"
                options={getLocationOptions()}
                onChange={(value) => {
                  setValue("location", String(value))
                  onSetupDataChange({ location: String(value) })
                }}
                className="border-gray-200 bg-white"
              />
              {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>}
            </div>
          </div>
        )}

        {selectedPlatform === "webstore" && (
          <div className="space-y-2 grid grid-cols-3 items-center justify-between">
            <div>
              <Label htmlFor="profileName">Profile Name</Label>
            </div>
            <div className="col-span-2">
              <Input
                {...register("profileName")}
                placeholder="Enter profile name"
                className="border-gray-200 bg-white"
                onChange={(e) => {
                  register("profileName").onChange(e)
                  onSetupDataChange({ profileName: e.target.value })
                }}
              />
              {errors.profileName && <p className="text-sm text-red-500 mt-1">{errors.profileName.message}</p>}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label htmlFor="grant-permission" className="text-sm">
            Grant permission to all users
          </Label>
          <Switch
            id="grant-permission"
            checked={setupData.grantPermission}
            onCheckedChange={(checked) => {
              setValue("grantPermission", checked)
              onSetupDataChange({ grantPermission: checked })
            }}
          />
        </div>

        <Button type="submit" variant="primary" className="w-full mb-4">
          Integrate
        </Button>
      </form>
    </div>
  )
}

export default SetupConfiguration
