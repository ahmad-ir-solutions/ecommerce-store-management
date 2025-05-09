import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      "relative inline-flex h-6 min-w-12 items-center rounded-full transition-colors",
      "bg-gradient-to-b from-[#A8A8A8] to-[#A8A8A8] data-[state=checked]:from-[#3d88ff] data-[state=checked]:to-[#245399]",
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out",
        "data-[state=checked]:translate-x-6.5 data-[state=unchecked]:translate-x-[2px]",
        "relative before:absolute before:inset-0 before:rounded-full before:bg-gradient-radial before:from-white before:to-gray-300 before:opacity-70"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
