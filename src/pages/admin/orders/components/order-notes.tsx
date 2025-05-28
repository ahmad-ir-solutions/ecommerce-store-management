import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { OrderDetails, OrderNote } from "../core/_modals"
import { showErrorMessage, showSuccessMessage } from "@/lib/utils/messageUtils"
import { OrderNoteModal } from "./modal/order-notes-modal"


interface OrderNotesProps {
  notes: OrderNote[]
  onAddNote: (note: { subject: string; note: string; createdBy: string }) => Promise<OrderDetails>
}

export function OrderNotes({ notes, onAddNote }: OrderNotesProps) {
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddNote = () => {
    setIsAddingNote(true)
  }

  const handleSaveNote = async (note: { type: string; subject: string; note: string }) => {
    try {
      setIsSubmitting(true)
      await onAddNote({
        subject: note.subject,
        note: note.note,
        createdBy: "Current User",
      })
      setIsAddingNote(false)
      showSuccessMessage("Your note has been added to the order")
    } catch (error) {
      showErrorMessage("There was an error adding the note. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-none overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold mb-4">Order Notes</h2>
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="h-8 bg-blue-500 text-white"
            onClick={handleAddNote}
          >
            + Add Note
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="">
              <TableRow className="bg-[#ECF6FF] border-none">
                <TableHead className="font-medium rounded-l-lg">Subject</TableHead>
                <TableHead className="font-medium">Note</TableHead>
                <TableHead className="font-medium">Created On</TableHead>
                <TableHead className="font-medium rounded-r-lg">Created By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notes.length > 0 ? (
                notes.map((note, index) => (
                  <TableRow key={index} className="">
                    <TableCell className="p-2">{note.subject}</TableCell>
                    <TableCell className="p-2">{note.note}</TableCell>
                    <TableCell className="p-2">{note.createdOn.toLocaleDateString()}</TableCell>
                    <TableCell className="p-2">{note.createdBy}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No records to display.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <OrderNoteModal
        isOpen={isAddingNote}
        onClose={() => setIsAddingNote(false)}
        onSave={handleSaveNote}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
