import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, Check } from "lucide-react"
import { CustomSelect } from "@/components/shared/custom-select"

interface OrderNoteModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (note: { type: string; subject: string; note: string }) => void
  isSubmitting?: boolean
}

export function OrderNoteModal({ isOpen, onClose, onSave, isSubmitting = false }: OrderNoteModalProps) {
  const [noteType, setNoteType] = useState("Complete (Ready to pick)")
  const [subject, setSubject] = useState("")
  const [noteBody, setNoteBody] = useState("")

  const handleSave = () => {
    if (!subject || !noteBody) {
      return
    }

    onSave({
      type: noteType,
      subject,
      note: noteBody,
    })

    // Reset form
    setNoteType("Complete (Ready to pick)")
    setSubject("")
    setNoteBody("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-2 gap-0 bg-white rounded-2xl border-none text-[#4E5967]">
        <div className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold mb-4">Order Note</h2>
            <div className="flex justify-end py-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-lg bg-red-500 text-white mr-2"
                onClick={onClose}
                disabled={isSubmitting}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-lg bg-green-500 text-white"
                onClick={handleSave}
                disabled={isSubmitting}
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-[100px_1fr]">
              <div>
                <label className="text-sm font-medium whitespace-nowrap">Note Type</label>
              </div>
              <div>
                <CustomSelect
                  defaultValue={noteType}
                  placeholder="Select note type"
                  options={[
                    { id: "Complete (Ready to pick)", label: "Complete (Ready to pick)", value: "Complete (Ready to pick)" },
                    { id: "Customer Service", label: "Customer Service", value: "Customer Service" },
                    { id: "Shipping", label: "Shipping", value: "Shipping" },
                    { id: "Payment", label: "Payment", value: "Payment" },
                  ]}
                  onChange={(value) => setNoteType(value)}
                  className="border-gray-200 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-[100px_1fr]">
              <label className="text-sm font-medium whitespace-nowrap">Subject</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                disabled={isSubmitting}
                className="border-gray-300"
              />
            </div>

            <div className="grid grid-cols-[100px_1fr] mb-7">
              <label className="text-sm font-medium whitespace-nowrap">Note Body</label>
              <Textarea
                value={noteBody}
                onChange={(e) => setNoteBody(e.target.value)}
                placeholder="Enter note details"
                rows={6}
                disabled={isSubmitting}
                className="border-gray-300"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
