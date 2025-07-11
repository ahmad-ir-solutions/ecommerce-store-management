import React from "react"
import { Input } from "@/components/ui/input"

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
      ]

      const allowedChars = /^[0-9+\-()]+$/

      if (
        !allowedKeys.includes(e.key) &&
        !allowedChars.test(e.key)
      ) {
        e.preventDefault()
      }
    }

    return (
      <Input
        type="text"
        inputMode="tel"
        pattern="[0-9+\-()]*"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        ref={ref}
        {...props}
      />
    )
  }
)

PhoneInput.displayName = "PhoneInput"
