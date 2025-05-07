import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps) {
  // Generate page numbers to display
  const generatePagination = () => {
    // Always show first page, last page, current page, and pages adjacent to current
    const pages = []

    // Always add page 1
    pages.push(1)

    // Add ellipsis if needed
    if (currentPage > 3) {
      pages.push(-1) // -1 represents ellipsis
    }

    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i !== 1 && i !== totalPages) {
        // Skip first and last pages as they're always shown
        pages.push(i)
      }
    }

    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      pages.push(-1) // -1 represents ellipsis
    }

    // Add last page if we have more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pages = generatePagination()

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {/* <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
          /> */}
          <Button type="button" className={`${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""} flex items-center justify-center border rounded-md w-8.5 h-8.5 bg-[#E6EDF3]`}   onClick={() => onPageChange(Math.max(1, currentPage - 1))}>
          <ChevronLeft />
          </Button>
        </PaginationItem>

        {pages.map((page, i) =>
          page === -1 ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink isActive={page === currentPage} onClick={() => onPageChange(page)} className={`${page === currentPage ? "bg-[#3D8BFF]" : "bg-[#E6EDF3]"}text-white border-[#E6EDF3]`}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          {/* <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
          /> */}
           <Button type="button" className={`${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""} flex items-center justify-center border rounded-md w-8.5 h-8.5 bg-[#E6EDF3]`} onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}>
             <ChevronRight />
           </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
