import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Check } from "lucide-react"

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
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 bg-white">
        <div className="p-6 pb-0">
          <h2 className="text-xl font-semibold mb-4">Order Note</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Note Type</label>
              <Select value={noteType} onValueChange={setNoteType} disabled={isSubmitting}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select note type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Complete (Ready to pick)">Complete (Ready to pick)</SelectItem>
                  <SelectItem value="Customer Service">Customer Service</SelectItem>
                  <SelectItem value="Shipping">Shipping</SelectItem>
                  <SelectItem value="Payment">Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Note Body</label>
              <Textarea
                value={noteBody}
                onChange={(e) => setNoteBody(e.target.value)}
                placeholder="Enter note details"
                rows={4}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end p-4 bg-gray-100">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-red-500 text-white mr-2"
            onClick={onClose}
            disabled={isSubmitting}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-green-500 text-white"
            onClick={handleSave}
            disabled={isSubmitting}
          >
            <Check className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
