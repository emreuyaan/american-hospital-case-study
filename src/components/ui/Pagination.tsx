import { memo, useCallback } from 'react'
import { Button } from './Button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function PaginationInner({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePrev = useCallback(() => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }, [currentPage, onPageChange])

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }, [currentPage, totalPages, onPageChange])

  if (totalPages <= 1) return null

  return (
    <nav className="flex items-center justify-between" aria-label="Sayfalama">
      <p className="text-sm text-gray-600">
        Sayfa <span className="font-medium">{currentPage}</span> / {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={handlePrev}
          disabled={currentPage === 1}
          aria-label="Önceki sayfa"
        >
          ← Önceki
        </Button>
        <Button
          variant="secondary"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Sonraki sayfa"
        >
          Sonraki →
        </Button>
      </div>
    </nav>
  )
}

export const Pagination = memo(PaginationInner)
