import { Button } from "@/components/ui/button"
// import { showSuccessMessage } from "@/lib/utils/messageUtils"

interface FormActionsProps {
  onCancel: () => void
  isSubmitting: boolean
}

export function FormActions({ onCancel, isSubmitting }: FormActionsProps) {

  const handleCancel = () => {
    onCancel()
    // showSuccessMessage("Your changes have been discarded")
  }

  return (
    <div className="flex justify-end gap-4 mt-8">
      <Button
        type="button"
        variant="outline"
        className="px-8 bg-white border-gray-300"
        onClick={handleCancel}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      {/* <Button type="submit" className="bg-blue-500 hover:bg-blue-600 px-8 text-white" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button> */}
    </div>
  )
}
