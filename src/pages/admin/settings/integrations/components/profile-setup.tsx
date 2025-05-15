import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CustomSelect } from '@/components/shared/custom-select'
import { useIntegrationStore } from '@/store/admin/integration-store'
import { ProfileFormValues } from '../core/_modal'
import { profileSchema } from '../core/_schema'

export const ProfileSetup = () => {
  const { selectedPlatform, closeModal } = useIntegrationStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      integrationType: "",
      location: "",
    },
  })

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Form submitted:", { platform: selectedPlatform, ...data })
    // Here you would typically send this data to your API
    closeModal()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-md text-[#717171] my-2 font-medium">Setup Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-2 text-[#4E5967]">
        <div className="space-y-2 grid grid-cols-3 items-center justify-between">
          <div>
            <Label htmlFor="integrationType">Integration Type</Label>
          </div>
          <div className='col-span-2'>
            <CustomSelect
            defaultValue=""
            placeholder="Select integration type"
            options={[
              { id: "amazone", label: "Amazone", value: "amazone" },
              { id: "shopify", label: "Shopify", value: "shopify" },
              { id: "woocommerce", label: "WooCommerce", value: "woocommerce" },
            ]}
            onChange={(value) => {
              const event = {
              target: {
                name: "integrationType",
                value,
              },
              }
              register("integrationType").onChange(event as any)
            }}
            className="border-gray-200 bg-white"
            />
            {errors.integrationType && <p className="text-sm text-red-500">{errors.integrationType.message}</p>}
          </div>
            
        </div>

        <div className="space-y-2 grid grid-cols-3 items-center justify-between">
          <div>
            <Label htmlFor="location">Location</Label>
          </div>
          <div className='col-span-2'>
            <CustomSelect
            defaultValue=""
            placeholder="Select location"
            options={[
              { id: "amazone-australia", label: "Amazone (Australia)", value: "amazone-australia" },
              { id: "amazone-us", label: "Amazone (US)", value: "amazone-us" },
              { id: "amazone-uk", label: "Amazone (UK)", value: "amazone-uk" },
            ]}
            onChange={(value) => {
              const event = {
              target: {
                name: "location",
                value,
              },
              }
              register("location").onChange(event as any)
            }}
            className="border-gray-200 bg-white"
            />
          </div>
            
          {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
        </div>
        <Button type="submit" variant="primary" className="w-full mb-4">
          Integrate
        </Button>
      </form>
    </div>
  )
}

export default ProfileSetup;